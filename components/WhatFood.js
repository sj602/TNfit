import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button
} from 'react-native';
import NavigationBar from './NavigationBar';
import { width } from '../utils/helpers';
import ProcessButton from './ProcessButton';

export default class WhatFood extends Component {
  state = {
    kimchi: 1,
  }

  renderRow() {
    <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row' }}>
      <View style={{ flex: 1, alignSelf: 'stretch', borderWidth: 1 }} />
      <View style={{ flex: 1, alignSelf: 'stretch', borderWidth: 1 }} />
      <View style={{ flex: 1, alignSelf: 'stretch', borderWidth: 1 }} />
      <View style={{ flex: 1, alignSelf: 'stretch', borderWidth: 1 }} />
      <View style={{ flex: 1, alignSelf: 'stretch', borderWidth: 1 }} />
    </View>
  }

  render() {
    const { personalInfo } = this.props.navigation.state.params;

    const whatFood = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.containerSub}>
          <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={styles.textTitle}>
              오늘 하루 섭취한 음식을 입력해주세요
            </Text>
          </View>

          <View style={{flex:8, width: width, flexDirection: 'column', justifyContent: 'center'}}>
            <View style={{flex:7, flexDirection: 'column', borderWidth: 1 }}>
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
  containerSub: {
    flex: 1,
    width: width,
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
