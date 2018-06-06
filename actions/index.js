export const SAVE_AGREEEMENT_INFO = 'SAVE_AGREEEMENT_INFO';
export const SAVE_USER_INFO = 'SAVE_USER_INFO';
export const SAVE_FOOD_INFO = 'SAVE_FOOD_INFO';
export const SAVE_WORKOUT_INFO = 'SAVE_WORKOUT_INFO';
export const CALCULATE_RESULT = 'CALCULATE_RESULT';
export const SAVE_DB = 'SAVE_DB';
export const SAVE_METABOLISM = 'SAVE_METABOLISM';

export const saveAgreementInfo = (data) => dispatch => {
	return dispatch({type: SAVE_AGREEEMENT_INFO, data})
}

export const saveUserInfo = (data) => dispatch => {
	return dispatch({type: SAVE_USER_INFO, data})
}

export const saveFoodInfo = (eatenFoodList, category) => dispatch => {
	return dispatch({type: SAVE_FOOD_INFO, eatenFoodList, category})
}

export const saveWorkoutInfo = (data) => dispatch => {
	return dispatch({type: SAVE_WORKOUT_INFO, data})
}

export const calculateResult = () => dispatch => {
	return dispatch({type: CALCULATE_RESULT})
}

export const saveDB = (foodList) => dispatch => {
	return dispatch({type: SAVE_DB, foodList})
}

export const saveMetabolism = (userInfo) => dispatch => {
	let { gender, weight, height, age } = userInfo;
    let metabolism = 0;

    if(gender === '남성') {
      metabolism = 66.47 + (13.75 * weight) + (5 * height) - (6.76 - age);
    } else {
      metabolism = 655.1 + (9.56 * weight) + (1.85 * height) - (4.68 - age);
    }
    metabolism = Math.floor(metabolism);

	return dispatch({type: SAVE_METABOLISM, metabolism})
}

