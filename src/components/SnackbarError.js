/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    content: {
        backgroundColor: theme.palette.error.main,
        color: "white",
        borderRadius: 8,
    },
}));

export default () => {
    const
        { msg, key } = useSelector(state => state.error),
        [state, setState] = useState({
            error: "",
        }),
        classes = useStyles();
    useEffect(() => {
        setState({
            error: msg,
        });
    }, [key]);
    return (
        <Snackbar
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
            }}
            open={state.error !== ""}
            style={{
                display: "block",
            }}
            autoHideDuration={5000}
            className={classes.root}
            onClose={() => setState({error: ""})}
        >
            <SnackbarContent
                message={msg}
                className={classes.content}
            />
        </Snackbar>
    );
};