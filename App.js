import React, { Component } from 'react';
import {
  Platform,
  Text,
  View
} from 'react-native';
import firebase from 'react-native-firebase';
import { Stacks } from './utils/navigation';

export default class App extends Component {
  render() {
    return (
      <Stacks />
    );
  }
}
