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
import { YellowBox } from 'react-native';

export default class App extends Component {
  constructor() {
    super();
    firebaseSetup();

    YellowBox.ignoreWarnings([
      'Warning: isMounted(...) is deprecated', 'Module RCTImageLoader', 'Setting a timer',
      ]);
  }

  render() {
    return (
      <Provider store={store}>
        <Stacks />
      </Provider>
    );
  }
}
