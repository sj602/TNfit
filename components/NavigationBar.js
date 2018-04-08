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
      selectedIndex: undefined
    }
    this.updateIndex = this.updateIndex.bind(this)
  }

  updateIndex (selectedIndex) {
    this.setState({selectedIndex})
  }

  render () {
    const buttons = ['개인정보', '음식정보', '음식정보', '결과']
    const { selectedIndex } = this.state

    return (
      <ButtonGroup
        onPress={this.updateIndex}
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
