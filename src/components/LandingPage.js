import React from "react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

export default () => {
    return (
        <Paper className="fade">
            Landing
            <Button
                component={Link}
                to="/login"
                variant="contained"
            >
                Login
            </Button>
            <Button
                component={Link}
                to="/signup"
                variant="contained"
            >
                Sign Up
            </Button>
        </Paper>
    );
};