import React, { Component } from 'react';
import {
  Platform, StyleSheet, Text,
  View, TouchableOpacity, Button,
  FlatList, ActivityIndicator,
  TextInput, Alert, Keyboard, ScrollView
} from 'react-native';
import { Icon } from 'react-native-elements';
import { width } from '../utils/helpers';
import NavigationBar from './NavigationBar';

export default class DayDetail extends Component {
  constructor() {
    super();
    this.state = {
      eatenFoodList: {},
    };

    console.ignoreYellowBox = [
      'Setting a timer'
    ];
  }

  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params.category,
    headerTitleStyle: {flex:1, alignSelf: 'center'},
    headerTintColor: 'white',
    headerStyle: {backgroundColor: 'rgb(240,82,34)'},
    headerRight: <Icon
                  iconStyle={{marginRight: 10}}
                  name="menu" color="white" size={35} onPress={() => {
                                                        navigation.navigate('DrawerToggle')
                                                      }}
                  />
  })

  render() {
    let { category } = this.props.navigation.state.params;
    category === '아침' ? category = 'breakfast' : category === '점심' ? category = 'lunch' : category === '저녁' ? category = 'dinner' : category = 'dessert';

    return (
      <View style={styles.container}>
        <View style={{marginBottom: 20}}>
          <Text style={{color:'rgb(240,82,34)'}}>
            음식 섭취 리스트
          </Text>
        </View>

        <View
          style={{flex: 1, height: 60, marginLeft: 30, marginRight: 30, flexDirection: 'column', alignItems: 'center'}}
        >
          { 
            category === '운동'
            ?
            this.props.workoutInfo.list.map((item) => {
              return (
                  <View>
                    <View style={{justifyContent: 'center'}}>
                      <Text style={{fontSize: 18}}>
                        {item['식품이름']}
                      </Text>
                    </View>
                    <View style={{flex: 1, justifyContent: 'center'}}>
                      <Text style={{fontSize: 18, textAlign: 'right', alignSelf: 'stretch'}}>
                        {item['열량 (kcal)']}
                      </Text>
                    </View>
                  </View>
                )
            })
            :
            this.props.foodInfo[category].list.map((item) => {
              return (
                  <View>
                    <View style={{justifyContent: 'center'}}>
                      <Text style={{fontSize: 18}}>
                        {item['식품이름']}
                      </Text>
                    </View>
                    <View style={{flex: 1, justifyContent: 'center'}}>
                      <Text style={{fontSize: 18, textAlign: 'right', alignSelf: 'stretch'}}>
                        {item['열량 (kcal)']}
                      </Text>
                    </View>
                  </View>
                )
            })
          }
        </View>

        <NavigationBar menu='DayDetail' navigation={this.props.navigation} category={category} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {
    flex: 1,
    fontSize: 12,
    textAlign: 'center',
  },
});
