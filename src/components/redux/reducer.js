import { ADD_FAV, FILTER, ORDER, REMOVE_FAV } from "./action-types";

const initialState = {
    myFavorites:[],
    allCharacters:[]
}

export default function reducer(state=initialState, action){
    switch (action.type){
        case ADD_FAV:
            return {
                ...state,
                allCharacters:[...state.allCharacters, action.payload],
                myFavorites:[...state.myFavorites, action.payload]
            } 
        case REMOVE_FAV:
            const filteredChars = state.myFavorites.filter(
                favorite => favorite.id !== Number(action.payload)
            )
            return {
                ...state,
                allCharacters:filteredChars,
                myFavorites:filteredChars
            }
        case FILTER:{
            if(action.payload === 'All') return{ ...state, myFavorites:state.allCharacters }
            const filteredall = state.allCharacters.filter(
                all => all.gender === action.payload
            )
            return {
                ...state,
                myFavorites: filteredall
            }}
        case ORDER:
            const ordCopy = [...state.myFavorites]
            if(action.payload==='A'){
                ordCopy.sort((a, b)=>a.id-b.id)
            }
            if(action.payload==='D'){
                ordCopy.sort((a, b)=>b.id-a.id)
            }
            return {
                ...state,
                myFavorites: ordCopy
            }
        default:
            return {...state}
    }
}