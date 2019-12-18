/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

export default () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({
            type: "CHANGE_PAGE_TITLE",
            payload: "My Goals",
        });
    }, []);
    return (
        <div>hello</div>
    );
};