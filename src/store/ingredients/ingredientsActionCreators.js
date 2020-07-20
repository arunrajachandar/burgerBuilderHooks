import * as actionTypes from './ingredientsActions';
import axios from '../../axios-order';

export const addIngredients = (ingredientName) =>{
    return {
        type: actionTypes.ADD_INGREDIENTS, 
        payload: {
            ingredientName
        }
    }
}

export const removeIngredients = (ingredientName) =>{
    return {
        type: actionTypes.REMOVE_INGREDIENTS, 
        payload: {
            ingredientName
        }
    }
}

const loadIngredients = (ingredients) =>{
    return{
        type: actionTypes.INIT_INGREDIENTS,
        payload: {
            ingredients: ingredients
        }
    }
}

const failedtoLoadIngredients = () =>{
    return{
        type: actionTypes.FAILED_INGREDIENTS
    }
}


export const initIngredients = () =>{
    return dispatch =>{
        axios.get('./ingredients.json')
        .then(resp=>
                {
                    if(resp.data){
                        return dispatch(loadIngredients(resp.data))
                    }
                    throw new Error()
                }
)
        .catch( e=>{
            return dispatch(failedtoLoadIngredients())
        }
)
    }
}