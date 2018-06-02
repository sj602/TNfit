import React, { Component } from 'react';
import {
  Platform, StyleSheet, Text,
  View, TouchableOpacity, Button,
  FlatList, ActivityIndicator,
  TextInput, Alert, Keyboard, ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import { saveDB } from '../actions';
import SearchBar from './SearchBar';
import EatenFoodList from './EatenFoodList';
import NavigationBar from './NavigationBar';
import { width, deepCopy } from '../utils/helpers';
import { fetchDB } from '../database/handle_db';

class WhatFood extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFood: {},
      eatenFoodList: [],
      searchFood: this.props.navigation.state.params.product || '',
      foodList: [],
      productList: [],
      loading: true,
      refreshing: false,
    };

    console.ignoreYellowBox = [
      'Setting a timer'
    ];
  }

  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params.category || '음식 입력',
    headerTitleStyle: {flex:1, alignSelf: 'center'},
    headerTintColor: 'white',
    headerStyle: {backgroundColor: 'rgb(240,82,34)'},
    headerRight: <Icon
                  iconStyle={{marginRight: 10}}
                  name="menu" color="white" size={35} onPress={() => {
                                                        navigation.navigate('DrawerToggle')
                                                      }}
                />
  })

  componentDidMount() {
    const { category } = this.props.navigation.state.params;
    if(category === '현재 섭취 중인 제품' || category === '향후 섭취 희망 제품') {
      console.log(1)
      fetchDB('food')
        .then(foodList => this.setState({
          foodList,
          loading: false,
        }))
    }
    else {
      if(this.props.foodInfo.foodList !== []) {
        console.log(1)
        console.log(this.props)
        // fetchDB('food_check')
        //   .then(foodList => { 
        //     this.props.saveDB(foodList)})
        //   .then(() => this.setState({loading: false}));
        fetchDB('food_check')
          .then(foodList => this.setState({foodList, loading: false}));
      }
    }
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
          style={{ paddingVertical: 60 }}
        >
          { this.state.searchFood  // prevent loader showing category there is no result for searched word
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
    console.log(this.props)
    let {
      loading, searchFood, foodList,
      searchedFoodList, isModalVisible, selectedFood,
      eatenFoodList
    } = this.state;
    // const { foodList } = this.props.foodInfo;
    const { navigate } = this.props.navigation;
    const { category } = this.props.navigation.state.params;

    const _ = require('lodash');

    return (
      <View style={styles.container}>

        <View style={{flex: 1, maxHeight: 40, flexDirection: 'row'}}>
          <TextInput
            style={{flex:9}}
            onChangeText={(searchFood) => this.setState({searchFood})}
            value={this.state.searchFood}
            placeholder='검색어를 입력하세요'
          />
          <TouchableOpacity
            style={{flex:1, paddingTop: 10}}
            onPress={() => console.log('')}
          >
            <Icon
              name='search'
              type='font-awesome'
              color='rgb(240,82,34)'
              size={18}
            />
          </TouchableOpacity>
        </View>
        <View style={{marginBottom: 20}}>
          <Text style={{color:'rgb(240,82,34)'}}>
            { category === '현재 섭취 중인 제품' || category === '향후 구매 희망 제품' ? '제품 정보' : '칼로리 정보(kcal)' }
          </Text>
        </View>

        <View style={{flex: 9, width: width, flexDirection: 'column', justifyContent: 'space-between'}}>

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
            renderItem={({item, index}) => {
              if(item) {
                return (
                  <View
                    style={{flex: 1, height: 60, marginLeft: 30, marginRight: 30, flexDirection: 'row', alignItems: 'center'}}
                  >
                    <TouchableOpacity
                      onPress={(item) => {
                        this.pushToEatenFoodList(item);
                        let newItem = _.cloneDeep(item);
                        newItem.check = true;
                        
                        let copiedFoodList = _.cloneDeep(foodList);
                        copiedFoodList[index] = newItem;

                        this.setState({foodList: copiedFoodList})
                      }}
                      style={{flex:3, height: 60, flexDirection: 'row'}}
                    >
                    {
                      item.check === true
                      ?
                      (
                        <Icon
                          name='check-square'
                          type='font-awesome'
                          color='rgb(240,82,34)'
                          size={20}
                        />
                      )
                      :
                      (
                        <Icon
                          name='check-square'
                          type='font-awesome'
                          color='grey'
                          size={20}
                        />
                      )
                    }
                    </TouchableOpacity>
                      <View style={{justifyContent: 'center'}}>
                        <Text style={{fontSize: 18}}>
                          {item['식품이름']}
                        </Text>
                      </View>
                      <View style={{flex: 1, justifyContent: 'center'}}>
                        <Text style={{fontSize: 18, textAlign: 'right', alignSelf: 'stretch'}}>
                          {item['열량 (kcal)']}
                        </Text>
                      </View>
                    <TouchableOpacity
                      onPress={() => navigate('FoodDetail', {selectedFood: item})}
                      style={{marginLeft: 8}}
                    >
                      <Icon
                        name='angle-double-right'
                        type='font-awesome'
                        color='rgb(240,82,34)'
                        size={20}
                      />
                    </TouchableOpacity>
                  </View>
                )
              }
            }}
          />

        </View>

        <NavigationBar 
          navigation={this.props.navigation}
          menu='WhatFood'
          eatenFoodList={this.state.eatenFoodList}
          category={category}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveDB: (data) => dispatch(saveDB(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WhatFood);

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
});
