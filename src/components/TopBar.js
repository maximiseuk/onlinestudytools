import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import { useSelector } from "react-redux";
import Color from "color";

const useStyles = makeStyles(theme => ({
    topBar: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 16,
    },
    img: {
        width: 360,
        maxWidth: 400,
        [theme.breakpoints.down("md")]: {
            "&:last-child": {
                right: 0,
                display: "none"
            },
            zIndex: 999,
        },
        [theme.breakpoints.down(800)]: {
            "&:first-child": {
                width: "100%",
            },
        },
        [theme.breakpoints.down(470)]: {
            position: "absolute",
            top: 0,
            left: 0,
        },
    },
    messageContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        flexDirection: "column",
        zIndex: 1000,
        margin: 16,
        textAlign: "center",
        borderRadius: 16,
        padding: 16,
        [theme.breakpoints.down("md")]: {
            textAlign: "right",
            alignItems: "flex-end",
        },
        [theme.breakpoints.down(900)]: {
            position: "absolute",
            top: 0,
            left: 0,
            width: "calc(100% - 64px)",
            textAlign: "center",
            alignItems: "center",
            //backgroundColor: Color(theme.palette.primary.main).alpha(0.5).string(),
        },
        [theme.breakpoints.down(470)]: {
            position: "static",
            margin: 0,
            marginTop: 0,
        },
    },
    highlight: {
        color: theme.palette.primary.main,
        [theme.breakpoints.down(900)]: {
            color: theme.palette.text.primary,
        },
    },
}));

export default () => {
    const
        classes = useStyles(),
        [date, setDate] = useState(new Date()),
        { pageTitle } = useSelector(state => state),
        message = date.getHours() < 12
        ? "Morning"
        : date.getHours() < 18
            ? "Afternoon"
            : "Afternoon";
    useEffect(() => {
        const updateDate = setInterval(() => setDate(new Date()), 1000);
        return () => clearInterval(updateDate);
    }, []);
    return (
        <div className={classes.topBar}>
            <img
                src="/images/dots.png"
                alt=""
                className={classes.img}
            />
            <div className={classes.messageContainer}>
                <Typography variant="h2" gutterBottom>
                    {pageTitle === "Home"
                        ? <span>Good {message}, <span className={classes.highlight}>Pratyaksh</span></span>
                    : pageTitle}
                </Typography>
                {pageTitle === "Home" &&
                    <Typography variant="h4">
                        {date.toLocaleDateString() + " " + date.toLocaleTimeString()}
                    </Typography>
                }
            </div>
            <img
                src="/images/lines.png"
                alt=""
                className={classes.img}
            />
        </div>
    );
};