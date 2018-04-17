import React, { Component } from 'react';
import {
  Platform, StyleSheet, Text,
  View, Button, TouchableOpacity,
  Image,
} from 'react-native';
import { width } from '../utils/helpers';
import NavigationBar from './NavigationBar';
import ProcessButton from './ProcessButton';

export default class Main extends Component {
  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <View style={{flex:9, width: width}}>
          <View style={{flex:2, justifyContent: 'center', alignItems: 'center'}}>
            <Image
              style={styles.image}
              source={require('../images/TN_logo.png')}
            />
            <Text style={styles.text}>
              The Natural Fit과 함께 다이어트를 시작해보세요
            </Text>
            <Text style={styles.text}>
              여러분의 다이어트를 응원합니다!
            </Text>
          </View>
          <View style={{flex:1, flexDirection: 'column', alignItems: 'center'}}>
            <ProcessButton
              navigation={navigation}
              next='PersonalInfo'
            />
          </View>
        </View>
        <NavigationBar
          navigation={navigation}
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
    // backgroundColor: '#F5FCFF',
    backgroundColor: 'white',
  },
  image: {
    width: width * 0.3,
    height: width * 0.3,
    marginBottom: 30,
  },
  button: {
    padding: 10,
    backgroundColor: "#841584",
    borderRadius: 5
  },
  text: {
    fontSize: 25,
    textAlign: 'center',
    marginTop: 5,
  }
});
