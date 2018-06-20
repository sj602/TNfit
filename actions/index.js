import SQLite from 'react-native-sqlite-storage';
import firebase from 'react-native-firebase';
import { emailDB, emailNormal } from '../utils/helpers';

export const SAVE_AGREEEMENT_INFO = 'SAVE_AGREEEMENT_INFO';
export const SAVE_USER_INFO = 'SAVE_USER_INFO';
export const SAVE_FOOD_INFO = 'SAVE_FOOD_INFO';
export const SAVE_WORKOUT_INFO = 'SAVE_WORKOUT_INFO';
export const CALCULATE_RESULT = 'CALCULATE_RESULT';
export const SAVE_DB = 'SAVE_DB';
export const CHECK_FOOD= 'CHECK_FOOD';
export const SAVE_METABOLISM = 'SAVE_METABOLISM';
export const SET_DAY = 'SET_DAY';
export const LOAD_PERSONAL_DATA = 'LOAD_PERSONAL_DATA';
export const LOAD_HISTORY_DATA = 'LOAD_HISTORY_DATA';

export const saveAgreementInfo = (data) => dispatch => {
	return dispatch({type: SAVE_AGREEEMENT_INFO, data})
}

export const saveUserInfo = (data) => dispatch => {
	return dispatch({type: SAVE_USER_INFO, data})
}

export const saveFoodInfo = (eatenFoodList, category) => dispatch => {
	let carb = 0, protein = 0, fat = 0;

	eatenFoodList.map(food => {
		carb += Number(food.carb.replace(/[g]/g, ''));
		protein += Number(food.protein.replace(/[g]/g, ''));
		fat += Number(food.fat.replace(/[g]/g, ''));
	})

    let addedFoodCalories = 0;
    eatenFoodList = eatenFoodList.map(food => ({
        ...food,
        "calorie": food.calorie.replace(/[kcal]/g, '')
    }));

    eatenFoodList.map(food => addedFoodCalories += Number(food.calorie))
    addedFoodCalories.toFixed(0);


	return dispatch({type: SAVE_FOOD_INFO, eatenFoodList, category, carb, protein, fat, addedFoodCalories})
}

export const saveWorkoutInfo = (data) => dispatch => {
	return dispatch({type: SAVE_WORKOUT_INFO, data})
}

export const calculateResult = (result, foodCalories, workoutCalories, extraCalories) => dispatch => {
	return dispatch({type: CALCULATE_RESULT, result, foodCalories, workoutCalories, extraCalories})
}

export const saveDB = (foodList) => dispatch => {
	return dispatch({type: SAVE_DB, foodList})
}

export const checkFood = (food, index) => dispatch => {
	return dispatch({type: CHECK_FOOD, food, index})
}

export const saveMetabolism = (userInfo) => dispatch => {
	let { gender, weight, height, age } = userInfo;
	weight = Number(weight);
	height = Number(height);
	age = Number(age);

    let metabolism = 0;

    if(gender === '남성') {
      metabolism = 66.47 + (13.75 * weight) + (5 * height) - (6.76 - age);
    } else {
      metabolism = 655.1 + (9.56 * weight) + (1.85 * height) - (4.68 - age);
    }
    metabolism = Math.floor(metabolism);

	return dispatch({type: SAVE_METABOLISM, metabolism})
}

export const setDay = (day) => dispatch => {
	return dispatch({type: SET_DAY, day});
}

export const loadPersonalData = (email) => dispatch => {
    // email = sj602@naver.com
    // email = ['sj602', 'naver.com']
    console.log('load personal data email', email)
    email = emailDB(email);
    console.log('email after email db', email)

	const database = firebase.database();

	database.ref(`/users`).once('value', (snap) => snap.val()).then(result => {
		let users = Object.keys(result.val())
		let found = users.find(user => user === email);
		if(found) {

			let userInfo = {};
			let res = result.val()[found];

			userInfo.name = res.userInfo.name;
			userInfo.age = res.userInfo.age;
			userInfo.gender = res.userInfo.gender;
			userInfo.height = String(res.userInfo.height);
			userInfo.weight = String(res.userInfo.weight);
			userInfo.targetWeight = String(res.userInfo.targetWeight);
			userInfo.currentlyEatingProduct = res.userInfo.currentlyEatingProduct;
			userInfo.wannaEatProduct = res.userInfo.wannaEatProduct;
			userInfo.agreement = res.userInfo.agreement;

		    email = emailNormal(email);
			userInfo.email = email;

			if(userInfo) return userInfo;

		} else {

		}
	})
	.then((userInfo) => dispatch({type: LOAD_PERSONAL_DATA, userInfo}));
}

export const loadHistoryData = (email, day) => (dispatch) => {
    email = emailDB(email);

	const database = firebase.database();

	database.ref(`/users/${email}/history`).once('value', (snap) => snap.val()).then(result => {
		let dates = Object.keys(result.val())
		let found = dates.find(date => date === day);
		if(found) {

			let historyData = {};
			let res = result.val()[found];

			historyData.foodInfo = res.foodInfo;
			historyData.workoutInfo = res.workoutInfo;
			historyData.result = res.result;

			if(historyData) return historyData;

		} else {
			return undefined;
		}
	})
	.then((historyData) => {
		if(historyData) {
			dispatch({type: LOAD_HISTORY_DATA, historyData, day});
		}
	});
}