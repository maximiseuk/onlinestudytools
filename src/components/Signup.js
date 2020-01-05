/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { Link, useHistory } from "react-router-dom";
import { startCase } from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import getCookie from "../api/cookies";

const useStyles = makeStyles(theme => ({
    password: {
        width: "calc(50% - 4px)",
    },
    repeatPassword: {
        width: "calc(50% - 4px)",
        marginLeft: 8,
    },
    firstName: {
        width: "calc(50% - 4px)",
    },
    lastName: {
        width: "calc(50% - 4px)",
        marginLeft: 8,
    },
}));

export default () => {
    const
        { stringify } = JSON,
        initialState = {
            email: "",
            username: "",
            firstName: "",
            lastName: "",
            code: "",
            password: "",
            repeatPassword: "",
        },
        dispatch = useDispatch(),
        classes = useStyles(),
        [values, setValues] = useState(initialState),
        [helpers, setHelpers] = useState(initialState),
        history = useHistory(),
        login = e => {
            e.preventDefault();
                /*fetch("/users/create", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: stringify({
                        email: values.email,
                        username: values.username,
                        firstName: values.firstName,
                        lastName: values.lastName,
                        password: values.password,
                    }),
                })
                .then(res => res.json())
                .then(data => {
                    if (data.errors !== undefined) {
                        set
                    } else {*/
                        const d = new Date();
                        localStorage.setItem("email", values.email);
                        document.cookie = `email=${values.email}; expires ${d.getTime() + 4e12}; path=/`;
                        history.replace("/home");
                    /*}
                })
                .catch(() => {
                    dispatch({
                        type: "NEW_ERROR",
                        payload: "There was an error logging you in",
                    });
                })
            }*/
        },
        clear = () => {
            setValues(initialState);
            setHelpers(initialState);
        },
        handleChange = field => e => {
            let newState = {};
            if (e.target.value === "") {
                newState = {
                    [field]: "Field required",
                };
            } else {
                newState = {
                    [field]: "",
                };
            }
            if (field === "repeatPassword") {
                if (e.target.value.length === 0) {
                    newState = {
                        repeatPasswordError: "",
                    };
                } else if (e.target.value !== values.password) {
                    newState = {
                        repeatPassword: "Passwords must match",
                    };
                }
            } else if (field === "password") {
                if (e.target.value.length < 6) {
                    newState = {
                        password: "Password must at least 6 characters",
                    };
                }
                if (values.repeatPassword.length === 0) {
                    newState = {
                        ...newState,
                        repeatPassword: "",
                    };
                } else if (values.repeatPassword !== e.target.value) {
                    newState = {
                        ...newState,
                        repeatPassword: "Passwords must match",
                    };
                }
            } else if (field === "email") {
                var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if (!re.test(String(e.target.value).toLowerCase())) {
                    newState = {
                        email: "Email address invalid",
                    };
                }
            }
            setValues({
                ...values,
                [field]: e.target.value,
            });
            setHelpers({
                ...helpers,
                ...newState,
            });
            if (field === "firstName" || field === "surname") {
                setValues({
                    ...values,
                    [field]: e.target.value
                        .toLowerCase()
                        .split(" ")
                        .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                        .join(" "),
                })
            }
        };
    useEffect(() => {
        if (getCookie("email") !== "") {
            history.replace("/home");
        }
    }, []);
    return (
        <Paper className="fade" style={{maxWidth: 600, margin: "0 auto", }}>
            <Typography variant="h4" gutterBottom>
                Login to {" "}
                <span className="highlight">
                     Maximise
                </span>
            </Typography>
            <form onSubmit={login}>
                {Object.keys(initialState).map(field => (
                    <TextField
                        label={startCase(field)}
                        placeholder={
                            field === "code"
                                ? "Product code found on revision pack"
                                : ""
                        }
                        value={values[field]}
                        onChange={handleChange(field)}
                        margin="normal"
                        variant="filled"
                        helperText={helpers[field] + " "}
                        error={helpers[field] !== ""}
                        key={field}
                        type={field.includes("assword") ? "password" : "text"}
                        fullWidth
                        className={classes[field]}
                    />
                ))}
                <div style={{ display: "flex", marginTop: 8, marginBottom: 16, }}>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={stringify(initialState) !== stringify(helpers) || Object.keys(values).filter(x => values[x] === "").length > 0}
                    >
                        Sign up
                    </Button>
                    <Button
                        variant="outlined"
                        color="primary"
                        style={{
                            marginLeft: "auto",
                        }}
                        onClick={clear}
                    >
                        Clear
                    </Button>
                </div>
                <Divider />
                <Typography
                    variant="h5"
                    gutterBottom
                    style={{
                        marginTop: 8,
                    }}
                >
                    Already have an account?
                </Typography>
                <Button
                    component={Link}
                    to="/login"
                    variant="contained"
                    color="primary"
                >
                    Login Here
                </Button>
            </form>
        </Paper>
    );
};