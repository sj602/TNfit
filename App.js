import React, { Component } from 'react';
import {
  Platform,
  Text,
  View
} from 'react-native';
import { Provider } from 'react-redux';
import { store } from './store';
import { Stacks } from './utils/navigation';
import { firebaseSetup } from './utils/firebase';

export default class App extends Component {
  constructor() {
    super();
    firebaseSetup();
  }

  render() {
    return (
      <Provider store={store}>
        <Stacks />
      </Provider>
    );
  }
}
