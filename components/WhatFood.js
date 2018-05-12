import React, { Component } from 'react';
import {
  Platform, StyleSheet, Text,
  View, TouchableOpacity, Button,
  FlatList, ActivityIndicator,
  TextInput, Alert, Keyboard, ScrollView
} from 'react-native';
import { Icon } from 'react-native-elements';
import Modal from 'react-native-modal';
import SearchBar from './SearchBar';
import EatenFoodList from './EatenFoodList';
import ProcessButton from './ProcessButton';
import NavigationBar from './NavigationBar';
import { width } from '../utils/helpers';
import { handleDB } from '../database/handle_db';

export default class WhatFood extends Component {
  constructor() {
    super();
    this.state = {
      selectedFood: {},
      isModalVisible: false,
      eatenFoodList: [],
      searchFood: '',
      foodList: [],
      loading: true,
      refreshing: false,
    };

    console.ignoreYellowBox = [
      'Setting a timer'
    ];
  }

  componentDidMount() {
    handleDB('food')
      .then(foodList => this.setState({
        foodList,
        loading: false,
      }))
  }

  pushToEatenFoodList(selectedFood) {
    let { eatenFoodList } = this.state;
    let copiedEatenFoodList = eatenFoodList;

    const checkAddedFood = copiedEatenFoodList.find(food => food['식품이름'] === selectedFood['식품이름']);
    if(checkAddedFood) {
      let index = copiedEatenFoodList.indexOf(checkAddedFood);
      copiedEatenFoodList.splice(index, 1);
      copiedEatenFoodList.push(selectedFood);
    } else {
      copiedEatenFoodList.push(selectedFood);
    }

    this.setState({eatenFoodList: copiedEatenFoodList});
  }

  toggleModal(selectedFood) {
    this.setState({
      isModalVisible:!this.state.isModalVisible,
      selectedFood
    })
  }

  handleSearch(searchFood) {
    let copiedFoodList = this.state.foodList;

    let searchedFoodList = copiedFoodList.filter(food => {
      if(food) { // check if food is not null
        return food['식품이름'].includes(searchFood);
      }
    });

    this.setState({ searchFood, searchedFoodList });
  }

  refreshingLoader() {
      return (
        <View
          style={{ paddingVertical: 45 }}
        >
          { this.state.searchFood  // prevent loader showing when there is no result for searched word
            ?
            null
            :
            (
              <ActivityIndicator
                animating
                size="large"
                color='#517fa4'
              />
            )
          }
        </View>
      )
  }

  render() {
    const { personalInfo } = this.props.navigation.state.params;

    let whatFood = this.state.eatenFoodList;
    let {
      foodList, loading, searchFood,
      searchedFoodList, isModalVisible, selectedFood,
      eatenFoodList
    } = this.state;

    return (
      <View style={styles.container}>

        <Modal
          isVisible={isModalVisible}
          onBackdropPress={() => this.setState({isModalVisible: false})}
          style={styles.modalContainer}
        >
          <ScrollView>
            <View style={{flex: 1}}>
              <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
                <View style={{flex: 1}}>
                  <Text style={styles.foodName}>
                    {selectedFood['식품이름']}
                  </Text>
                </View>
                <View style={{flex: 1, flexDirection: 'row', marginTop: 20}}>
                  <View style={{flex: 2, flexDirection: 'row', justifyContent: 'flex-end'}}>
                    <TextInput
                      style={styles.textInput}
                      onChangeText={(grams) => this.setState({selectedFood: {
                                                                  ...this.state.selectedFood,
                                                                  '섭취량': Number(grams)
                                                                }})}
                      value={this.state.grams}
                      maxLength={4}
                      placeholder='섭취량 입력'
                      keyboardType={'numeric'}
                    />
                  </View>
                  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize: 12}}>
                      그램
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{flex: 2, flexDirection: 'column', marginTop: 30, marginBottom: 70}}>
                <Text style={styles.textModal}>
                  1회 제공량 {selectedFood['1회제공량 (g)']} g
                </Text>
                <Text style={styles.textModal}>
                  열량 {selectedFood['열량 (kcal)']} kcal
                </Text>
                <Text style={styles.textModal}>
                  탄수화물 {selectedFood['탄수화물 (g)']} g
                </Text>
                <Text style={styles.textModal}>
                  단백질 {selectedFood['단백질 (g)']} g
                </Text>
                <Text style={styles.textModal}>
                  지방 {selectedFood['지방 (g)']} g
                </Text>
                <Text style={styles.textModal}>
                  나트륨 {selectedFood['나트륨 (mg)']} g
                </Text>
                <Text style={styles.textModal}>
                  콜레스테롤 {selectedFood['콜레스테롤 (mg)']} mg
                </Text>
              </View>
              <Button
                title={'확인'}
                style={{width: 100, height: 40, backgroundColor: '#517fa4'}}
                onPress={() => {
                  if(this.state.selectedFood['섭취량']) {
                    this.pushToEatenFoodList(selectedFood);
                    this.setState({isModalVisible: false});
                    return (
                      Alert.alert(
                        '섭취리스트에 추가 되었습니다.',
                        '',
                        [
                          {text: '확인', onPress: () => console.log('음식 추가')}
                        ]
                      )
                    )
                  } else {
                    this.setState({isModalVisible: false});
                  }
                }}
              />
            </View>
          </ScrollView>
        </Modal>
        <View style={{flex: 1, maxHeight: 30}}>
          <Text style={styles.textTitle}>
            오늘 하루 섭취한 음식을 선택해주세요
          </Text>
        </View>

        <View style={{flex: 1, maxHeight: 40, flexDirection: 'row'}}>
          <SearchBar
            width={width}
            onChangeSearch={(searchFood) => this.handleSearch(searchFood)}
            value={searchFood}
          />
          <Button
            onPress={() => this.props.navigation.navigate('EatenFoodList', {eatenFoodList})}
            title="달력"
          />
        </View>

        <View style={{flex: 9, width: width, flexDirection: 'column', justifyContent: 'space-between'}}>
          <View style={{flex: 1, maxHeight: 20, flexDirection: 'row', borderBottomWidth: 1}}>
            <View style={{flex: 3}}>
              <Text style={styles.text}>
                음식
              </Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.text}>
                1회 제공량(g)
              </Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.text}>
                칼로리
              </Text>
            </View>
          </View>

          { loading
            &&
            (
              <View style={{flex: 8, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator
                  size="large"
                  color='#517fa4'
                />
              </View>
            )
          }

          <FlatList
            refreshing={this.state.refreshing}
            ListFooterComponent={() => this.refreshingLoader()}
            data={searchFood ? searchedFoodList : foodList}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => {
              if(item) {
                return (
                  <TouchableOpacity
                    onPress={() => this.setState({
                      selectedFood: item,
                      isModalVisible: true,
                    })}
                  >
                    <View
                      style={{flex: 1, height: 60, marginLeft: 3, marginRight: 3, flexDirection: 'row', alignItems: 'center', borderBottomWidth: StyleSheet.hairlineWidth}}
                    >
                      <View style={{flex: 3, justifyContent: 'center'}}>
                        <Text>
                          {item['식품이름']}
                        </Text>
                        {
                          item['섭취량']
                          ?
                          (
                            <View style={styles.eatenCheckIcon}>
                              <Icon
                                name='done'
                                color='blue'
                                size={10}
                              />
                            </View>
                          )
                          :
                          null
                        }
                      </View>
                      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={styles.textFood}>
                          {item['1회제공량 (g)']}
                        </Text>
                      </View>
                      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={styles.textFood}>
                          {item['열량 (kcal)']}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                )
              }
            }}
          />

          <View style={{justifyContent: 'center', alignItems: 'center', borderTopWidth: 1}}>
            <ProcessButton
              navigation={this.props.navigation}
              previous='PersonalInfo'
              next='WhatWorkout'
              personalInfo={personalInfo}
              whatFood={whatFood}
            />
          </View>
        </View>

        <NavigationBar
          navigation={this.props.navigation}
          selectedIndex={1}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  searchBar: {
    borderWidth: 2,
    borderColor: 'grey'
  },
  textTitle: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 10,
  },
  text: {
    flex: 1,
    fontSize: 12,
    textAlign: 'center',
  },
  textFood: {
    flex: 1,
    fontSize: 13,
    paddingTop: 20,
    textAlign: 'center',
  },
  textInput: {
    textAlign: 'center',
    width: 80,
  },
  icon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContainer: {
    borderRadius: 5,
    alignSelf: 'center',
    backgroundColor: 'white',
    marginTop: 60,
    marginBottom: 60,
    padding: 20,
  },
  foodName: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#517fa4'
  },
  textModal: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#517fa4'
  },
  eatenCheckIcon: {
    position: 'absolute',
    bottom: 3,
    right: 5
  },
});
