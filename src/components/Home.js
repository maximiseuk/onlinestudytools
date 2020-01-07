/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import SwipeableViews from "react-swipeable-views";
import MobileStepper from "@material-ui/core/MobileStepper";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import { Link, useHistory } from "react-router-dom";
import advice from "../api/advice.json";
import { useDispatch } from "react-redux";

const useStyles = makeStyles(theme => ({
    item: {
        flex: 1,
        margin: 8,
        minWidth: 280,
        [theme.breakpoints.down(1024)]: {
            minWidth: "initial"
        },
        cursor: "pointer",
    },
    swiper: {
        "& > div > div > .MuiPaper-root": {
            height: "calc(100% - 48px)"
        },
        [theme.breakpoints.up(1024)]: {
            display: "none"
        }
    },
    views: {
        [theme.breakpoints.down(1024)]: {
            display: "none"
        },
        display: "flex",
        margin: "0 auto"
    },
    stepper: {
        [theme.breakpoints.up(1024)]: {
            display: "none",
        },
    },
    info: {
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
    },
    emphasis: {
        fontWeight: 500,
    },
}));

export default () => {
    const
        classes = useStyles(),
        history = useHistory(),
        dispatch = useDispatch(),
        [activeStep, setActiveStep] = useState(0),
        [exams, setExams] = useState([]),
        [agenda, setAgenda] = useState([]),
        [goals, setGoals] = useState([]),
        examView = (
            <Paper className={classes.item} onClick={() => history.push("/timetable")}>
                <Typography variant="h4" gutterBottom>
                    Upcoming <span className="highlight">Exams</span>
                </Typography>
                {exams.length !== 0 ? exams.map((exam, i) => (
                    <Card
                        key={i}
                        style={{ marginBottom: i !== exams.length - 1 ? 8 : 0 }}
                    >
                        <CardContent>
                            <Typography variant="h5" className={classes.emphasis}>
                                {exam.time}
                                <span style={{ float: "right", fontSize: 16 }}>
                                    {exam.date}
                                </span>
                            </Typography>
                            <Typography className={classes.info}>
                                {exam.title}
                            </Typography>
                        </CardContent>
                    </Card>
                )) : <p>No upcoming exams</p>}
                <Button
                    component={Link}
                    to="/timetable"
                    variant="contained"
                    color="primary"
                    style={{ marginTop: 16 }}
                >
                    View Timetable
        </Button>
            </Paper>
        ),
        agendaView = (
            <Paper className={classes.item} onClick={() => history.push("/agenda")}>
                <Typography variant="h4" gutterBottom>
                    Your <span className="highlight">Agenda</span>
                </Typography>
                {agenda.length !== 0 ? agenda.map((todo, i) => (
                    <Card
                        key={i}
                        style={{ marginBottom: i !== agenda.length - 1 ? 8 : 0 }}
                    >
                        <CardContent>
                            <Typography variant="h5" className={classes.emphasis}>
                                {todo.subject}
                                <span style={{ float: "right", fontSize: 16 }}>
                                    {new Date(todo.date).getDate()}/
                                    {new Date(todo.date).getMonth() + 1}/
                                    {new Date(todo.date).getFullYear()}
                                </span>
                            </Typography>
                            <Typography className={classes.info}>{todo.desc}</Typography>
                        </CardContent>
                    </Card>
                )) : <p>Nothing on your agenda at the moment</p>}
                <Typography variant="h4" gutterBottom style={{ marginTop: 8 }}>
                    Your <span className="highlight">Goals</span>
                </Typography>
                {goals.length !== 0 ? goals.map((goal, i) => (
                    <Card
                        key={i}
                        style={{ marginBottom: i !== agenda.length - 1 ? 8 : 0 }}
                    >
                        <CardContent>
                            <Typography variant="h5" className={classes.emphasis}>
                                {goal.subject}
                            </Typography>
                            <Typography className={classes.info}>{goal.desc}</Typography>
                        </CardContent>
                    </Card>
                )) : <p>No goals at the moment</p>}
                <Button
                    component={Link}
                    to="/agenda"
                    variant="contained"
                    color="primary"
                    style={{ marginTop: 16, marginRight: 8 }}
                >
                    Go To Agenda
                </Button>
                <Button
                    component={Link}
                    to="/goals"
                    variant="contained"
                    color="primary"
                    style={{ marginTop: 16, }}
                >
                    Go To Goals
                </Button>
            </Paper>
        ),
        adviceView = (
            <Paper className={classes.item} onClick={() => history.push("/advice")}>
                <Typography variant="h4" gutterBottom>
                    <span className="highlight">Advice</span>
                </Typography>
                {[advice.Wellbeing[1], advice.Wellbeing[2], advice.Revision[3], advice.Wellbeing[6]].map((tip, i) => (
                    <Card
                        key={i}
                        style={{ marginBottom: i !== advice.length - 1 ? 8 : 0 }}
                    >
                        <CardContent>
                        <Typography
                                            variant="h5"
                                            gutterBottom
                                            dangerouslySetInnerHTML={{
                                                __html: tip.title
                                                    .replace(/{/g, "<span class='highlight'>")
                                                    .replace(/}/g, "</span>")
                                            }}
                                        />
                                        <Typography
                                            dangerouslySetInnerHTML={{
                                                __html: tip.content
                                                    .replace(/{/g, "<span class='highlight'>")
                                                    .replace(/}/g, "</span>")
                                                    .replace(":--", "<ul><li>")
                                                    .replace("--:", "</li></ul>")
                                                    .replace("1--", "<ol><li>")
                                                    .replace("--1", "</li></ol>")
                                                    .replace(/--/g, "</li><li>")
                                                    .replace(/href='www/g, "href='https://www")
                                                    .split(".")[0]
                                                    .split("<p>")[1] + "."
                                            }}
                                        />
                        </CardContent>
                    </Card>
                ))}
                <Button
                    component={Link}
                    to="/advice"
                    variant="contained"
                    color="primary"
                    style={{ marginTop: 16 }}
                >
                    Go To Advice
        </Button>
            </Paper>
        );
    useEffect(() => {
        fetch("/get_data.json"/*"/get_data"*/)
        .then(res => res.json())
        .then(data => {
            setAgenda(data.agenda.filter((x, i) => i < 3));
            setGoals(data.goals.filter((x, i) => i < 3));
            const { timetable } = data;
            delete timetable.weekrepeats;
            delete timetable.dayrepeats;
            let newExams = [];
            for (let key in timetable) {
                for (let time in timetable[key]) {
                    if (timetable[key][time].type === "exam") {
                        newExams.push({
                            title: timetable[key][time].title,
                            date: key,
                            time: time.split("-")[0]
                        });
                    }
                }
            }
            setExams(newExams);
        })
        .catch((err) => {
            console.error(err);
            
            dispatch({
                type: "NEW_ERROR",
                payload: "There was an error loading your data",
            });
        });
    }, []);
    return (
        <div className="fade" style={{margin: "-8px 0", height: "100%", marginBottom: "-240px"}}>
            <SwipeableViews
                index={activeStep}
                onChangeIndex={step => setActiveStep(step)}
                enableMouseEvents
                className={classes.swiper}
            >
                {examView}
                {agendaView}
                {adviceView}
            </SwipeableViews>
            <MobileStepper
                variant="dots"
                className={classes.stepper}
                steps={3}
                position="static"
                activeStep={activeStep}
                nextButton={
                    <IconButton
                        size="small"
                        onClick={() => setActiveStep(activeStep + 1)}
                        disabled={activeStep === 2}
                    >
                        <KeyboardArrowRightIcon />
                    </IconButton>
                }
                backButton={
                    <IconButton
                        size="small"
                        onClick={() => setActiveStep(activeStep - 1)}
                        disabled={activeStep === 0}
                    >
                        <KeyboardArrowLeftIcon />
                    </IconButton>
                }
            />
            <div className={classes.views}>
                {examView}
                {agendaView}
                {adviceView}
            </div>
        </div>
    );
};
