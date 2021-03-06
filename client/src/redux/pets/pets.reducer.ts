import petsActionTypes from "./pets.action-types";

const INITIAL_STATE = {
	pets: [],
};

const petsReducer = (state = INITIAL_STATE, action: any) => {
	switch (action.type) {
		case petsActionTypes.SET_PETS:
			return { ...state, pets: action.payload };
		case petsActionTypes.ADD_PET:
			return { ...state, pets: [...state.pets, action.payload] };
		case petsActionTypes.REMOVE_PET:
			return { ...state, pets: state.pets.filter((pet: any) => pet._id !== action.payload) };
		default:
			return state;
	}
};

export default petsReducer;
