import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
} from 'react-native';
import { width } from '../utils/helpers';
import NavigationBar from './NavigationBar';

export default class Main extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={{flex:9, width: width}}>
          <View style={{flex:2, justifyContent: 'center', alignItems: 'center'}}>
            <Text>
              The Natural Fit은 여러분의 다이어트를 응원합니다!
            </Text>
          </View>
          <View style={{flex:1}}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.props.navigation.navigate('PersonalInfo')}
            >
              <Text style={styles.text}>
                시작
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flex:1, flexDirection: 'row', width: width, height: 100}}>
          <NavigationBar />
        </View>
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
    backgroundColor: '#F5FCFF',
  },
  button: {
    padding: 10,
    backgroundColor: "#841584",
    borderRadius: 5
  },
  text: {
    color: 'white',
    textAlign: 'center',
  }
});
