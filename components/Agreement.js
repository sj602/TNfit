import React, { Component } from 'react';
import {
  Platform, StyleSheet, Text,
  View, TouchableOpacity, Image,
} from 'react-native';
import { connect } from 'react-redux';
import NavigationBar from './NavigationBar';
import { width } from '../utils/helpers';
import { Icon } from 'react-native-elements';
import { saveAgreementInfo } from '../actions';

class Agreement extends Component {
  constructor() {
    super();
    this.state = {
      checkAll: false,
      personalInfo: false,
      receiveEmail: false,
      receiveSMS: false,
    }
  }

  static navigationOptions = ({navigation}) => ({
    title: 'WELCOME',
    headerTitleStyle: {flex:1, alignSelf: 'center'},
    headerTintColor: 'white',
    headerStyle: {backgroundColor: 'rgb(240,82,34)'},
  })

  clickCheckAll() {
    const { checkAll, personalInfo, receiveEmail, receiveSMS } = this.state;

    if(this.state.checkAll === true) {
      this.setState({
                    checkAll: false,
                    personalInfo: false,
                    receiveEmail: false,
                    receiveSMS: false,
                  })
    } else {
      this.setState({
                    checkAll: true,
                    personalInfo: true,
                    receiveEmail: true,
                    receiveSMS: true,
                  })
    }
  }

  render() {
    const { checkAll, personalInfo, receiveEmail, receiveSMS } = this.state;
    console.log('aggrement.js',this.state)
    return (
      <View style={styles.container}>
        <View style={{flex: 1, marginTop: 10}}>
          <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
            <Image
              style={styles.image}
              source={require('../images/TN_logo.png')}
            />
          </View>
        </View>
        <View style={{flex: 3}}>
          <View style={{flexDirection: 'row', marginBottom: 10}}>
            <TouchableOpacity
              onPress={() => this.clickCheckAll()}
              style={{justifyContent: 'center', alignItems: 'center', marginRight: 8}}
            >
              {
                checkAll === true ||
                personalInfo === true && receiveEmail === true && receiveSMS === true
                ?
                (
                  <Icon
                    name='check-square'
                    type='font-awesome'
                    color='rgb(240,82,34)'
                    size={22}
                  />
                )
                :
                (
                  <Icon
                    name='check-square'
                    type='font-awesome'
                    color='grey'
                    size={22}
                  />
                )
              }
            </TouchableOpacity>
            <Text style={{fontSize: 16, color: 'black'}}>
              전체 동의
            </Text>
          </View>
          <View style={{marginTop: 10, marginBottom: 10}}>
            <Text style={{fontSize: 14, color: 'black'}}>
              필수 동의항목
            </Text>
          </View>
          <View style={{flexDirection: 'row', marginTop: 5, marginBottom: 5}}>
            <Icon
              name='check-square'
              type='font-awesome'
              color='rgb(240,82,34)'
              iconStyle={{marginRight: 8}}
              size={22}
            />
            <Text style={{fontSize: 14, color: 'grey'}}>
              TN 구매회원 약관
            </Text>
          </View>
          <View style={{flexDirection: 'row', marginTop: 5, marginBottom: 5}}>
            <Icon
              name='check-square'
              type='font-awesome'
              color='rgb(240,82,34)'
              iconStyle={{marginRight: 8}}
              size={22}
            />
            <Text style={{fontSize: 14, color: 'grey'}}>
              전자금융서비스 이용약관
            </Text>
          </View>
          <View style={{flexDirection: 'row', marginTop: 5, marginBottom: 5}}>
            <Icon
              name='check-square'
              type='font-awesome'
              color='rgb(240,82,34)'
              iconStyle={{marginRight: 8}}
              size={22}
            />
            <Text style={{fontSize: 14, color: 'grey'}}>
              개인정보 수집 및 이용
            </Text>
          </View>
          <View style={{flexDirection: 'row', marginTop: 10, marginBottom: 10}}>
            <Text style={{fontSize: 14, color: 'black'}}>
              선택 동의항목
            </Text>
          </View>
          <View style={{flexDirection: 'row', marginTop: 5, marginBottom: 5}}>
            <TouchableOpacity
              onPress={() => this.setState({personalInfo: !this.state.personalInfo})}
              style={{justifyContent: 'center', alignItems: 'center', marginRight: 8}}
            >
              {
                personalInfo === false 
                ?
                (
                  <Icon
                    name='check-square'
                    type='font-awesome'
                    color='grey'
                    size={22}
                  />
                )
                :
                (
                  <Icon
                    name='check-square'
                    type='font-awesome'
                    color='rgb(240,82,34)'
                    size={22}
                  />
                )
              }
            </TouchableOpacity>
            <Text style={{fontSize: 14, color: 'grey'}}>
              개인정보 제3자 제공동의
            </Text>
          </View>
          <View style={{flexDirection: 'row', marginTop: 5, marginBottom: 5}}>
            <TouchableOpacity
              onPress={() => this.setState({receiveEmail: !this.state.receiveEmail})}
              style={{justifyContent: 'center', alignItems: 'center', marginRight: 8}}
            >
              {
                receiveEmail === false 
                ?
                (
                  <Icon
                    name='check-square'
                    type='font-awesome'
                    color='grey'
                    size={22}
                  />
                )
                :
                (
                  <Icon
                    name='check-square'
                    type='font-awesome'
                    color='rgb(240,82,34)'
                    size={22}
                  />
                )
              }
            </TouchableOpacity>
            <Text style={{fontSize: 14, color: 'grey'}}>
              쇼핑 이메일 수신
            </Text>
          </View>
          <View style={{flexDirection: 'row', marginTop: 5, marginBottom: 5}}>
            <TouchableOpacity
              onPress={() => this.setState({receiveSMS: !this.state.receiveSMS})}
              style={{justifyContent: 'center', alignItems: 'center', marginRight: 8}}
            >
              {
                receiveSMS === false 
                ?
                (
                  <Icon
                    name='check-square'
                    type='font-awesome'
                    color='grey'
                    size={22}
                  />
                )
                :
                (
                  <Icon
                    name='check-square'
                    type='font-awesome'
                    color='rgb(240,82,34)'
                    size={22}
                  />
                )
              }
            </TouchableOpacity>
            <Text style={{fontSize: 14, color: 'grey'}}>
              쇼핑 SMS 수신
            </Text>
          </View>
          <View style={{marginTop: 10}}>
            <Text style={{fontSize: 12, color: 'grey'}}>
              할인쿠폰, 특가상품, 이벤트 정보를 받아보세요!
            </Text>
          </View>
          <View>
            <Text style={{fontSize: 12, color: 'grey'}}>
              상품구매 관련 내용은 수신동의 여부와 관계없이 발송됩니다.
            </Text>
          </View>
        </View>

        <NavigationBar 
          navigation={this.props.navigation}
          menu='Agreement'
          agreement={{personalInfo, receiveSMS, receiveEmail}}
          saveAgreementInfo={this.props.saveAgreementInfo}
        />
      </View>
    );
  }
}

export default connect(null, {saveAgreementInfo})(Agreement);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  image: {
    width: width * 0.3,
    height: width * 0.3,
    marginBottom: 30,
  },
  text: {
    fontSize: 25,
    textAlign: 'center',
    marginTop: 5,
  }
});
