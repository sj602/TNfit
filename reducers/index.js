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
    LOAD_PERSONAL_DATA,
    LOAD_HISTORY_DATA,
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
        dayInfo: {
            date: new Date().toISOString().substring(0, 10),
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
    day: '',
    history: {},
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SAVE_USER_INFO:
            return {
                ...state,
                userInfo: action.data
            }

        case SAVE_FOOD_INFO:
            const { addedFoodCalories, eatenFoodList } = action;

            if (action.category === '아침') {
                return {
                    ...state,
                    userInfo: {
                        ...state.userInfo,
                        dayInfo: {
                            ...state.userInfo.dayInfo,
                            result: {
                                ...state.userInfo.dayInfo.result,
                                carb: state.userInfo.dayInfo.result.carb + action.carb,
                                protein: state.userInfo.dayInfo.result.protein + action.protein,
                                fat : state.userInfo.dayInfo.result.fat + action.fat,
                            }
                        }
                    },
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
                    userInfo: {
                        ...state.userInfo,
                        dayInfo: {
                            ...state.userInfo.dayInfo,
                            result: {
                                ...state.userInfo.dayInfo.result,
                                carb: state.userInfo.dayInfo.result.carb + action.carb,
                                protein: state.userInfo.dayInfo.result.protein + action.protein,
                                fat : state.userInfo.dayInfo.result.fat + action.fat,
                            }
                        }
                    },
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
                    userInfo: {
                        ...state.userInfo,
                        dayInfo: {
                            ...state.userInfo.dayInfo,
                            result: {
                                ...state.userInfo.dayInfo.result,
                                carb: state.userInfo.dayInfo.result.carb + action.carb,
                                protein: state.userInfo.dayInfo.result.protein + action.protein,
                                fat : state.userInfo.dayInfo.result.fat + action.fat,
                            }
                        }
                    },
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
                    userInfo: {
                        ...state.userInfo,
                        dayInfo: {
                            ...state.userInfo.dayInfo,
                            result: {
                                ...state.userInfo.dayInfo.result,
                                carb: state.userInfo.dayInfo.result.carb + action.carb,
                                protein: state.userInfo.dayInfo.result.protein + action.protein,
                                fat : state.userInfo.dayInfo.result.fat + action.fat,
                            }
                        }
                    },
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
                    dayInfo: {
                        ...state.userInfo.dayInfo,
                        result: {
                            ...state.userInfo.dayInfo.result,
                            foodCalories: action.foodCalories,
                            workoutCalories: action.workoutCalories,
                            extraCalories: action.extraCalories,
                            scores: action.result
                        }
                    }
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

        case LOAD_PERSONAL_DATA:
            const { userInfo } = action;

            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    name: userInfo.name,
                    age: userInfo.age,
                    gender: userInfo.gender,
                    height: userInfo.height,
                    weight: userInfo.weight,
                    targetWeight: userInfo.targetWeight,
                    currentlyEatingProduct: userInfo.currentlyEatingProduct,
                    wannaEatProduct: userInfo.wannaEatProduct,
                    email: userInfo.email,
                    agreement: userInfo.agreement
                }
            }

        case LOAD_HISTORY_DATA:
            const { foodInfo, workoutInfo, result } = action.historyData;

            return {
                ...state,
                history: {
                    ...state.history,
                    [action.day]: {
                        foodInfo: {
                            breakfast: {
                                calories: foodInfo.breakfast.calories,
                                list: foodInfo.breakfast.list,
                            },
                            lunch: {
                                calories: foodInfo.lunch.calories,
                                list: foodInfo.lunch.list,
                            },
                            dinner: {
                                calories: foodInfo.dinner.calories,
                                list: foodInfo.dinner.list,
                            },
                            dessert: {
                                calories: foodInfo.dessert.calories,
                                list: foodInfo.dessert.list,
                            }
                        },
                        workoutInfo: {
                            calories: workoutInfo.calories,
                            list: workoutInfo.list
                        },
                        result: {
                            foodCalories: result.foodCalories,
                            workoutCalories: result.workoutCalories,
                            extraCalories: result.extraCalories,
                            carb: result.carb,
                            protein: result.protein,
                            fat: result.fat,
                            scores: result.scores,
                        }
                    } 
                }
            }

        default:
            return state;
    }
};