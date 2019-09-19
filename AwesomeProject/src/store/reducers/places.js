import { ADD_PLACE, SELECT_PLACE, DELETE_PLACE, DESELECT_PLACE } from '../actions/actionTypes';

import beautifulImage from '../../assets/beautiful-place.jpg'

const initalState = {
    places: [],
    selectedPlace: null
}

const reducer = (state=initalState, action) => {
    switch(action.type) {
        case ADD_PLACE:
            console.log("image uri", beautifulImage.uri)
            newState = {
                ...state,
                places : state.places.concat({
                    name: action.placeName, 
                    key: ""+Math.random(),
                    //image: placeImage
                    image: beautifulImage })
            }
            return newState;
        case SELECT_PLACE:
            return {
                ...state,
                selectedPlace: state.places.find((place) => place.key === action.placeKey)
            }
        case DELETE_PLACE:
            const placeKey = action.placeKey != null ? action.placeKey : state.selectedPlace.placeKey
            return {
                ...state,
                places: state.places.filter((place) => place.key !== placeKey),
                selectedPlace: null
            }
        case DESELECT_PLACE:
            return {
                ...state,
                selectedPlace: null
            }
        default:
            return state;
    }
}


export default reducer;
