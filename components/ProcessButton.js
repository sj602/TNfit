import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
} from 'react-native';
import { width } from '../utils/helpers';

export default class ProcessButton extends Component {
  render() {
    return (
      <View style={{flex:1, flexDirection: 'row'}}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.navigation.navigate(this.props.previous)}
        >
          <Text style={styles.text}>
            이전
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.navigation.navigate(this.props.next)}
        >
          <Text style={styles.text}>
            다음
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
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
