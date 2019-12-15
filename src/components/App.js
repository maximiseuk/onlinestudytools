import React, { Suspense, lazy } from "react";
import { Route, Switch } from "react-router-dom";
import { createMuiTheme, MuiThemeProvider, makeStyles } from '@material-ui/core/styles';
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import CircularProgress from "@material-ui/core/CircularProgress";
import PageLoadError from "./PageLoadError";
import Page404 from "./Page404";
import TopBar from "./TopBar";

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
    },
}));

export default () => {
    const
        palette = useSelector(state => state.theme),
        theme = {
            palette,
            overrides: {
                MuiPaper: {
                    root: {
                        borderRadius: 16,
                        padding: 16,
                        boxShadow: "none",
                    },
                    rounded: {
                        borderRadius: 16,
                    },
                },
                MuiButton: {
                    root: {
                        "&:active, &:focus, &:hover": {
                            boxShadow: "none",
                        },
                        borderRadius: 8,
                    },
                },
                MuiTypography: {
                    root: {
                        color: createMuiTheme({ palette }).palette.text.primary,
                    },
                },
            },
        },
        { pageTitle } = useSelector(state => state),
        classes = useStyles(),
        muiTheme = createMuiTheme(theme),
        Home = lazy(() => import("./Home")),
        components = {
            Signup: lazy(() => import("./Signup")),
            Login : lazy(() => import("./Login")),
            Settings: lazy(() => import("./Settings")),
            Help: lazy(() => import("./Help")),
            Goals: lazy(() => import("./Goals")),
            Leaderboard: lazy(() => import("./Leaderboard")),
            Todos: lazy(() => import("./Todos")),
            Timetable: lazy(() => import("./Timetable")),
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
                <title>{pageTitle} • Maximise</title>
            </Helmet>
            <Route
                render={({ location }) => (
                    <div className={classes.root}>
                        <div className={classes.mainContainer}>
                            <TopBar />
                            <PageLoadError>
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
                                                    path={`/${component.toLowerCase()}/`}
                                                    key={component}
                                                />
                                            );
                                        })}
                                        <Route component={Page404} />
                                    </Switch>
                                </Suspense>
                            </PageLoadError>
                        </div>
                    </div>
                )}
            />
        </MuiThemeProvider>
    );
};