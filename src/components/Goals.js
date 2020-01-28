/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, Fragment } from "react";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { IconButton, Grid, TextField } from "@material-ui/core";
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
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useDispatch } from "react-redux";
import getCookie from "../api/cookies";

const useStyles = makeStyles(theme => ({
  loadingContainer: {
    textAlign: "center",
    margin: "0 auto",
  },
  newGoal: {
    marginTop: 16
  },
  iconBtn: {
    marginBottom: 8
  },
  swiper: {
    borderRadius: "8px 8px 0 0"
  },
  card: {
    [theme.breakpoints.down(600)]: {
      borderRadius: 0
    },
    [theme.breakpoints.up(600)]: {
      height: "100%"
    },
    height: "100%"
  }
}));

export default () => {
  const dispatch = useDispatch(),
    classes = useStyles(),
    [goals, setGoals] = useState(null),
    [clientGoals, setClientGoals] = useState(null),
    [activeStep, setActiveStep] = useState({
      Current: 0,
      Completed: 0
    }),
    [values, setValues] = useState({
      desc: "",
      newTitle: "",
      newDesc: ""
    }),
    [currentGoal, setCurrentGoal] = useState({
      i: 0,
      type: "Current"
    }),
    [dialogs, setDialogs] = useState({
      delete: false,
      edit: false,
      newGoal: false
    }),
    isSmall = useMediaQuery("(min-width: 600px)"),
    Container = isSmall ? Grid : SwipeableViews,
    containerProps = type =>
      isSmall
        ? {
            container: true,
            spacing: 2,
            className: classes.container
          }
        : {
            index: activeStep[type],
            onChangeIndex: step => {
              setActiveStep({
                ...activeStep,
                [type]: step
              });
            },
            enableMouseEvents: true,
            className: classes.swiper
          },
    close = dialog => () => {
      setDialogs({
        ...dialogs,
        [dialog]: false
      });
    },
    open = (dialog, i, type) => () => {
      setCurrentGoal({
        i,
        type
      });
      if (dialog === "edit") {
        setValues({
          ...values,
          desc: goals[type][i].desc
        });
      }
      setDialogs({
        ...dialogs,
        [dialog]: true
      });
    },
    handleChange = name => e => {
      setValues({
        ...values,
        [name]: e.target.value
      });
    },
    goalDone = i => () => {
      const goal = goals.Current[i];
      goal.completed = true;
      setClientGoals({
        Current: goals.Current.filter((x, j) => j !== i),
        Completed: [goal, ...goals.Completed]
      });
    },
    deleteGoal = () => {
      setClientGoals({
        ...goals,
        [currentGoal.type]: goals[currentGoal.type].filter(
          (x, i) => i !== currentGoal.i
        )
      });
      setDialogs({
        ...dialogs,
        delete: false
      });
    },
    redoGoal = i => () => {
      const goal = goals.Completed[i];
      goal.completed = false;
      setClientGoals({
        Completed: goals.Completed.filter((x, j) => j !== i),
        Current: [goal, ...goals.Current],
      });
    },
    changeDesc = e => {
      e.preventDefault();
      setClientGoals({
        ...goals,
        Current: goals.Current.map((x, i) =>
          i === currentGoal.i
            ? {
                ...x,
                desc: values.desc
              }
            : x
        )
      });
      close("edit")();
    },
    createGoal = e => {
      e.preventDefault();
      setClientGoals({
        Completed: goals.Completed,
        Current: [
          {
            subject: values.newTitle,
            desc: values.newDesc,
            completed: false
          },
          ...goals.Current
        ],
      });
      close("newGoal")();
      setValues({
        desc: "",
        newTitle: "",
        newDesc: ""
      });
    };
  useEffect(() => {
    fetch("https://maximise.herokuapp.com/users/get_data/goals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          sessionID: getCookie("sessionID"),
          username: getCookie("email")
        })
      })
      .then(res => res.json())
      .then(data => {
          console.log(data)
          if (JSON.stringify(data.errors) !== "{}") {
            dispatch({
              type: "NEW_ERROR",
              payload: "There was an error loading your goals"
            });
          } else {
        setGoals(data.response ? data.response : {
            Completed: [],
            Current: []
        });
        setClientGoals(data.response ? data.response : {
            Completed: [],
            Current: []
        });
    }
      })
      .catch(() => {
        dispatch({
          type: "NEW_ERROR",
          payload: "There was an error loading your goals"
        });
      });
  }, []);
  useEffect(() => {
      if (clientGoals && JSON.stringify(clientGoals) !== JSON.stringify(goals)) {
    fetch("https://maximise.herokuapp.com/users/update_data/goals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        newData: clientGoals,
        sessionID: getCookie("sessionID"),
        username: getCookie("email")
      })
    })
      .then(res => res.json())
      .then(data => {
        if (JSON.stringify(data.errors) !== "{}") {
          dispatch({
            type: "NEW_ERROR",
            payload: "There was an error updating your goals"
          });
        } else {
          setGoals(clientGoals);
        }
      })
      .catch(() => {
        dispatch({
          type: "NEW_ERROR",
          payload: "There was an error updating your goals"
        });
      });
    }
  }, [clientGoals]);

  return goals ? (
    <Paper className="fade padding">
      {Object.keys(goals).sort().reverse().map(type => (
        <Fragment key={type}>
          <Typography variant="h4" gutterBottom>
            <span className="highlight">{type + " "}</span>
            Goals
          </Typography>
          <Container {...containerProps(type)}>
            {goals[type].map((goal, i) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                <Card className={classes.card}>
                  <CardContent>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Typography
                        variant="h5"
                        gutterBottom
                        style={{ overflow: "hidden", textTruncate: "ellipsis" }}
                      >
                        {goal.subject}
                      </Typography>
                      <div style={{ marginLeft: "auto", display: "flex" }}>
                        <Tooltip placement="bottom" title="Delete">
                          <IconButton
                            color="primary"
                            className={classes.iconBtn}
                            onClick={open("delete", i, type)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                        {type === "Current" && (
                          <Tooltip placement="bottom" title="Edit">
                            <IconButton
                              color="primary"
                              className={classes.iconBtn}
                              onClick={open("edit", i, type)}
                            >
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                        )}
                        <Tooltip
                          placement="bottom"
                          title={type === "Current" ? "Done" : "Redo"}
                        >
                          <IconButton
                            color="primary"
                            className={classes.iconBtn}
                            onClick={
                              type === "Current" ? goalDone(i) : redoGoal(i)
                            }
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
          {goals[type].length > 0 ? (
            !isSmall && (
              <MobileStepper
                variant="dots"
                style={{
                  marginBottom: type === "Wellbeing" ? 16 : 0,
                  borderRadius: "0 0 8px 8px"
                }}
                steps={goals[type].length}
                position="static"
                activeStep={activeStep[type]}
                nextButton={
                  <IconButton
                    size="small"
                    onClick={() =>
                      setActiveStep({
                        ...activeStep,
                        [type]: activeStep[type] + 1
                      })
                    }
                    disabled={activeStep[type] === goals[type].length - 1}
                  >
                    <KeyboardArrowRightIcon />
                  </IconButton>
                }
                backButton={
                  <IconButton
                    size="small"
                    onClick={() =>
                      setActiveStep({
                        ...activeStep,
                        [type]: activeStep[type] - 1
                      })
                    }
                    disabled={activeStep[type] === 0}
                  >
                    <KeyboardArrowLeftIcon />
                  </IconButton>
                }
              />
            )
          ) : (
            <p>You don't have any {type.toLowerCase()} goals yet</p>
          )}
          {type === "Current" && (
            <>
              <Button
                variant="contained"
                className={classes.newGoal}
                onClick={open("newGoal", 0, "Current")}
              >
                New Goal
              </Button>
              <Divider style={{ margin: "16px 0" }} />
            </>
          )}
        </Fragment>
      ))}
      <Dialog
        open={dialogs.delete}
        onClose={close("delete")}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm action</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this goal?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={close("delete")} color="primary" variant="outlined">
            Cancel
          </Button>
          <Button onClick={deleteGoal} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={dialogs.edit}
        onClose={close("edit")}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
      >
        <form onSubmit={changeDesc}>
          <DialogTitle id="alert-dialog-title">
            Change goal description
          </DialogTitle>
          <DialogContent>
            <TextField
              onChange={handleChange("desc")}
              value={values.desc}
              variant="filled"
              label="Enter the new goal description"
              autoFocus
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={close("edit")} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary" disabled={values.desc === ""}>
              Change
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <Dialog
        open={dialogs.newGoal}
        onClose={close("newGoal")}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
      >
        <form onSubmit={createGoal}>
          <DialogTitle id="alert-dialog-title">Create a new goal</DialogTitle>
          <DialogContent>
            <TextField
              onChange={handleChange("newTitle")}
              value={values.newTitle}
              variant="filled"
              label="Enter the new goal's title"
              autoFocus
              fullWidth
              style={{
                marginBottom: 16
              }}
            />
            <TextField
              onChange={handleChange("newDesc")}
              value={values.newDesc}
              variant="filled"
              label="Enter the new goal's description"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={close("newGoal")} color="primary">
              Cancel
            </Button>
            <Button
              type="submit"
              color="primary"
              disabled={values.newTitle === "" || values.newDesc === ""}
            >
              Create
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Paper>
  ) : (
    <div className={classes.loadingContainer}>
      <CircularProgress />
    </div>
  );
};
