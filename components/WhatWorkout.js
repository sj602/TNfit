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
  constructor() {
    super();
    this.state = workoutList;
  }

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
    const workoutList = this.state;

    return (
      <View style={styles.container}>
        <Text>
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
            { workoutList && Object.keys(workoutList).map(workout => {
              return (
                <View
                  style={{flex:1, flexDirection: 'row', justifyContent: 'space-between'}}
                  key={workoutList[workout]['name']}
                >
                  <Text style={styles.text}>
                    {workoutList[workout]['name']}
                  </Text>
                  <Text style={styles.text}>
                    {workoutList[workout]['calories']}
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
                  { workoutList[workout]['minutes'] ?
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
    backgroundColor: '#F5FCFF',
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
