import React, { useState, useEffect } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    loadingContainer: {
        height: "10vh",
        width: "100%",
        marginTop: "45vh",
        textAlign: "center",
        animation: "fadeout 0s 1.5s forwards"
    },
    btn: {
        padding: "16px 32px",
        marginRight: "1.12vw",
        marginTop: "2vw",
        height: "4vw"
    },
    textContainer: {
        display: "flex",
        position: "absolute",
        bottom: "10vh",
        left: "14vw"
    },
    text: {
        fontWeight: 500,
        opacity: 0,
        animation: "faderight 1s ease-in-out forwards",
        fontSize: "3.7vw",
        lineHeight: "4.2vw",
        width: "42vw"
    },
    fade: {
        fontWeight: 500,
        fontSize: "3.7vw",
        lineHeight: "4.2vw",
        width: "42vw",
        opacity: 0,
        animation: "fadeout 0.3s ease-in-out forwards"
    },
    flower: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "24.5vw"
    },
    book: {
        position: "absolute",
        bottom: "6vh",
        left: "-12.5vw",
        width: "27.6vw"
    },
    keyboard: {
        position: "absolute",
        top: "-28vw",
        right: "10vw",
        width: "35vw"
    },
    box: {
        position: "absolute",
        right: "-42.5vw",
        top: "-28vw",
        width: "72vw"
    },
    dots: {
        position: "absolute",
        top: "-0.7vw",
        right: "39.4vw",
        width: "14vw"
    },
    pen: {
        position: "absolute",
        top: "22vw",
        right: "8vw",
        width: "21vw",
        transform: "rotate(0.03turn)"
    },
    lines: {
        position: "absolute",
        width: "35vw",
        bottom: "-1.75vw",
        right: "-2vw"
    },
    logo: {
        position: "absolute",
        width: "7vw",
        right: "3.5vw",
        top: "3.5vw"
    },
    tipcard: {
        position: "absolute",
        width: "25vw",
        right: "18vw",
        bottom: "3.5vw",
        transform: "rotate(-0.03turn)",
        transition: "1.5s",
        borderRadius: "25px",
        boxShadow: "0 4px 8px 2px rgba(0, 0, 0, 0.4)",
        filter: "hue-rotate(10deg) contrast(110%)"
    },
    tipfloat: {
        position: "absolute",
        width: "25vw",
        right: "18vw",
        bottom: "3.5vw",
        transform: "rotate(-0.03turn)",
        transition: "1.5s",
        borderRadius: "25px",
        boxShadow: "0 4px 8px 2px rgba(0, 0, 0, 0.4)",
        filter: "hue-rotate(10deg) contrast(110%)",
        transform: "rotateX(25deg)"
    }
}));

export default () => {
    var classes = useStyles();
    const textList = [
        "{Maximise} is a young enterprise company based in the {UK} committed to helping students achieve the {best} possible {grades}.",
        "Our {PASSbox} contains revision {tips} and {tools} that are {scientifically} proven to increase your learning {efficiency} and reduce stress.",
        "Gain access to {guidance} and advice from {experienced students} who have achieved some of the {best grades in the country}.",
        "Use cutting-edge {machine learning} technology to {optimise} your revision schedule and {maximise} your academic potential.",
        "We put a focus on {mental wellbeing} by including {relaxing} scents and advice for {healthy} specifically tailored to {students}."
    ];
    const [count, setCount] = useState(0);
    const [visible, setVisible] = useState(true);
    const [rot, setRot] = useState(0);

    useEffect(() => {
        let interval = null;
        interval = setTimeout(() => {
            setVisible(false);
            interval = setTimeout(() => {
                setCount(count => count + 1);
                setVisible(true);
            }, 1000);
        }, 11000);
    }, [count]);

    useEffect(() => {
        let interval = null;
        interval = setTimeout(() => {
            setRot(rot => rot + 0.02);
        }, 100);
    }, [rot]);

    return (
        <div>
            <div className={classes.loadingContainer}>
                <CircularProgress />
            </div>
            <div style={{ opacity: 0, animation: "fadein 2s 1.5s forwards" }}>
                <img src="/images/flower.png" alt="" className={classes.flower} />
                <img src="/images/book.png" alt="" className={classes.book} />
                <img src="/images/keyboard.png" alt="" className={classes.keyboard} />
                <img src="/images/box.png" alt="" className={classes.box} />
                <img src="/images/dots2.png" alt="" className={classes.dots} />
                <img src="/images/pen.png" alt="" className={classes.pen} />
                <img src="/images/linesnew.png" alt="" className={classes.lines} />
                <img src="/images/logo.png" alt="" className={classes.logo} />
                <img src="/images/tipcard.png" alt="" className={classes.tipcard} style={{ transform: "rotate(" + 15 * Math.sin(rot) + "deg)" }} />
                <div className={classes.textContainer}>
                    <div>
                        <Typography
                            className={visible ? classes.text : classes.fade}
                            dangerouslySetInnerHTML={{
                                __html: textList[count % textList.length].replace(/{/g, "<span class='highlight'>").replace(/}/g, "</span>")
                            }}
                        />
                        <Button component="a" href="https://jamarketplace.com/young-enterprise-uk" variant="contained" className={classes.btn}>
                            Buy now
                        </Button>
                        <Button component={Link} to="/" variant="outlined" className={classes.btn}>
                            Tools (Coming Soon)
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
