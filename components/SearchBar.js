import React, { Component } from 'react';
import {
  Platform, StyleSheet, Text,
  View, ScrollView, TouchableOpacity,
  TextInput,
} from 'react-native';
import { width } from '../utils/helpers';
import { Icon } from 'react-native-elements';

export default class SearchBar extends Component {
  state = {
    searchWorkout: '',
  }

  render() {
    let { searchWorkout } = this.state;
    const { width, onChangeSearch } = this.props;
    onChangeSearch(searchWorkout);

    return (
      <TextInput
        style={{width: width}}
        onChangeText={(searchWorkout) => this.setState({searchWorkout})}
        value={searchWorkout}
        placeholder='검색: 운동명'
        underlineColorAndroid='transparent'
      />
    );
  }
}
