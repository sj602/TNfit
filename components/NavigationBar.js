import React, { Component } from 'react';
import {
  Platform, StyleSheet, Text,
  View, TouchableOpacity, Alert
} from 'react-native';
import validator from 'validator';
import firebase from 'react-native-firebase';
import { width } from '../utils/helpers';

export default class NavigationBar extends Component {
  validate(data) {
    for(let k in data) {
      if(typeof data[k] === 'string' && data[k].length === 0) {
        return false;
      }
    }
    return true;
  }

  render() {
    const { menu, navigation } = this.props;

    switch (menu) {
      case 'Agreement': {
        const { saveAgreementInfo, agreement } = this.props;

        return (
          <View style={{flex:1, flexDirection: 'row', maxHeight: 50}}>
            <TouchableOpacity
              style={{flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(240,82,34)'}}
              onPress={() => {
                saveAgreementInfo(agreement);
                navigation.navigate('SignUp');
              }}
            >
              <View>
                <Text style={{textAlign: 'center', color: 'white', fontSize: 20}}>
                  동의
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )
      }

      case 'SignUp': {
        // const { email, actionCodeSettings, sendSignInLinkToEmail } = this.props;
        const { userInfo, email, password, passwordChk, handleSignUp, navigation } = this.props;

        return (
          <View style={{flex:1, flexDirection: 'row', maxHeight: 50}}>
            <TouchableOpacity
              style={{flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(240,82,34)'}}
              onPress={() => {
                if(this.validate(userInfo)) {
                  (password !== passwordChk)
                  ?
                  Alert.alert(
                    '비밀번호가 동일하지 않습니다.',
                    '',
                    [
                      {text: '확인', onPress: () => console.log('')}
                    ]
                  )
                  :
                  validator.isEmail(email)
                  ?
                  handleSignUp(email, password)
                    .then(() => {
                      Alert.alert(
                        '회원가입이 완료되었습니다.',
                        '',
                        [
                          {text: '확인', onPress: () => navigation.navigate('Login')}
                        ]
                      )
                    })
                    .catch(err => {
                      Alert.alert(
                        err,
                        '',
                        [
                          {text: '확인', onPress: () => console.log(err)}
                        ]
                      )
                    })
                  :
                    Alert.alert(
                      '이메일 주소가 올바르지 않습니다.',
                      '',
                      [
                        {text: '확인', onPress: () => console.log('')}
                      ]
                    );
                } else {
                    Alert.alert(
                      '빈칸을 입력해주세요.',
                      '',
                      [
                        {text: '확인', onPress: () => console.log('')}
                      ]
                    )
                }
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
            <TouchableOpacity
              style={{flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'grey'}}
              onPress={() => {
                firebase.auth().signOut()
                  .then(() => {
                    navigation.navigate('Login');
                  })
                  .catch(err => {
                    console.log(err);
                  });
              }}
            >
              <View>
                <Text style={{textAlign: 'center', color: 'white', fontSize: 20}}>
                  로그아웃
                </Text>
              </View>
            </TouchableOpacity>
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
                let { eatenFoodList, category, saveFoodInfo } = this.props;
                saveFoodInfo(eatenFoodList, category);
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

      case 'FoodDetail': {
        const { category, eatenFoodList, saveFoodInfo } = this.props;

        return (
          <View style={{flex:1, flexDirection: 'row', maxHeight: 50}}>
            <TouchableOpacity
              style={{flex:1}}
              onPress={() => {
                saveFoodInfo(eatenFoodList, category);
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
        const { saveWorkoutInfo } = this.props;

        return (
          <View style={{flex:1, flexDirection: 'row', maxHeight: 50}}>
            <TouchableOpacity
              style={{flex:1}}
              onPress={() => {
                let workout = this.props.workout.filter((item) => item.done === true)
                saveWorkoutInfo(workout);
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
