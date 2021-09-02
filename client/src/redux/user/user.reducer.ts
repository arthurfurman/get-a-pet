import userActionTypes from "./user.action-types";

const INITIAL_STATE = {
	currentUser: {username: "arthurchik"},
};

const userReducer = (state = INITIAL_STATE, action: any) => {
	switch (action.type) {
		case userActionTypes.SET_CURRENT_USER:
			return { ...state, currentUser: action.payload };
		default:
			return state;
	}
};

export default userReducer;