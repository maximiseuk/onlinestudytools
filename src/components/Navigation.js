import React, { useState, Fragment, useEffect } from "react";
import Button from "@material-ui/core/Button";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import { Link, useLocation } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import ArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles(theme => ({
    toggle: {
        [theme.breakpoints.down(512)]: {
            flex: 1,
        },
        zIndex: 1000,
    },
    drawer: {
        display: "flex",
        flexDirection: "column",
    },
    link: {
        marginBottom: 8,
        "&:last-child": {
            marginBottom: 0,
        }
    },
    drawerContainer: {
        [theme.breakpoints.up(512)]: {
            justifyContent: "flex-end",
        },
        display: "flex",
        width: "100%",
        marginBottom: 8,
    },
    drawerPaper: {
        width: 464,
        marginLeft: "auto",
        position: "absolute",
        bottom: 8,
        right: 8,
        borderRadius: 16,
        outline: "none",
        [theme.breakpoints.down(512)]: {
            width: "calc(100% - 48px)",
            left: 8,
        },
        border: `2px solid ${theme.palette.primary.main}`,
    },
    backdrop: {
        backgroundColor: "transparent",
    }
}));

export default () => {
    const
        location = useLocation(),
        classes = useStyles(),
        [open, setOpen] = useState(false),
        [animated, setAnimated] = useState(false),
        isBig = useMediaQuery("(min-width: 512px"),
        toggleDrawer = open => e => {
            if (e && e.type === "keydown" && (e.key === "Tab" || e.key === "Shift")) {
                return;
            }
            setOpen(open);
        },
        links = ["Home", "Advice", "Agenda", "Goals", "Timetable", "Help", "Settings"],
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
        <div className={classes.drawerContainer}>
            <Button
                onClick={toggleDrawer(true)}
                variant="contained"
                color="primary"
                className={classes.toggle}
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
                PaperProps={{
                    className: classes.drawerPaper,
                }}
                ModalProps={{
                    BackdropProps: {
                        className: isBig ? classes.backdrop : null,
                    }
                }}
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
    );
};