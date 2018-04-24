import React, { Component } from 'react';
import {
  Platform, StyleSheet, Text,
  View, ScrollView, TouchableOpacity,
  TextInput,
} from 'react-native';
import { width } from '../utils/helpers';
import { Icon } from 'react-native-elements';

export default class SearchBar extends Component {
  render() {
    const { width, onChangeSearch } = this.props;

    return (
      <View style={{flex:1, minHeight: 18, flexDirection: 'row', borderWidth: 1, borderColor: 'grey'}}>
        <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
          <Icon
            name='search'
            type='font-awesome'
            color='#517fa4'
            size={14}
          />
        </View>
        <View style={{flex:9, justifyContent: 'center'}}>
          <TextInput
            style={{borderWidth:1, borderColor: 'blue'}}
            onChangeText={(searchWorkout) => onChangeSearch(searchWorkout)}
            value={this.props.searchWorkout}
            placeholder='검색'
            underlineColorAndroid='transparent'
          />
        </View>
      </View>
    );
  }
}
