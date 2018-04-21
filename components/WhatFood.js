import React, { Component } from 'react';
import {
  Platform, StyleSheet, Text,
  View, TouchableOpacity, Button
} from 'react-native';
import SearchBar from './SearchBar';
import ProcessButton from './ProcessButton';
import NavigationBar from './NavigationBar';
import { width } from '../utils/helpers';

export default class WhatFood extends Component {
  state = {
    kimchi: 1,
    searchFood: '',
  }

  updateSearch(searchFood) {

  }

  render() {
    const { personalInfo } = this.props.navigation.state.params;

    const whatFood = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.textTitle}>
          오늘 하루 섭취한 음식을 입력해주세요
        </Text>

        <SearchBar
          width={width}
          onChangeSearch={(searchFood) => this.updateSearch(searchFood)}
        />

        <View style={{flex:9, width: width, flexDirection: 'column', justifyContent: 'space-between', borderWidth: 1, borderColor: 'red'}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1}}>
            <Text style={styles.text}>
              음식명
            </Text>
            <Text style={styles.text}>
              얼마나?
            </Text>
            <Text style={styles.text}>
              총 칼로리
            </Text>
            <Text style={styles.text}>
              탄수화물
            </Text>
            <Text style={styles.text}>
              단백질
            </Text>
            <Text style={styles.text}>
              지방
            </Text>
          </View>

          <View style={{justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'blue'}}>
            <ProcessButton
              navigation={this.props.navigation}
              previous='PersonalInfo'
              next='WhatWorkout'
              personalInfo={personalInfo}
              whatFood={whatFood}
            />
          </View>
        </View>

        <NavigationBar
          navigation={this.props.navigation}
          selectedIndex={1}
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
