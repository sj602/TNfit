import React, { Component } from 'react';
import {
  Platform, Text, View,
} from 'react-native';
import { Provider, connect } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { store } from './store';
import { Stacks } from './utils/navigation';
import { firebaseSetup } from './utils/firebase';

export default class App extends Component {
  constructor(props) {
    super(props);
    firebaseSetup();

  }

  render() {
    return (
      <Provider store={store}>
        <Stacks />
      </Provider>
    );
  }
};

//   render() {
//     return (
//       <Provider store={store}>
//         <PersistGate
//           loading={null} persistor={persistor}
//         >
//           <Stacks />
//         </PersistGate>
//       </Provider>
//     );
//   }
// };