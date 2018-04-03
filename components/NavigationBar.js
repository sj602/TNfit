import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class NavigationBar extends Component {
  render() {
    return (
      <View style={{flex:1, flexDirection: 'row'}}>
        <View style={{flex:1, borderWidth: 1, justifyContent: 'center'}}>
          <Text style={{textAlign: 'center'}}>
            1. 개인정보 입력
          </Text>
        </View>
        <View style={{flex:1, borderWidth: 1, justifyContent: 'center'}}>
          <Text style={{textAlign: 'center'}}>
            2. 음식정보 입력
          </Text>
        </View>
        <View style={{flex:1, borderWidth: 1, justifyContent: 'center'}}>
          <Text style={{textAlign: 'center'}}>
            3. 운동정보 입력
          </Text>
        </View>
        <View style={{flex:1, borderWidth: 1, justifyContent: 'center'}}>
          <Text style={{textAlign: 'center'}}>
            4. 결과
          </Text>
        </View>
      </View>
    );
  }
}
