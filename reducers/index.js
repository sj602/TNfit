import {
  SAVE_AGREEEMENT_INFO,
  SAVE_USER_INFO,
  SAVE_FOOD_INFO,
  SAVE_WORKOUT_INFO,
  CALCULATE_RESULT,
  SAVE_DB,
  SAVE_METABOLISM,
} from '../actions';

const initialState = {
  userInfo: {
    name: '',
    age: '',
    gender: '',
    height: '',
    weight: '',
    targetWeight: '',
    currentlyEatingProduct: '',
    wannaEatProduct: '',
    email: '',
    metabolism: '',
    db: {},
    today: {
      date: new Date().toISOString().substring(0,10),
      eatenFoodList: {
        breakfast: [],
        lunch: [],
        dinner: [],
        dessert: [],
      },
      doneWorkoutList: [
      ],
      result: {
        eatenCalories: '',
        spentCalories: '',
        extraCalories: '',
        carb: '',
        protein: '',
        fat: '',
        score: '',
      }
    }
  },
  foodInfo: {
    foodList: [],
    breakfast: {
      calories: 0,
      list: [],
    },
    lunch: {
      calories: 0,
      list: [],
    },
    dinner: {
      calories: 0,
      list: [],
    },
    dessert: {
      calories: 0,
      list: [],
    }
  },
  workoutInfo: {
    calories: 0,
    list: [],
  },
  result: {
    scores: '',
  },
  agreement: {
    personalInfo: false,
    receiveEmail: false,
    receiveSMS: false,
  }
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_USER_INFO:
      return {
        ...state,
        userInfo: action.data
      }

    case SAVE_FOOD_INFO:
      if(action.category === '아침') {
        return {
          ...state,
          foodInfo: {
            ...state.foodInfo,
            breakfast: action.eatenFoodList
          }
        }
      } else if (action.category === '점심') {
        return {
          ...state,
          foodInfo: {
            ...state.foodInfo,
            lunch: action.eatenFoodList
          }
        }
      } else if (action.category === '저녁') {
        return {
          ...state,
          foodInfo: {
            ...state.foodInfo,
            dinner: action.eatenFoodList
          }
        }
      } else {
        return {
          ...state,
          foodInfo: {
            ...state.foodInfo,
            dessert: action.eatenFoodList
          }
        }
      }

    case SAVE_WORKOUT_INFO:
      const addedCalories = 0;
      action.data.map((item) => addedCalories += item['calories_spent_per_hour'] * item['minutes'] / 60);

      // let copiedDoneWorkoutList = Array.prototype.slice.call(this.state.userInfo.today.doneWorkoutList);
      // copiedDoneWorkoutList.push(action.data);

      return {
        ...state,
        workoutInfo: {
          calories: state.workoutInfo.calories + addedCalories,
          list: action.data
        }
      }

    case CALCULATE_RESULT:
      return {
        ...state,

      }

    case SAVE_DB:
      console.log('action dispatched')
      return {
        ...state,
        foodInfo: {
          ...state.foodInfo,
          foodList: action.foodList
        }
      }

    case SAVE_METABOLISM:
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          metabolism: action.metabolism
        }
      }

    default:
      return state;
  }
};