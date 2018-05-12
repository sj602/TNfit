import React, { Component } from 'react';
import {
  Platform, StyleSheet, Text,
  View, ScrollView, TouchableOpacity,
  TextInput,
} from 'react-native';
import SearchBar from './SearchBar';
import ProcessButton from './ProcessButton';
import NavigationBar from './NavigationBar';
import { width } from '../utils/helpers';
import { workoutList } from '../database/db_workout';
import { Icon } from 'react-native-elements';

export default class WhatWorkout extends Component {
  constructor() {
    super();
    this.state = {
      workoutList,
      searchWorkout: '',
      searchedWorkoutList: [],
    }
  }

  handleSearch(searchWorkout) {
    let copiedWorkoutList = this.state.workoutList;

    let searchedWorkoutList = copiedWorkoutList.filter(workout => {
      return workout['name'].includes(searchWorkout);
    });

    this.setState({ searchWorkout, searchedWorkoutList });
  }

  setMinutesAndDone(index, minutes) {
    minutes = Number(minutes);
    let copiedWorkoutList = this.state.workoutList;
    let tempWorkoutObj = {
      ...copiedWorkoutList[index],
      minutes,
      done: !this.state.workoutList[index].done,
    };
    copiedWorkoutList[index] = tempWorkoutObj;

    if(this.state.searchWorkout) {
      let copiedSearchedWorkoutList = this.state.searchedWorkoutList;
      copiedSearchedWorkoutList[index]['done'] = !copiedSearchedWorkoutList[index]['done'];

      this.setState({
        ...(this.state),
        workoutList: copiedWorkoutList,
        searchedWorkoutList: copiedSearchedWorkoutList
      })
    }

    this.setState({
      ...(this.state),
      workoutList: copiedWorkoutList,
    })
  }

  render() {
    let { personalInfo, whatFood } = this.props.navigation.state.params;
    let { workoutList, searchWorkout, searchedWorkoutList } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.textTitle}>
          오늘 하루 운동한 정보를 입력해주세요!
        </Text>
        <View style={{flex: 1, maxHeight: 40, flexDirection: 'row'}}>
          <SearchBar
            width={width}
            onChangeSearch={(searchWorkout) => this.handleSearch(searchWorkout)}
            value={searchWorkout}
          />
        </View>

        <View style={{flex: 9, width: width, flexDirection: 'column', justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1}}>
            <Text style={styles.text}>
              운동
            </Text>
            <Text style={styles.text}>
              칼로리(시간)
            </Text>
            <Text style={styles.text}>
              운동시간(분)
            </Text>
            <Text style={styles.text}>
              Done
            </Text>
          </View>

          <ScrollView style={{flex: 7, flexDirection: 'column', borderBottomWidth: 1}}>
            { workoutList &&
              searchWorkout
              ?
              (
                searchedWorkoutList.map((workout, index) => {
                  return (
                    <View
                      style={{flex: 1, height: 60, marginLeft: 3, marginRight: 3, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: StyleSheet.hairlineWidth}}
                      key={workout['name']}
                    >
                      <Text style={styles.text}>
                        {workout['name']}
                      </Text>
                      <Text style={styles.text}>
                        {workout['calories_spent_per_hour']}
                      </Text>
                      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <TextInput
                          onChangeText={(minutes) => this.setMinutesAndDone(index, minutes)}
                          value={this.state.workoutList[index].minutes}
                          maxLength={3}
                          keyboardType={'numeric'}
                          style={styles.textInput}
                        />
                      </View>
                      { workout['minutes'] ?
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
                })
              )
              :
              (
                workoutList.map((workout, index) => {
                  return (
                    <View
                      style={{flex: 1, height: 60, marginLeft: 3, marginRight: 3, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: StyleSheet.hairlineWidth}}
                      key={workout['name']}
                    >
                      <Text style={styles.textWorkout}>
                        {workout['name']}
                      </Text>
                      <Text style={styles.textWorkout}>
                        {workout['calories_spent_per_hour']}
                      </Text>
                      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <TextInput
                          onChangeText={(minutes) => this.setMinutesAndDone(index, minutes)}
                          value={this.state.workoutList[index].minutes}
                          maxLength={2}
                          placeholder='0'
                          keyboardType={'numeric'}
                          style={styles.textInput}
                        />
                      </View>
                      { workout['minutes'] ?
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
                })
              )
            }
          </ScrollView>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <ProcessButton
              navigation={this.props.navigation}
              previous='WhatFood'
              next='Result'
              personalInfo={personalInfo}
              whatWorkout={workoutList}
              whatFood={whatFood}
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
  textWorkout: {
    flex: 1,
    fontSize: 14,
    textAlign: 'center',
  },
  textInput: {
    textAlign: 'center',
    width: 60,
    height: 37,
  },
  icon: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'}
});
