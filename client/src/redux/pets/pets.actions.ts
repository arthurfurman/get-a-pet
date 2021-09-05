import petsActionTypes from "./pets.action-types";

export const setPets = (pets: any) => ({
	type: petsActionTypes.SET_PETS,
	payload: pets,
});

export const addPet = (pet: any) => ({
	type: petsActionTypes.ADD_PET,
	payload: pet,
});

export const removePet = (petId: number) => ({
	type: petsActionTypes.REMOVE_PET,
	payload: petId,
});