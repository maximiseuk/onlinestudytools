/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import { DatePicker } from "@material-ui/pickers";
import {
  Card,
  CardContent,
  useMediaQuery,
  Typography,
  makeStyles,
  InputBase,
  IconButton,
  Tooltip,
  DialogContentText,
  Chip,
  TextField,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import DotsIcon from "@material-ui/icons/MoreVert";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import { omit } from "lodash";
import NextIcon from "@material-ui/icons/KeyboardArrowRight";
import PreviousIcon from "@material-ui/icons/KeyboardArrowLeft";
import CancelIcon from "@material-ui/icons/Close";
import SelectIcon from "@material-ui/icons/SelectAll";
import Autocomplete from "@material-ui/lab/Autocomplete";
import AddIcon from "@material-ui/icons/Add";
import getCookie from "../api/cookies";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: 0,
    border: `2px solid ${theme.palette.primary.main}`
  },
  input: {
    color: theme.palette.primary.main
  },
  loadingContainer: {
    textAlign: "center",
    margin: "0 auto",
    paddingTop: "40%"
  },
  autofillText: {
    color: theme.palette.secondary.main,
    margin: "4px 0"
  },
  autofilled: {
    color: theme.palette.secondary.main,
  },
  autofillCard: {
    backgroundColor: theme.palette.secondary.main,
    "& *": {
      color: theme.palette.secondary.contrastText,
      caretColor: theme.palette.secondary.contrastText
    }
  }
}));

export default () => {
  const classes = useStyles(),
    dispatch = useDispatch(),
    minDate = new Date(),
    maxDate = new Date(),
    maxAutofill = new Date(),
    [selectedDate, setSelectedDate] = useState(minDate),
    [currentHour, setHour] = useState(""),
    [anchorEl, setAnchorEl] = useState(null),
    [open, setOpen] = useState(false),
    formatDate =
      selectedDate.getDate() +
      "|" +
      (selectedDate.getMonth() + 1) +
      "|" +
      selectedDate.getFullYear(),
    day = String(selectedDate.getDay()),
    isSmall = useMediaQuery("(max-width: 800px)"),
    [timetable, setTimetable] = useState(false),
    [clientTimetable, setClientTimetable] = useState(false),
    [autofill, setAutofill] = useState(false),
    [autofillOpen, setAutofillOpen] = useState(false),
    [autofillSlots, setAutofillSlots] = useState({}),
    { subjects } = useSelector(state => state),
    [autoSubjects, setAutoSubjects] = useState([]),
    [requireds, setRequireds] = useState({}),
    [recents, setRecents] = useState({}),
    [autofillInfo, setAutofillInfo] = useState(false),
    [addScoresDialog, setAddScoresDialog] = useState(false),
    [examGrades, setExamGrades] = useState({}),
    [examScoreSubjects, setExamScoreSubjects] = useState([]),
    [stop, setStop] = useState(false),
    [loading, setLoading] = useState(false),
    hours = [
      "7:00 - 8:00",
      "8:00 - 9:00",
      "9:00 - 10:00",
      "10:00 - 11:00",
      "11:00 - 12:00",
      "12:00 - 13:00",
      "13:00 - 14:00",
      "14:00 - 15:00",
      "15:00 - 16:00",
      "16:00 - 17:00",
      "17:00 - 18:00",
      "18:00 - 19:00",
      "19:00 - 20:00",
      "20:00 - 21:00",
      "21:00 - 22:00"
    ],
    changeType = (date, hour, title) => e => {
      hour = isSmall ? currentHour : hour;
      const restOfDate = timetable[date] === undefined ? {} : timetable[date],
        restOfHour =
          timetable[date] === undefined
            ? {}
            : timetable[date][hour] !== undefined
            ? timetable[date]
            : {};
      setClientTimetable({
        ...timetable,
        [date]: {
          ...restOfDate,
          [hour]: {
            title,
            type: e.target.value
          }
        }
      });
    },
    changeTitle = (date, hour, type) => e => {
      const restOfDate = timetable[date] === undefined ? {} : timetable[date],
        restOfHour =
          timetable[date] === undefined
            ? {}
            : timetable[date][hour] !== undefined
            ? timetable[date][hour]
            : {};
      setClientTimetable({
        ...timetable,
        [date]: {
          ...restOfDate,
          [hour]: {
            type,
            title: e.target.value
          }
        }
      });
    },
    keyDown = e => {
      if (e.key === "Enter") {
        e.target.blur();
      }
    },
    autoFill = () => {
      if (autofill) {
        setAutofillOpen(true);
      } else {
        setAutofill(true);
        setAutofillInfo(true);
        setSelectedDate(new Date());
      }
    },
    closeAutofill = () => {
      setAutofillOpen(false);
    },
    submitExamGrades = () => {
      fetch("https://maximise.herokuapp.com/users/update_data/grades", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          newData: {
            //requireds: requireds,
            //recents: recents,
          },
          sessionID: getCookie("sessionID"),
          username: getCookie("email")
        })
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);

          if (JSON.stringify(data.errors) !== "{}") {
            dispatch({
              type: "NEW_ERROR",
              payload: "There was an error uploading your exam grades"
            });
          } else {
            setAddScoresDialog(false);
          }
        })
        .catch(() => {
          dispatch({
            type: "NEW_ERROR",
            payload: "There was an error uploading your exam grades"
          });
        });
    },
    /*updateAutofill = hour => e => {
        setClientTimetable({
            ...timetable,
            autofill: {
                ...timetable.autofill,
                [day]: {
                    ...timetable.autofill[day],
                    [hour]: {
                        ...timetable.autofill[day][hour],
                        title: e.target.value,
                    }
                }
            }
        });
    },*/
    submitAutofill = () => {
        setLoading(true);
      fetch("https://maximise.herokuapp.com/users/update_data/grades", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          newData: {
            recents, requireds, autofillSlots
          },
          sessionID: getCookie("sessionID"),
          username: getCookie("email")
        })
      })
        .then(res => res.json())
        .then(data => {
            setLoading(false);
            console.log(data);
            
          if (JSON.stringify(data.errors) !== "{}") {
            dispatch({
              type: "NEW_ERROR",
              payload: "There was an error uploading your exam grades"
            });
          } else {
              setClientTimetable({...timetable, autofill: data.response});
            setAutofillOpen(false);
            setAutofill(false);
            setAutofillSlots({});
          }
        })
        .catch(() => {
          dispatch({
            type: "NEW_ERROR",
            payload: "There was an error uploading your exam grades"
          });
        });
    },
    selectAutofill = hour => e => {
      if (autofill) {
        const restOfDay = autofillSlots[day] ? autofillSlots[day] : [];
        setAutofillSlots({
          ...autofillSlots,
          [day]:
            autofillSlots[day] && autofillSlots[day].includes(hour)
              ? restOfDay.filter(x => x !== hour)
              : [...restOfDay, hour]
        });
      }
    },
    selectAll = () => {
      setAutofillSlots({
        ...autofillSlots,
        [day]: hours
      });
    },
    setRepeat = (mode, date, hour, type, title, repeatType) => () => {
      if (mode === "day" || mode === "week") {
        const restOfWeekRepeats = timetable[mode + "repeats"]
            ? mode !== "week"
              ? omit(timetable.weekrepeats, currentHour)
              : timetable.weekrepeats
            : {},
          restOfDayRepeats = timetable[mode + "repeats"]
            ? mode !== "day" &&
              timetable.dayrepeats[currentHour] &&
              timetable.dayrepeats[currentHour].title === title &&
              timetable.dayrepeats[currentHour].type === type
              ? omit(timetable.dayrepeats, currentHour)
              : timetable.dayrepeats
            : {},
          restOfRepeatType = timetable[mode + "repeats"]
            ? timetable[mode + "repeats"]
            : {};
        const autofillOptions =
          timetable.autofill && timetable.autofill[selectedDate.getDay()]
            ? {
                [selectedDate.getDay()]:
                  repeatType === "autofill"
                    ? omit(
                        timetable.autofill[selectedDate.getDay()],
                        currentHour
                      )
                    : timetable.autofill[selectedDate.getDay()]
              }
            : {};
        if (mode === "week") {
          setClientTimetable({
            ...timetable,
            dayrepeats: restOfDayRepeats,
            weekrepeats: {
              ...restOfRepeatType,
              [day]: {
                ...timetable.weekrepeats[day],
                [hour]: {
                  type,
                  title
                }
              }
            },
            autofill: {
              ...timetable.autofill,
              ...autofillOptions
            }
          });
        } else {
          setClientTimetable({
            ...timetable,
            weekrepeats: restOfWeekRepeats,
            autofill: {
              ...timetable.autofill,
              ...autofillOptions
            },
            dayrepeats: {
              ...timetable.dayrepeats,
              [hour]: {
                type,
                title
              }
            }
          });
        }
      } else {
        if (repeatType !== "") {
          if (repeatType === "week" || repeatType === "autofill") {
            if (
              timetable[repeatType + "repeats"][selectedDate.getDay()] &&
              timetable[repeatType + "repeats"][selectedDate.getDay()][
                currentHour
              ] &&
              timetable[repeatType + "repeats"][selectedDate.getDay()][
                currentHour
              ].title === title &&
              timetable[repeatType + "repeats"][selectedDate.getDay()][
                currentHour
              ].type === type
            ) {
              setClientTimetable({
                ...timetable,
                [repeatType + "repeats"]: {
                  ...timetable[repeatType + "repeats"],
                  [selectedDate.getDay()]: omit(
                    timetable[repeatType + "repeats"][selectedDate.getDay()],
                    currentHour
                  )
                }
              });
            }
          } else {
            if (
              timetable[repeatType + "repeats"][currentHour] &&
              timetable[repeatType + "repeats"][currentHour].title === title &&
              timetable[repeatType + "repeats"][currentHour].type === type
            ) {
              setClientTimetable({
                ...timetable,
                [repeatType + "repeats"]: omit(
                  timetable[repeatType + "repeats"],
                  currentHour
                )
              });
            }
          }
        } else if (
          timetable &&
          timetable.autofill[selectedDate.getDay()] &&
          timetable.autofill[selectedDate.getDay()][currentHour] &&
          timetable.autofill[selectedDate.getDay()][currentHour].title ===
            title &&
          timetable.autofill[selectedDate.getDay()][currentHour].type === type
        ) {
          setClientTimetable({
            ...timetable,
            autofill: {
              ...timetable.autofill,
              [selectedDate.getDay()]: omit(
                timetable[repeatType + "repeats"][selectedDate.getDay()],
                currentHour
              )
            }
          });
        } else if (
          timetable &&
          timetable.weekrepeats[selectedDate.getDay()] &&
          timetable.weekrepeats[selectedDate.getDay()][currentHour] &&
          timetable.weekrepeats[selectedDate.getDay()][currentHour].title ===
            title &&
          timetable.weekrepeats[selectedDate.getDay()][currentHour].type ===
            type
        ) {
          setClientTimetable({
            ...timetable,
            weekrepeats: {
              ...timetable[repeatType + "repeats"],
              [selectedDate.getDay()]: omit(
                timetable.weekrepeats[selectedDate.getDay()],
                currentHour
              )
            }
          });
        } else if (
          timetable.dayrepeats &&
          timetable.dayrepeats[currentHour] &&
          timetable.dayrepeats[currentHour].title === title &&
          timetable.dayrepeats[currentHour].type === type
        ) {
          setClientTimetable({
            ...timetable,
            dayrepeats: omit(timetable.dayrepeats, currentHour)
          });
        }
      }
      setAnchorEl(null);
    };
  maxDate.setMonth(maxDate.getMonth() + 2);
  minDate.setHours(23, 59, 29, 999);
  maxDate.setHours(0, 0, 0, 0);
  maxAutofill.setDate(maxDate.getDate() + 6);
  maxAutofill.setHours(0, 0, 0, 0);
  useEffect(() => {
    if (clientTimetable) {
        setTimetable(clientTimetable);
     fetch("https://maximise.herokuapp.com/users/update_data/timetable", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          newData: clientTimetable,
          sessionID: getCookie("sessionID"),
          username: getCookie("email")
        })
      })
        .then(res => res.json())
        .then(data => {
          if (JSON.stringify(data.errors) !== "{}") {
            dispatch({
              type: "NEW_ERROR",
              payload: "There was an error updating your timetable"
            });
          } else {
            setTimetable(clientTimetable);
          }
        })
        .catch(() => {
          dispatch({
            type: "NEW_ERROR",
            payload: "There was an error updating your agenda"
          });
        });
    }
  }, [clientTimetable]);
  useEffect(() => {
    fetch("https://maximise.herokuapp.com/users/get_data/timetable", {
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
        console.log(data);
        console.log("data");
        if (JSON.stringify(data.errors) !== "{}") {
          dispatch({
            type: "NEW_ERROR",
            payload: "There was an error loading your timetable"
          });
        } else {
          setTimetable(data.response ? data.response : {});
          setClientTimetable(data.response ? data.response : {});
        }
      })
      .catch(err => {
        console.error(err);
        dispatch({
          type: "NEW_ERROR",
          payload: "There was an error loading your timetable"
        });
      });
  }, []);
  useEffect(() => {
    if (
      JSON.stringify(autofillSlots["0"]) === JSON.stringify(hours) &&
      JSON.stringify(autofillSlots["1"]) === JSON.stringify(hours) &&
      JSON.stringify(autofillSlots["2"]) === JSON.stringify(hours) &&
      JSON.stringify(autofillSlots["3"]) === JSON.stringify(hours) &&
      JSON.stringify(autofillSlots["4"]) === JSON.stringify(hours) &&
      JSON.stringify(autofillSlots["5"]) === JSON.stringify(hours) &&
      JSON.stringify(autofillSlots["6"]) === JSON.stringify(hours)
    ) {
      setStop(true);
    }
  }, [autofillSlots]);
  return timetable ? (
    <Paper className="fade padding">
      <div
        style={{
          display: "flex",
          alignItems: "center"
        }}
      >
        <Typography variant="h4">{formatDate.replace(/\|/g, "/")}</Typography>
        <Button onClick={() => setOpen(true)} style={{ marginLeft: 8 }}>
          Change
        </Button>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <Tooltip title="Previous Day">
          <IconButton
            onClick={() => {
              const newDate = new Date(selectedDate);
              newDate.setDate(newDate.getDate() - 1);
              setSelectedDate(new Date(newDate));
            }}
            disabled={minDate.getTime() >= selectedDate.getTime()}
          >
            <PreviousIcon />
          </IconButton>
        </Tooltip>
        <div>
          <Button
            color="secondary"
            style={{ minWidth: "auto", padding: "8px 16px" }}
            onClick={autoFill}
            disabled={
              autofill &&
              (!autofillSlots ||
                (autofillSlots &&
                  Object.values(autofillSlots).filter(x => x.length > 0)
                    .length === 0))
            }
          >
            {autofill ? "Go" : "AI Autofill"}
          </Button>
          {!autofill && (
            <Tooltip title="Add test scores">
              <Button
                onClick={() => setAddScoresDialog(true)}
                style={{ marginLeft: 8, padding: 8, minWidth: "auto" }}
                color="secondary"
              >
                <AddIcon />
              </Button>
            </Tooltip>
          )}
          {autofill && (
            <Tooltip title="Cancel">
              <Button
                onClick={() => setAutofill(false)}
                style={{ marginLeft: 8, padding: 8, minWidth: "auto" }}
                color="secondary"
              >
                <CancelIcon />
              </Button>
            </Tooltip>
          )}
          {autofill && (
            <Tooltip title="Select all today">
              <Button
                onClick={selectAll}
                style={{ marginLeft: 8, padding: 8, minWidth: "auto" }}
                color="secondary"
              >
                <SelectIcon />
              </Button>
            </Tooltip>
          )}
        </div>
        <Dialog
          open={autofillInfo}
          onClose={() => setAutofillInfo(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Welcome to AI Autofill!
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              AI Autofill is a revision tool that uses machine learning designed
              to help you revise as efficiently as possible. To get started,
              simply:
              <br />
              <ol>
                <li>Pick the timeslots you want to revise for and click Go</li>
                <li>Choose the subjects you want to revise</li>
              </ol>
              <br />
              AI Autofill will also automatically fill in break periods for you
              so you don't need to add them yourself.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setAutofillInfo(false)}
              color="secondary"
              autoFocus
            >
              OK
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={stop}
          onClose={() => setStop(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            You're doing too much revision!
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Seriously, you need to have some breaks dude!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setStop(false)} color="secondary" autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={autofillOpen}
          onClose={closeAutofill}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">AI Autofill</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Please enter the subjects you would like to revise, and the your
              recent and required grade for each of them. N.B. if you have
              selected any slots with items that already repeat daily or weekly, they will be
              overridden. Otherwise, selecting slots that have one-off items in them will not autofill.
            </DialogContentText>
            {subjects ? (
              <Autocomplete
                multiple
                filterSelectedOptions
                onChange={(e, val) => {
                  let newRecents = recents;
                  let newRequireds = requireds;
                  val.forEach(a => {
                    if (!newRecents[a]) {
                      newRecents[a] = 5;
                    }
                    if (!newRequireds[a]) {
                      newRequireds[a] = 5;
                    }
                  });
                  setRecents(newRecents);
                  setRequireds(newRequireds);
                  setAutoSubjects(val);
                }}
                options={subjects}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      key={index}
                      variant="outlined"
                      label={option}
                      {...getTagProps({ index })}
                      style={{ margin: 4 }}
                    />
                  ))
                }
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Enter your subjects"
                    margin="normal"
                    variant="filled"
                    fullWidth
                  />
                )}
              />
            ) : (
              <Typography>You don't have any subjects</Typography>
            )}
            {autoSubjects.map((a, i) => (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 8
                }}
                key={a}
              >
                <Typography style={{ marginRight: 8 }}>{a}</Typography>
                <div>
                  <FormControl
                    variant="filled"
                    style={{ width: 96, marginRight: 8 }}
                    size="small"
                  >
                    <InputLabel id="demo-simple-select-filled-label">
                      Recent
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      value={recents[a]}
                      onChange={e =>
                        setRecents({ ...recents, [a]: e.target.value })
                      }
                    >
                      {[...Array(9).keys()].map(x => (
                        <MenuItem value={x + 1} key={x}>
                          {x + 1}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl
                    variant="filled"
                    style={{ width: 96 }}
                    size="small"
                  >
                    <InputLabel id="demo-simple-select-filled-label">
                      Required
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      value={requireds[a]}
                      onChange={e =>
                        setRequireds({ ...recents, [a]: e.target.value })
                      }
                    >
                      {[...Array(9).keys()].map(x => (
                        <MenuItem value={x + 1} key={x}>
                          {x + 1}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </div>
            ))}
            {loading && (
                <div style={{padding: 8, textAlign: "center"}}>
                    <CircularProgress color="secondary" />
                </div>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={closeAutofill} color="secondary">
              Cancel
            </Button>
            <Button onClick={submitAutofill} color="secondary" autoFocus disabled={loading}>
              Go
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={addScoresDialog}
          onClose={() => setAddScoresDialog(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Enter your grades for tests you've had
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              For the tests that you last revised for using this timetable,
              enter the grades here - this will help us make the AI Autofill
              feature more accurate and more likely to help you revise
              efficiently.
            </DialogContentText>
            {subjects ? (
              <Autocomplete
                multiple
                filterSelectedOptions
                onChange={(e, val) => {
                  let newGrades = examGrades;
                  val.forEach(a => {
                    if (!newGrades[a]) {
                      newGrades[a] = 5;
                    }
                  });
                  setExamGrades(newGrades);
                  setExamScoreSubjects(val);
                }}
                options={subjects}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      key={index}
                      variant="outlined"
                      label={option}
                      {...getTagProps({ index })}
                      style={{ margin: 4 }}
                    />
                  ))
                }
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Enter your subjects"
                    margin="normal"
                    variant="filled"
                    fullWidth
                  />
                )}
              />
            ) : (
              <Typography>You don't have any subjects</Typography>
            )}
            {examScoreSubjects.map((a, i) => (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 8
                }}
                key={a}
              >
                <Typography style={{ marginRight: 8 }}>{a}</Typography>
                <div>
                  <FormControl
                    variant="filled"
                    style={{ width: 96 }}
                    size="small"
                  >
                    <InputLabel id="demo-simple-select-filled-label">
                      Grade
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      value={examGrades[a]}
                      onChange={e =>
                        setExamGrades({ ...examGrades, [a]: e.target.value })
                      }
                    >
                      {[...Array(9).keys()].map(x => (
                        <MenuItem value={x + 1} key={x}>
                          {x + 1}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </div>
            ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setAddScoresDialog(false)} color="secondary">
              Cancel
            </Button>
            <Button onClick={submitExamGrades} color="secondary" autoFocus>
              Go
            </Button>
          </DialogActions>
        </Dialog>
        <Tooltip title="Next Day">
          <IconButton
            onClick={() => {
              const newDate = new Date(selectedDate);
              newDate.setDate(newDate.getDate() + 1);
              setSelectedDate(new Date(newDate));
            }}
            disabled={
              autofill
                ? selectedDate.getTime() >= maxAutofill.getTime()
                : selectedDate.getTime() >= maxDate.getTime()
            }
          >
            <NextIcon />
          </IconButton>
        </Tooltip>
      </div>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Change Date to View</DialogTitle>
        <DialogContent>
          <DatePicker
            orientation="portrait"
            variant="static"
            openTo="date"
            value={selectedDate}
            onChange={setSelectedDate}
            minDate={minDate}
            maxDate={!autofill ? maxDate : maxAutofill}
            autoFocus
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
      {hours.map(hour => {
        let root = false;
        let repeatType = "";
        if (
          timetable[formatDate] &&
          timetable[formatDate][hour] &&
          timetable[formatDate][hour].title !== ""
        ) {
          root = timetable[formatDate];
        } else if (
            timetable.autofill &&
            timetable.autofill[day] &&
            timetable.autofill[day][hour]
          ) {
            root = timetable.autofill[day];
            repeatType = "autofill";
          } else if (timetable.weekrepeats) {
          if (timetable.weekrepeats[day] && timetable.weekrepeats[day][hour]) {
            root = timetable.weekrepeats[day];
            repeatType = "week";
          } else if (timetable.dayrepeats && timetable.dayrepeats[hour]) {
            root = timetable.dayrepeats;
            repeatType = "day";
          }
        } else if (timetable.dayrepeats && timetable.dayrepeats[hour]) {
          root = timetable.dayrepeats;
          repeatType = "day";
        }
        const select = root[isSmall ? currentHour : hour] &&
          root[isSmall ? currentHour : hour].title !== "" && (
            <Select
              value={
                root && root[isSmall ? currentHour : hour]
                  ? root[isSmall ? currentHour : hour].type
                  : "revision"
              }
              onChange={changeType(
                formatDate,
                hour,
                root[isSmall ? currentHour : hour].title
              )}
              style={{ marginLeft: isSmall ? 16 : "auto" }}
              MenuProps={{
                PaperProps: {
                  className: classes.paper
                }
              }}
            >
              <MenuItem value="exam">Exam</MenuItem>
              <MenuItem value="revision">Revision</MenuItem>
              <MenuItem value="break">Break</MenuItem>
            </Select>
          );
        return (
          <div style={{ display: "flex" }} key={hour}>
            <Card
              style={{
                marginTop: 8,
                width: isSmall ? 72 : 144,
                display: "flex",
                alignItems: "center"
              }}
            >
              <CardContent>
                <Typography className="highlight">
                  {isSmall ? hour.split(" -")[0] : hour}
                </Typography>
              </CardContent>
            </Card>
            <Card
              style={{ marginTop: 8, flex: 1, marginLeft: 8 }}
              onClick={selectAutofill(hour)}
              className={
                autofill &&
                autofillSlots[day] &&
                autofillSlots[day].includes(hour) &&
                classes.autofillCard
              }
            >
              <CardContent>
                <div style={{ display: "flex", alignItems: "center" }}>
                  {autofill ? (
                    <Typography className={classes.autofillText}>
                      {root && root[hour]
                        ? repeatType === "autofill" ? root[hour] : root[hour].title
                        : "Click to select"}
                    </Typography>
                  ) : (
                    <>
                      <InputBase
                        value={root && root[hour] ? repeatType === "autofill" ? root[hour] : root[hour].title : ""}
                        placeholder="Topic of the hour"
                        onChange={changeTitle(
                          formatDate,
                          hour,
                          root && root[hour] ? root[hour].type : "revision"
                        )}
                        style={{ flex: 1, marginRight: 8 }}
                        className={
                          root && root[hour] && root[hour].type === "exam"
                            ? classes.input : repeatType === "autofill" ? classes.autofilled
                            : ""
                        }
                        onKeyDown={keyDown}
                        inputProps={{
                          maxLength: "64"
                        }}
                      />
                      {root && root[hour].title !== "" && repeatType !== "autofill" && (
                        <>
                          {!isSmall && select}
                          {!(
                            !isSmall &&
                            root[hour] &&
                            root[hour].type === "exam"
                          ) && (
                            <IconButton
                              onClick={e => {
                                setAnchorEl(e.currentTarget);
                                setHour(hour);
                              }}
                              size="small"
                            >
                              <DotsIcon />
                            </IconButton>
                          )}
                          {root[currentHour] && (
                            <Menu
                              anchorEl={anchorEl}
                              keepMounted
                              open={Boolean(anchorEl)}
                              onClose={() => setAnchorEl(null)}
                              PaperProps={{
                                className: classes.paper
                              }}
                            >
                              {root[currentHour].type !== "exam" && [
                                <MenuItem
                                  onClick={setRepeat(
                                    "none",
                                    formatDate,
                                    currentHour,
                                    root[currentHour].type,
                                    root[currentHour].title,
                                    repeatType
                                  )}
                                >
                                  Doesn't repeat
                                </MenuItem>,
                                <MenuItem
                                  onClick={setRepeat(
                                    "day",
                                    formatDate,
                                    currentHour,
                                    root[currentHour].type,
                                    root[currentHour].title,
                                    repeatType
                                  )}
                                >
                                  Repeat daily
                                </MenuItem>,
                                <MenuItem
                                  onClick={setRepeat(
                                    "week",
                                    formatDate,
                                    currentHour,
                                    root[currentHour].type,
                                    root[currentHour].title,
                                    repeatType
                                  )}
                                >
                                  Repeat weekly
                                </MenuItem>
                              ]}
                              <div style={{ width: 138.91 }}>
                                {isSmall && select}
                              </div>
                            </Menu>
                          )}
                        </>
                      )}
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        );
      })}
    </Paper>
  ) : (
    <div className={classes.loadingContainer}>
      <CircularProgress />
    </div>
  );
};
