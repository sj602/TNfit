import {
  SAVE_PERSONAL_INFO,
} from './types.js';

// -------------------------- PersonalInfo Actions --------------------------
export const savePersonalInfo = (personalInfo) => dispatch => {
  return dispatch({type: SAVE_PERSONAL_INFO, personalInfo});
};
