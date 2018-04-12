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
    }

    this.updateIndex = this.updateIndex.bind(this);
  }

  componentWillMount() {
    const {selectedIndex} = this.props;
    this.setState({selectedIndex})
  }

  updateIndex(selectedIndex) {
    const { navigate } = this.props.navigation;

    switch(selectedIndex) {
      case 0:
        this.setState({selectedIndex});
        navigate('PersonalInfo');
        break;
      case 1:
        this.setState({selectedIndex});
        navigate('WhatFood');
        break;
      case 2:
        this.setState({selectedIndex});
        navigate('WhatWorkout');
        break;
      case 3:
        this.setState({selectedIndex});
        navigate('Result');
        break;
    }
  }

  render() {
    const buttons = ['개인정보', '음식정보', '운동정보', '결과']
    const { selectedIndex } = this.state
    const { previous, next } = this.props;

    return (
      <ButtonGroup
        component={undefined}
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
