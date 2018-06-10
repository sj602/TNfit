import React, { Component } from 'react';
import {
  Platform, StyleSheet, Text,
  View, TextInput, TouchableOpacity,
  Button, Alert, Image,
  Picker
} from 'react-native';
import { connect } from 'react-redux';
import { width } from '../utils/helpers';
import PieChart from 'react-native-pie-chart';
import { Icon } from 'react-native-elements';
import NavigationBar from './NavigationBar';

class DiaryDetail extends Component {
  static navigationOptions = ({navigation}) => ({
    title: '오늘의 FITNESS',
    headerTintColor: 'white',
    headerStyle: {backgroundColor: 'rgb(240,82,34)'},
    headerRight: <Icon
                  name="menu"
                  iconStyle={{marginRight: 15}}
                  underlayColor="rgba(255,255,255,0)"
                  color="white" size={35} onPress={() => {
                                                    navigation.navigate('DrawerToggle')
                                                  }}
                />
  })

  componentDidMount() {
    const { userInfo, navigation } = this.props;

    userInfo.name.length === 0
    ?
    Alert.alert(
      '칼로리 계산을 위한 기본 정보를 입력해주세요.',
      '',
      [
        {text: '입력', onPress: () => navigation.navigate('PersonalInfo')}
      ]
    )
    :
    null
  }

  isAdded(category) {
    if(category['calories'] > 0) {
      return {
        backgroundColor: 'rgb(240,82,34)'
      }
    } else {
      return {
        backgroundColor: 'lightgrey'
      }
    }
  }

  isAddedWorkout(category) {
    if(category['calories'] > 0) {
      return {
        backgroundColor: '#87b242'
      }
    } else {
      return {
        backgroundColor: 'lightgrey'
      }
    }
  }

  render() {
    console.log(this.props.navigation.state.params)
    const { navigate } = this.props.navigation;
    let { breakfast, lunch, dinner, dessert } = this.props.foodInfo;
    let { workoutInfo, result, foodInfo } = this.props;
    let foodCalories = breakfast.calories + lunch.calories + dinner.calories + dessert.calories;

    if(foodCalories === 0 || workoutInfo.calories === 0) {
      var series = [1];
      var sliceColor = ['#d3d3d3'];
    }
    else {
      var series = [foodCalories, workoutInfo.calories];
      var sliceColor = ['#f05222','#87b242'];
    }

    return (
      <View style={styles.container}>
        <View style={{flex:2, marginTop: 10}}>
          <PieChart
            chart_wh={190}
            series={series}
            sliceColor={sliceColor}
            doughnut={true}
            coverRadius={0.8}
          />
          <View style={{width: 100, height: 100, position: 'absolute', top: 50, left: 45}}>
            <View>
              <Text style={{color: '#87b242', fontSize: 16, textAlign: 'center'}}>
                운동
              </Text>
              <Text style={{color: '#87b242', fontSize: 16, textAlign: 'center'}}>
                {workoutInfo.calories ? workoutInfo.calories : null} kcal
              </Text>
            </View>
            <View>
              <Text style={{color: '#f05222', fontSize: 16, textAlign: 'center'}}>
                음식
              </Text>
              <Text style={{color: '#f05222', fontSize: 16, textAlign: 'center'}}>
                {foodCalories !== 0 ? foodCalories : null} kcal
              </Text>
            </View>
          </View>
        </View>
        <View style={{flex: 3}}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => {
                if(this.props.foodInfo.breakfast.calories > 0) {
                    navigate('DayDetail', {category: '아침'});
                } else {
                    navigate('WhatFood', {category: '아침'});
                }}}
            >
              <View
                style={[{justifyContent: 'center', alignItems: 'center', width: 60, height: 60, borderRadius: 30, margin: 5}, this.isAdded(breakfast)]}>
                <Text
                  style={{textAlign: 'center', color: 'white'}}
                >
                  {breakfast.calories ? breakfast.calories : null}
                </Text>
                <Text
                  style={{textAlign: 'center', color: 'white'}}
                >
                  kcal
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if(this.props.foodInfo.lunch.calories > 0) {
                    navigate('MealDetail', {category: '점심'});
                } else {
                    navigate('WhatFood', {category: '점심'});
                }}}
            >
              <View style={[{justifyContent: 'center', alignItems: 'center', width: 60, height: 60, borderRadius: 30, margin: 5}, this.isAdded(lunch)]}>
                <Text
                  style={{textAlign: 'center', color: 'white'}}
                >
                  {lunch.calories ? lunch.calories : null}
                </Text>
                <Text
                  style={{textAlign: 'center', color: 'white'}}
                >
                  kcal
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if(this.props.foodInfo.dinner.calories > 0) {
                    navigate('MealDetail', {category: '저녁'});
                } else {
                    navigate('WhatFood', {category: '저녁'});
                }}}
            >
              <View style={[{justifyContent: 'center', alignItems: 'center', width: 60, height: 60, borderRadius: 30, margin: 5}, this.isAdded(dinner)]}>
                <Text
                  style={{textAlign: 'center', color: 'white'}}
                >
                  {dinner.calories ? dinner.calories : null}
                </Text>
                <Text
                  style={{textAlign: 'center', color: 'white'}}
                >
                  kcal
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={{width: 60, margin: 5}}>
              <Text style={{textAlign: 'center'}}>
                아침
              </Text>
            </View>
            <View style={{width: 60, margin: 5}}>
              <Text style={{textAlign: 'center'}}>
                점심
              </Text>
            </View>
            <View style={{width: 60, margin: 5}}>
              <Text style={{textAlign: 'center'}}>
                저녁
              </Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <TouchableOpacity
              onPress={() => {
                if(this.props.foodInfo.dessert.calories > 0) {
                    navigate('MealDetail', {category: '간식'});
                } else {
                    navigate('WhatFood', {category: '간식'});
                }}}
            >
              <View style={[{justifyContent: 'center', alignItems: 'center', width: 60, height: 60, borderRadius: 30, margin: 5}, this.isAdded(dessert)]}>
                <Text
                  style={{textAlign: 'center', color: 'white'}}
                >
                  {dessert.calories ? dessert.calories : null}
                </Text>
                <Text
                  style={{textAlign: 'center', color: 'white'}}
                >
                  kcal
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigate('WhatWorkout')}
            >
              <View style={[{justifyContent: 'center', alignItems: 'center', width: 60, height: 60, borderRadius: 30, margin: 5}, this.isAddedWorkout(workoutInfo)]}>
                <Text
                  style={{textAlign: 'center', color: 'white'}}
                >
                  {workoutInfo.calories ? workoutInfo.calories : null}
                </Text>
                <Text
                  style={{textAlign: 'center', color: 'white'}}
                >
                  kcal
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <View style={{width: 60, margin: 5}}>
              <Text style={{textAlign: 'center'}}>
                간식
              </Text>
            </View>
            <View style={{width: 60, margin: 5}}>
              <Text style={{textAlign: 'center'}}>
                운동
              </Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <View style={{justifyContent: 'center', alignItems: 'center', width: 60, height: 60, borderRadius: 30, backgroundColor: 'lightgrey', margin: 5}}>
              <View style={{justifyContent: 'center', alignItems: 'center', width: 50, height: 50, borderRadius: 25, backgroundColor: 'white', margin: 5}}>
                <Text
                  style={{textAlign: 'center', color: 'rgb(240,82,34)', fontSize: 24}}
                >
                  {result.scores ? result.scores : null}
                </Text>
              </View>
            </View>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <View style={{width: 60, margin: 5}}>
              <Text style={{textAlign: 'center'}}>
                결과
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => navigate('Recommendation')}
        >
        </TouchableOpacity>

        <NavigationBar 
          menu='DiaryDetail' 
          navigation={this.props.navigation} 
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

export default connect(mapStateToProps, null)(DiaryDetail);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  containerSub: {
    flex: 1,
    width: width,
  },
  image: {
    width: width * 0.3,
    height: width * 0.3,
    marginBottom: 30,
  },
  button: {
    padding: 10,
    backgroundColor: "#841584",
    borderRadius: 5
  },
  textTitle: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 10,
  },
  textInput: {
    textAlign: 'center',
    width: width * 0.4
  },
  inputBox: {
    flex:1,
    width: 80,
    height: 40,
    alignItems: 'center',
    marginTop: 10,
  }
});
