import React, { Component } from 'react';
import {
  Platform, StyleSheet, Text,
  View, ScrollView, TouchableOpacity,
  TextInput,
} from 'react-native';
import { connect } from 'react-redux';
import { saveWorkoutInfo } from '../actions';
import SearchBar from './SearchBar';
import NavigationBar from './NavigationBar';
import { width } from '../utils/helpers';
import { workoutList } from '../database/db_workout';
import { Icon } from 'react-native-elements';

class WhatWorkout extends Component {
  constructor() {
    super();
    this.state = {
      workoutList,
      searchWorkout: '',
      searchedWorkoutList: [],
    }
  }

  static navigationOptions = ({navigation}) => ({
    title: '운동',
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

  setMinutesAndDone(index, minutes) {
    minutes = Number(minutes);
    if(minutes > 0) {
      let copiedWorkoutList = this.state.workoutList;
      let tempWorkoutObj = {
        ...copiedWorkoutList[index],
        minutes,
        done: true,
      };
      copiedWorkoutList[index] = tempWorkoutObj;

      if(this.state.searchWorkout) {
        let copiedSearchedWorkoutList = this.state.searchedWorkoutList;
        copiedSearchedWorkoutList[index]['done'] = true;

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
    } else {
        let copiedWorkoutList = this.state.workoutList;
        let tempWorkoutObj = {
          ...copiedWorkoutList[index],
          minutes,
          done: false,
        };
        copiedWorkoutList[index] = tempWorkoutObj;

        if(this.state.searchWorkout) {
          let copiedSearchedWorkoutList = this.state.searchedWorkoutList;
          copiedSearchedWorkoutList[index]['done'] = false;

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
  }

  render() {
    let { workoutList } = this.state;

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
            {
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
                          value={(this.state.workoutList[index].minutes).toString()}
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
                              name='check-square'
                              type='font-awesome'
                              color='rgb(240,82,34)'
                              size={20}
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
        </View>

        <NavigationBar 
          navigation={this.props.navigation}
          menu='WhatWorkout'
          workout={this.state.workoutList}
          saveWorkoutInfo={this.props.saveWorkoutInfo}
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

export default connect(mapStateToProps, {saveWorkoutInfo})(WhatWorkout);

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
    fontSize: 18,
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
