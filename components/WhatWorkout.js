import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import NavigationBar from './NavigationBar';

export default class WhatWorkout extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>
          오늘 하루 운동한 정보를 입력해주세요
        </Text>
        <View style={{flex:1, flexDirection: 'row', width: width, height: 100, borderWidth: 1}}>
          <NavigationBar />
        </View>
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
});
