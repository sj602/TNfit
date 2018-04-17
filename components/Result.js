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
import { Slider } from 'react-native-elements';

export default class Result extends Component {
  state = {
    value: 1500,
  }

  render() {
    const { personalInfo, whatFood, whatWorkout } = this.props.navigation.state.params;

    return (
      <View style={styles.container}>
        <Text>
          {personalInfo.name}님의 결과는??
        </Text>

        <View style={{flex:9, width: width, flexDirection: 'column', justifyContent: 'center'}}>
          <View style={{flex:7, flexDirection: 'column', borderWidth: 1 }}>
            <View style={{flex: 1, alignItems: 'stretch', justifyContent: 'center'}}>
              <Slider
                value={this.state.value}
                onValueChange={(value) => this.setState({value})}
                disabled={true}
                minimumValue={1000}
                maximumValue={3000}
              />
              <Text>Value: {this.state.value}</Text>
            </View>
            <View style={{flex:1}}>
            </View>
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
