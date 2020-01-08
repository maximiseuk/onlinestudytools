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
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import LateIcon from "@material-ui/icons/AssignmentLate";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import { useDispatch } from "react-redux";
import { KeyboardDatePicker, KeyboardTimePicker } from "@material-ui/pickers";
import Portal from "@material-ui/core/Portal";

const useStyles = makeStyles(theme => ({
  loadingContainer: {
    textAlign: "center",
    margin: "0 auto",
    paddingTop: "40%"
  },
  newTodo: {
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
      borderRadius: "0px"
    },
    [theme.breakpoints.up(600)]: {
      height: "100%"
    },
    height: "100%"
  },
  late: {
    color: theme.palette.error.main
  },
  snackbar: {
    backgroundColor: theme.palette.background.paper,
    border: `2px solid ${theme.palette.primary.main}`,
    borderRadius: 16,
    color: theme.palette.text.primary
  }
}));

export default () => {
  const dispatch = useDispatch(),
    classes = useStyles(),
    [selectedDate, handleDateChange] = useState(new Date()),
    [selectedTime, handleTimeChange] = useState(new Date()),
    [doneTodo, setDoneTodo] = useState([]),
    [allDay, setAllDay] = useState(false),
    [agenda, setAgenda] = useState(false),
    [clientAgenda, setClientAgenda] = useState(false),
    [activeStep, setActiveStep] = useState(0),
    [values, setValues] = useState({
      desc: "",
      newTitle: "",
      newDesc: ""
    }),
    [currentTodo, setCurrentTodo] = useState(0),
    [dialogs, setDialogs] = useState({
      delete: false,
      edit: false,
      newTodo: false
    }),
    isSmall = useMediaQuery("(min-width: 600px)"),
    Container = isSmall ? Grid : SwipeableViews,
    containerProps = () =>
      isSmall
        ? {
            container: true,
            spacing: 2,
            className: classes.container
          }
        : {
            index: activeStep,
            onChangeIndex: step => {
              setActiveStep(step);
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
    open = (dialog, i) => () => {
      setCurrentTodo(i);
      handleDateChange(new Date());
      handleTimeChange(new Date());
      if (dialog === "edit") {
        setValues({
          ...values,
          desc: agenda[i].desc
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
    todoDone = i => () => {
      setDoneTodo([agenda[i], i]);
      setClientAgenda(agenda.filter((x, j) => i !== j));
    },
    deleteTodo = () => {
      setClientAgenda(agenda.filter((x, i) => i !== currentTodo));
      setDialogs({
        ...dialogs,
        delete: false
      });
    },
    changeDesc = e => {
      e.preventDefault();
      const todoTime = new Date(selectedTime),
        date = new Date(selectedDate);
      if (allDay) {
        date.setHours(23);
        date.setMinutes(59);
      } else {
        date.setHours(todoTime.getHours());
        date.setMinutes(todoTime.getMinutes());
      }
      setClientAgenda(
        agenda.map((x, i) =>
          i === currentTodo
            ? {
                ...x,
                desc: values.desc,
                date,
                time: allDay ? "All Day" : false
              }
            : x
        )
      );
      close("edit")();
    },
    undo = () => {
      setClientAgenda([
        ...agenda.filter((x, i) => i < doneTodo[1]),
        doneTodo[0],
        ...agenda.filter((x, i) => i >= doneTodo[1])
      ]);
      setDoneTodo([]);
    },
    createTodo = e => {
      e.preventDefault();
      const todoTime = new Date(selectedTime),
        date = new Date(selectedDate);
      if (allDay) {
        date.setHours(23);
        date.setMinutes(59);
      } else {
        date.setHours(todoTime.getHours());
        date.setMinutes(todoTime.getMinutes());
      }
      setClientAgenda([
        {
          subject: values.newTitle,
          desc: values.newDesc,
          date,
          time: allDay ? "All Day" : false
        },
        ...agenda
      ]);
      close("newTodo")();
      setValues({
        desc: "",
        newTitle: "",
        newDesc: ""
      });
    };
  useEffect(() => {
    fetch("/agenda.json" /*"/get_data/agenda"*/)
      .then(res => res.json())
      .then(data => {
        setAgenda(data);
        setClientAgenda(data);
      })
      .catch(() => {
        dispatch({
          type: "NEW_ERROR",
          payload: "There was an error loading your agenda"
        });
      });
  }, []);
  useEffect(() => {
    setAgenda(clientAgenda);
    /*fetch("/update_data", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              newData: clientAgenda,
              sessionID: getCookie("sessionID"),
              username: getCookie("email")
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data === "failed") {
                dispatch({
                    type: "NEW_ERROR",
                    payload: "There was an error updating your agenda",
                });
            } else {
                setAgenda(clientAgenda);
            }
        })
        .catch(() => {
            dispatch({
                type: "NEW_ERROR",
                payload: "There was an error updating your agenda",
            });
        });*/
  }, [clientAgenda]);
  return agenda ? (
    <>
      <Paper className="fade padding">
        <Container {...containerProps()}>
          {agenda.map((todo, i) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={i}
              style={{ height: Container === SwipeableViews && "100%" }}
            >
              <Card className={classes.card}>
                <CardContent>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Typography
                      variant="h5"
                      gutterBottom
                      style={{ overflow: "hidden", textTruncate: "ellipsis" }}
                      className={
                        new Date().getTime() > new Date(todo.date).getTime()
                          ? classes.late
                          : null
                      }
                    >
                      {todo.subject}
                    </Typography>
                    <div style={{ marginLeft: "auto", display: "flex" }}>
                      <Tooltip placement="bottom" title="Delete">
                        <IconButton
                          color="primary"
                          className={classes.iconBtn}
                          onClick={open("delete", i)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip placement="bottom" title="Edit">
                        <IconButton
                          color="primary"
                          className={classes.iconBtn}
                          onClick={open("edit", i)}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip placement="bottom" title="Done">
                        <IconButton
                          color="primary"
                          className={classes.iconBtn}
                          onClick={todoDone(i)}
                        >
                          <DoneIcon />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </div>
                  <Typography className="highlight">
                    {new Date(todo.date).toLocaleDateString() + " "}
                    {todo.time === "All Day"
                      ? todo.time
                      : new Date(todo.date)
                          .toLocaleTimeString()
                          .split(":")
                          .slice(0, -1)
                          .join(":")}
                    {new Date().getTime() > new Date(todo.date).getTime() && (
                      <span className={classes.late}>
                        {" "}
                        <LateIcon style={{ marginBottom: -4 }} /> Late
                      </span>
                    )}
                  </Typography>
                  <Typography>{todo.desc}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Container>
        {agenda.length > 0 ? (
          !isSmall && (
            <MobileStepper
              variant="dots"
              style={{
                marginBottom: 16,
                borderRadius: "0 0 8px 8px"
              }}
              steps={agenda.length}
              position="static"
              activeStep={activeStep}
              nextButton={
                <IconButton
                  size="small"
                  onClick={() => setActiveStep(activeStep + 1)}
                  disabled={activeStep === agenda.length - 1}
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
          )
        ) : (
          <p>You don't have anything on your agenda yet</p>
        )}
        <Button
          variant="contained"
          className={classes.newTodo}
          onClick={open("newTodo", 0)}
        >
          New Todo
        </Button>
        <Dialog
          open={dialogs.delete}
          onClose={close("delete")}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Confirm action</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this todo?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={close("delete")}
              color="primary"
              variant="outlined"
            >
              Cancel
            </Button>
            <Button onClick={deleteTodo} color="primary" autoFocus>
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
              Change todo description
            </DialogTitle>
            <DialogContent>
              <TextField
                onChange={handleChange("desc")}
                value={values.desc}
                variant="filled"
                label="Enter the new todo description"
                autoFocus
                fullWidth
              />
              <KeyboardDatePicker
                clearable
                value={selectedDate}
                placeholder="10/10/2018"
                onChange={date => handleDateChange(date)}
                style={{
                  marginTop: 16
                }}
                minDate={new Date()}
                label="Date"
                format="dd/MM/yyyy"
                fullWidth
                DialogProps={{
                  fullWidth: false,
                  maxWidth: "xs"
                }}
              />
              <KeyboardTimePicker
                label="Time"
                placeholder="08:00"
                mask="__:__"
                value={selectedTime}
                onChange={date => handleTimeChange(date)}
                ampm={false}
                style={{
                  marginTop: 16
                }}
                disabled={allDay}
                fullWidth
              />
              <FormControlLabel
                style={{
                  marginTop: 16
                }}
                control={
                  <Switch
                    checked={allDay}
                    onChange={e => setAllDay(e.target.checked)}
                    value="All Day"
                    inputProps={{ "aria-label": "all day" }}
                  />
                }
                label="All Day"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={close("edit")} color="primary">
                Cancel
              </Button>
              <Button
                type="submit"
                color="primary"
                disabled={values.desc === ""}
              >
                Change
              </Button>
            </DialogActions>
          </form>
        </Dialog>
        <Dialog
          open={dialogs.newTodo}
          onClose={close("newTodo")}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth
        >
          <form onSubmit={createTodo}>
            <DialogTitle id="alert-dialog-title">Create a new todo</DialogTitle>
            <DialogContent>
              <TextField
                onChange={handleChange("newTitle")}
                value={values.newTitle}
                variant="filled"
                label="Enter the new todo's title"
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
                label="Enter the new todo's description"
                fullWidth
              />
              <KeyboardDatePicker
                clearable
                value={selectedDate}
                placeholder="10/10/2018"
                onChange={date => handleDateChange(date)}
                style={{
                  marginTop: 16
                }}
                minDate={new Date()}
                label="Date"
                format="dd/MM/yyyy"
                fullWidth
                DialogProps={{
                  fullWidth: false,
                  maxWidth: "xs"
                }}
              />
              <KeyboardTimePicker
                label="Time"
                placeholder="08:00"
                mask="__:__"
                value={selectedTime}
                onChange={date => handleTimeChange(date)}
                ampm={false}
                style={{
                  marginTop: 16
                }}
                disabled={allDay}
                fullWidth
              />
              <FormControlLabel
                style={{
                  marginTop: 16
                }}
                control={
                  <Switch
                    checked={allDay}
                    onChange={e => setAllDay(e.target.checked)}
                    value="All Day"
                    inputProps={{ "aria-label": "all day" }}
                  />
                }
                label="All Day"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={close("newTodo")} color="primary">
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
      <Portal container={document.getElementById("root")}>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          style={{
            position: "absolute",
            bottom: 8,
            zIndex: 1000000000,
            left: 8
          }}
          open={doneTodo.length !== 0}
          autoHideDuration={5000}
          onClose={() => setDoneTodo([])}
        >
          <SnackbarContent
            message="Todo completed"
            style={{
              borderRadius: 8
            }}
            className={classes.snackbar}
            action={
              <Button color="primary" onClick={undo}>
                Undo
              </Button>
            }
          />
        </Snackbar>
      </Portal>
    </>
  ) : (
    <div className={classes.loadingContainer}>
      <CircularProgress />
    </div>
  );
};
