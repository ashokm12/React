import counterReducer  from "./counter";
import loggedReducer from "./isLogged";
import { combineReducers } from "redux";

// const allReducers = combineReducers({
//     counter: counterReducer,
//     isLoggedUser: loggedReducer
// });

// export default allReducers;

export default combineReducers({
    counter:    counterReducer,
    isLogged: loggedReducer
});