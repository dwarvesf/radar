// #region Global Imports
import { combineReducers } from "redux";
// #endregion Global Imports

// #region Local Imports
import { HomeReducer } from "./home";
import { DetailsReducer } from "./details";
// #endregion Local Imports

export default combineReducers({
    details: DetailsReducer,
    home: HomeReducer,
});
