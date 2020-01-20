import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
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
        lineHeight: "3.9vw",
        width: "42vw"
    },
    fade: {
        fontWeight: 500,
        fontSize: "3.7vw",
        lineHeight: "3.9vw",
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
        top: "24.5vw",
        right: "10vw",
        width: "21vw",
        transform: "rotate(0.03turn)"
    },
    lines: {
        position: "absolute",
        width: "24.5vw",
        bottom: "-1.75vw",
        right: 0,
        transform: "scaleY(-1)  rotate(0.03turn)"
    },
    lines2: {
        position: "absolute",
        width: "24.5vw",
        bottom: "-2.67vw",
        right: "20.6vw",
        transform: "scaleY(-1)  rotate(0.03turn)"
    },
    logo: {
        position: "absolute",
        width: "7vw",
        right: "3.5vw",
        top: "3.5vw"
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

    return (
        <div style={{ opacity: 0, animation: "fadein 1s 1s forwards" }}>
            <img src="/images/flower.png" alt="" className={classes.flower} />
            <img src="/images/book.png" alt="" className={classes.book} />
            <img src="/images/keyboard.png" alt="" className={classes.keyboard} />
            <img src="/images/box.png" alt="" className={classes.box} />
            <img src="/images/dots2.png" alt="" className={classes.dots} />
            <img src="/images/pen.png" alt="" className={classes.pen} />
            <img src="/images/lines.png" alt="" className={classes.lines} />
            <img src="/images/lines.png" alt="" className={classes.lines2} />
            <img src="/images/logo.png" alt="" className={classes.logo} />
            <div className={classes.textContainer}>
                <div>
                    <Typography
                        className={visible ? classes.text : classes.fade}
                        dangerouslySetInnerHTML={{
                            __html: textList[count % textList.length].replace(/{/g, "<span class='highlight'>").replace(/}/g, "</span>")
                        }}
                    ></Typography>
                    <Button component="a" href="https://jamarketplace.com/young-enterprise-uk" variant="contained" className={classes.btn}>
                        Buy Now
                    </Button>
                    <Button component={Link} to="/login" variant="outlined" className={classes.btn}>
                        Go To Tools
                    </Button>
                </div>
            </div>
        </div>
    );
};
