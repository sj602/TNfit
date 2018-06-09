import {
    SAVE_AGREEEMENT_INFO,
    SAVE_USER_INFO,
    SAVE_FOOD_INFO,
    SAVE_WORKOUT_INFO,
    CALCULATE_RESULT,
    SAVE_DB,
    CHECK_FOOD,
    SAVE_METABOLISM,
} from '../actions';

const initialState = {
    userInfo: {
        id: '',
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
                eatenCalories: '',
                spentCalories: '',
                extraCalories: '',
                carb: '',
                protein: '',
                fat: '',
                score: '',
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

    }
};

export default function appReducer(state = initialState, action) {
    switch (action.type) {
        case SAVE_USER_INFO:
            return {
                ...state,
                userInfo: action.data
            }

        case SAVE_FOOD_INFO:
            let addedFoodCalories = 0;
            action.eatenFoodList.map(food => addedFoodCalories += food['열량 (kcal)']);
            addedFoodCalories.toFixed(0);

            if (action.category === '아침') {
                return {
                    ...state,
                    foodInfo: {
                        ...state.foodInfo,
                        breakfast: {
                            calories: state.foodInfo.breakfast.calories + addedFoodCalories,
                            list: action.eatenFoodList
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
                            list: action.eatenFoodList
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
                            list: action.eatenFoodList
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
                            list: action.eatenFoodList
                        }
                    }
                }
            }

        case SAVE_WORKOUT_INFO:
            const addedWorkoutCalories = 0;
            action.data.map((item) => addedWorkoutCalories += item['calories_spent_per_hour'] * item['minutes'] / 60);
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
            const newFoodLIst = Array.prototype.slice.call(state.foodInfo.foodList);
            newFoodLIst[action.index] = action.food;

            return {
              ...state,
              foodInfo: {
                ...state.foodInfo,
                foodList: newFoodLIst
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