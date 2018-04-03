import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Button
} from 'react-native';
import { width } from '../utils/helpers';
import NavigationBar from './NavigationBar';
import ProcessButton from './ProcessButton';

export default class PersonalInfo extends Component {
  state = {
    name: '',
    age: '',
    gender: '',
    height: '',
    weight: '',
    targetWeight: '',
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{flex:9, width: width}}>
          <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>
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
              style={{flex:1, width: 80, height: 40, borderColor: 'gray', alignItems: 'center'}}
            >
              <TextInput
                style={{width: 80}}
                onChangeText={(name) => this.setState({name})}
                value={this.state.name}
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
              style={{flex:1, width: 80, height: 40, borderColor: 'gray', alignItems: 'center'}}
            >
              <TextInput
                style={{width: 80}}
                onChangeText={(age) => this.setState({age})}
                value={this.state.age}
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
              style={{flex:1, width: 80, height: 40, borderColor: 'gray', alignItems: 'center'}}
            >
              <TextInput
                style={{width: 80}}
                onChangeText={(gender) => this.setState({gender})}
                value={this.state.gender}
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
              style={{flex:1, width: 80, height: 40, borderColor: 'gray', alignItems: 'center'}}
            >
              <TextInput
                style={{width: 80}}
                onChangeText={(height) => this.setState({height})}
                value={this.state.height}
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
              style={{flex:1, width: 80, height: 40, borderColor: 'gray', alignItems: 'center'}}
            >
              <TextInput
                style={{width: 80}}
                onChangeText={(weight) => this.setState({weight})}
                value={this.state.weight}
              />
            </View>
          </View>

          <View style={{flex:1, flexDirection: 'row'}}>
            <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{textAlign: 'center'}}>
                목표몸무게
              </Text>
            </View>
            <View
              style={{flex:1, width: 80, height: 40, borderColor: 'gray', alignItems: 'center'}}
            >
              <TextInput
                style={{width: 80}}
                onChangeText={(targetWeight) => this.setState({targetWeight})}
                value={this.state.targetWeight}
              />
            </View>
          </View>
          <ProcessButton
            navigation={this.props.navigation}
            previous='Main'
            next='WhatFood'
          />
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
