import SQLite from 'react-native-sqlite-storage';
import firebase from 'react-native-firebase';

export const SAVE_AGREEEMENT_INFO = 'SAVE_AGREEEMENT_INFO';
export const SAVE_USER_INFO = 'SAVE_USER_INFO';
export const SAVE_FOOD_INFO = 'SAVE_FOOD_INFO';
export const SAVE_WORKOUT_INFO = 'SAVE_WORKOUT_INFO';
export const CALCULATE_RESULT = 'CALCULATE_RESULT';
export const SAVE_DB = 'SAVE_DB';
export const CHECK_FOOD= 'CHECK_FOOD';
export const SAVE_METABOLISM = 'SAVE_METABOLISM';
export const SET_DAY = 'SET_DAY';
export const LOAD_DATA = 'LOAD_DATA';

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

export const loadData = (email) => dispatch => {
    // let foodDB = SQLite.openDatabase({name : "db", createFromLocation : "~database.db", location: 'Library'}, () => console.log('success'), () => console.log('err'));
    // let userInfo = [];

    // foodDB.transaction(txn => {
    //   txn.executeSql('show tables', [], (tx, res) => {
    //   	console.log('res', res)
    //   });
    // });

    // email = sj602@naver.com
    // email = sj602, naver.com
    email = email.split("@");
    email[1] = email[1].replace(/[.]/g, '-');
    email = email.join("@");

	let database = firebase.database();

	database.ref(`/users/${email}/userInfo`).once('value', (snap) => snap.val()).then(result => {

		let userInfo = {};
		let res = result.val();

		userInfo.name = res.name;
		userInfo.age = res.age;
		userInfo.gender = res.gender;
		userInfo.height = String(res.height);
		userInfo.weight = String(res.weight);
		userInfo.targetWeight = String(res.targetWeight);
		userInfo.currentlyEatingProduct = res.currentlyEatingProduct;
		userInfo.wannaEatProduct = res.wannaEatProduct;

	    let email = res.email.split("@");
	    email[1] = email[1].replace(/[-]/g, '.');
	    email = email.join("@");
		userInfo.email = email;

		if(userInfo) return userInfo;
	}).then((userInfo) => dispatch({type: LOAD_DATA, userInfo}));
}
