import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { width } from '../utils/helpers';

export default class ProcessButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isValidated: false,
    }
  }

  validate() {
    const { personalInfo } = this.props;
    const { name, age, height, weight, targetWeight } = personalInfo;
    if(name === '' || age === '' || height === '' || weight === '' || targetWeight === '') {
      Alert.alert(
        '잠시만요!',
        '개인정보를 다 채워주세요!',
        [
          {text: '확인'},
        ],
      )
    } else {
      this.setState({isValidated: true});
    }
  }

  render() {
    const { isValidated } = this.state;
    const { navigate } = this.props.navigation;
    const { previous, next, personalInfo } = this.props;

    return (
      <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'stretch'}}>
        { previous
          ?
          (
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigate(previous)}
          >
            <Text style={styles.text}>
              이전
            </Text>
          </TouchableOpacity>
          )
          : null
        }
        { next
          ?
          (
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigate(next)
            }}
          >
            <Text style={styles.text}>
              다음
            </Text>
          </TouchableOpacity>
          )
          : null
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    margin: 10,
    padding: 10,
    backgroundColor: "#841584",
    borderRadius: 5
  },
  text: {
    color: 'white',
    textAlign: 'center',
  }
});

// <TouchableOpacity
//   style={styles.button}
//   onPress={() => {
//     if(personalInfo){
//       this.validate();
//       if(isValidated) navigate(next);
//     }else {
//       navigate(next);
//     }
//   }}
// >
