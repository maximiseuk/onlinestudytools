import getCookie from "../api/cookies";
const defaultTheme = getCookie("theme") !== "";
export default (state = defaultTheme, action) => {
    if (action.type === "TOGGLE_THEME_TYPE") {
        return action.payload;
    } else {
        return state;
    }
};