import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import { startCase } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
    card: {
        marginBottom: 16,
    },
}));

export default () => {
    const
        classes = useStyles(),
        dispatch = useDispatch(),
        history = useHistory(),
        isLight = useSelector(state => state.lightTheme),
        [lightTheme, setLightTheme] = useState(isLight),
        initialState = {
            oldPassword: "",
            newPassword: "",
            repeatPassword: "",
        },
        [values, setValues] = useState(initialState),
        [helpers, setHelpers] = useState(initialState),
        save = () => {
            const passwordData = helpers.repeatPassword === "" && helpers.password === "" && helpers.oldPassword === "" ? {
                oldPassword: values.oldPassword,
                newPassword: values.newPassword,
            } : {};
            dispatch({
                type: "TOGGLE_THEME_TYPE",
                payload: lightTheme,
            });
            const d = new Date();
            document.cookie = `theme=${lightTheme ? "light" : ""}; expires ${d.getTime() + 4e12}; path=/`;
            /*fetch("/users/update_password", {
                method: "POST",
                credentials: "include",
                body: JSON.stringify({
                    lightTheme,
                    ...passwordData,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then(res => res.json())
            .then(data => {
                if (data === "success") {*/
                    
                /*} else {
                    dispatch({
                        type: "NEW_ERROR",
                        payload: "There was an error updating your settings",
                    });
                }
            })
            .catch(() => {
                dispatch({
                    type: "NEW_ERROR",
                    payload: "There was an error updating your settings",
                });
            });*/
        },
        logout = () => {
            /*fetch("/users/logout", {
                method: "POST",
            })
            .then(res => res.text())
            .then(data => {
                if (data === "success") {*/
                    document.cookie = "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                    document.cookie = "theme=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                    dispatch({
                        type: "TOGGLE_THEME_TYPE",
                        payload: false,
                    });
                    history.replace("/");/*
                } else {
                    dispatch({
                        type: "NEW_ERROR",
                        payload: "There was an error logging you out",
                    });
                }
            })
            
            .catch(() => {
                dispatch({
                    type: "NEW_ERROR",
                    payload: "There was an error logging you out",
                });
            });*/
        },
        handleChange = field => e => {
            setValues({
                ...values,
                [field]: e.target.value,
            });
            let newState = {};
            if (field === "repeatPassword") {
                if (e.target.value.length === 0) {
                    newState = {
                        repeatPassword: "",
                    };
                } else if (e.target.value !== values.newPassword) {
                    newState = {
                        repeatPassword: "Passwords must match",
                    };
                } else {
                    newState = {
                        repeatPassword: "",
                    };
                }
            }
            if (field === "newPassword") {
                if (e.target.value.length < 6) {
                    newState = {
                        newPassword: "Password must at least 6 characters",
                    };
                } else {
                    newState = {
                        newPassword: "",
                    };
                }
                if (e.target.value !== values.newPassword) {
                    newState = {
                        ...newState,
                        repeatPassword: "Passwords must match",
                    };
                } else {
                    newState = {
                        ...newState,
                        repeatPassword: "",
                    };
                }
            }
            if (field === "oldPassword") {
                if (e.target.value.length === 0) {
                    newState = {
                        oldPassword: "Please enter this field",
                    };
                } else {
                    newState = {
                        oldPassword: "",
                    };
                }
            }
            setHelpers({
                ...helpers,
                ...newState,
            });
        };
    return (
        <Paper className="fade padding">
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="h4" gutterBottom>
                        Toggle <span className="highlight">light</span> theme
                    </Typography>
                    <FormGroup row>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={lightTheme}
                                    onChange={e => setLightTheme(e.target.checked)}
                                    value="lightTheme"
                                />
                            }
                            label="Light Theme"
                        />
                    </FormGroup>
                </CardContent>
            </Card>
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="h4" gutterBottom>
                        Change <span className="highlight">password</span>
                    </Typography>
                    <form>
                        <Grid container spacing={2}>
                            {Object.keys(initialState).map(field => (
                                <Grid
                                    item
                                    xs={12}
                                    sm={4}
                                    key={field}
                                >
                                    <TextField
                                        label={startCase(field)}
                                        value={values[field]}
                                        onChange={handleChange(field)}
                                        variant="filled"
                                        helperText={helpers[field] + " "}
                                        fullWidth
                                        error={helpers[field] !== ""}
                                        type="password"
                                        autoComplete="false"
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </form>
                </CardContent>
            </Card>
            <Button variant="contained" onClick={save}>Save</Button>
            <Divider style={{margin: "16px 0",}} />
            <Button variant="contained" onClick={logout}>Logout</Button>
        </Paper>
    );
};