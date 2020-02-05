import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  btn: {
    padding: "16px 32px",
    margin: 8
  },
  textContainer: {
    width: "50vw",
    display: "flex",
    position: "absolute",
    bottom: 0
  },
  flower: {
    position: "absolute",
    top: 0,
    left: 0
  },
  book: {
    position: "absolute",
    bottom: 64,
    left: -200
  }
});

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
      <img src="/images/linesnew.png" alt="" className={classes.lines} />
      <img src="/images/logo.png" alt="" className={classes.logo} />
      <img src="/images/tipcard.png" alt="" className={classes.tipcard} />
      <div className={classes.textContainer}>
        <div>
          <Typography
            className={visible ? classes.text : classes.fade}
            dangerouslySetInnerHTML={{
              __html: textList[count % textList.length]
                .replace(/{/g, "<span class='highlight'>")
                .replace(/}/g, "</span>")
            }}
          />
          <Button
            component="a"
            href="https://jamarketplace.com/young-enterprise-uk"
            variant="contained"
            className={classes.btn}
          >
            Buy Now
          </Button>
          <Button
            component={Link}
            to="/login"
            variant="outlined"
            className={classes.btn}
          >
            Go To Tools
          </Button>
        </div>
      </div>
    </div>
  );
};
