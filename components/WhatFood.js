import React, { Component } from 'react';
import {
  Platform, StyleSheet, Text,
  View, TouchableOpacity, Button,
  FlatList, ActivityIndicator,
  TextInput, Alert, Keyboard, ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import { saveFoodInfo, saveDB, checkFood } from '../actions';
import SearchBar from './SearchBar';
import EatenFoodList from './EatenFoodList';
import NavigationBar from './NavigationBar';
import { width } from '../utils/helpers';
import { fetchDB } from '../database/handle_db';
import cloneDeep from 'lodash/cloneDeep';
import SQLite from 'react-native-sqlite-storage';

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
  }

  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params.category || '음식 입력',
    headerTitleStyle: {flex:1, alignSelf: 'center'},
    headerTintColor: 'white',
    headerStyle: {backgroundColor: 'rgb(240,82,34)'},
    headerRight: <Icon
                    iconStyle={{marginRight: 15}}
                    underlayColor="rgba(255,255,255,0)"
                    name="menu" color="white" size={35} onPress={() => navigation.navigate('DrawerToggle')}
                />
  })

  componentDidMount() {
    const { saveDB } = this.props;
    let { breakfast, lunch, dinner, dessert } = this.props.foodInfo;
    let { category } = this.props.navigation.state.params;

    if(category === '현재 섭취 중인 제품' || category === '향후 섭취 희망 제품') {
        // fetchDB('product').then(productList => saveDB(productList)).then(() => this.setState({loading: false}));
    }
    else {
      if(this.props.foodInfo.foodList.length === 0) {
        // fetchDB('food_new').then(foodList => saveDB(foodList)).then(() => this.setState({loading: false}));
        let foodDB = SQLite.openDatabase({name : "db", createFromLocation : "~food.db", location: 'Library'}, () => console.log('success'), () => console.log('err'));

        foodDB.transaction(txn => {
          txn.executeSql('SELECT * FROM food', [], (tx, res) => {
            let len = res.rows.length;
            let list = [];
            for (let i = 0; i < len; i++) {
              let row = res.rows.item(i);
              list.push(row);
            }
            saveDB(list);
          });
        });
        
        this.setState({loading: false});
      } else {
        let defaultFoodList = cloneDeep(this.props.foodInfo.foodList);

        defaultFoodList = defaultFoodList.map(food => ({
          ...food,
          'check': false
        }));

        saveDB(defaultFoodList);
        this.setState({loading: false});
      }
    }
  }

  checkAndPushToEatenFoodList(selectedFood) {
    let { eatenFoodList } = this.state;
    let copiedEatenFoodList = Array.prototype.slice.call(eatenFoodList);
    const checkAddedFood = copiedEatenFoodList.find(food => {
      food['name'] === selectedFood['name']
    });

    if(checkAddedFood) {
      let index = copiedEatenFoodList.indexOf(checkAddedFood);
      copiedEatenFoodList.splice(index, 1);
    } else {
      copiedEatenFoodList.push(selectedFood);
    }

    this.setState({eatenFoodList: copiedEatenFoodList});
  }

  handleSearch(searchFood) {
    let copiedFoodList = Array.prototype.slice.call(this.props.foodInfo.foodList);

    let searchedFoodList = copiedFoodList.filter(food => food['name'].includes(searchFood));

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
    const {
      loading, searchFood,
      searchedFoodList, isModalVisible, selectedFood,
      eatenFoodList
    } = this.state;
    const { category } = this.props.navigation.state.params;
    const { foodList } = (category === '현재 섭취 중인 제품' || category === '향후 섭취 희망 제품') ? this.props.productList : this.props.foodInfo;
    const { navigate } = this.props.navigation;
    const { checkFood } = this.props;

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
            { category === '현재 섭취 중인 제품' || category === '향후 구매 희망 제품' ? '제품 정보' : '식품 정보' }
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
          {
            foodList
            ?
            (
              <FlatList
                refreshing={this.state.refreshing}
                ListFooterComponent={() => this.refreshingLoader()}
                data={searchFood ? searchedFoodList : foodList}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                removeClippedSubviews
                disableVirtualization
                renderItem={({item, index}) => {
                  return (
                    <View
                      style={{flex: 1, height: 60, marginLeft: 30, marginRight: 30, flexDirection: 'row', alignItems: 'center'}}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          let newItem = cloneDeep(item);
                          newItem.check = (item.check === 'false') ? 'true' : 'false'
                          console.log('newitem.check', newItem.check, 'item.check', item.check)
                          checkFood(newItem, index);
                          this.checkAndPushToEatenFoodList(item);
                        }}
                        style={{flex: 1, height: 60, flexDirection: 'row'}}
                      >
                      {
                        item.check === 'true'
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
                      <View style={{flex: 4, justifyContent: 'center'}}>
                        <Text style={{fontSize: 18}}>
                          {item.name}
                        </Text>
                      </View>
                      <View style={{flex: 2, justifyContent: 'center'}}>
                        <Text style={{fontSize: 18, textAlign: 'right', alignSelf: 'stretch'}}>
                          {item.calorie}
                        </Text>
                      </View>
                      <TouchableOpacity
                        onPress={() => navigate('FoodDetail', {selectedFood: item })}
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
                }}
              />            
            )
            :
            null
          }
          

        </View>

        <NavigationBar 
          navigation={this.props.navigation}
          menu='WhatFood'
          eatenFoodList={this.state.eatenFoodList}
          saveFoodInfo={this.props.saveFoodInfo}
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

export default connect(mapStateToProps, {
  saveFoodInfo, 
  saveDB,
  checkFood,
})(WhatFood);

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
