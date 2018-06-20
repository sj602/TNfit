import React, { Component } from 'react';
import {
  Platform, StyleSheet, Text,
  View, TextInput, TouchableOpacity,
  Button, Alert, Image,
  Picker, Animated
} from 'react-native';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import PieChart from 'react-native-pie-chart';
import { Icon } from 'react-native-elements';
import { 
  calculateResult, saveMetabolism, setDay,
  loadPersonalData, loadHistoryData,
} from '../actions';
import NavigationBar from './NavigationBar';
import { width, emailDB } from '../utils/helpers';

class DiaryDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      translateY: new Animated.Value(0),
      translateYnotice: new Animated.Value(0),
      opacity: new Animated.Value(0),
    }
  }

  static navigationOptions = ({navigation}) => ({
    title: '대시보드',
    headerTintColor: 'white',
    headerStyle: {backgroundColor: 'rgb(240,82,34)'},
    headerRight: <Icon
                    name="menu"
                    iconStyle={{marginRight: 15}}
                    underlayColor="rgba(255,255,255,0)"
                    color="white" size={35} onPress={() => navigation.navigate('DrawerToggle')}
                />,
    drawerIcon: <Icon
                    name="dashboard"
                    color='rgb(240,82,34)' size={25}
                />
  })

  componentDidUpdate() {
    const { day } = this.props;

    if(!this.props.history[day]) {
      this.checkResult();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(
      nextProps.foodInfo === this.props.foodInfo 
      && 
      nextProps.workoutInfo === this.props.workoutInfo 
      && 
      nextProps.history === this.props.history
      &&
      nextProps.day === this.props.day
      ) {
      return false;
    }
    else return true;
  }

  componentDidMount() {
    const { setDay, loadPersonalData } = this.props;

    if(!this.props.day) setDay(new Date().toISOString().substring(0,10));

    let { email } = firebase.auth().currentUser._user;
    loadPersonalData(email);

    // prevent from alerting check personal info after the info is already filled by loadData
    setTimeout(() => {
      const { userInfo, saveMetabolism, loadHistoryData, day } = this.props;

      this.checkPersonalInfo();
      if(!this.props.userInfo.metabolism) saveMetabolism(userInfo);

      loadHistoryData(email, day);
    }, 1500);

    this.fillInfoAnimation();
  }

  saveData(email, day) {
    let database = firebase.database();
    console.log('saveData', email, day)

    database.ref(`/users/${email}/history/${day}`).set(
      {
        foodInfo: {
            breakfast: {
                calories: this.props.foodInfo.breakfast.calories,
                list: this.props.foodInfo.breakfast.list
            },
            lunch: {
                calories: this.props.foodInfo.lunch.calories,
                list: this.props.foodInfo.lunch.list
            },
            dinner: {
                calories: this.props.foodInfo.dinner.calories,
                list: this.props.foodInfo.dinner.list
            },
            dessert: {
                calories: this.props.foodInfo.dessert.calories,
                list: this.props.foodInfo.dessert.list
            }
        },
        workoutInfo: {
            calories: this.props.workoutInfo.calories,
            list: this.props.workoutInfo.list
        },
        result: {
            foodCalories: this.props.userInfo.dayInfo.result.foodCalories,
            workoutCalories: this.props.userInfo.dayInfo.result.workoutCalories,
            extraCalories: this.props.userInfo.dayInfo.result.extraCalories,
            carb: this.props.userInfo.dayInfo.result.carb,
            protein: this.props.userInfo.dayInfo.result.protein,
            fat: this.props.userInfo.dayInfo.result.fat,
            scores: this.props.userInfo.dayInfo.result.scores,
        }
      }
    ).then(() => {
      console.log('INSERTED');
      this.notifySavedAnimation();
    }).catch(err => {
      console.log(err);
    });

  }

  fillInfoAnimation() {
    console.log('animation started')
    Animated.sequence([
      Animated.timing(this.state.translateYnotice, {
        toValue: 50,
        duration: 500,
        useNativeDriver: true
      }),
      Animated.delay(2000),   
      Animated.spring(this.state.translateY, {
          toValue: 10,
          friction: 1
      }),
      Animated.delay(2000),   
      Animated.timing(this.state.translateYnotice, {
        toValue: -50,
        duration: 500,
        useNativeDriver: true
      })
    ]).start();
  }

  notifySavedAnimation() {
    Animated.sequence([
      Animated.timing(this.state.translateYnotice, {
        toValue: -50,
        duration: 500,
        useNativeDriver: true
      }),
      Animated.timing(this.state.opacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true
      }),      
      Animated.delay(2000),      
      Animated.timing(this.state.opacity, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true
      }),      
      Animated.timing(this.state.translateYnotice, {
        toValue: 50,
        duration: 500,
        useNativeDriver: true
      })
    ]).start();
  }

  checkResult() {
    let { weight, targetWeight, metabolism } = this.props.userInfo;
    weight = Number(weight);
    targetWeight = Number(targetWeight);
    let { breakfast, lunch, dinner, dessert } = this.props.foodInfo;
    let foodCalories = breakfast.calories + lunch.calories + dinner.calories + dessert.calories;
    let workoutCalories = this.props.workoutInfo.calories;
    let extraCalories = (foodCalories - metabolism - workoutCalories);
    const { calculateResult } = this.props;

    if(weight > targetWeight) {
      extraCalories < 0
      ?
      calculateResult('GOOD', foodCalories, workoutCalories, extraCalories)
      :
      calculateResult('BAD', foodCalories, workoutCalories, extraCalories)
    } else if(weight < targetWeight) { // for gaining weight
      extraCalories > 0
      ?
      calculateResult('GOOD', foodCalories, workoutCalories, extraCalories)
      :
      calculateResult('BAD', foodCalories, workoutCalories, extraCalories)
    }
  }

  checkPersonalInfo() {
    const { userInfo, navigation } = this.props;

    !userInfo.name || !userInfo.age || !userInfo.gender || !userInfo.weight || !userInfo.height || !userInfo.targetWeight
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

  handleColorByFood(category) {
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

  handleColorByWorkout(category) {
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

  handleColorByResult() {
    let { weight, targetWeight} = this.props.userInfo;
    let { extraCalories } = this.props.userInfo.dayInfo.result;
    weight = Number(weight);
    targetWeight = Number(targetWeight);

    // for diet
    if(weight > targetWeight) {
      (extraCalories < 0)
      ?
      {backgroundColor: '#87b242'}
      :
      {backgroundColor: 'lightgrey'}
    } else if(weight < targetWeight) { // for gaining weight
      (extraCalories > 0)
      ?
      {backgroundColor: '#87b242'}
      :
      {backgroundColor: 'lightgrey'}
    }
  }

  render() {
    const { navigate } = this.props.navigation;

    const { email } = this.props.userInfo;
    const { day } = this.props;

    let breakfast = {}, lunch = {}, dinner = {}, dessert = {};
    let workoutInfo = {}, result = {}, foodInfo = {};
    let foodCalories = 0;

    if(this.props.history[day]) {
      ({ breakfast, lunch, dinner, dessert } = this.props.history[day].foodInfo);
      ({ workoutInfo, result, foodInfo } = this.props.history[day]);
      foodCalories = breakfast.calories + lunch.calories + dinner.calories + dessert.calories;
    }
    else {
      ({ breakfast, lunch, dinner, dessert } = this.props.foodInfo);
      ({ workoutInfo, foodInfo } = this.props);
      ({ result } = this.props.userInfo.dayInfo);
      foodCalories = breakfast.calories + lunch.calories + dinner.calories + dessert.calories;
    }

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

        <View style={{width: 80, height: 30, position: 'absolute', top: 5, right: 10}}>
          <Text>
            {day}
          </Text>
        </View>

        <View style={{flex: 2, marginTop: 10}}>
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
                let { history, foodInfo } = this.props;

                if(history[day]) {
                  navigate('DayDetail', {category: '아침'})
                }
                else {
                  foodInfo.breakfast.calories > 0
                  ?
                  navigate('DayDetail', {category: '아침'})
                  :
                  navigate('WhatFood', {category: '아침'})
                }
              }}
            >
              <View
                style={[{justifyContent: 'center', alignItems: 'center', width: 60, height: 60, borderRadius: 30, margin: 5}, this.handleColorByFood(breakfast)]}>
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
                let { history, foodInfo } = this.props;

                if(history[day]) {
                  navigate('DayDetail', {category: '점심'})
                }
                else {
                  foodInfo.lunch.calories > 0
                  ?
                  navigate('DayDetail', {category: '점심'})
                  :
                  navigate('WhatFood', {category: '점심'})
                }
              }}
            >
              <View style={[{justifyContent: 'center', alignItems: 'center', width: 60, height: 60, borderRadius: 30, margin: 5}, this.handleColorByFood(lunch)]}>
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
                let { history, foodInfo } = this.props;

                if(history[day]) {
                  navigate('DayDetail', {category: '저녁'})
                }
                else {
                  foodInfo.dinner.calories > 0
                  ?
                  navigate('DayDetail', {category: '저녁'})
                  :
                  navigate('WhatFood', {category: '저녁'})
                }
              }}
            >
              <View style={[{justifyContent: 'center', alignItems: 'center', width: 60, height: 60, borderRadius: 30, margin: 5}, this.handleColorByFood(dinner)]}>
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
                let { history, foodInfo } = this.props;

                if(history[day]) {
                  navigate('DayDetail', {category: '간식'})
                }
                else {
                  foodInfo.dessert.calories > 0
                  ?
                  navigate('DayDetail', {category: '간식'})
                  :
                  navigate('WhatFood', {category: '간식'})
                }
              }}
            >
              <View style={[{justifyContent: 'center', alignItems: 'center', width: 60, height: 60, borderRadius: 30, margin: 5}, this.handleColorByFood(dessert)]}>
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
              onPress={() => {
                let { history, workoutInfo } = this.props;

                if(history[day]) {
                  navigate('DayDetail', {category: '운동'})
                }
                else {
                  workoutInfo.calories > 0
                  ?
                  navigate('DayDetail', {category: '운동'})
                  :
                  navigate('WhatWorkout', {category: '운동'})
                }
              }}
            >
              <View style={[{justifyContent: 'center', alignItems: 'center', width: 60, height: 60, borderRadius: 30, margin: 5}, this.handleColorByWorkout(workoutInfo)]}>
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
            <View style={[{justifyContent: 'center', alignItems: 'center', width: 60, height: 60, borderRadius: 30, backgroundColor: 'lightgrey', margin: 5}, this.handleColorByResult()]}>
              <View style={{justifyContent: 'center', alignItems: 'center', width: 50, height: 50, borderRadius: 25, backgroundColor: 'white', margin: 5}}>
                <Text
                  style={{textAlign: 'center', color: 'rgb(240,82,34)', fontSize: 18, fontWeight: 'bold'}}
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

        {
          this.props.history[day]
          ?
          null
          :
          (
            <Animated.View style={[{position: 'absolute', bottom: -20, width: 260, height: 50, justifyContent: 'center', alignItems: 'center'}, {transform: [{translateY: this.state.translateY}]}]}>
              <Text>
                동그란 아이콘을 클릭해 정보를 채워주세요!
              </Text>
            </Animated.View>
          )
        }

        <Animated.View 
          style={[styles.notifySaved, {opacity: this.state.opacity, transform: [{translateY: this.state.translateYnotice}]}]}
        >
          <Text>
            저장되었습니다
          </Text>
        </Animated.View>

        <NavigationBar 
          menu='DiaryDetail' 
          navigation={this.props.navigation} 
          saveData={() => this.saveData(emailDB(email), day)} 
          email={email}
          day={day}
          history={this.props.history}
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
  calculateResult, saveMetabolism, setDay,
  loadPersonalData, loadHistoryData
})(DiaryDetail);

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
  inputBox: {
    flex:1,
    width: 80,
    height: 40,
    alignItems: 'center',
    marginTop: 10,
  },
  notifySaved: {
    position: 'absolute', 
    bottom: 10, 
    right: 10, 
    width: 100, 
    height: 40, 
    borderRadius: 5, 
    justifyContent: 'center', 
    alignItems: 'center',
    elevation: 2,
    backgroundColor: 'white'
  }
});
