import React, { Component } from 'react';
import {
  Platform, StyleSheet, Text,
  View, TextInput, TouchableOpacity,
  Button, Alert, Image,
  Picker, ScrollView, Modal,
  Keyboard
} from 'react-native';
import { width } from '../utils/helpers';
import NavigationBar from './NavigationBar';
import { Icon } from 'react-native-elements';

export default class ForgotPassword extends Component {
  state = {
    email: '',
  }

  static navigationOptions = ({navigation}) => ({
    title: '비밀번호 분실',
    headerTitleStyle: {flex:1, alignSelf: 'center'},
    headerTintColor: 'white',
    headerStyle: {backgroundColor: 'rgb(240,82,34)'},
  })

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerSub}>
            <View style={{flex:1, flexDirection: 'row'}}>
              <View
                style={styles.inputBox}
              >
                <TextInput
                  style={{width: width * 0.9}}
                  onChangeText={(email) => this.setState({email})}
                  value={this.state.email}
                  placeholder='이메일'
                />
              </View>
            </View>
            <View style={{flex:1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{textAlign: 'center', fontSize: 18}}>
                  입력하신 이메일 주소로 비밀번호 리셋 링크를 보내드립니다.
                </Text>
            </View>
        </View>

        <NavigationBar 
          navigation={this.props.navigation}
          menu='ForgotPassword'
          email={this.state.email}
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
  inputBox: {
    flex: 1,
    width: width * 0.9,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 150,
  },
});
