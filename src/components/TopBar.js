/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { useLocation } from "react-router-dom";
import getCookie from "../api/cookies";

const
    quotes = [
        "Do well",
        "Git gud",
        "Git hub",
        "Git scm",
        "Get a life",
        "Be smart",
        "Get a 9",
    ],
    { random, floor } = Math,
    useStyles = makeStyles(theme => ({
        topBar: {
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 16,
            [theme.breakpoints.down(900)]: {
                marginBottom: 0
            }
        },
        img: {
            maxHeight: 200,
            [theme.breakpoints.down("md")]: {
                "&:last-child": {
                    right: 0,
                    bottom: 0,
                    transform: "rotate(180deg)",
                    position: "absolute",
                    zIndex: 1
                },
                zIndex: 999
            },
            [theme.breakpoints.down(900)]: {
                position: "absolute",
            },
            [theme.breakpoints.down(600)]: {
                position: "absolute !important",
                "&:first-child": {
                    top: 0,
                    left: 0
                }
            }
        },
        homeImg: {
            [theme.breakpoints.down(600)]: {
                position: "absolute !important",
                top: 0,
                left: 0
            }
        },
        messageContainer: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
            flexDirection: "column",
            zIndex: 1000,
            textAlign: "center",
            borderRadius: 16,
            padding: 16,
            paddingBottom: 0,
            [theme.breakpoints.down("md")]: {
                textAlign: "right",
                alignItems: "flex-end",
                margin: 16
            },
            [theme.breakpoints.down(900)]: {
                width: "calc(100% - 64px)",
                textAlign: "center",
                alignItems: "center"
                //backgroundColor: Color(theme.palette.primary.main).alpha(0.5).string(),
            },
            [theme.breakpoints.down(600)]: {
                padding: 8,
                paddingBottom: 0,
                position: "static",
                margin: 0,
                marginTop: 0,
            },
            animation: "fadedown 1s forwards"
        },
        highlight: {
            color: theme.palette.primary.main,
            [theme.breakpoints.down(900)]: {
                color: theme.palette.text.primary,
            },
        },
        quote: {
            color: theme.palette.text.hint,
            [theme.breakpoints.down(600)]: {
                display: "none",
            },
        },
        desktopMsg: {
            [theme.breakpoints.down(600)]: {
                display: "none",
            },
        },
        mobileMsg: {
            [theme.breakpoints.up(600)]: {
                display: "none",
            },
        },
        cup: {
            position: "absolute",
            top: -60,
            left: 48,
            height: 250,
        },
        calc: {
            position: "absolute",
            top: -84,
            right: 0,
            height: 300,
        },
        pen: {
            position: "absolute",
            bottom: 0,
            left: 0,
            height: 150,
            transform: "translate(-32px, 32px)",
        },
    }));

localStorage.quote = localStorage.quote === undefined
    ? quotes[floor(random() * quotes.length)]
    : localStorage.quote;

export default () => {
    const
        classes = useStyles(),
        [quote, setQuote] = useState({
            quote: localStorage.quote,
            date: new Date(),
        }),
        [date, setDate] = useState(new Date()),
        { pathname } = useLocation(),
        [email, setEmail] = useState(getCookie("email")),
        isHome = pathname === "/home" || pathname === "/",
        routes = [
            "/home",
            "/settings",
            "/help",
            "/goals",
            "/leaderboard",
            "/todos",
            "/timetable",
            "/signup",
            "/login",
            "/"
        ],
        message =
            date.getHours() < 12
                ? "Morning"
                : date.getHours() < 18
                    ? "Afternoon"
                    : "Evening";
    useEffect(() => {
        const updateDate = setInterval(() => {
            const
                now = new Date(),
                { date } = quote;
            setDate(now);
            if (!(now.getDate() === date.getDate() && now.getMonth() === date.getMonth() && now.getFullYear() === date.getFullYear())) {
                const index = floor(random() * quotes.length);
                setQuote({
                    quote: quotes[index],
                    date: now,
                });
                localStorage.quote = quotes[index];
            }
        }, 1000);
        return () => clearInterval(updateDate);
    }, []);
    useEffect(() => {
        setEmail(getCookie("email"));
    }, [document.cookie]);
    return (
        <div className={classes.topBar} key={pathname}>
            <img
                src="/images/dots.png"
                alt=""
                className={`${classes.img} ${isHome && classes.homeImg}`}
            />
            <img
                src="/images/cup.png"
                alt=""
                className={classes.cup}
            />
            <img
                src="/images/calc.png"
                alt=""
                className={classes.calc}
            />
            <img
                src="/images/pen.png"
                alt=""
                className={classes.pen}
            />
            <div
                className={`${classes.messageContainer} ${isHome && classes.homeMsg}`}
            >
                <Typography variant="h3" gutterBottom>
                    {isHome ? (
                        email !== "" ? (
                            <span>
                                <span className={classes.desktopMsg}>Good {message}, </span>
                                <span className={classes.mobileMsg}>Hi, </span>
                                <span className={classes.highlight}>Pratyaksh</span>
                            </span>
                        ) : (
                            <span>
                                Welcome to <span className={classes.highlight}>Maximise</span>
                            </span>
                        )
                    ) : routes.includes(pathname) ? (
                        window.location.pathname
                            .replace(/\b\w/g, l => l.toUpperCase())
                            .substr(1)
                    ) : (
                        "Page Not Found"
                    )}
                </Typography>
                {isHome && email !== "" && (
                    <Typography variant="h4" className={classes.quote}>
                        "{quote.quote}"
                    </Typography>
                )}
            </div>
            <img src="/images/lines.png" alt="" className={classes.img} />
        </div>
    );
};
