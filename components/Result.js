import React, { Component } from 'react';
import {
  Platform, StyleSheet, Text,
  View
} from 'react-native';
import NavigationBar from './NavigationBar';
import { width } from '../utils/helpers';
import { Slider } from 'react-native-elements';

export default class Result extends Component {
  state = {
    metabolism: 0,
    caloriesByFood: 0,
    caloriesByWorkout: 0,
  }

  componentDidMount() {
    const { personalInfo, whatWorkout, whatFood } = this.props.navigation.state.params;
    const { manChecked, age, weight, height } = personalInfo;

    this.calculateMetabolism(manChecked, age, weight, height);
    this.calculateCaloriesByFood(whatFood);
    this.calculateCaloriesByWorkout(whatWorkout);
  }

  calculateCaloriesByFood(whatFood) {
    let caloriesByFood = 0;
    whatFood.map(food => {
      caloriesByFood += food['섭취량'] / food['1회제공량 (g)'] * food['열량 (kcal)'];
    })

    this.setState({caloriesByFood : Math.floor(caloriesByFood)});
  }

  calculateCaloriesByWorkout(whatWorkout) {
    let caloriesByWorkout = 0;
    whatWorkout.map(workout => {
      if(workout['done']) {
        caloriesByWorkout += (workout['minutes'] / 60 ) * workout['calories_spent_per_hour'];
      }
    })

    this.setState({caloriesByWorkout: Math.floor(caloriesByWorkout)});
  }

  calculateMetabolism(manChecked, age, weight, height) {
    let metabolism = 0;
    if(manChecked) {
      metabolism = 66.47 + (13.75 * weight) + (5 * height) - (6.76 - age);
    } else {
      metabolism = 655.1 + (9.56 * weight) + (1.85 * height) - (4.68 - age);
    }
    this.setState({metabolism: Math.floor(metabolism)});
  }

  render() {
    const { personalInfo, whatFood, whatWorkout } = this.props.navigation.state.params;
    const { metabolism, caloriesByFood, caloriesByWorkout } = this.state;
    const caloriesSpent = (metabolism + caloriesByWorkout);

    return (
      <View style={styles.container}>
        <Text style={styles.textTitle}>
          {personalInfo.name}님의 결과는??
        </Text>

        <View style={{flex: 9, width: width, flexDirection: 'column', justifyContent: 'center'}}>
          <View style={{flex: 7, flexDirection: 'column'}}>
            <View style={{flex: 1, alignItems: 'stretch', justifyContent: 'center'}}>
              <Slider
                value={caloriesSpent}
                disabled={true}
                minimumValue={0}
                maximumValue={4000}
                style={{margin: 10}}
                minimumTrackTintColor='#b3b3b3'
                thumbTintColor='#343434'
              />
              <Slider
                value={caloriesByFood}
                disabled={true}
                minimumValue={0}
                maximumValue={4000}
                style={{position: 'absolute', margin: 10, top:95, left:0, right:0, bottom:0}}
                minimumTrackTintColor='#b3b3b3'
                thumbTintColor='#42f4aa'
              />
            </View>
            <View style={{flex: 1, padding: 10, flexDirection: 'column', backgroundColor: 'lightgrey', margin: 10, padding: 10, borderRadius: 7}}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <Text>
                  오늘의 결과 : GOOD(TN 먹고 칼로리 충족) BAD(TN OR 칼로리 미달) SO-SO(TN안먹었을때)
                </Text>
              </View>
              <View style={{flex: 1, flexDirection: 'row', alignItems: 'stretch'}}>
                <Text style={styles.textResult}>목표</Text>
                <Text style={styles.textMath}>─</Text>
                <Text style={styles.textResult}>{metabolism}</Text>
                <Text style={styles.textMath}>─</Text>
                <Text style={styles.textResult}>{caloriesByWorkout}</Text>
                <Text style={styles.textMath}>＋</Text>
                <Text style={styles.textResult}>{caloriesByFood}</Text>
                <Text style={styles.textMath}>＝</Text>
                <Text style={styles.textResult}>{caloriesSpent + caloriesByFood}</Text>
              </View>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <Text style={{fontSize: 14, textAlign: 'center', marginLeft: 5, marginRight: 23}}>목표</Text>
                <Text style={{fontSize: 14, textAlign: 'center', marginRight: 29}}>기초대사량</Text>
                <Text style={{fontSize: 14, textAlign: 'center', marginRight: 44}}>운동</Text>
                <Text style={{fontSize: 14, textAlign: 'center'}}>음식</Text>
              </View>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{width: 15, height: 15, borderRadius: 7.5, backgroundColor: '#343434', marginLeft: 8}}>
                </View>
                <View style={{width: 15, height: 15, borderRadius: 7.5, backgroundColor: '#42f4aa',marginLeft: 5}}>
                </View>
              </View>
            </View>
          </View>
          <ProcessButton
            navigation={this.props.navigation}
            previous='WhatWorkout'
            personalInfo={personalInfo}
            whatFood={whatFood}
            whatWorkout={whatWorkout}
          />
        </View>

        <NavigationBar
          navigation={this.props.navigation}
          selectedIndex={3}
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
  textTitle: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 10,
  },
  textResult: {
    flex: 1,
    fontSize: 18,
    textAlign: 'center'
  },
  textMath: {
    flex: 1,
    fontSize: 14,
    marginTop: 3,
    textAlign: 'center'
  },
});
