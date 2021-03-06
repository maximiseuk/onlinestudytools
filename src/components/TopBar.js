/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import { useLocation } from "react-router-dom";
import getCookie from "../api/cookies";

const quotes = [
    ["Creativity is intelligence having fun.", "Albert Einstein"],
    [
      "Our dreams can come true if we have the courage to pursue them.",
      "Walt Disney"
    ],
    [
      "We cannot teach people anything. We can only help them discover it within themselves.",
      "Galileo Galilei"
    ],
    [
      "Know well what leads you forward and what holds you back, and choose the path that leads you to wisdom.",
      "Buddha"
    ],
    ["The best way to predict the future is to invent it.", "Alan Kay"],
    [
      "When you talk, you are only repeating what you already know. But if you listen, you may learn something new.",
      "Dalai Lama"
    ],
    [
      "A pessimist sees the difficulty in every opportunity; an optimist sees the opportunity in every difficulty.",
      "Winston Churchill"
    ],
    [
      "You don't have to see the whole staircase. Just take the first step.",
      "Martin Luther King"
    ],
    ["Pleasure in the job puts perfection in the work.", "Aristotle"],
    ["As you think, so shall you become.", "Bruce Lee"],
    ["If you lose, don't lose the lesson.", "Dalai Lama"],
    [
      "What would life be if we had no courage to attempt anything.",
      "Vincent Van Gogh"
    ],
    [
      "Nothing is particularly hard if you divide it into small jobs.",
      "Henry Ford"
    ],
    [
      "You can't be paralyzed by fear of failure or you will never push yourself.",
      "Arnold Schwarzenegger"
    ],
    ["Knowing what must be done does away with fear.", "Rosa Parks"]
  ],
  { random, floor } = Math,
  useStyles = makeStyles(theme => ({
    topBar: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: 16,
      [theme.breakpoints.down(900)]: {
        marginBottom: 0
      },
      [theme.breakpoints.up("md")]: {
        "& > div:first-child": {
          flexBasis: 300
        }
      },
      [theme.breakpoints.down("md")]: {
        "& > img:last-child": {
          right: 0,
          bottom: 0,
          transform: "rotate(180deg)",
          position: "fixed",
          zIndex: 1
        }
      }
    },
    img: {
      maxHeight: 200,
      zIndex: 999,
      [theme.breakpoints.down(900)]: {
        position: "fixed"
      },
      [theme.breakpoints.down(600)]: {
        position: "fixed !important",
        "&:first-child": {
          top: 0,
          left: 0
        }
      }
    },
    homeImg: {
      [theme.breakpoints.down(600)]: {
        position: "fixed !important",
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
        margin: 0,
        marginTop: 0
      },
      animation: "fadedown 1s forwards"
    },
    highlight: {
      color: theme.palette.primary.main,
      [theme.breakpoints.down(900)]: {
        color: theme.palette.text.primary
      }
    },
    quote: {
      color: theme.palette.text.hint,
      [theme.breakpoints.down(900)]: {
        display: "none"
      }
    },
    desktopMsg: {
      [theme.breakpoints.down(600)]: {
        display: "none"
      }
    },
    mobileMsg: {
      [theme.breakpoints.up(600)]: {
        display: "none"
      }
    },
    cup: {
      top: -60,
      left: 48,
      height: 250
    },
    calc: {
      top: -84,
      right: 0,
      height: 300
    },
    pen: {
      bottom: 0,
      left: 0,
      height: 150,
      transform: "translate(-32px, 32px)"
    },
    object: {
      position: "fixed",
      zIndex: 1000,
      [theme.breakpoints.down("md")]: {
        display: "none"
      }
    }
  }));
localStorage.quote =
  localStorage.quote === undefined
    ? floor(random() * quotes.length)
    : localStorage.quote;

export default () => {
  const classes = useStyles(),
    [quote, setQuote] = useState({
      quote: localStorage.quote,
      date: new Date()
    }),
    [date, setDate] = useState(new Date()),
    { pathname } = useLocation(),
    [email, setEmail] = useState(getCookie("email")),
    isHome = pathname === "/home" || pathname === "/",
    routes = [
      "/home",
      "/about",
      "/advice",
      "/settings",
      "/help",
      "/goals",
      "/agenda",
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
      const now = new Date();
      setDate(now);
      if (
        !(
          now.getDate() === quote.date.getDate() &&
          now.getMonth() === quote.date.getMonth() &&
          now.getFullYear() === quote.date.getFullYear()
        )
      ) {
        const index = floor(random() * quotes.length);
        setQuote({
          quote: index,
          date: now
        });
        localStorage.quote = index;
      }
    }, 1000);
    return () => clearInterval(updateDate);
  }, []);
  useEffect(() => {
    setEmail(getCookie("email"));
  }, [document.cookie]);
  return (
    <div className={classes.topBar} key={pathname}>
      <div>
        <img
          src="/images/dots.png"
          alt=""
          className={`${classes.img} ${isHome && classes.homeImg}`}
        />
      </div>
      <img
        src="/images/GreenPlantFromAbove.png"
        alt=""
        className={`${classes.cup} ${classes.object}`}
        style={{
          filter: "contrast(90%) brightness(90%)"
        }}
      />
      <img
        src="/images/calc.png"
        alt=""
        className={`${classes.calc} ${classes.object}`}
      />
      <img
        src="/images/pen.png"
        alt=""
        className={`${classes.pen} ${classes.object}`}
      />
      <div
        className={`${classes.messageContainer} ${isHome && classes.homeMsg}`}
      >
        <Typography variant="h3">
          {isHome ? (
            email !== "" ? (
              <span>
                <span className={classes.desktopMsg}>Good {message}, </span>
                <span className={classes.mobileMsg}>Hi, </span>
                <span className={classes.highlight}>{localStorage.name}</span>
              </span>
            ) : (
              <span>
                Welcome to <span className={classes.highlight}>Maximise</span>
              </span>
            )
          ) : routes.includes("/" + pathname.split("/")[1]) ? (
            window.location.pathname
              .replace(/\b\w/g, l => l.toUpperCase())
              .substr(1)
              .split("/")[0]
          ) : (
            "Page Not Found"
          )}
        </Typography>
        {isHome && email !== "" && (
          <Tooltip title={quotes[quote.quote][1]}>
            <Typography variant="h4" className={classes.quote}>
              "{quotes[quote.quote][0]}"
            </Typography>
          </Tooltip>
        )}
      </div>
      <img src="/images/lines.png" alt="" className={classes.img} />
    </div>
  );
};
