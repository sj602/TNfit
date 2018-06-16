import { StackNavigator, DrawerNavigator } from 'react-navigation';
import React from 'react';
import Login from '../components/Login';
import SignUp from '../components/SignUp';
import Agreement from '../components/Agreement';
import ForgotPassword from '../components/ForgotPassword';
import PersonalInfo from '../components/PersonalInfo';
import Diary from '../components/Diary';
import DiaryDetail from '../components/DiaryDetail';
import Recommendation from '../components/Recommendation';
import WhatFood from '../components/WhatFood';
import DayDetail from '../components/DayDetail';
import FoodDetail from '../components/FoodDetail';
import WhatWorkout from '../components/WhatWorkout';
import Result from '../components/Result';
import CustomDrawer from '../components/CustomDrawer';

const DiaryStacks = StackNavigator({
    Diary: { screen: Diary },
});

const PersonalInfoStacks = StackNavigator({
    PersonalInfo: { screen: PersonalInfo },
});

const DiaryDetailStacks = StackNavigator({
    DiaryDetail: { screen: DiaryDetail },
    WhatFood: { screen: WhatFood },
    DayDetail: { screen: DayDetail },
    FoodDetail: { screen: FoodDetail },
    WhatWorkout: { screen: WhatWorkout },
});

const RecommendationStack = StackNavigator({
    Recommendation: { 
        screen: Recommendation,
    }
})

const LoginStacks = StackNavigator({
    Login: { screen: Login },
    ForgotPassword: { screen: ForgotPassword },
    Agreement: { screen: Agreement },
    SignUp: { screen: SignUp },
});

const Drawer = DrawerNavigator({
    DiaryDetail: { 
        screen: DiaryDetailStacks,
    },
    Diary: { 
        screen: DiaryStacks,
    },
    PersonalInfo: {
        screen: PersonalInfoStacks,
    },    
    Recommendation: { 
        screen: RecommendationStack,
    }
}, {
    navigationOptions: {
        headerTintColor: 'white',
        headerStyle: { backgroundColor: 'rgb(240,82,34)' },
    },
    // contentComponent: CustomDrawer
});

export const Stacks = StackNavigator({
    LoginStacks: { screen: LoginStacks },
    Drawer: { screen: Drawer }
}, {
    headerMode: 'none'
});