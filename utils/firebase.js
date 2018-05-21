import firebase from 'react-native-firebase';

var config = {
  apiKey: "AIzaSyA3ZrMnT8zDG1pIeqvUFR3OF3fSabrM0ss",
  authDomain: "tnfit-392f6.firebaseapp.com",
  databaseURL: "https://tnfit-392f6.firebaseio.com",
  projectId: "tnfit-392f6",
  storageBucket: "tnfit-392f6.appspot.com",
  messagingSenderId: "342503083020"
};

export const firebaseSetup = () => {
  if(!firebase.apps.length) {
    firebase.initializeApp(config);
  }
};
