import React, { useState, Fragment, useEffect } from "react";
import Button from "@material-ui/core/Button";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import { Link, useLocation } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import ArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

const useStyles = makeStyles(theme => ({
    links: {
        display: "flex",
        marginBottom: 8,
        borderRadius: 16,
        backgroundColor: theme.palette.background.paper,
        zIndex: 1000,
        [theme.breakpoints.down(800)]: {
            display: "none",
        },
    },
    link: {
        margin: 8,
        marginRight: 0,
        zIndex: 1000,
    },
    drawer: {
        display: "flex",
        flexDirection: "column",
    },
    drawerContainer: {
        [theme.breakpoints.up(800)]: {
            display: "none",
        },
        width: "100%",
    },
}));

export default () => {
    const
        location = useLocation(),
        classes = useStyles(),
        [open, setOpen] = useState(false),
        [animated, setAnimated] = useState(false),
        toggleDrawer = open => e => {
            if (e && e.type === "keydown" && (e.key === "Tab" || e.key === "Shift")) {
                return;
            }
            setOpen(open);
        },
        links = ["Home", "Settings", "Advice", "Help", "Goals", "Leaderboard", "Todos", "Timetable"],
        linkBtns = links.map((link, i) => (
            <Button
                key={i}
                variant={"/" + link.toLowerCase() === location.pathname
                    ? "contained"
                    : "outlined"
                }
                color="primary"
                className={classes.link}
                component={"/" + link.toLowerCase() === location.pathname
                    ? "button"
                    : Link
                }
                style={{
                    animation: !animated ? "fadein 1s forwards" : "none",
                    animationDelay: !animated ? (i + 1) / links.length + "s" : "0s",
                    opacity: !animated ? 0 : 1,
                }}
                to={`/${link.toLowerCase()}`}
            >
                {link}
            </Button>
        ));
    useEffect(() => {
        setTimeout(() => {
            setAnimated(true);
        }, 1500);
    }, [])
    return (
        <Fragment>
            <div className={classes.links}>
                {linkBtns}
            </div>
            <div className={classes.drawerContainer}>
                <Button
                    onClick={toggleDrawer(true)}
                    variant="contained"
                    color="primary"
                    className={classes.link}
                    style={{
                        marginBottom: 16,
                        width: "calc(100% - 16px)",
                    }}
                >
                    Links <ArrowUpIcon />
                </Button>
                <SwipeableDrawer
                    anchor="bottom"
                    open={open}
                    onClose={toggleDrawer(false)}
                    onOpen={toggleDrawer(true)}
                    disableDiscovery={true}
                    disableSwipeToOpen={true}
                >
                    <div
                        className={classes.drawer}
                        role="presentation"
                        onClick={toggleDrawer(false)}
                        onKeyDown={toggleDrawer(false)}
                    >
                        {linkBtns}
                    </div>
                </SwipeableDrawer>
            </div>
        </Fragment>
    );
};