import React, { Component } from 'react';
import {
  Platform, StyleSheet, Text,
  View, TextInput, TouchableOpacity,
  Button, Alert, ScrollView
} from 'react-native';
import { CheckBox } from 'react-native-elements';
import { width } from '../utils/helpers';
import NavigationBar from './NavigationBar';
import ProcessButton from './ProcessButton';

export default class PersonalInfo extends Component {
  state = {
    name: '',
    age: '',
    manChecked: true,
    womanChecked: false,
    height: '',
    weight: '',
    targetWeight: '',
  }

  render() {
    const personalInfo = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.containerSub}>
          <ScrollView>
            <View style={{flex:1, justifyContent: 'center', alignItems: 'center', marginBottom: 30}}>
              <Text style={styles.textTitle}>
                개인정보를 입력해주세요
              </Text>
            </View>

            <View style={{flex:1, flexDirection: 'row'}}>
              <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{textAlign: 'center'}}>
                  이름
                </Text>
              </View>
              <View
                style={styles.inputBox}
              >
                <TextInput
                  style={styles.textInput}
                  onChangeText={(name) => this.setState({name})}
                  value={this.state.name}
                  placeholder='홍길동'
                />
              </View>
            </View>

            <View style={{flex:1, flexDirection: 'row'}}>
              <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{textAlign: 'center'}}>
                  나이
                </Text>
              </View>
              <View
                style={styles.inputBox}
              >
                <TextInput
                  style={styles.textInput}
                  onChangeText={(age) => this.setState({age})}
                  value={this.state.age}
                  maxLength={2}
                  placeholder='25'
                  keyboardType={'numeric'}
                />
              </View>
            </View>

            <View style={{flex:1, flexDirection: 'row'}}>
              <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{textAlign: 'center'}}>
                  성별
                </Text>
              </View>
              <View
                style={{flex:1, flexDirection: 'row'}}
              >
                <CheckBox
                  containerStyle={{width: 70, height: 40, marginTop: 12}}
                  size={16}
                  title='남성'
                  onPress={() => this.setState({
                    manChecked: !this.state.manChecked,
                    womanChecked: !this.state.womanChecked
                  })}
                  checked={this.state.manChecked}
                />
                <CheckBox
                  containerStyle={{width: 70, height: 40, marginTop: 12}}
                  size={16}
                  title='여성'
                  onPress={() => this.setState({
                    womanChecked: !this.state.womanChecked,
                    manChecked: !this.state.manChecked,
                  })}
                  checked={this.state.womanChecked}
                />
              </View>
            </View>

            <View style={{flex:1, flexDirection: 'row'}}>
              <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{textAlign: 'center'}}>
                  키
                </Text>
              </View>
              <View
                style={styles.inputBox}
              >
                <TextInput
                  style={styles.textInput}
                  onChangeText={(height) => this.setState({height})}
                  value={this.state.height}
                  maxLength={3}
                  placeholder='175'
                  keyboardType={'numeric'}
                />
              </View>
            </View>

            <View style={{flex:1, flexDirection: 'row'}}>
              <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{textAlign: 'center'}}>
                  몸무게
                </Text>
              </View>
              <View
                style={styles.inputBox}
              >
                <TextInput
                  style={styles.textInput}
                  onChangeText={(weight) => this.setState({weight})}
                  value={this.state.weight}
                  maxLength={3}
                  placeholder='80'
                  keyboardType={'numeric'}
                />
              </View>
            </View>

            <View style={{flex:1, flexDirection: 'row'}}>
              <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{textAlign: 'center'}}>
                  목표 몸무게
                </Text>
              </View>
              <View
                style={styles.inputBox}
              >
                <TextInput
                  style={styles.textInput}
                  onChangeText={(targetWeight) => this.setState({targetWeight})}
                  value={this.state.targetWeight}
                  maxLength={2}
                  placeholder='65'
                  keyboardType={'numeric'}
                />
              </View>
            </View>
          </ScrollView>

          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <ProcessButton
              navigation={this.props.navigation}
              previous='Main'
              next='WhatFood'
              personalInfo={personalInfo}
            />
          </View>
        </View>

        <NavigationBar
          navigation={this.props.navigation}
          selectedIndex={0}
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
  containerSub: {
    flex: 1,
    width: width,
  },
  button: {
    padding: 10,
    backgroundColor: "#841584",
    borderRadius: 5
  },
  textTitle: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 10,
  },
  textInput: {
    textAlign: 'center',
    width: width * 0.2
  },
  inputBox: {
    flex:1,
    width: 80,
    height: 40,
    alignItems: 'center',
    marginTop: 10,
  }
});
