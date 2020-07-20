import * as actionTypes from './ingredientsActions';

const initState = {
    ingredients: null,
    totalPrice: 4,
    purchaseable: false,
    error: false
}

const INGREDIENT_PRICES ={
    salad: 0.5,
    meat: 1,
    cheese: 0.75,
    bacon: 0.9
}

const reducer = (state=initState, action) =>{
    switch(action.type){
        case actionTypes.ADD_INGREDIENTS:
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.payload.ingredientName] : state.ingredients[action.payload.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.payload.ingredientName],
                purchaseable: true
            }

    case actionTypes.REMOVE_INGREDIENTS:
        const sum = Object.keys(state.ingredients).reduce((acc,igKey)=>
        acc+state.ingredients[igKey],0);
        return{
            ...state,
            ingredients:{
                ...state.ingredients,
                [action.payload.ingredientName] : sum > 0 ? state.ingredients[action.payload.ingredientName] - 1 : state.ingredient[action.payload.ingredientName]
            },
            totalPrice: sum > 0 ? state.totalPrice - INGREDIENT_PRICES[action.payload.ingredientName] : state.totalPrice,
            purchaseable: sum > 1
        }
        case actionTypes.INIT_INGREDIENTS:
            return{
                ...state,
                ingredients: action.payload.ingredients,
                totalPrice: 4,
                error: false,
                purchaseable: false
            }            
        case actionTypes.FAILED_INGREDIENTS:
            return{
                    ...state,
                    error: !state.error
                }            

    default:
        return state
    }
}

export default reducer;