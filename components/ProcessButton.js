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
    const { navigate } = this.props.navigation;
    const { previous, next } = this.props;

    return (
      <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'stretch'}}>
        { previous
          ?
          (
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigate(previous)}
          >
            <Text style={styles.text}>
              이전
            </Text>
          </TouchableOpacity>
          )
          : null
        }
        { next
          ?
          (
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigate(next)}
          >
            <Text style={styles.text}>
              다음
            </Text>
          </TouchableOpacity>
          )
          : null
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    margin: 10,
    padding: 10,
    backgroundColor: "#841584",
    borderRadius: 5
  },
  text: {
    color: 'white',
    textAlign: 'center',
  }
});
