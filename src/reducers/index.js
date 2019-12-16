import { combineReducers } from "redux";
import theme from "./theme";
import pageTitle from "./pageTitle";
import error from "./error";

export default combineReducers({
    theme, pageTitle, error,
});
