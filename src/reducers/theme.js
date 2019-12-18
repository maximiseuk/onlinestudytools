const
    darkTheme = {
        primary: {
            main: "#5AB18E",
        },
        secondary: {
            main: "#5AB18E",
        },
        type: "dark",
        background: {
            paper: "#161616",
            default: "#272727",
        },
    },
    lightTheme = {
        primary: {
            main: "#3e7b63",
        },
        secondary: {
            main: "#3e7b63",
        },
        type: "light",
        background: {
            paper: "#fff",
            default: "#f1f3f4",
        },
    };
export default (state = darkTheme, action) => {
    if (action.type === "TOGGLE_THEME_TYPE") {
        return action.payload ? lightTheme : darkTheme;
    } else {
        return state;
    }
};