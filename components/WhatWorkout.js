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
import { workoutList } from '../database/db_workout';
import { initWorkoutList } from '../actions/index';

class WhatWorkout extends Component {
  componentDidMount() {
    console.log(this)
  }
  render() {
    // const { workoutList } = this.props.WhatWorkout;

    return (
      <View style={styles.container}>
        <Text>
          오늘 하루 운동한 정보를 입력해주세요
        </Text>

        <View style={{flex:8, width: width, flexDirection: 'column', justifyContent: 'center'}}>
          <View style={{flex:7, flexDirection: 'column', borderWidth: 1 }}>
          </View>
          <ProcessButton
            navigation={this.props.navigation}
            previous='WhatFood'
            next='Result'
          />
        </View>

        <NavigationBar
          navigation={this.props.navigation}
          selectedIndex={2}
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
    WhatWorkout: state.WhatWorkout
  }
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     initWorkoutList: () => dispatch(INIT_WORKOUT_LIST);
//   }
// }

export default connect(mapStateToProps, undefined)(WhatWorkout);
