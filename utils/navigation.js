import { StackNavigator, TabNavigator } from 'react-navigation';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import Main from '../components/Main';
import PersonalInfo from '../components/PersonalInfo';
import WhatFood from '../components/WhatFood';
import WhatWorkout from '../components/WhatWorkout';
import Result from '../components/Result';

export const Stacks = StackNavigator({
  Main: { screen: Main },
  PersonalInfo: { screen: PersonalInfo },
  WhatFood: { screen: WhatFood },
  WhatWorkout: { screen: WhatWorkout },
  Result: { screen: Result },
}, {
  navigationOptions: {
    header: null,
  }
});

export const Tabs = TabNavigator({
  Home: {
    screen: Stacks,
  },
}, {
  tabBarOptions: {
    style: {height:0}
  }
});


// export const Tabs = TabNavigator({
//   개인정보: { screen: PersonalInfo },
//   음식정보: { screen: WhatFood },
//   운동정보: { screen: WhatWorkout },
//   결과: { screen: Result },
// });

// export const Stacks = StackNavigator({
//   Main: { screen: Main },
//   Tabs: Tabs,
// }, {
//   navigationOptions: {
//     header: null,
//   }
// });
