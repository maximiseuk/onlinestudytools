/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";

export default () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({
            type: "CHANGE_PAGE_TITLE",
            payload: "Home",
        });
    }, []);
    return (
        <Paper className="fade">
            Home <Link to="/login">login</Link>
        </Paper>
    );
};