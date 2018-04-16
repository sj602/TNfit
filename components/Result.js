import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { connect } from 'react-redux';
import NavigationBar from './NavigationBar';
import { width } from '../utils/helpers';
import ProcessButton from './ProcessButton';
import { Slider } from 'react-native-elements';

class Result extends Component {
  state = {
    value: 1500,
  }

  render() {
    const {PersonalInfo} = this.props;

    return (
      <View style={styles.container}>
        <Text>
          당신의 결과는??
        </Text>

        <View style={{flex:8, width: width, flexDirection: 'column', justifyContent: 'center'}}>
          <View style={{flex:7, flexDirection: 'column', borderWidth: 1 }}>
            <View style={{flex: 1, alignItems: 'stretch', justifyContent: 'center'}}>
              <Slider
                value={this.state.value}
                onValueChange={(value) => this.setState({value})}
                disabled={true}
                minimumValue={1000}
                maximumValue={3000}
              />
              <Text>Value: {this.state.value}</Text>
            </View>
            <View style={{flex:1}}>
              { PersonalInfo && Object.keys(PersonalInfo).map(info => {
                return (
                  <Text>
                    info
                  </Text>
                )
              })}
            </View>
          </View>
          <ProcessButton
            navigation={this.props.navigation}
            previous='WhatWorkout'
          />
        </View>

        <NavigationBar
          navigation={this.props.navigation}
          selectedIndex={3}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

const mapStateToProps = (state) => {
  return {
    PersonalInfo: state.PersonalInfo
  }
};

export default connect(mapStateToProps, undefined)(Result);
