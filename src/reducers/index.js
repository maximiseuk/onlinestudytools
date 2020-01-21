import { combineReducers } from "redux";
import lightTheme from "./theme";
import pageTitle from "./pageTitle";
import error from "./error";
import subjects from "./subjects";

export default combineReducers({
    lightTheme, pageTitle, error, subjects
});
