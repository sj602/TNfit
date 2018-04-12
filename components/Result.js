import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import NavigationBar from './NavigationBar';
import { width } from '../utils/helpers';
import ProcessButton from './ProcessButton';

export default class Result extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>
          당신의 결과는??
        </Text>

        <View style={{flex:8, width: width, flexDirection: 'column', justifyContent: 'center'}}>
          <View style={{flex:7, flexDirection: 'column', borderWidth: 1 }}>
          </View>
          <ProcessButton
            navigation={this.props.navigation}
            previous='WhatWorkout'
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
    backgroundColor: '#F5FCFF',
  },
});
