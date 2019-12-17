import React, { Suspense, lazy } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import { createMuiTheme, MuiThemeProvider, makeStyles } from '@material-ui/core/styles';
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import CircularProgress from "@material-ui/core/CircularProgress";
import PageLoadError from "./PageLoadError";
import Page404 from "./Page404";
import TopBar from "./TopBar";
import Navigation from "./Navigation";
import SnackbarError from "./SnackbarError";
import getCookie from "../api/cookies";

const useStyles = makeStyles(theme => ({
    root: {
        height: "100vh",
        width: "100vw",
    },
    loadingContainer: {
        height: "100%",
        width: "100%",
        paddingTop: "40%",
        textAlign: "center",
    },
    mainContainer: {
        maxWidth: 2048,
        margin: "0 auto",
        padding: "0 16px",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
    },
    links: {
        display: "flex",
    },
    link: {
        animation: "fadein 1s forwards",
        opacity: 0,
        margin: "8px 4px",
    },
}));

export default () => {
    const
        location = useLocation(),
        palette = useSelector(state => state.theme),
        theme = {
            palette,
            props: {
                MuiButton: {
                    color: "primary",
                },
            },
            overrides: {
                MuiPaper: {
                    root: {
                        padding: 16,
                        boxShadow: "none",
                    },
                    rounded: {
                        borderRadius: 16,
                    },
                },
                MuiCard: {
                    root: {
                        borderRadius: 8,
                        padding: 0,
                        boxShadow: "none",
                        backgroundColor: palette.background.default,
                    },
                },
                MuiButton: {
                    root: {
                        "&:active, &:focus, &:hover": {
                            boxShadow: "none",
                        },
                        textTransform: "capitalize",
                        borderRadius: 8,
                    },
                    label: {
                        letterSpacing: "initial",
                        fontWeight: 700,
                    },
                    outlined: {
                        borderWidth: "2px !important",
                    },
                },
                MuiTypography: {
                    root: {
                        color: createMuiTheme({ palette }).palette.text.primary,
                    },
                },
                MuiFilledInput: {
                    root: {
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8,
                    },
                },
            },
        },
        classes = useStyles(),
        muiTheme = createMuiTheme(theme),
        Home = getCookie("email") !== "" ? lazy(() => import("./Home")) : lazy(() => import("./LandingPage")),
        components = getCookie("email") !== "" ? {
            Advice: lazy(() => import("./Advice")),
            Settings: lazy(() => import("./Settings")),
            Help: lazy(() => import("./Help")),
            Goals: lazy(() => import("./Goals")),
            Leaderboard: lazy(() => import("./Leaderboard")),
            Todos: lazy(() => import("./Todos")),
            Timetable: lazy(() => import("./Timetable")),
            Signup: lazy(() => import("./Signup")),
            Login : lazy(() => import("./Login")),
        } : {
            Signup: lazy(() => import("./Signup")),
            Login : lazy(() => import("./Login")),
        };
        
    return (
        <MuiThemeProvider theme={muiTheme}>
            <Helmet
                style={[
                    {
                        cssText: `
                            body, html {
                                background-color: ${muiTheme.palette.background.default};
                            }
                            * {
                                caret-color: ${muiTheme.palette.primary.main};
                            }
                            ::-moz-selection {
                                color: ${muiTheme.palette.getContrastText(theme.palette.secondary.main)};
                                background: ${muiTheme.palette.secondary.main};
                            }
                            ::selection {
                                color: ${muiTheme.palette.getContrastText(theme.palette.secondary.main)};
                                background: ${muiTheme.palette.secondary.main};
                            }
                            .highlight {
                                color: ${palette.primary.main};
                            }
                            input:-webkit-autofill,
                            input:-webkit-autofill:hover,
                            input:-webkit-autofill:focus,
                            input:-webkit-autofill,
                            textarea:-webkit-autofill,
                            textarea:-webkit-autofill:hover,
                            textarea:-webkit-autofill:focus,
                            select:-webkit-autofill,
                            select:-webkit-autofill:hover,
                            select:-webkit-autofill:focus {
                                -webkit-box-shadow: 0 0 0px 1000px ${palette.background.default} inset !important;
                                box-shadow: 0 0 0px 1000px ${palette.background.default} inset !important;
                                background-color: ${palette.background.default} !important;
                                -webkit-text-fill-color: ${muiTheme.palette.text.primary} !important;
                                transition: background-color 1000s ease-in-out 0s !important;
                                border-top-left-radius: 8px !important;
                                border-top-right-radius: 8px !important;
                                font-size: 1rem !important;
                            }
                        `
                    }
                ]}
            >
                <meta
                    name="theme-color"
                    content={theme.palette.primary.main}
                />
                <meta
                    name="msapplication-navbutton-color"
                    content={theme.palette.primary.main}
                />
                <meta
                    name="apple-mobile-web-app-status-bar-style"
                    content={theme.palette.type === "dark" ? "black" : "default"}
                />
                <title>{window.location.pathname !== "/" ? window.location.pathname.replace(/\b\w/g, l => l.toUpperCase()).substr(1) : "Home"} • Maximise</title>
            </Helmet>
            <SnackbarError />
            <div className={classes.root}>
                <div className={classes.mainContainer}>
                    <TopBar />
                    <PageLoadError>
                        <div style={{flex: 1, overflow: "auto", zIndex: 1000, }}>
                            <Suspense
                                fallback={
                                    <div className={classes.loadingContainer}>
                                        <CircularProgress />
                                    </div>
                                }
                            >
                                <Switch location={location}>
                                    <Route
                                        component={Home}
                                        exact
                                        path="/(home||)/"
                                    />
                                    {Object.keys(components).map(component => {
                                        return (
                                            <Route
                                                component={components[component]}
                                                exact
                                                path={`/${component.toLowerCase()}`}
                                                key={component}
                                            />
                                        );
                                    })}
                                    <Route component={Page404} />
                                </Switch>
                            </Suspense>
                        </div>
                    </PageLoadError>
                    <Navigation />
                </div>
            </div>
        </MuiThemeProvider>
    );
};