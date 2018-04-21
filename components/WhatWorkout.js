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
  state = {
    workoutList,
    currentlyDisplayed: workoutList,
    searchWorkout: '',
    searchedWorkoutList: {},
  }

  handleSearch(searchWorkout) {
    // let { coins } = this.state;
    // let copiedCoins = Object.keys(coins).map(key => coins[key]); // deepcopy coins to change format from object to array for mapping.
    // let newlyDisplayed = copiedCoins.filter((coin) => {
    //   return .includes(searchWorkout)
    // });
    // this.setState({ currentlyDisplayed: newlyDisplayed });

    // let { workoutList } = this.state;
    // let searchedWorkoutList = {};
    // for(let workout in workoutList) {
    //   if(workoutList[workout].name.includes(searchWorkout)) {
    //     searchedWorkoutList[workout] = workoutList[workout];
    //   }
    // }
    //
    // this.setState({ searchedWorkoutList });
  }

  setMinutesAndDone(index, minutes) {
    let copiedWorkoutList = this.state.workoutList;
    let tempWorkoutObj = {
      ...copiedWorkoutList[index],
      minutes: minutes.replace(/[^0-9]/g, ''), // prevent from string input, not numeric input
      done: !this.state.workoutList[index].done,
    };
    copiedWorkoutList[index] = tempWorkoutObj;

    this.setState({
      ...(this.state),
      workoutList: copiedWorkoutList,
    })
  }

  render() {
    let { personalInfo, whatFood } = this.props.navigation.state.params;
    let { workoutList, searchWorkout } = this.state;


    return (
      <View style={styles.container}>
        <Text style={styles.textTitle}>
          오늘 하루 운동한 정보를 입력해주세요!
        </Text>

        <View style={styles.searchBar}>
          <SearchBar
            width={width}
            onChangeSearch={(searchWorkout) => this.handleSearch(searchWorkout)}
          />
        </View>

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
            { workoutList && workoutList.map((workout, index) => {
              if(searchWorkout) {
                return (
                  <View
                    style={{flex:1, flexDirection: 'row', justifyContent: 'space-between'}}
                    key={workout['name']}
                  >
                    <Text style={styles.text}>
                      {workout['name']}
                    </Text>
                    <Text style={styles.text}>
                      {workout['calories_spent_per_hour']}
                    </Text>
                    <View style={{flex:1,justifyContent: 'center', alignItems: 'center'}}>
                      <TextInput
                        onChangeText={(minutes) => this.setMinutesAndDone(index, minutes)}
                        value={1}
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
              }
              else {
                return (
                  <View
                    style={{flex:1, flexDirection: 'row', justifyContent: 'space-between'}}
                    key={workout['name']}
                  >
                    <Text style={styles.text}>
                      {workout['name']}
                    </Text>
                    <Text style={styles.text}>
                      {workout['calories_spent_per_hour']}
                    </Text>
                    <View style={{flex:1,justifyContent: 'center', alignItems: 'center'}}>
                      <TextInput
                        onChangeText={(minutes) => this.setMinutesAndDone(index, minutes)}
                        value={1}
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
              }
            })}
          </ScrollView>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <ProcessButton
              navigation={this.props.navigation}
              previous='WhatFood'
              next='Result'
              personalInfo={personalInfo}
              whatFood={whatFood}
              whatWorkout={workoutList}
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
