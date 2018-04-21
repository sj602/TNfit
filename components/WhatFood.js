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
        <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={styles.textTitle}>
            오늘 하루 섭취한 음식을 입력해주세요
          </Text>
        </View>

        <View style={styles.searchBar}>
          <SearchBar
            width={width}
            onChangeSearch={(searchFood) => this.updateSearch(searchFood)}
          />
        </View>

        <View style={{flex:1, width: width, flexDirection: 'column', justifyContent: 'center'}}>
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

          <View style={{justifyContent: 'center', alignItems: 'center'}}>
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
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  textTitle: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 10,
  },
  button: {
    marginLeft: 30,
    marginRight: 30,
    padding: 10,
    backgroundColor: "#841584",
    borderRadius: 5
  },
});
