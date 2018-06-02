import React, { Component } from 'react';
import {
  Platform, StyleSheet, Text,
  View, TextInput, TouchableOpacity,
  Button, Alert, Image,
  Picker
} from 'react-native';
import { width } from '../utils/helpers';
import NavigationBar from './NavigationBar';

export default class Recommendation extends Component {
  static navigationOptions = ({navigation}) => ({
    title: '추천제품',
    headerTitleStyle: {flex:1, alignSelf: 'center'},
    headerTintColor: 'white',
    headerStyle: {backgroundColor: 'rgb(240,82,34)'},
  })

  render() {
    const personalInfo = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.containerSub}>
          <View style={{flex: 3, marginTop: 10}}>
            <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 30}}>
              <Image
                style={styles.image}
                source={require('../images/TN_logo.png')}
              />
            </View>
          </View>
          <View style={{flex: 2, paddingLeft: 15, paddingRight: 15}}>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View style={{flex: 1}}>
                <Text style={{fontSize: 16, color: 'grey'}}>
                  영양정보
                </Text>
              </View>
              <View style={{flex: 1,}}>
                <Text style={{fontSize: 16, color: 'grey', textAlign: 'right'}}>
                  효과정보
                </Text>
              </View>
            </View>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View style={{flex: 1}}>
                <Text style={{fontSize: 14, color: 'grey'}}>
                  열량
                </Text>
              </View>
              <View style={{flex: 1}}>
                <Text style={{fontSize: 14, color: 'grey', textAlign: 'right'}}>
                  열량
                </Text>
              </View>
            </View>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View style={{flex: 1}}>
                <Text style={{fontSize: 14, color: 'grey'}}>
                  탄수화물
                </Text>
              </View>
              <View style={{flex: 1}}>
                <Text style={{fontSize: 14, color: 'grey', textAlign: 'right'}}>
                  탄수화물
                </Text>
              </View>
            </View>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View style={{flex: 1}}>
                <Text style={{fontSize: 14, color: 'grey'}}>
                  단백질
                </Text>
              </View>
              <View style={{flex: 1}}>
                <Text style={{fontSize: 14, color: 'grey', textAlign: 'right'}}>
                  지방
                </Text>
              </View>
            </View>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View style={{flex: 1}}>
                <Text style={{fontSize: 14, color: 'grey'}}>
                  나트륨
                </Text>
              </View>
              <View style={{flex: 1}}>
                <Text style={{fontSize: 14, color: 'grey', textAlign: 'right'}}>
                  나트륨
                </Text>
              </View>
            </View>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View style={{flex: 1}}>
                <Text style={{fontSize: 14, color: 'grey'}}>
                  총 폴리페놀
                </Text>
              </View>
              <View style={{flex: 1}}>
                <Text style={{fontSize: 14, color: 'grey', textAlign: 'right'}}>
                  총 폴리페놀
                </Text>
              </View>
            </View>
          </View>
        </View>

        <NavigationBar menu='Recommendation'/>
      </View>
    );
  }
}

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
    width: width * 0.6,
    height: width * 0.6,
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
  }
});
