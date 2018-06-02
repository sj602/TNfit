import React, { Component } from 'react';
import {
  Platform, StyleSheet, Text,
  View, TouchableOpacity, Button,
  FlatList, ActivityIndicator,
  TextInput, Alert
} from 'react-native';
import NavigationBar from './NavigationBar';
import { width } from '../utils/helpers';

export default class EatenFoodList extends Component {
  constructor() {
    super();
    this.state = {
      eatenFoodList: [],
      foodList: [],
    };
  }

  render() {
    const { eatenFoodList } = this.props.navigation.state.params;
    console.log(eatenFoodList)
    return (
      <View style={styles.container}>
        <Text style={styles.textTitle}>
          오늘 음식 섭취 리스트
        </Text>
        <View style={{flex: 1, width: width, flexDirection: 'column', justifyContent: 'space-between'}}>
          <View style={{flex: 1, maxHeight: 20, flexDirection: 'row', borderBottomWidth: 1}}>
            <View style={{flex: 3}}>
              <Text style={styles.text}>
                음식
              </Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.text}>
                섭취량(g)
              </Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.text}>
                섭취칼로리(kcal)
              </Text>
            </View>
          </View>

          {
            eatenFoodList.map(food => {
              return (
                <View
                  style={{flex: 1, height: 40, marginLeft: 3, marginRight: 3, flexDirection: 'row', alignItems: 'center', borderBottomWidth: StyleSheet.hairlineWidth}}
                >
                  <View style={{flex: 3, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={styles.textFood}>
                      {food['식품이름']}
                    </Text>
                  </View>
                  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={styles.textFood}>
                      {food['섭취량']}
                    </Text>
                  </View>
                  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={styles.textFood}>
                      {food['섭취열량']}
                    </Text>
                  </View>
                </View>
              )
            })
          }

        </View>

        <NavigationBar
          navigation={this.props.navigation}
          selectedIndex={1}
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
    backgroundColor: 'white',
  },
  textTitle: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 10,
  },
  text: {
    flex: 1,
    fontSize: 12,
    textAlign: 'center',
  },
  textFood: {
    flex: 1,
    fontSize: 13,
    paddingTop: 11,
    textAlign: 'center',
  },
  icon: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContainer: {
    borderRadius: 5,
    alignSelf: 'center',
    backgroundColor: 'white',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 60,
    marginBottom: 60,
    padding: 30,
  },
  foodName: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#517fa4'
  },
  textModal: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#517fa4'
  }
});
