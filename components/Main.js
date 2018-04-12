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
import ProcessButton from './ProcessButton';

export default class Main extends Component {
  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <View style={{flex:9, width: width}}>
          <View style={{flex:2, justifyContent: 'center', alignItems: 'center'}}>
            <Text>
              The Natural Fit은 여러분의 다이어트를 응원합니다!
            </Text>
          </View>
          <View style={{flex:1, flexDirection: 'column', alignItems: 'center', borderWidth: 1}}>
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
