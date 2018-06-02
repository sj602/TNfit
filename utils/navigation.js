import { StackNavigator, DrawerNavigator } from 'react-navigation';
import React from 'react';
import Login from '../components/Login';
import Agreement from '../components/Agreement';
import PersonalInfo from '../components/PersonalInfo';
import Diary from '../components/Diary';
import DiaryDetail from '../components/DiaryDetail';
import Recommendation from '../components/Recommendation';
import WhatFood from '../components/WhatFood';
import DayDetail from '../components/DayDetail';
import FoodDetail from '../components/FoodDetail';
import WhatWorkout from '../components/WhatWorkout';
import Result from '../components/Result';

const Drawer = DrawerNavigator({
  PersonalInfo: { 
    screen: PersonalInfo,
    title: '개인정보'
  },
  Diary: { screen: Diary},
  DiaryDetail: { screen: DiaryDetail}
}, {
  drawerPosition: 'right'
});

export const Stacks = StackNavigator({
  Login: { screen: Login },
  Agreement: { screen: Agreement },
  PersonalInfo: { screen: PersonalInfo },
  // Drawer: { screen: Drawer },
  Diary: { screen: Diary },
  DiaryDetail: { screen: DiaryDetail },
  Recommendation: { screen: Recommendation },
  WhatFood: { screen : WhatFood},
  DayDetail: { screen : DayDetail},
  FoodDetail: { screen : FoodDetail},
  WhatWorkout: { screen : WhatWorkout}
}, {
  initialRouteName: 'Agreement',
  navigationOptions: {
    headerTintColor: 'white',
    headerStyle: {backgroundColor: 'rgb(240,82,34)'},
  }
});
