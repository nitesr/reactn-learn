import { ADD_PLACE, SELECT_PLACE, DELETE_PLACE, DESELECT_PLACE } from './actionTypes';

export const addPlace = (placeName) => {
    return {
        type: ADD_PLACE,
        placeName: placeName
    };
}

export const selectPlace = (placeKey) => {
    return {
        type: SELECT_PLACE,
        placeKey: placeKey
    }
}

export const deletePlace = (placeKey) => {
    return {
        type: DELETE_PLACE,
        placeKey: placeKey
    }
}

export const deselectPlace = () => {
    return {
        type: DESELECT_PLACE
    }
}
