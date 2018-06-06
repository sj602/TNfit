import React, { Component } from 'react';
import {
  Platform, StyleSheet, Text,
  View, TouchableOpacity, Image,
  Button, TextInput, Modal,
} from 'react-native';
import NavigationBar from './NavigationBar';
import { width } from '../utils/helpers';
import firebase from 'react-native-firebase';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { GoogleSignin } from 'react-native-google-signin';
import { Icon } from 'react-native-elements';

var actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be whitelisted in the Firebase Console.
  url: 'https://tnfit-392f6.firebaseapp.com=',
  // This must be true.
  handleCodeInApp: true,
  iOS: {
    bundleId: 'com.tnfit.ios'
  },
  android: {
    packageName: 'com.tnfit.android',
    installApp: true,
    minimumVersion: '12'
  }
};

export default class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      passwordChk: '',
      name: '',
      gender: '',
      genderModalVisible: false,
    }
  }

  static navigationOptions = ({navigation}) => ({
    title: '회원가입',
    headerTintColor: 'white',
    headerStyle: {backgroundColor: 'rgb(240,82,34)'},
  })

  handleSignUp(email, password) {
    return firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(email, password)
  }

  sendSignInLinkToEmail(email, actionCodeSettings) {
    firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings)
      .then(function() {
        // The link was successfully sent. Inform the user.
        // Save the email locally so you don't need to ask the user for it again
        // if they open the link on the same device.
        window.localStorage.setItem('emailForSignIn', email);
      })
      .catch(function(error) {
        // Some error occurred, you can inspect the code: error.code
    });
  }

  render() {
    const { email, password, passwordChk } = this.state;
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View style={{width: width * 0.8, marginBottom: 10}}>
            <TextInput
              style={styles.textInput}
              onChangeText={(email) => this.setState({email})}
              value={this.state.email}
              placeholder='이메일 주소'
            />
          </View>
          <View style={{width: width * 0.8, marginBottom: 10}}>
            <TextInput
              style={styles.textInput}
              secureTextEntry={true}              
              onChangeText={(password) => this.setState({password})}
              value={this.state.password}
              placeholder='비밀번호'
              maxLength={16}
            />
          </View>
          <View style={{width: width * 0.8, marginBottom: 10}}>
            <TextInput
              style={styles.textInput}
              secureTextEntry={true}              
              onChangeText={(passwordChk) => this.setState({passwordChk})}
              value={this.state.passwordChk}
              placeholder='비밀번호 재확인'
              maxLength={16}
            />
          </View>
          <View style={{width: width * 0.8, marginBottom: 10}}>
            <TextInput
              style={styles.textInput}
              onChangeText={(name) => this.setState({name})}
              value={this.state.name}
              placeholder='이름'
            />
          </View>
          <View style={{width: width * 0.8, marginBottom: 10}}>
            <TouchableOpacity
              onPress={() => this.setState({genderModalVisible: true})}
              style={styles.gender}
            >
              <View style={{flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: 'grey'}}>
                <Text style={{flex: 9}}>
                  { this.state.gender ? this.state.gender : '  성별'}
                </Text>
                <Icon
                  name='sort-down'
                  type='font-awesome'
                  color='grey'
                  size={14}
                  iconStyle={{flex:1}}
                />
              </View>
            </TouchableOpacity>
            <Modal
              animationType="slide"
              transparent={false}
              visible={this.state.genderModalVisible}
              onRequestClose={() => console.log('modal closed')}
            >      
              <View style={styles.modal}>
                <TouchableOpacity
                  onPress={() => this.setState({genderModalVisible: false, gender: '남성'})}
                  style={{flex:1, justifyContent: 'center', borderBottomWidth: 1}}
                >
                  <Text style={{fontSize: 20, textAlign: 'center'}}>
                    남성
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.setState({genderModalVisible: false, gender: '여성'})}
                  style={{flex:1, justifyContent: 'center'}}
                >
                  <Text style={{fontSize: 20, textAlign: 'center'}}>
                    여성
                  </Text>
                </TouchableOpacity>
              </View>
            </Modal>                  
          </View>
        </View>
        
        <NavigationBar 
            navigation={navigation}
            menu='SignUp'
            userInfo={this.state}
            saveUserInfo={this.props.saveUserInfo}
            email={email}
            password={password}
            passwordChk={passwordChk}
            handleSignUp={this.handleSignUp}
            // actionCodeSettings={actionCodeSettings}
            // sendSignInLinkToEmail={this.sendSignInLinkToEmail}         
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
  text: {
    fontSize: 25,
    textAlign: 'center',
    marginTop: 5,
  },
  gender: {
    width: width * 0.8,
    marginTop: 20,
  },
  modal: {
    flex: 1,
    flexDirection: 'column',
    margin: 70,
  }

});
