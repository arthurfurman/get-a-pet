import { combineReducers, createStore } from "redux";

import userReducer from "./user/user.reducer";
import petsReducer from "./pets/pets.reducer";

const rootReducer = combineReducers({
	user: userReducer,
	pets: petsReducer
});

const store = createStore(rootReducer, (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__());

export default store;
