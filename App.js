import React, { Component } from 'react';
import {
  Platform,
  Text,
  View
} from 'react-native';
import { Stacks } from './utils/navigation';
import { firebaseSetup } from './utils/firebase';

export default class App extends Component {
  constructor() {
    super();
    firebaseSetup();
  }

  render() {
    return (
      <Stacks />
    );
  }
}
