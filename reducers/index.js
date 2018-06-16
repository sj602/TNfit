import {
    SAVE_AGREEEMENT_INFO,
    SAVE_USER_INFO,
    SAVE_FOOD_INFO,
    SAVE_WORKOUT_INFO,
    CALCULATE_RESULT,
    SAVE_DB,
    CHECK_FOOD,
    SAVE_METABOLISM,
    SET_DAY,
    LOAD_DATA,
} from '../actions';
import { REHYDRATE } from 'redux-persist';

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
        today: {
            date: new Date().toISOString().substring(0, 10),
            eatenFoodList: {
                breakfast: [],
                lunch: [],
                dinner: [],
                dessert: [],
            },
            doneWorkoutList: [],
            result: {
                foodCalories: '',
                workoutCalories: '',
                extraCalories: '',
                carb: '',
                protein: '',
                fat: '',
                scores: '',
            }
        },
        agreement: {
            check: false,
            personalInfo: false,
            receiveEmail: false,
            receiveSMS: false,
        },
    },
    foodInfo: {
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
        },
        foodList: [],
    },
    workoutInfo: {
        calories: 0,
        list: [],
    },
    productList: [],
    result: {
        scores: '',
    },
    database: {

    },
    day: '',
};

// const persistConfig = {
//   key: 'root',
//   storage: storage,
//   whitelist: ['auth', 'notes']
// };

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case REHYDRATE: 
            return {
                ...state
            }

        case SAVE_USER_INFO:
            return {
                ...state,
                userInfo: action.data
            }

        case SAVE_FOOD_INFO:
            let addedFoodCalories = 0, { eatenFoodList } = action;
            eatenFoodList = eatenFoodList.map(food => ({
                ...food,
                "calorie": food.calorie.replace(/[kcal]/g, '')
            }));

            eatenFoodList.map( food => addedFoodCalories += Number(food.calorie) )
            addedFoodCalories.toFixed(0);

            if (action.category === '아침') {
                return {
                    ...state,
                    foodInfo: {
                        ...state.foodInfo,
                        breakfast: {
                            calories: state.foodInfo.breakfast.calories + addedFoodCalories,
                            list: eatenFoodList
                        }
                    }
                }
            } else if (action.category === '점심') {
                return {
                    ...state,
                    foodInfo: {
                        ...state.foodInfo,
                        lunch: {
                            calories: state.foodInfo.lunch.calories + addedFoodCalories,
                            list: eatenFoodList
                        }
                    }
                }
            } else if (action.category === '저녁') {
                return {
                    ...state,
                    foodInfo: {
                        ...state.foodInfo,
                        dinner: {
                            calories: state.foodInfo.dinner.calories + addedFoodCalories,
                            list: eatenFoodList
                        }
                    }
                }
            } else if (action.category === '간식') {
                return {
                    ...state,
                    foodInfo: {
                        ...state.foodInfo,
                        dessert: {
                            calories: state.foodInfo.dessert.calories + addedFoodCalories,
                            list: eatenFoodList
                        }
                    }
                }
            }

        case SAVE_WORKOUT_INFO:
            const addedWorkoutCalories = 0;
            action.data.map((item) => {
                const doneWorkoutList = state.workoutInfo.list;
                const donelWorkoutNameList = doneWorkoutList.map(workout => workout['name']);
                const alreadyExistIndex = donelWorkoutNameList.indexOf(item['name']);

                if( alreadyExistIndex > -1 && (doneWorkoutList[alreadyExistIndex]['minutes'] !== item['minutes']) ) {
                    console.log(alreadyExistIndex, doneWorkoutList[alreadyExistIndex], item)
                    addedWorkoutCalories += item['calories_spent_per_hour'] * item['minutes'] / 60;
                } else if ( alreadyExistIndex === -1 ) {
                    console.log(alreadyExistIndex, doneWorkoutList[alreadyExistIndex], item)
                    addedWorkoutCalories += item['calories_spent_per_hour'] * item['minutes'] / 60;
                }
            });
            addedWorkoutCalories.toFixed(0);

            return {
                ...state,
                workoutInfo: {
                    calories: state.workoutInfo.calories + addedWorkoutCalories,
                    list: action.data
                }
            }

        case CALCULATE_RESULT:
            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    today: {
                        ...state.userInfo.today,
                        result: {
                            ...state.userInfo.today.result,
                            foodCalories: action.foodCalories,
                            workoutCalories: action.workoutCalories,
                            extraCalories: action.extraCalories,
                            scores: action.result
                        }
                    }
                },
                result: {
                    scores: action.result
                }
            }

        case SAVE_DB:
            return {
                ...state,
                foodInfo: {
                    ...state.foodInfo,
                    foodList: action.foodList
                }
            }

        case CHECK_FOOD:
            const newFoodList = Array.prototype.slice.call(state.foodInfo.foodList);
            if(!action.index) {
                let index = newFoodList.findIndex(food => food['name'] === action.food['name']);
                newFoodList[index] = action.food;
            } else {
                newFoodList[action.index] = action.food;
            }

            return {
              ...state,
              foodInfo: {
                ...state.foodInfo,
                foodList: newFoodList
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

        case SET_DAY:
            return {
                ...state,
                day: action.day
            }

        case LOAD_DATA:
            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    name: action.userInfo.name,
                    age: action.userInfo.age,
                    gender: action.userInfo.gender,
                    height: action.userInfo.height,
                    weight: action.userInfo.weight,
                    targetWeight: action.userInfo.targetWeight,
                    currentlyEatingProduct: action.userInfo.currentlyEatingProduct,
                    wannaEatProduct: action.userInfo.wannaEatProduct,
                    email: action.userInfo.email
                }
            }

        default:
            return state;
    }
};