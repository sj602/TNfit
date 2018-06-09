import React, { Component } from 'react';
import {
  Platform, StyleSheet, Text,
  View, TextInput, TouchableOpacity,
  Button, Alert, Image,
  Picker
} from 'react-native';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import { width } from '../utils/helpers';
import { Icon } from 'react-native-elements';
import { Calendar } from 'react-native-calendars';
import NavigationBar from './NavigationBar';

class Diary extends Component {
  static navigationOptions = ({navigation}) => ({
    title: '달력',
    headerTitleStyle: {flex:1, alignSelf: 'center'},
    headerTintColor: 'white',
    headerStyle: {backgroundColor: 'rgb(240,82,34)'},
    headerRight: <Icon
                  iconStyle={{marginRight: 15}}
                  underlayColor="rgba(255,255,255,0)"
                  name="menu" color="white" size={35} onPress={() => {
                                                        navigation.navigate('DrawerToggle')
                                                      }}
                />
  })

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <View style={styles.containerSub}>
          <Calendar
            maxDate={new Date().toISOString().substring(0,10)}
            onDayPress={day => navigate('DiaryDetail', {day})}
            monthFormat={'yyyy MM'}
            onMonthChange={(month) => {console.log('month changed', month)}}
            hideExtraDays={true}
            onPressArrowLeft={substractMonth => substractMonth()}
            onPressArrowRight={addMonth => addMonth()}
          />   
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state
  }
}

export default connect(mapStateToProps, null)(Diary);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  containerSub: {
    flex: 1,
    width: width,
  },
  image: {
    width: width * 0.3,
    height: width * 0.3,
    marginBottom: 30,
  },
  button: {
    padding: 10,
    backgroundColor: "#841584",
    borderRadius: 5
  },
  textTitle: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 10,
  },
  textInput: {
    textAlign: 'center',
    width: width * 0.4
  },
  inputBox: {
    flex:1,
    width: 80,
    height: 40,
    alignItems: 'center',
    marginTop: 10,
  },
});

