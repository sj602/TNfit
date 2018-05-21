import { StackNavigator } from 'react-navigation';
import React from 'react';
import Login from '../components/Login';
import Main from '../components/Main';
import PersonalInfo from '../components/PersonalInfo';
import WhatFood from '../components/WhatFood';
import EatenFoodList from '../components/EatenFoodList';
import WhatWorkout from '../components/WhatWorkout';
import Result from '../components/Result';

export const Stacks = StackNavigator({
  Login: { screen: Login },
  Main: { screen: Main },
  PersonalInfo: { screen: PersonalInfo },
  WhatFood: { screen: WhatFood },
  EatenFoodList: { screen: EatenFoodList},
  WhatWorkout: { screen: WhatWorkout },
  Result: { screen: Result },
}, {
  initialRouteName: 'Login',
  navigationOptions: {
    header: null,
  }
});
