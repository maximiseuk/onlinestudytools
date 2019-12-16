import React, { useState, Fragment, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { Link, useLocation } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import ArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

const useStyles = makeStyles(theme => ({
    root: {
        height: "100vh",
        width: "100vw",
    },
    loadingContainer: {
        height: "100%",
        width: "100%",
        paddingTop: "40%",
        textAlign: "center",
    },
    mainContainer: {
        maxWidth: 2048,
        margin: "0 auto",
        padding: "0 16px",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
    },
    links: {
        display: "flex",
        marginBottom: 8,
        borderRadius: 16,
        backgroundColor: theme.palette.background.paper,
        zIndex: 1000,
    },
    link: {
        margin: 8,
        marginRight: 0,
        zIndex: 1000,
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
        links = ["Home", "Settings", "Help", "Goals", "Leaderboard", "Todos", "Timetable"];
    useEffect(() => {
        setTimeout(() => {
            setAnimated(true);
        }, 1500);
    }, [])
    return (
        <Fragment>
            <Hidden smDown>
                <div className={classes.links}>
                    {links.map((link, i) => (
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
                    ))}
                </div>
            </Hidden>
            <Hidden mdUp>
                <Button
                    onClick={toggleDrawer(true)}
                    variant="contained"
                    color="primary"
                    className={classes.link}
                    style={{
                        marginBottom: 16,
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
                        className={classes.fullList}
                        role="presentation"
                        onClick={toggleDrawer(false)}
                        onKeyDown={toggleDrawer(false)}
                    >
                        <List>
                            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                                <ListItem button key={text}>
                                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItem>
                            ))}
                        </List>
                        <Divider />
                        <List>
                            {['All mail', 'Trash', 'Spam'].map((text, index) => (
                                <ListItem button key={text}>
                                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItem>
                            ))}
                        </List>
                    </div>
                </SwipeableDrawer>
            </Hidden>
        </Fragment>
    );
};