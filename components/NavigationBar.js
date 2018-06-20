import React, { Component } from 'react';
import {
  Platform, StyleSheet, Text,
  View, TouchableOpacity, Alert
} from 'react-native';
import { connect } from 'react-redux';
import validator from 'validator';
import firebase from 'react-native-firebase';
import { width, emailDB } from '../utils/helpers';

class NavigationBar extends Component {
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

      case 'ForgotPassword': {
        const { email } = this.props;

        return (
          <View style={{flex:1, flexDirection: 'row', maxHeight: 50}}>
            <TouchableOpacity
              style={{flex:1}}
              onPress={() => {
                firebase.auth().sendPasswordResetEmail(email).then(user => {
                    Alert.alert(
                      '메일이 발송됬습니다. 이메일을 확인해주세요.',
                      '',
                      [
                        {text: '확인', onPress: () => console.log('')}
                      ]
                    );
                  }).catch(err => alert(err))
              }}
            >
              <View style={{flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(240,82,34)'}}>
                <Text style={{textAlign: 'center', color: 'white', fontSize: 20}}>
                  이메일 전송
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )
      }

      case 'PersonalInfo': {
        const { saveUserInfo, saveMetabolism, userInfo } = this.props;

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
                saveUserInfo(userInfo);
                if(!userInfo.metabolism) saveMetabolism(userInfo);
                navigation.navigate('DiaryDetail');
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
        const { email, day, saveData } = this.props;

        return (
          <View style={{flex:1, flexDirection: 'row', maxHeight: 50}}>
            <TouchableOpacity 
              onPress={() => saveData(emailDB(email), day)}
              style={{flex:1}}
            >
              <View style={{flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(240,82,34)'}}>
                <Text style={{textAlign: 'center', color: 'white', fontSize: 20}}>
                  저장하기
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
                eatenFoodList.length > 0
                ?
                (
                  saveFoodInfo(eatenFoodList, category),
                  Alert.alert(
                    '리스트에 추가 되었습니다.',
                    '',
                    [
                      {text: '확인', onPress: () => navigation.goBack()}
                    ]
                  )
                )
                :
                  Alert.alert(
                    '추가할 음식을 체크하지 않았습니다.',
                    '',
                    [
                      {text: '확인', onPress: () => console.log('')}
                    ]
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
        let { category } = this.props;
        switch(category) {
          case 'breakfast':
            category = '아침';
            break;
          case 'lunch':
            category = '점심';
            break;
          case 'dinner':
            category = '저녁';
            break;
          case 'dessert':
            category = '간식';
            break;
          default:
            category = '운동';
            break;
        }

        return (
          <View style={{flex:1, flexDirection: 'row', maxHeight: 50}}>
            <TouchableOpacity
              style={{flex:1}}
              onPress={() => {
                if(category === '운동') navigation.navigate('WhatWorkout');
                else navigation.navigate('WhatFood', { category });
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

const mapStateToProps = (state) => {
  return {
    ...state
  }
}

export default connect(mapStateToProps, null)(NavigationBar);

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
