/* eslint-disable react-hooks/exhaustive-deps */
import React, { Suspense, lazy, useState, useEffect } from "react";
import { Route, Switch, useLocation, Link, Redirect } from "react-router-dom";
import { createMuiTheme, MuiThemeProvider, makeStyles } from '@material-ui/core/styles';
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import SettingsIcon from "@material-ui/icons/Settings";
import Tooltip from "@material-ui/core/Tooltip";
import PageLoadError from "./PageLoadError";
import Page404 from "./Page404";
import TopBar from "./TopBar";
import Navigation from "./Navigation";
import SnackbarError from "./SnackbarError";
import getCookie from "../api/cookies";

const
    useStyles = makeStyles(theme => ({
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
            padding: "0 8px",
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
        floating: {
            position: "absolute",
            bottom: 16,
            right: 16,
            zIndex: 1000,
            "& > :first-child": {
                marginRight: 8,
            },
            [theme.breakpoints.down(800)]: {
                position: "static",
            },
        },
        pageContainer: {
            height: "calc(100% - 64px)",
            //flex: 1,
            //overflow: "auto",
            zIndex: 1000, 
            paddingBottom: 8,
            marginBottom: 16,
        },
    })),
    Home = lazy(() => import("./Home")),
    LandingPage = lazy(() => import("./LandingPage")),
    components = {
        Advice: lazy(() => import("./Advice")),
        Settings: lazy(() => import("./Settings")),
        Help: lazy(() => import("./Help")),
        Goals: lazy(() => import("./Goals")),
        Agenda: lazy(() => import("./Agenda")),
        Timetable: lazy(() => import("./Timetable")),
        Signup: lazy(() => import("./Signup")),
        Login: lazy(() => import("./Login")),
    };

export default () => {
    const
        location = useLocation(),
        isHome = location.pathname.split("/")[1] === ""
            || location.pathname.split("/")[1] === "home",
        palette = useSelector(state => state.lightTheme)
            ? {
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
            }
            : {
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
        [email, setEmail] = useState(getCookie("email")),
        theme = {
            palette,
            props: {
                MuiButton: {
                    color: "primary",
                    variant: "contained",
                },
                MuiDialog: {
                    fullWidth: true,
                },
            },
            overrides: {
                MuiPaper: {
                    root: {
                        padding: 16,
                        boxShadow: "none !important",
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
                MuiCardContent: {
                    root: {
                        padding: "16px !important",
                    },
                },
                MuiButton: {
                    root: {
                        "&:active, &:focus, &:hover": {
                            boxShadow: "none !important",
                        },
                        boxShadow: "none !important",
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
                MuiDialog: {
                    paper: {
                        padding: 0,
                        margin: 8,
                        width: "calc(100% - 16px) !important",
                    },
                },
                MuiExpansionPanel: {
                    root: {
                        backgroundColor: palette.background.default,
                        borderRadius: "8px !important",
                        marginBottom: 16,
                        padding: "0 16px",
                        border: "none !important",
                        "&:before": {
                            display: "none",
                        },
                        "&:last-child": {
                            marginBottom: 0,
                        },
                    },
                },
                MuiExpansionPanelSummary: {
                    root: {
                        paddingLeft: 0,
                    },
                },
                MuiExpansionPanelDetails: {
                    root: {
                        paddingLeft: 8,
                    },
                },
            },
        },
        classes = useStyles(),
        muiTheme = createMuiTheme(theme);
    useEffect(() => {
        setEmail(getCookie("email"));
    }, [document.cookie]);
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
                            .padding {
                                box-shadow: 0px 16px ${theme.palette.background.paper}, 0px -16px ${theme.palette.background.paper} !important;
                                padding: 0 16px;
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
                <title>{window.location.pathname !== "/" ? window.location.pathname.replace(/\b\w/g, l => l.toUpperCase()).split("/")[1] : "Home"} • Maximise</title>
            </Helmet>
            <SnackbarError />
            <div className={classes.root}>
                <div className={classes.mainContainer}>
                    {(email !== "" || !isHome) && <TopBar />}
                    <PageLoadError>
                        <div className={classes.pageContainer}>
                            <Suspense
                                fallback={
                                    <div className={classes.loadingContainer}>
                                        <CircularProgress />
                                    </div>
                                }
                            >
                                <Switch location={location}>
                                    <Route
                                        component={getCookie("email") !== "" ? Home : LandingPage}
                                        exact
                                        path="/(home||)/"
                                    />
                                    {Object.keys(components).map(component => {
                                        return (
                                            <Route
                                                render={() => {
                                                    if (component !== "Login" && component !== "Signup" && email === "") {
                                                        return <Redirect to="/login" />;
                                                    }
                                                    const Comp = components[component];
                                                    return <Comp />;
                                                }}
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
                    {email !== "" && !isHome && <Navigation />}
                    {email !== "" && isHome &&
                        <div className={classes.floating}>
                            <Button
                                variant="contained"
                                component={Link}
                                to="/help"
                            >
                                Help
                            </Button>
                            <Tooltip title="Settings" placement="top">
                                <IconButton
                                    color="default"
                                    component={Link}
                                    to="/settings"
                                >
                                    <SettingsIcon
                                        style={{
                                            height: 36,
                                            width: 36,
                                            color: palette.type === "light" ? "black" : "white"
                                        }}
                                    />
                                </IconButton>
                            </Tooltip>
                        </div>
                    }
                </div>
            </div>
        </MuiThemeProvider>
    );
};