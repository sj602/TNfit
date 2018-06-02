import React, { Component } from 'react';
import {
  Platform, StyleSheet, Text,
  View, TouchableOpacity, Alert
} from 'react-native';
import { width } from '../utils/helpers';

export default class NavigationBar extends Component {
  render() {
    const { menu, navigation } = this.props;

    switch (menu) {
      case 'Agreement': {
        return (
          <View style={{flex:1, flexDirection: 'row', maxHeight: 50}}>
            <TouchableOpacity
              style={{flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(240,82,34)'}}
              onPress={() => {
                this.props.saveAgreementInfo(this.props.agreement);
                navigation.navigate('PersonalInfo');
              }}
            >
              <View>
                <Text style={{textAlign: 'center', color: 'white', fontSize: 20}}>
                  가입하기
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )
      }

      case 'PersonalInfo': {
        return (
          <View style={{flex:1, flexDirection: 'row', maxHeight: 50}}>
            <View style={{flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'grey'}}>
              <Text style={{textAlign: 'center', color: 'white', fontSize: 20}}>
                로그아웃
              </Text>
            </View>
            <TouchableOpacity
              style={{flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(240,82,34)'}}
              onPress={() => {
                this.props.saveUserInfo(this.props.userInfo);
                this.props.saveMetabolism(this.props.userInfo);
                navigation.navigate('Diary');
              }}
            >
              <View>
                <Text style={{textAlign: 'center', color: 'white', fontSize: 20}}>
                  저장하기
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )
      }

      case 'DiaryDetail': {
        return (
          <View style={{flex:1, flexDirection: 'row', maxHeight: 50}}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Recommendation')}
              style={{flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(240,82,34)'}}
            >
              <View>
                <Text style={{textAlign: 'center', color: 'white', fontSize: 20}}>
                  추천제품
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )
      }

      case 'WhatFood': {
        return (
          <View style={{flex:1, flexDirection: 'row', maxHeight: 50}}>
            <TouchableOpacity
              style={{flex:1, flexDirection: 'row',justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(240,82,34)'}}
              onPress={() => {
                let { eatenFoodList, type } = this.props;
                this.props.saveFoodInfo(eatenFoodList, type);
                return (
                  Alert.alert(
                    '리스트에 추가 되었습니다.',
                    '',
                    [
                      {text: '확인', onPress: () => navigation.goBack()}
                    ]
                  )
                )
              }}
            >
              <View>
                <Text style={{textAlign: 'center', color: 'white', fontSize: 20}}>
                  추가하기
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )
      }

      case 'DayDetail': {
        const { category } = this.props;

        return (
          <View style={{flex:1, flexDirection: 'row', maxHeight: 50}}>
            <TouchableOpacity
              style={{flex:1}}
              onPress={() => {
                if(category === '운동') navigation.navigate('WhatWorkout');
                navigation.navigate('WhatFood', { category });
              }}
            >
              <View style={{flex:1, flexDirection: 'row',justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(240,82,34)'}}>
                <Text style={{textAlign: 'center', color: 'white', fontSize: 20}}>
                  추가하기
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )
      }

      case 'WhatWorkout': {
        return (
          <View style={{flex:1, flexDirection: 'row', maxHeight: 50}}>
            <TouchableOpacity
              style={{flex:1}}
              onPress={() => {
                let workout = this.props.workout.filter((item) => item.done === true)
                this.props.saveWorkoutInfo(workout);
                return (
                  Alert.alert(
                    '리스트에 추가 되었습니다.',
                    '',
                    [
                      {text: '확인', onPress: () => navigation.goBack()}
                    ]
                  )
                )
              }}
            >
              <View style={{flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(240,82,34)'}}>
                <Text style={{textAlign: 'center', color: 'white', fontSize: 20}}>
                  추가하기
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )
      }

      case 'Recommendation': {
        return (
          <View style={{flex:1, flexDirection: 'row', maxHeight: 50}}>
            <TouchableOpacity
              style={{flex:1}}
              onPress={() => {
                return (
                  Alert.alert(
                    '구매 링크를 추가중입니다.',
                    '',
                    [
                      {text: '확인', onPress: () => console.log('')}
                    ]
                  )
                )
              }}
            >
              <View style={{flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(240,82,34)'}}>
                <Text style={{textAlign: 'center', color: 'white', fontSize: 20}}>
                  구매하기
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )
      }
    }
  }
}

const styles = StyleSheet.create({
  textView: {
    flex: 1,
    borderWidth: 1,
    justifyContent: 'center',
    backgroundColor: 'green'
  },
  text: {
    color: 'white',
    textAlign: 'center'
  }
})
