import React, { Component } from 'react';
import {
  Platform, StyleSheet, Text,
  View, Button, TouchableOpacity,
  Image,
} from 'react-native';
import { width } from '../utils/helpers';
import NavigationBar from './NavigationBar';

export default class Main extends Component {
  render() {
    const { userName } = this.props.navigation.state.params;
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <View style={{flex: 9, width: width}}>
          <View style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
            <Image
              style={styles.image}
              source={require('../images/TN_logo.png')}
            />
            <Text style={styles.text}>
              { userName }님, 안녕하세요!
            </Text>

          </View>
          <View style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>
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
