import {
  SAVE_PERSONAL_INFO,
} from '../actions/types';

export default function rootReducer(state = {}, action) {
  switch (action.type) {
    case SAVE_PERSONAL_INFO:
      return {
        ...state,
        PersonalInfo: {
          ...state.PersonalInfo,
          name: action.name,
          gender: action.gender,
        }
      }
    }
}
