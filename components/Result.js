import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import NavigationBar from './NavigationBar';

export default class Result extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>
          당신의 결과는??
        </Text>
        <View style={{flex:1, flexDirection: 'row', width: width, borderWidth: 1}}>
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
