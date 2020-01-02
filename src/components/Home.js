/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
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
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
    item: {
        flex: 1,
        margin: 8,
        minWidth: 280,
        [theme.breakpoints.down(1024)]: {
            minWidth: "initial"
        }
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
    const classes = useStyles(),
        [activeStep, setActiveStep] = useState(0),
        exams = [
            {
                subject: "Maths",
                topics: ["Quadratics", "graph sketching"],
                date: "13/12/19"
            },
            {
                subject: "Physics",
                topics: ["Circuit diagrams", "I-V characteristics"],
                date: "14/12/19"
            }
        ],
        agenda = [
            {
                todo: "Revise Maths",
                notes: "Do practice questions",
                date: "14/12/19"
            }
        ],
        advice = [
            {
                title: "Stay hydrated",
                notes: "Keeps brain healthy"
            },
            {
                title: "Think positively",
                notes: "Being rained on is good"
            }
        ],
        goals = [
            {
                subject: "Maths",
                desc: "Beat Pratyaksh"
            }
        ],
        examView = (
            <Paper className={classes.item}>
                <Typography variant="h4" gutterBottom>
                    Upcoming <span className="highlight">Exams</span>
                </Typography>
                {exams.map((exam, i) => (
                    <Card
                        key={i}
                        style={{ marginBottom: i !== exams.length - 1 ? 8 : 0 }}
                    >
                        <CardContent>
                            <Typography variant="h5" className={classes.emphasis}>
                                {exam.subject}
                                <span style={{ float: "right", fontSize: 16 }}>
                                    {exam.date}
                                </span>
                            </Typography>
                            <Typography className={classes.info}>
                                {exam.topics.map(
                                    (topic, i) =>
                                        topic + (i !== exam.topics.length - 1 ? ", " : "")
                                )}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
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
            <Paper className={classes.item}>
                <Typography variant="h4" gutterBottom>
                    Your <span className="highlight">Agenda</span>
                </Typography>
                {agenda.map((todo, i) => (
                    <Card
                        key={i}
                        style={{ marginBottom: i !== agenda.length - 1 ? 8 : 0 }}
                    >
                        <CardContent>
                            <Typography variant="h5" className={classes.emphasis}>
                                {todo.todo}
                                <span style={{ float: "right", fontSize: 16 }}>
                                    {todo.date}
                                </span>
                            </Typography>
                            <Typography className={classes.info}>{todo.notes}</Typography>
                        </CardContent>
                    </Card>
                ))}
                <Typography variant="h4" gutterBottom style={{ marginTop: 8 }}>
                    Your <span className="highlight">Goals</span>
                </Typography>
                {goals.map((goal, i) => (
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
                ))}
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
            <Paper className={classes.item}>
                <Typography variant="h4" gutterBottom>
                    <span className="highlight">Advice</span>
                </Typography>
                {advice.map((tip, i) => (
                    <Card
                        key={i}
                        style={{ marginBottom: i !== advice.length - 1 ? 8 : 0 }}
                    >
                        <CardContent>
                            <Typography variant="h5" className={classes.emphasis}>
                                {tip.title}
                            </Typography>
                            <Typography className={classes.info}>{tip.notes}</Typography>
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
    return (
        <div className="fade">
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
