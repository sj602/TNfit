import React, { Component } from 'react';
import {
  Platform, StyleSheet, Text,
  View, TouchableOpacity, Button,
  FlatList, ActivityIndicator,
  TextInput, Alert, Keyboard, ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import { width } from '../utils/helpers';
import NavigationBar from './NavigationBar';

class DayDetail extends Component {
  constructor() {
    super(); 

    this.state = {
      eatenFoodList: {},
    };
  }

  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params.category,
    headerTitleStyle: {flex:1, alignSelf: 'center'},
    headerTintColor: 'white',
    headerStyle: {backgroundColor: 'rgb(240,82,34)'},
    headerRight: <Icon
                    iconStyle={{marginRight: 15}}
                    underlayColor="rgba(255,255,255,0)"
                    name="menu" color="white" size={35} onPress={() => navigation.navigate('DrawerToggle')}
                  />
  })

  render() {
    let { category } = this.props.navigation.state.params;
    switch(category) {
      case '아침':
        category = 'breakfast';
        break;
      case '점심':
        category = 'lunch';
        break;
      case '저녁':
        category = 'dinner';
        break;
      case '간식':
        category = 'dessert';
        break;
      default:
        category = 'workout';
        break;
    }

    return (
      <View style={styles.container}>
        <View style={{marginBottom: 20}}>
          <Text style={{color:'rgb(240,82,34)'}}>
            {category === 'workout' ? '운동 실천' : '음식 섭취'} 리스트
          </Text>
        </View>

        <View
          style={{flex: 1, height: 60, marginLeft: 30, marginRight: 30, flexDirection: 'column', alignItems: 'center'}}
        >
          { 
            category === 'workout'
            ?
            this.props.workoutInfo.list.map((item, index) => {
              console.log(item)
              return (
                <View style={styles.item} key={index}>
                  <View style={{flex: 1, justifyContent: 'center'}}>
                    <Text style={{fontSize: 18}}>
                      {item['name']}
                    </Text>
                  </View>
                  <View style={{flex: 1, justifyContent: 'center'}}>
                    <Text style={{fontSize: 18, textAlign: 'right', alignSelf: 'stretch'}}>
                      {item['calories_spent_per_hour'] * item['minutes'] / 60}kcal
                    </Text>
                  </View>
                  <View style={{flex: 1, justifyContent: 'center'}}>
                    <Text style={{fontSize: 18, textAlign: 'right', alignSelf: 'stretch'}}>
                      {item['minutes']}분
                    </Text>
                  </View>
                </View>
              )
            })
            :
            this.props.foodInfo[category].list.map((item, index) => {
              return (
                <View style={styles.item} key={index}>
                  <View style={{flex: 1, justifyContent: 'center'}}>
                    <Text style={{fontSize: 18}}>
                      {item['name']}
                    </Text>
                  </View>
                  <View style={{flex: 1, justifyContent: 'center'}}>
                    <Text style={{fontSize: 18, textAlign: 'right', alignSelf: 'stretch'}}>
                      {item['calorie']}kcal
                    </Text>
                  </View>
                </View>
              )
            })
          }
        </View>

        <NavigationBar 
          menu='DayDetail' 
          navigation={this.props.navigation} 
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

export default connect(mapStateToProps, null)(DayDetail);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  item: {
    maxHeight: 30,
    flexDirection: 'row',
  },
});
