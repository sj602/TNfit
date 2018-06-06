import React, { Component } from 'react';
import {
  Platform, StyleSheet, Text,
  View, TouchableOpacity, Button,
  FlatList, ActivityIndicator,
  TextInput, Alert, Keyboard, ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import { saveFoodInfo, saveDB } from '../actions';
import { width } from '../utils/helpers';
import NavigationBar from './NavigationBar';

class FoodDetail extends Component {
  constructor() {
    super();
    this.state = {
      selectedFood: {},
    };

    console.ignoreYellowBox = [
      'Setting a timer'
    ];
  }

  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params.selectedFood['식품이름'],
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
    const { selectedFood, saveFoodInfo, category } = this.props.navigation.state.params;
    const { navigation } = this.props;
    let { eatenFoodList } = this.props.navigation.state.params;

    eatenFoodList.push(selectedFood);

    return (
      <View style={styles.container}>
        <View style={{marginBottom: 20}}>
          <Text style={{color:'rgb(240,82,34)'}}>
            세부 영양 정보
          </Text>
        </View>

        <View
          style={{flex: 1, height: 60, marginLeft: 30, marginRight: 30, flexDirection: 'column', alignItems: 'center'}}
        >
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text style={{fontSize: 18}}>
              열량 (kcal) : {selectedFood['열량 (kcal)']}
            </Text>
          </View>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text style={{fontSize: 18}}>
              1회제공량 (g) : {selectedFood['1회제공량 (g)']}
            </Text>
          </View>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text style={{fontSize: 18}}>
              탄수화물 (g) : {selectedFood['탄수화물 (g)']}
            </Text>
          </View>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text style={{fontSize: 18}}>
              단백질 (g) : {selectedFood['단백질 (g)']}
            </Text>
          </View>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text style={{fontSize: 18}}>
              지방 (g) : {selectedFood['지방 (g)']}
            </Text>
          </View>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text style={{fontSize: 18}}>
              나트륨 (g) : {selectedFood['나트륨 (g)']}
            </Text>
          </View>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text style={{fontSize: 18}}>
              콜레스테롤 (g) : {selectedFood['콜레스테롤 (g)']}
            </Text>
          </View>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text style={{fontSize: 18}}>
              트랜스지방산 (g) : {selectedFood['트랜스지방산 (g)']}
            </Text>
          </View>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text style={{fontSize: 18}}>
              포화지방산 (g) : {selectedFood['포화지방산 (g)']}
            </Text>
          </View>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text style={{fontSize: 18}}>
              당류 (g) : {selectedFood['당류 (g)']}
            </Text>
          </View>
        </View>


        <NavigationBar 
          menu='FoodDetail' 
          category={category}
          eatenFoodList={eatenFoodList}
          saveFoodInfo={saveFoodInfo}
          navigation={navigation}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state
  }
};

export default connect(mapStateToProps, {saveFoodInfo})(FoodDetail);

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
