/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Paper from "@material-ui/core/Paper";

export default () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({
            type: "CHANGE_PAGE_TITLE",
            payload: "My Todos",
        });
    }, []);
    return (
        <Paper className="fade">
            Todos
        </Paper>
    );
};