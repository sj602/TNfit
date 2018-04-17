import React, { Component } from 'react';
import {
  Platform, StyleSheet, Text,
  View, ScrollView, TouchableOpacity,
  TextInput,
} from 'react-native';
import NavigationBar from './NavigationBar';
import { width } from '../utils/helpers';
import ProcessButton from './ProcessButton';
import { workoutList } from '../database/db_workout';
import { Icon } from 'react-native-elements';

export default class WhatWorkout extends Component {
  state = workoutList

  setMinutesAndDone(workout, minutes) {
    this.setState({
      ...(this.state),
      [workout]: {
        ...(this.state[workout]),
        minutes: minutes.replace(/[^0-9]/g, ''), // prevent from string input, not numeric input
        done: !this.state[workout].done,
      }
    })
  }

  render() {
    const { personalInfo, whatFood } = this.props.navigation.state.params;

    const whatWorkout = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.textTitle}>
          오늘 하루 운동한 정보를 입력해주세요!
        </Text>

        <View style={{flex:1, width: width, flexDirection: 'column', justifyContent: 'center'}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1}}>
            <Text style={styles.text}>
              운동
            </Text>
            <Text style={styles.text}>
              소모 칼로리
            </Text>
            <Text style={styles.text}>
              운동시간(분)
            </Text>
            <Text style={styles.text}>
              Done
            </Text>
          </View>

          <ScrollView style={{flex:7, flexDirection: 'column', borderWidth: 1 }}>
            { whatWorkout && Object.keys(whatWorkout).map(workout => {
              return (
                <View
                  style={{flex:1, flexDirection: 'row', justifyContent: 'space-between'}}
                  key={whatWorkout[workout]['name']}
                >
                  <Text style={styles.text}>
                    {whatWorkout[workout]['name']}
                  </Text>
                  <Text style={styles.text}>
                    {whatWorkout[workout]['calories']}
                  </Text>
                  <View style={{flex:1,justifyContent: 'center', alignItems: 'center'}}>
                    <TextInput
                      onChangeText={(minutes) => this.setMinutesAndDone(workout, minutes)}
                      value={this.state[workout].minutes}
                      maxLength={2}
                      placeholder='0'
                      keyboardType={'numeric'}
                      style={styles.textInput}
                    />
                  </View>
                  { whatWorkout[workout]['minutes'] ?
                    (
                      <View style={styles.icon}>
                        <Icon
                          name='done'
                          color='blue'
                          size={18}
                        />
                      </View>
                    )
                    :
                    (
                      <Text style={styles.text}>
                      { }
                      </Text>
                    ) // fake text to fill 4 flexes
                  }
                </View>
              )
            })}
          </ScrollView>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <ProcessButton
              navigation={this.props.navigation}
              previous='WhatFood'
              next='Result'
              personalInfo={personalInfo}
              whatFood={whatFood}
              whatWorkout={whatWorkout}
            />
          </View>
        </View>

        <NavigationBar
          navigation={this.props.navigation}
          selectedIndex={2}
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
  text: {
    flex: 1,
    textAlign: 'center',
  },
  textInput: {
    textAlign: 'center',
    width: 30,
    height: 37,
  },
  icon: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'}
});
