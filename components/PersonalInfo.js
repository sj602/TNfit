import React, { Component } from 'react';
import {
  Platform, StyleSheet, Text,
  View, TextInput, TouchableOpacity,
  Button, Alert, Image,
  Picker, ScrollView, Modal,
  Keyboard
} from 'react-native';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import { width } from '../utils/helpers';
import { Icon } from 'react-native-elements';
import NavigationBar from './NavigationBar';
import { saveUserInfo, saveMetabolism } from '../actions';

class PersonalInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.userInfo.name,
      age: this.props.userInfo.age,
      gender: this.props.userInfo.gender,
      genderModalVisible: false,
      height: this.props.userInfo.height,
      weight: this.props.userInfo.weight,
      targetWeight: this.props.userInfo.targetWeight,
      currentlyEatingProduct: this.props.userInfo.currentlyEatingProduct,
      wannaEatProduct: this.props.userInfo.wannaEatProduct,
    }
  }

  static navigationOptions = ({navigation}) => ({
    title: '개인정보',
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
    const { currentlyEatingProduct, wannaEatProduct } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.containerSub}>
            <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
              <Image
                style={styles.image}
                source={require('../images/TN_logo.png')}
              />
            </View>

            <View style={{flex:1, flexDirection: 'row'}}>
              <View
                style={styles.inputBox}
              >
                <TextInput
                  style={styles.textInput}
                  onChangeText={(name) => this.setState({name})}
                  value={this.state.name}
                  placeholder='이름'
                />
              </View>
            </View>

            <View style={{flex:1, flexDirection: 'row'}}>
              <View
                style={styles.inputBox}
              >
                <TextInput
                  style={styles.textInput}
                  onChangeText={(age) => this.setState({age})}
                  value={(this.state.age).toString()}
                  maxLength={2}
                  placeholder='나이'
                  keyboardType={'numeric'}
                />
              </View>
            </View>
            <Modal
              animationType="slide"
              transparent={false}
              visible={this.state.genderModalVisible}
              onRequestClose={() => console.log('modal closed')}
            >
              <View style={styles.modal}>
                <TouchableOpacity
                  onPress={() => this.setState({genderModalVisible: false, gender: '남성'})}
                  style={{flex:1, justifyContent: 'center', borderBottomWidth: 1}}
                >
                  <Text style={{fontSize: 20, textAlign: 'center'}}>
                    남성
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.setState({genderModalVisible: false, gender: '여성'})}
                  style={{flex:1, justifyContent: 'center'}}
                >
                  <Text style={{fontSize: 20, textAlign: 'center'}}>
                    여성
                  </Text>
                </TouchableOpacity>
              </View>
            </Modal>
            <View 
              style={{flex:1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}
            > 
              <TouchableOpacity
                onPress={() => this.setState({genderModalVisible: true})}
                style={styles.textInput}
              >
                <View style={{flexDirection: 'row', width: width * 0.4, borderBottomWidth: 1}}>
                  <Text style={{flex: 9, textAlign: 'center'}}>
                    { this.state.gender ? this.state.gender : '성별'}
                  </Text>
                  <Icon
                    name='sort-down'
                    type='font-awesome'
                    color='grey'
                    size={14}
                    iconStyle={{flex:1}}
                  />
                </View>
              </TouchableOpacity>
            </View>
            <View style={{flex:1, flexDirection: 'row'}}>
              <View
                style={styles.inputBox}
              >
                <TextInput
                  style={styles.textInput}
                  onChangeText={(height) => this.setState({height})}
                  value={this.state.height}
                  maxLength={3}
                  placeholder='키(cm)'
                  keyboardType={'numeric'}
                />
              </View>
            </View>

            <View style={{flex:1, flexDirection: 'row'}}>
              <View
                style={styles.inputBox}
              >
                <TextInput
                  style={styles.textInput}
                  onChangeText={(weight) => this.setState({weight})}
                  value={this.state.weight}
                  maxLength={3}
                  placeholder='몸무게(kg)'
                  keyboardType={'numeric'}
                />
              </View>
            </View>

            <View style={{flex:1, flexDirection: 'row'}}>
              <View
                style={styles.inputBox}
              >
                <TextInput
                  style={styles.textInput}
                  onChangeText={(targetWeight) => this.setState({targetWeight})}
                  value={this.state.targetWeight}
                  maxLength={2}
                  placeholder='목표몸무게(kg)'
                  keyboardType={'numeric'}
                />
              </View>
            </View>

            <View style={{flex:1, flexDirection: 'row'}}>
              <View
                style={styles.textInputView}
              >
                <TextInput
                  style={styles.textInput}
                  onChangeText={(currentlyEatingProduct) => this.setState({currentlyEatingProduct})}
                  value={this.state.currentlyEatingProduct}
                  placeholder='현재 섭취 중인 제품'
                />
                <TouchableOpacity
                  onPress={() => {
                    Keyboard.dismiss();
                    navigate('WhatFood', {category: '현재 섭취 중인 제품', product: this.state.currentlyEatingProduct})
                  }}
                >
                  <Icon
                    name='search'
                    type='font-awesome'
                    color='rgb(240,82,34)'
                    size={14}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={{flex:1, flexDirection: 'row'}}>
              <View
                style={styles.textInputView}
              >
                <TextInput
                  style={styles.textInput}
                  onChangeText={(wannaEatProduct) => this.setState({wannaEatProduct})}
                  value={this.state.wannaEatProduct}
                  placeholder='향후 섭취 희망 제품'
                />
                <TouchableOpacity
                  onPress={() => {
                    Keyboard.dismiss();
                    navigate('WhatFood', {category: '향후 섭취 희망 제품', product: this.state.wannaEatProduct})
                  }}
                >
                  <Icon
                    name='search'
                    type='font-awesome'
                    color='rgb(240,82,34)'
                    size={14}
                  />
                </TouchableOpacity>
              </View>
            </View>

        </View>

        <NavigationBar 
          navigation={this.props.navigation}
          menu='PersonalInfo'
          userInfo={this.state}
          saveUserInfo={this.props.saveUserInfo}
          saveMetabolism={this.props.saveMetabolism}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state
  }
}

export default connect(mapStateToProps, {saveUserInfo, saveMetabolism})(PersonalInfo);

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
    width: width * 0.4
  },
  inputBox: {
    flex:1,
    width: 80,
    height: 40,
    alignItems: 'center',
    marginTop: 10,
  },
  textInput: {
    width: width * 0.4
  },
  textInputView: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'center',
    width: 80,
    height: 40,
    alignItems: 'center',
    marginTop: 10,
  },
  modal: {
    flex: 1,
    flexDirection: 'column',
    margin: 70,
  }
});
