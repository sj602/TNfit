import React, { Component } from 'react';
import {NavigationActions, DrawerItems} from 'react-navigation';
import {ScrollView, Text, View} from 'react-native';
import { Icon } from 'react-native-elements';

export default class CustomeDrawer extends Component {
  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  }

  onClick() {

  }

  render () {
    return (
		<View>
			<View style={{flexDirection: 'row', marginTop: 10, marginBottom: 10}}>
				<Icon
                    iconStyle={{marginLeft: 10, marginRight: 15}}
                    underlayColor="rgba(255,255,255,0)"
                    name="dashboard" color="black" size={35}
                />
				<Text style={{fontSize: 22, color: 'black'}}>
					대시보드
				</Text>
			</View>
			<View style={{flexDirection: 'row', marginBottom: 10}}>
				<Icon
                    iconStyle={{marginLeft: 10, marginRight: 15}}
                    underlayColor="rgba(255,255,255,0)"
                    name="date-range" color="black" size={35}
                />
				<Text style={{fontSize: 22, color: 'black'}}>
					달력
				</Text>
			</View>
			<View style={{flexDirection: 'row', marginBottom: 10}}>
				<Icon
                    iconStyle={{marginLeft: 10, marginRight: 15}}
                    underlayColor="rgba(255,255,255,0)"
                    name="accessibility" color="black" size={35}
                />
				<Text style={{fontSize: 22, color: 'black'}}>
					개인정보
				</Text>
			</View>
			<View style={{flexDirection: 'row', marginBottom: 10}}>
				<Icon
                    iconStyle={{marginLeft: 10, marginRight: 15}}
                    underlayColor="rgba(255,255,255,0)"
                    name="thumb-up" color="black" size={35}
                />
				<Text style={{fontSize: 22, color: 'black'}}>
					추천제품
				</Text>
			</View>
		</View>
    );
  }
}