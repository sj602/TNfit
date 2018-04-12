import {
  SAVE_PERSONAL_INFO,
  INIT_WORKOUT_LIST,
} from '../actions/types';
import { workoutList } from '../database/db_workout';

const initialState = {
  PersonalInfo: {},
  WhatWorkout: {
    workoutList
  },
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_PERSONAL_INFO:
      return {
        ...state,
        PersonalInfo: {
          ...state.PersonalInfo,
          name: action.personalInfo.name,
          gender: action.personalInfo.manChecked ? 'male' : 'female',
          weight: action.personalInfo.weight,
          height: action.personalInfo.height,
          targetWeight: action.personalInfo.tartgetWeight,
        }
      }
    default:
      return state;
  }
}
