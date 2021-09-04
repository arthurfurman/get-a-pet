import petsActionTypes from "./pets.action-types";

export const setPets = (pets: any) => ({
	type: petsActionTypes.SET_PETS,
	payload: pets,
});
