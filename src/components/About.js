import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";
import faqs from "../api/faqs.json";
import { Link } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  quote: {
    padding: 16,
    borderLeft: `4px solid ${theme.palette.primary.main}`,
    backgroundColor: theme.palette.background.default,
    marginBottom: 16
  }
}));

export default () => {
  const classes = useStyles();
  return (
    <Paper className="fade padding">
      <div className={classes.quote}>
        <Typography gutterBottom>
          <span className="highlight">Maximise</span> is a{" "}
          <span className="highlight">fantastic resource</span> for students.
          The Maximise team have pulled together many{" "}
          <span className="highlight">great tips</span> for helping young people
          learn
          <span className="highlight">efficiently</span> to achieve well while
          managing their <span className="highlight">stress</span> and
          maintaining a <span className="highlight">healthy lifestyle.</span>{" "}
          The resources provided are evidence based but the real genius of this
          product is that it is written by
          <span className="highlight">young people for young people</span>. We
          know that during the teenage years, young people are more likely to
          listen to their peers than adults.{" "}
        </Typography>

        <Typography gutterBottom>
          The app is clever in <span className="highlight">highlighting</span>{" "}
          areas that can <span className="highlight">negatively impact</span>
          learning and wellbeing (social media, lack of sleep, effects of drugs
          & alcohol) and areas that can{" "}
          <span className="highlight">boost efficienc</span>y (timetabling,
          planning time clearly) and that are needed for{" "}
          <span className="highlight">emotional</span> and{" "}
          <span className="highlight">psychological health</span> (connection
          with friends, checking negative thoughts).{" "}
        </Typography>

        <Typography gutterBottom>
          <span className="highlight">Success</span> in exams (and in life!){" "}
          <span className="highlight">does not</span> come from{" "}
          <span className="highlight">just studying</span> or just{" "}
          <span className="highlight">hard work</span>. What makes us productive
          (as shown in the diagram below) is having balance and looking after
          our minds and our bodies. Maximise have got the balance right.{" "}
        </Typography>
      </div>
      <img
        style={{ width: "100%", maxWidth: 512 }}
        src="/images/logo.png"
        alt=""
      />
      <br /><br />
      <Typography variant="p" component="i">
        <span className="highlight">
          <Link href="http://www.drbettinahohnen">Dr Bettina Hohnen</Link>
        </span>
        , Clinical Psychologist and author of{" "}
        <span className="highlight">The Incredible Teenage Brain</span>:
        Everything You Need to Know To Unlock Your Teen’s Potential by Hohnen,
        Gilmour and Murphy
      </Typography>
<br /><br />
          <Typography>Maximise onlinestudytools was made by Isaac Holt, Joseph Rance and Pratyaksh Sharma.</Typography>
    </Paper>
  );
};
