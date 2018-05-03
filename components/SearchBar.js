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
    isFocused: false,
  }

  render() {
    const { width, onChangeSearch } = this.props;
    const { isFocused } = this.state;

    return (
      <View style={{flex: 1, minHeight: 20, flexDirection: 'row', borderBottomWidth: 2}}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Icon
            name='search'
            type='font-awesome'
            color='#517fa4'
            size={14}
          />
        </View>
        <View style={{flex: 8, justifyContent: 'center'}}>
          <TextInput
            ref={(searchBar) => this.searchBar = searchBar}
            onChangeText={(searchWord) => onChangeSearch(searchWord)}
            onFocus={() => this.setState({isFocused: true})}
            onSubmitEditing={() => this.setState({isFocused: false})}
            maxLength={10}
            value={this.props.value}
            placeholder='검색'
            underlineColorAndroid='transparent'
          />
        </View>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          { isFocused
            ?
            (
              <TouchableOpacity
                onPress={() => {
                  onChangeSearch('')
                  this.searchBar.clear()
                }}
              >
                <Icon
                  name='times-circle'
                  type='font-awesome'
                  color='#517fa4'
                  size={18}
                />
              </TouchableOpacity>
            )
            :
            null
          }
        </View>
      </View>
    );
  }
}
