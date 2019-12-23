import React, { useEffect, useState, Fragment } from "react";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { IconButton, Grid } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import DoneIcon from "@material-ui/icons/Done";
import RedoIcon from "@material-ui/icons/Refresh";
import EditIcon from "@material-ui/icons/Edit";
import Tooltip from "@material-ui/core/Tooltip";
import SwipeableViews from "react-swipeable-views";
import MobileStepper from "@material-ui/core/MobileStepper";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles(theme => ({
    loadingContainer: {
        textAlign: "center",
        margin: "0 auto",
    },
    newGoal: {
        marginTop: 16,
    },
    iconBtn: {
        marginBottom: 8,
    },
    swiper: {
        borderRadius: "8px 8px 0 0",
    },
    card: {
        [theme.breakpoints.down(600)]: {
            borderRadius: "8px 8px 0 0",
        },
        [theme.breakpoints.up(600)]: {
            height: "100%",
        },
    },
}));

export default () => {
    const
        classes = useStyles(),
        [goals, setGoals] = useState(false),
        [activeStep, setActiveStep] = useState({
            Current: 0,
            Completed: 0,
        }),
        isSmall = useMediaQuery("(min-width: 600px)"),
        Container = isSmall
            ? Grid
            : SwipeableViews,
        containerProps = type => (isSmall
            ? {
                container: true,
                spacing: 2,
                className: classes.container,
            }
            :{
                index: activeStep[type],
                onChangeIndex: step => {
                    setActiveStep({
                        ...activeStep,
                        [type]: step,
                    });
                },
                enableMouseEvents: true,
                className: classes.swiper,
            }),
        goalDone = i => () => {
            const goal = goals.Current[i];
            goal.completed = true;
            let newGoals = goals.Current;
            newGoals.splice(i, 1);
            setGoals({
                Current: newGoals,
                Completed: [goal, ...goals.Completed],
            });
        },
        deleteGoal = (i, type) => () => {
            let newGoals = goals[type];
            newGoals.splice(i, 1);
            setGoals({
                ...goals,
                [type]: newGoals,
            });
        },
        redoGoal = i => () => {
            const goal = goals.Completed[i];
            goal.completed = false;
            let newGoals = goals.Completed;
            newGoals.splice(i, 1);
            setGoals({
                Current: [goal, ...goals.Current],
                Completed: newGoals,
            });
        },
        editGoal = i => () => {
            
        };
    useEffect(() => {
        fetch("/goals.json")
        .then(res => res.json())
        .then(data => {
            setGoals({
                Current: data.filter(goal => !goal.completed),
                Completed: data.filter(goal => goal.completed),
            });
        });
    }, []);
    return (
        goals ? <Paper className="fade">
            {Object.keys(goals).map(type => (
                <Fragment key={type}>
                    <Typography variant="h4" gutterBottom>
                        <span className="highlight">{type + " "}</span>
                        Goals
                    </Typography>
                    <Container {...containerProps(type)}>
                        {goals[type].map((goal, i) => (
                            <Grid
                                item
                                xs={12}
                                sm={6}
                                md={4}
                                lg={3}
                                key={i}
                            >
                                <Card className={classes.card}>
                                    <CardContent>
                                        <div style={{display: "flex", alignItems: "center"}}>
                                            <Typography variant="h5" gutterBottom style={{overflow: "hidden", textTruncate: "ellipsis"}}>{goal.subject}</Typography>
                                            <div style={{marginLeft: "auto",display: "flex"}}>
                                                <Tooltip placement="bottom" title="Delete">
                                                    <IconButton
                                                        color="primary"
                                                        className={classes.iconBtn}
                                                        onClick={deleteGoal(i, type)}
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Tooltip>
                                                {type === "Current" &&
                                                    <Tooltip placement="bottom" title="Edit">
                                                        <IconButton
                                                            color="primary"
                                                            className={classes.iconBtn}
                                                            onClick={editGoal(i)}
                                                        >
                                                            <EditIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                }
                                                <Tooltip placement="bottom" title={type === "Current" ? "Done" : "Redo"}>
                                                    <IconButton
                                                        color="primary"
                                                        className={classes.iconBtn}
                                                        onClick={type === "Current" ? goalDone(i) : redoGoal(i)}
                                                    >
                                                        {type === "Current" ? <DoneIcon /> : <RedoIcon />}
                                                    </IconButton>
                                                </Tooltip>
                                            </div>
                                        </div>
                                        <Typography>{goal.desc}</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Container>
                    {!isSmall && <MobileStepper
                        variant="dots"
                        style={{
                            marginBottom: type === "Wellbeing"
                                ? 16
                                : 0,
                            borderRadius: "0 0 8px 8px",
                        }}
                        steps={goals[type].length}
                        position="static"
                        activeStep={activeStep[type]}
                        nextButton={
                            <IconButton
                                size="small"
                                onClick={() => setActiveStep({...activeStep, [type]: activeStep[type] + 1})}
                                disabled={activeStep[type] === goals[type].length - 1}
                            >
                                <KeyboardArrowRightIcon />
                            </IconButton>
                        }
                        backButton={
                            <IconButton
                                size="small"
                                onClick={() => setActiveStep({...activeStep, [type]: activeStep[type] - 1})}
                                disabled={activeStep[type] === 0}
                            >
                                <KeyboardArrowLeftIcon />
                            </IconButton>
                        }
                    />}
                    {type === "Current" &&
                        <>
                            <Button
                                variant="contained"
                                className={classes.newGoal}
                            >
                                New Goal
                            </Button>
                            <Divider style={{margin: "16px 0",}} />
                        </>
                    }
                </Fragment>
            ))}
        </Paper>
        : <div className={classes.loadingContainer}>
            <CircularProgress />
        </div>
    );
};