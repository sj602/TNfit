import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { ButtonGroup, Icon } from 'react-native-elements';
import { width } from '../utils/helpers';

//Process buttons
const component1 = () => {
  return (
    <View>
      <Icon
        name='ios-body'
        type='ionicon'
        color='#517fa4'
      />
      <Text>
        개인정보
      </Text>
    </View>
  )
};
const component2 = () => {
  return (
    <View>
      <Icon
        name='food'
        type='material-community'
        color='#517fa4'
      />
      <Text>
        음식정보
      </Text>
    </View>
  )
}
const component3 = () => {
  return (
    <View>
      <Icon
        name='weight-kilogram'
        type='material-community'
        color='#517fa4'
      />
      <Text>
        운동정보
      </Text>
    </View>
  )
}
const component4 = () => {
  return (
    <View>
      <Icon
        name='results'
        type='foundation'
        color='#517fa4'
      />
      <Text>
        결과
      </Text>
    </View>
  )
}

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
    const buttons = [{element: component1}, {element: component2}, {element: component3}, {element: component4}];
    const { selectedIndex } = this.state;
    const { previous, next } = this.props;

    return (
      <ButtonGroup
        component={undefined}
        selectedIndex={selectedIndex}
        buttons={buttons}
        containerStyle={{width: width, height: 50, marginBottom: 0}}
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
