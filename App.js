import React, { Component } from 'react';
import {
  Platform,
  Text,
  View
} from 'react-native';
import { Tabs } from './utils/navigation';
import { Provider } from 'react-redux';
import { store } from './store';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Tabs />
      </Provider>
    );
  }
}
