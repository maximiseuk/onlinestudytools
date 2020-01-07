/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { Link, useHistory } from "react-router-dom";
import getCookie from "../api/cookies";

export default () => {
    const
        dispatch = useDispatch(),
        [email, setEmail] = useState(""),
        [emailHelper, setEmailHelper] = useState(" "),
        [password, setPassword] = useState(""),
        [passwordHelper, setPasswordHelper] = useState(" "),
        history = useHistory(),
        login = e => {
            e.preventDefault();
            if (email === "") {
                setEmailHelper("Please enter your username");
            }
            if (password === "") {
                setPasswordHelper("Please enter your password");
            }
            if (email !== "" && password !== "") {
                /*fetch("/users/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        email,
                        password,
                    }),
                })
                .then(res => res.json())
                .then(data => {
                    if (data.errors !== undefined) {
                        setEmailHelper(data.errors.email);
                        setPasswordHelper(data.error.password);
                    } else {*/
                        const d = new Date();
                        localStorage.setItem("email", email);
                        document.cookie = `email=${email}; expires ${d.getTime() + 4e12}; path=/`;
                        history.replace("/home");
                    /*}
                })
                .catch(() => {
                    dispatch({
                        type: "NEW_ERROR",
                        payload: "There was an error logging you in",
                    });
                })*/
            }
        },
        clear = () => {
            setEmail("");
            setPassword("");
            setEmailHelper(" ");
            setPasswordHelper(" ");
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
                <TextField
                    label="Your Username"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    margin="normal"
                    variant="filled"
                    fullWidth
                    helperText={emailHelper}
                    error={emailHelper !== " "}
                />
                <TextField
                    label="Your Password"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    margin="normal"
                    variant="filled"
                    fullWidth
                    helperText={passwordHelper}
                    error={passwordHelper !== " "}
                />
                <div style={{ display: "flex", marginTop: 8, marginBottom: 16, }}>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                    >
                        Login
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
                    Don't have an account yet?
                </Typography>
                <Button
                    component={Link}
                    to="/signup"
                    variant="contained"
                    color="primary"
                >
                    Sign Up Here
                </Button>
            </form>
        </Paper>
    );
};