import React, { Component } from 'react';
import {
  Platform, StyleSheet, Text,
  View, TextInput, TouchableOpacity,
  Button, Alert, Image,
  Picker
} from 'react-native';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import { CalendarList } from 'react-native-calendars';
import { Icon } from 'react-native-elements';
import NavigationBar from './NavigationBar';
import { setDay } from '../actions';
import { width, emailDB } from '../utils/helpers';

class Diary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dates: {}
    }
  }
  static navigationOptions = ({navigation}) => ({
    title: '달력',
    headerTitleStyle: {flex:1, alignSelf: 'center'},
    headerTintColor: 'white',
    headerStyle: {backgroundColor: 'rgb(240,82,34)'},
    headerRight: <Icon
                    iconStyle={{marginRight: 15}}
                    underlayColor="rgba(255,255,255,0)"
                    name="menu" color="white" size={35} onPress={() => navigation.navigate('DrawerToggle')}
                />,
    drawerIcon: <Icon
                    name="date-range"
                    color='rgb(240,82,34)' size={25}
                />
  })

  componentDidMount() {
    this.renderDates();
  }

  renderDates() {
    const database = firebase.database();
    let { email } = this.props.userInfo;
    email = emailDB(email);

    let dates = {};

    database.ref(`/users/${email}/history`).once('value', (snap) => snap.val()).then(result => {
      const history = result.val();

      Object.keys(history).map(day => {
        if(history[day].result.scores === 'GOOD') {
          dates[day] = {scores: 'GOOD', disabled: true, startingDay: true, color: '#87b242', endingDay: true}
        } else if(history[day].result.scores === 'BAD') {
          dates[day] = {scores: 'BAD', disabled: true, startingDay: true, color: 'red', endingDay: true}
        }
      })

      return dates;
    }).then(dates => this.setState({dates}))
  }

  render() {
    const { navigate } = this.props.navigation;
    const { setDay } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.containerSub}>
          <CalendarList
            horizontal={true}
            maxDate={new Date().toISOString().substring(0,10)}
            monthFormat={'yyyy MM'}
            onMonthChange={(month) => {console.log('month changed', month)}}
            hideExtraDays={true}
            onPressArrowLeft={substractMonth => substractMonth()}
            onPressArrowRight={addMonth => addMonth()}
            markingType={'period'}
            markedDates={this.state.dates}
            dayComponent={({date, state, marking}) => {
              console.log('date', date)
              return (
                <TouchableOpacity
                  onPress={() =>  {
                    setDay(date.dateString);
                    navigate('DiaryDetail', {day: date.dateString})
                  }}
                  style={{flex: 1}}
                >
                  <View>
                    {
                      marking && marking.scores === 'GOOD'
                      ?
                      (
                        <View style={{position: 'absolute', top: 0, right: 0}}>
                          <Icon
                            name="mood"
                            color='#87b242' size={20}
                          />
                        </View>
                      )
                      :
                      marking && marking.scores === 'BAD'
                      ?
                      (
                        <View style={{position: 'absolute', top: 0, right: 0}}>
                          <Icon
                            name="sentiment-very-dissatisfied"
                            color='red' size={20}
                          />
                        </View>
                      )
                      :
                      null
                    }
                    <Text style={{margin: 5, fontSize: 18, textAlign: 'center', color: state === 'disabled' ? 'gray' : 'black'}}>
                      {date.day}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }}
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

export default connect(mapStateToProps, {setDay})(Diary);

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

