import React, { Component } from 'react';
import {
  Platform, StyleSheet, Text,
  View, TouchableOpacity, Image,
  Button, TextInput, Alert
} from 'react-native';
import { SocialIcon } from 'react-native-elements';
import firebase from 'react-native-firebase';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { GoogleSignin } from 'react-native-google-signin';
import { width } from '../utils/helpers';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      user: '',
      email: '',
      password: '',
    }
  }

  static navigationOptions = ({navigation}) => ({
    header: null
  })

  componentDidMount() {
    this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
      user 
      ? 
      this.props.navigation.navigate('Drawer') 
      : 
      null
    });

    this.setupGoogleSignin();
  }

  componentWillUnmount() {
    this.authSubscription();
  }

  onLogin() {
    const { email, password } = this.state;

    if(!email || !password) {
      return Alert.alert('이메일 또는 비밀번호를 입력해주세요', '', [{text: '확인', onPress: () => console.log('')}])
    } else {
      return firebase
        .auth()
        .signInAndRetrieveDataWithEmailAndPassword(email, password)
        .catch(err => {
          if(err.code === 'auth/invalid-email') {
            return Alert.alert(
                                '이메일이 존재하지 않습니다.',
                                '',
                                [{text: '확인', onPress: () => console.log('')}])
              
          } else {
            return Alert.alert(
                                '비밀번호가 틀립니다.',
                                '',
                                [{text: '확인', onPress: () => console.log('')}])
          }
      })
    }
  }

  handleFirebaseLogin(accessToken) {
    Firebase.auth()
      .signInWithCredential(accessToken)
      .then(data => {
        var user = Firebase.auth().currentUser;
        console.log(user);
      })
      .catch(error => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        if (errorCode === 'auth/account-exists-with-different-credential') {
          // Email already associated with another account.
        }
      })
  }

  fbAuth() {
    const { navigate } = this.props.navigation;

    LoginManager.logInWithReadPermissions(['public_profile']).then((result) => {
        if (result.isCancelled) {
          console.log('Login was cancelled');
        } else {
          console.log('Login was successful with permissions: '
          + result.grantedPermissions.toString());
          return AccessToken.getCurrentAccessToken()
            .then(data => data.accessToken)
            .then(accessToken => {
              const credential = firebase.auth.FacebookAuthProvider.credential(accessToken);
              return firebase.auth().signInAndRetrieveDataWithCredential(credential)
            });
        }
      }, (error) => console.log(error));
  }

  googleAuth() {
    const { navigate } = this.props.navigation;

    GoogleSignin.signIn()
      .then((user) => {
        const credential = firebase.auth.GoogleAuthProvider.credential(user.idToken);
        return firebase.auth().signInAndRetrieveDataWithCredential(credential)
      })
      .catch((err) => {
        console.log('WRONG SIGNIN', err);
      })
      .done();
  }

  async setupGoogleSignin() {
    try {
      await GoogleSignin.hasPlayServices({ autoResolve: true });
      await GoogleSignin.configure({
        webClientId: '342503083020-usqq7h8sha8vgjd2s6qn8ark5029nuv9.apps.googleusercontent.com',
      });

      const user = await GoogleSignin.currentUserAsync();
      if(user) this.googleAuth();
    }
    catch (err) {
      console.log("Google signin error", err.code, err.message);
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    const { email, password } = this.state;

    return (
      <View style={styles.container}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Image
              style={styles.image}
              source={require('../images/TN_logo.png')}
            />
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 10, marginBottom: 10}}>
            <SocialIcon
              onPress={() => this.googleAuth()}
              type='google-plus-official'
            />
            <SocialIcon
              onPress={() => this.fbAuth()}
              type='facebook'
            />
          </View>
          <View>
            <TextInput
              style={styles.textInput}
              onChangeText={(email) => this.setState({email})}
              value={this.state.email}
              placeholder='이메일 주소'
            />
          </View>
          <View style={{marginBottom: 30}}>
            <TextInput
              style={styles.textInput}
              onChangeText={(password) => this.setState({password})}
              value={this.state.password}
              placeholder='비밀번호'
              secureTextEntry={true}  
              maxLength={16}            
            />
          </View>

          <TouchableOpacity
            style={{justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(240,82,34)', height: 50}}
            onPress={() => this.onLogin()}
          >
            <Text style={{textAlign: 'center', color: 'white', fontSize: 20}}>로그인</Text>
          </TouchableOpacity>   

          <View style={{flex:1, maxHeight: 50, flexDirection: 'row', marginTop: 10}}>
            <TouchableOpacity
              onPress={() => navigate('Agreement')}
              style={{flex:1}}
            >
              <View>
                <Text>
                  회원가입
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigate('ForgotPassword')}
              style={{flex:1}}
            >
              <View>
                <Text style={{textAlign: 'right'}}>
                  비밀번호 분실
                </Text>
              </View>
            </TouchableOpacity>
          </View>
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
    backgroundColor: 'white',
  },
  image: {
    width: width * 0.3,
    height: width * 0.3,
    marginBottom: 30,
  },
  text: {
    fontSize: 25,
    textAlign: 'center',
    marginTop: 5,
  },
  textInput: {
    width: width * 0.8
  }
});
