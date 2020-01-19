/* eslint-disable react-hooks/exhaustive-deps */
import React, { Suspense, lazy, useState, useEffect } from "react";
import {
  Route,
  Switch,
  useLocation,
  Link,
  Redirect,
  useHistory
} from "react-router-dom";
import {
  createMuiTheme,
  MuiThemeProvider,
  makeStyles
} from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
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
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles(theme => ({
    root: {
      height: "100vh",
      width: "100vw"
    },
    loadingContainer: {
      height: "100%",
      width: "100%",
      paddingTop: "40%",
      textAlign: "center"
    },
    mainContainer: {
      maxWidth: 2048,
      margin: "0 auto",
      padding: "0 8px",
      display: "flex",
      flexDirection: "column",
      height: "100vh"
    },
    links: {
      display: "flex"
    },
    link: {
      animation: "fadein 1s forwards",
      opacity: 0,
      margin: "8px 4px"
    },
    floating: {
      bottom: 16,
      right: 16,
      paddingLeft: 8,
      zIndex: 1000,
      "& > :first-child": {
        marginRight: 8
      },
      [theme.breakpoints.down(800)]: {
        position: "static"
      }
    },
    pageContainer: {
      flex: 1,
      overflow: "auto",
      zIndex: 1000,
      paddingBottom: 16,
      paddingTop: 16,
      marginBottom: 16,
      borderRadius: 16
    }
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
    Login: lazy(() => import("./Login"))
  };

export default () => {
  const location = useLocation(),
    history = useHistory(),
    isHome =
      location.pathname.split("/")[1] === "" ||
      location.pathname.split("/")[1] === "home",
    palette = useSelector(state => state.lightTheme)
      ? {
          primary: {
            main: "#3e7b63"
          },
          secondary: {
            main: "#3975d6"
          },
          type: "light",
          background: {
            paper: "#fff",
            default: "#f1f3f4"
          }
        }
      : {
          primary: {
            main: "#5AB18E"
          },
          secondary: {
            main: "#39c3d6"
          },
          type: "dark",
          background: {
            paper: "#161616",
            default: "#272727"
          }
        },
    [email, setEmail] = useState(getCookie("email")),
    theme = {
      palette,
      props: {
        MuiButton: {
          color: "primary",
          variant: "contained"
        },
        MuiSwitch: {
          color: "primary"
        }
      },
      overrides: {
        MuiPaper: {
          root: {
            padding: 16,
            boxShadow: "none !important"
          },
          rounded: {
            borderRadius: 16
          }
        },
        MuiToolbar: {
          root: {
            borderRadius: 8
          }
        },
        MuiMenu: {
          paper: {
            padding: 0,
            border: `2px solid ${palette.primary.main}`
          }
        },
        MuiCard: {
          root: {
            borderRadius: 8,
            padding: 0,
            boxShadow: "none",
            backgroundColor: palette.background.default
          }
        },
        MuiCardContent: {
          root: {
            padding: "16px !important"
          }
        },
        MuiButton: {
          root: {
            "&:active, &:focus, &:hover": {
              boxShadow: "none !important"
            },
            boxShadow: "none !important",
            textTransform: "capitalize",
            borderRadius: 8
          },
          label: {
            letterSpacing: "initial",
            fontWeight: 700
          },
          outlined: {
            borderWidth: "2px !important"
          }
        },
        MuiTypography: {
          root: {
            color: createMuiTheme({ palette }).palette.text.primary
          }
        },
        MuiFilledInput: {
          root: {
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8
          }
        },
        MuiDialog: {
          paper: {
            padding: 0,
            margin: 8
            //width: "calc(100% - 16px) !important",
          }
        },
        MuiExpansionPanel: {
          root: {
            backgroundColor: palette.background.default,
            borderRadius: "8px !important",
            marginBottom: 16,
            padding: "0 16px",
            border: "none !important",
            "&:before": {
              display: "none"
            },
            "&:last-child": {
              marginBottom: 0
            }
          }
        },
        MuiExpansionPanelSummary: {
          root: {
            paddingLeft: 0
          }
        },
        MuiExpansionPanelDetails: {
          root: {
            paddingLeft: 8
          }
        },
        MuiAutocomplete: {
          paper: {
            padding: 0,
            paddingBottom: 24,
            border: `2px solid ${palette.primary.main}`,
            height: "auto",
            maxHeight: 256,
            overflow: "auto"
          }
        }
      }
    },
    classes = useStyles(),
    muiTheme = createMuiTheme(theme),
    [mouse, setMouse] = useState([null, null]),
    dispatch = useDispatch(),
    closeMenu = () => {
      setMouse([null, null]);
    },
    contextMenu = e => {
      if (
        !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        e.preventDefault();
        setMouse([e.clientX - 2, e.clientY - 4]);
      }
    },
    back = () => {
      closeMenu();
      history.goBack();
    },
    forward = () => {
      closeMenu();
      history.goForward();
    },
    reload = () => {
      closeMenu();
      window.location.reload();
    },
    copy = () => {
      closeMenu();
      document.execCommand("copy");
    },
    go = route => () => {
      closeMenu();
      history.push("/" + route.toLowerCase());
    };
  useEffect(() => {
    setEmail(getCookie("email"));
  }, [document.cookie]);

  useEffect(() => {
    if (getCookie("email") !== "") {
      fetch(
        "https://maximise.herokuapp.com/users/get_data/subjects",
        {
        method: "POST",
        body: JSON.stringify({
          sessionID: getCookie("sessionID"),
          username: getCookie("email")
        })
      }
      )
        .then(res => res.json())
        .then(data => {
            console.log(data);
            
          if (JSON.stringify(data.errors) !== "{}") {
              console.error(data.errors)
            dispatch({
              type: "NEW_ERROR",
              payload: "There was an error loading your subjects"
            });
          } else {
            dispatch({
              type: "CHANGE_SUBJECTS",
              payload: data.response
            });
          }
        })
        .catch(err => {
          console.error(err);

          dispatch({
            type: "NEW_ERROR",
            payload: "There was an error loading your subjects"
          });
        });
    }
  }, []);
  return (
    <MuiThemeProvider theme={muiTheme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Helmet
          style={[
            {
              cssText: `
                                body, html {
                                    background-color: ${
                                      muiTheme.palette.background.default
                                    };
                                }
                                * {
                                    caret-color: ${
                                      muiTheme.palette.primary.main
                                    };
                                }
                                ::-moz-selection {
                                    color: ${muiTheme.palette.getContrastText(
                                      theme.palette.primary.main
                                    )};
                                    background: ${
                                      muiTheme.palette.primary.main
                                    };
                                }
                                ::selection {
                                    color: ${muiTheme.palette.getContrastText(
                                      theme.palette.primary.main
                                    )};
                                    background: ${
                                      muiTheme.palette.primary.main
                                    };
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
                                    -webkit-box-shadow: 0 0 0px 1000px ${
                                      palette.background.default
                                    } inset !important;
                                    box-shadow: 0 0 0px 1000px ${
                                      palette.background.default
                                    } inset !important;
                                    background-color: ${
                                      palette.background.default
                                    } !important;
                                    -webkit-text-fill-color: ${
                                      muiTheme.palette.text.primary
                                    } !important;
                                    transition: background-color 1000s ease-in-out 0s !important;
                                    border-top-left-radius: 8px !important;
                                    border-top-right-radius: 8px !important;
                                    font-size: 1rem !important;
                                }
                                .padding {
                                    box-shadow: 0px 16px ${
                                      theme.palette.background.paper
                                    }, 0px -16px ${
                theme.palette.background.paper
              } !important;
                                    margin-top: 16px !important;
                                    max-height: calc(100% - 32px);
                                    padding-top: 0px;
                                    padding-bottom: 0px;
                                    border-radius: 16px;
                                    background-color: ${
                                      theme.palette.background.paper
                                    };
                                }
                                .contextMenu {
                                    padding: 0;
                                    border: 2px solid ${
                                      theme.palette.primary.main
                                    };
                                    width: 128px;
                                }
                                .popover {
                                    z-index: 1000000 !important;
                                }
                            `
            }
          ]}
        >
          <meta name="theme-color" content={theme.palette.primary.main} />
          <meta
            name="msapplication-navbutton-color"
            content={theme.palette.primary.main}
          />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content={theme.palette.type === "dark" ? "black" : "default"}
          />
          <title>
            {window.location.pathname !== "/"
              ? window.location.pathname
                  .replace(/\b\w/g, l => l.toUpperCase())
                  .split("/")[1]
              : "Home"}{" "}
            • Maximise
          </title>
        </Helmet>
        <div className={classes.root} onContextMenu={contextMenu}>
          <Menu
            keepMounted
            open={mouse[0] !== null}
            onClose={closeMenu}
            anchorReference="anchorPosition"
            anchorPosition={
              mouse[0] !== null && mouse[1] !== null
                ? { top: mouse[1], left: mouse[0] }
                : undefined
            }
            PaperProps={{
              className: "contextMenu"
            }}
            PopoverClasses={{
              root: "popover"
            }}
          >
            <MenuItem onClick={back}>Back</MenuItem>
            <MenuItem onClick={forward}>Forward</MenuItem>
            <MenuItem onClick={reload}>Reload</MenuItem>
            <MenuItem onClick={copy}>Copy</MenuItem>
            <MenuItem onClick={go("Home")}>Home</MenuItem>
            {Object.keys(components)
              .filter(x => x !== "Signup" && x !== "Login")
              .map(component => (
                <MenuItem onClick={go(component)} key={component}>
                  {component}
                </MenuItem>
              ))}
          </Menu>
          <SnackbarError />
          <div className={classes.mainContainer}>
            {(email !== "" || !isHome) && <TopBar />}
            <div
              className={classes.pageContainer}
              style={{
                marginBottom: isHome ? 0 : 0,
                paddingBottom: isHome ? 0 : 16
              }}
            >
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
                      component={getCookie("email") !== "" ? Home : LandingPage}
                      exact
                      path="/(home||)/"
                    />
                    {Object.keys(components).map(component => {
                      return (
                        <Route
                          render={() => {
                            if (
                              component !== "Login" &&
                              component !== "Signup" &&
                              email === ""
                            ) {
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
              </PageLoadError>
            </div>
            {email !== "" && !isHome && <Navigation />}
            {email !== "" && isHome && (
              <div className={classes.floating}>
                <Button variant="contained" component={Link} to="/help">
                  Help
                </Button>
                <Tooltip title="Settings" placement="top">
                  <IconButton color="default" component={Link} to="/settings">
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
            )}
          </div>
        </div>
      </MuiPickersUtilsProvider>
    </MuiThemeProvider>
  );
};
