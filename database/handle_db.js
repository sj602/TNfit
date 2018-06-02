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

  let ref = database.ref().child(category);
  // if(category === 'food') {
  return database.ref().child(category).once('value', (snap) => snap.val()).then(result => result.val());
  // } else {
  //   return database.ref().child(category).once('value', (snap) => snap.val()).then(result => result.val());
  // }
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