import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import { width } from '../utils/helpers';

export default class NavigationBar extends Component {
  constructor () {
    super()
    this.state = {
      selectedIndex: undefined,
      selectedMenu: '',
    }
  }

  updateIndex(selectedIndex) {
    this.setState({selectedIndex})
  }

  updateNavigation() {
    const { selectedIndex, selectedMenu } = this.state;

    switch(selectedIndex) {
      case 0:
        this.setState({selectedMenu: 'PersonalInfo'});
        break;
      case 1:
        this.setState({selectedMenu: 'WhatFood'});
        break;
      case 2:
        this.setState({selectedMenu: 'WhatWorkout'});
        break;
      case 3:
        this.setState({selectedMenu: 'Result'});
        break;
    }
  }

  render() {
    const buttons = ['개인정보', '음식정보', '음식정보', '결과']
    const { selectedIndex, selectedMenu } = this.state

    const { navigate } = this.props.navigation;
    const { previous, next } = this.props;

    return (
      <ButtonGroup
        onPress={() => {
          this.updateIndex();
          this.updateNavigation();
          navigate(selectedMenu);
        }}
        selectedIndex={selectedIndex}
        buttons={buttons}
        containerStyle={{width: width, marginBottom: 0}}
      />
    )
  }
}

const styles = StyleSheet.create({
  textView: {
    flex:1,
    borderWidth: 1,
    justifyContent: 'center',
    backgroundColor: 'green'
  },
  text: {
    color: 'white',
    textAlign: 'center'
  }
})
