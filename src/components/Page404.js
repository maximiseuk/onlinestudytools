/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

export default () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({
            type: "CHANGE_PAGE_TITLE",
            payload: "Page not found",
        });
    }, []);
    return (
        <Paper className="fade">
            <Typography variant="h4" gutterBottom>
                Uh oh...
            </Typography>
            <Typography variant="body1" gutterBottom>
                It looks like this page doesn't exist.
            </Typography>
            <Button
                variant="contained"
                component={Link}
                to="/"
                color="primary"
                style={{

                }}
            >
                go to home page
            </Button>
        </Paper>
    );
};