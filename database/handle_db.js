import { foodList } from '../database/db_food_json';
import firebase from 'react-native-firebase';

// params
// category: choose which DB to handle(food, workout)
export const fetchDB = (category) => {
  // firebase database setting
  let database = firebase.database();

  // write data to database 1
  // let ref = database.ref().child('workout');
  // ref.set(workout);
  // let ref = database.ref().child('food');
  // ref.set(foodList);

  // var result = {};

  // let ref = database.ref().child(category);

  return database.ref().child(category).once('value', (snap) => snap.val()).then(result => result.val());

  // write data to database 2
  // firebase.database().ref('workout/20').set(
  //   {
  //     name: '가벼운 걷기',
  //     eng_name: 'slow walking',
  //     calories_spent_per_hour: 180,
  //     done: false,
  //     minutes: 0,
  //   }
  // ).then(() => {
  //   console.log('INSERTED');
  // }).catch((error) => {
  //   console.log(error);
  // })
};

export const foodDataAPIURL = "http://openapi.foodsafetykorea.go.kr/api/ae8be43206c148c59e2f/I0750/json/1/1000";

export function fetchFoodData(url) {
  return fetch(url)
    .then(res => res.json())
    .then(data => data.I0750.row)
};
