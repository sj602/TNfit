import React, { Component } from 'react';
import {
  Platform, StyleSheet, Text,
  View, TouchableOpacity, Image,
} from 'react-native';
import { SocialIcon } from 'react-native-elements';
import { width } from '../utils/helpers';
import firebase from 'react-native-firebase';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { GoogleSignin } from 'react-native-google-signin';

export default class Login extends Component {
  componentDidMount() {
    // Google Login
    this.setupGoogleSignin();
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
                      .then(user => navigate('Main', {userName: user.additionalUserInfo.profile.name}));
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
                .then(user => navigate('Main', {userName: user.additionalUserInfo.profile.name}));
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
    return (
      <View style={styles.container}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Image
              style={styles.image}
              source={require('../images/TN_logo.png')}
            />
          </View>
          <View>
            <Text style={styles.text}>
              The Natural Fit과 함께
            </Text>
            <Text style={styles.text}>
              건강한 삶을 유지해보세요
            </Text>
            <Text style={styles.text}>
              여러분의 다이어트를 응원합니다!
            </Text>
          </View>
          <View style={{marginTop: 10}}>
            <SocialIcon
              title='페이스북으로 로그인'
              button
              onPress={() => this.fbAuth()}
              type='facebook'
            />
            <SocialIcon
              title='구글로 로그인'
              button
              onPress={() => this.googleAuth()}
              type='google-plus-official'
            />
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
  }
});
