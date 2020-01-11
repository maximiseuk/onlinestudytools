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
  DialogContentText
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
import { useDispatch } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import { omit } from "lodash";
import NextIcon from "@material-ui/icons/KeyboardArrowRight";
import PreviousIcon from "@material-ui/icons/KeyboardArrowLeft";
import CancelIcon from "@material-ui/icons/Close";
import RemoveIcon from "@material-ui/icons/Remove";

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
      margin: "4px 0",
  },
  autofillCard: {
    backgroundColor: theme.palette.secondary.main,
    "& *": {
        color: theme.palette.secondary.contrastText,
        caretColor: theme.palette.secondary.contrastText,
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
      "/" +
      (selectedDate.getMonth() + 1) +
      "/" +
      selectedDate.getFullYear(),
    isSmall = useMediaQuery("(max-width: 800px)"),
    [timetable, setTimetable] = useState(false),
    [clientTimetable, setClientTimetable] = useState(false),
    [autofill, setAutofill] = useState(false),
    [autofillOpen, setAutofillOpen] = useState(false),
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
      "21:00 - 22:00",
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
            setSelectedDate(new Date())
        }
        //alert(autofill)
        setAutofill(!autofill);
    },
    closeAutofill = () => {
        setAutofillOpen(false);
    },
    updateAutofill = hour => e => {
        e.preventDefault()
        const splitted = formatDate.split("/");
            const day = String(new Date(
                splitted[2],
                splitted[1] - 1,
                splitted[0]
              ).getDay());
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
    },
    submitAutofill = () => {

    },
    selectAutofill = (hour, remove) => e => {
        console.log(e.target.className);
        
        if (autofill) {
            const splitted = formatDate.split("/");
            const day = String(new Date(
                splitted[2],
                splitted[1] - 1,
                splitted[0]
              ).getDay());
              const restOfDay = timetable.autofill && timetable.autofill[day] ? timetable.autofill[day] : {}
        setClientTimetable({
            ...timetable,
            autofill: {
                ...timetable.autofill,
                [day]: {
                    ...restOfDay,
                    [hour]: timetable.autofill && timetable.autofill[day] && timetable.autofill[day] && timetable.autofill[day][hour] && (e.target.className !== "MuiCardContent-root" && e.target.className !== "MuiInputBase-root" && e.target.className !== "MuiInputBase-input") ? undefined : {
                        title: "",
                        grade: 5,
                    }
                }
            }
        });
    }
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
            : {},
          splitted = date.split("/"),
          day =
            mode === "week"
              && String(new Date(
                    splitted[2],
                    splitted[1] - 1,
                    splitted[0]
                  ).getDay());
                  console.log((restOfRepeatType));
                  
        if (mode === "week") {
            setClientTimetable({
                ...timetable,
                dayrepeats: restOfDayRepeats,
                weekrepeats: {
                    ...restOfRepeatType,
                    [day]: {
                        ...restOfRepeatType[day],
                        [hour]: {
                      type,
                      title,
                        }
                    },
                }
              });
        } else {
            setClientTimetable({
                ...timetable,
                weekrepeats: restOfWeekRepeats,
                dayrepeats: {
                  ...restOfRepeatType,
                  [hour]: {
                    type,
                    title,
                  }
                }
              });
        }
      } else {
        if (repeatType !== "") {
          if (
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
        } else if (
          timetable.weekrepeats &&
          timetable.weekrepeats[currentHour] &&
          timetable.weekrepeats[currentHour].title === title &&
          timetable.weekrepeats[currentHour].type === type
        ) {
          setClientTimetable({
            ...timetable,
            weekrepeats: omit(timetable.weekrepeats, currentHour)
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
    setTimetable(clientTimetable);
    console.log(clientTimetable);
    
    /*fetch("/users/update_data/timetable", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              newData: clientTimetable,
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
  }, [clientTimetable]);
  useEffect(() => {
    fetch("/timetable.json" /*"/get_data/timetable"*/)
      .then(res => res.json())
      .then(data => {
        setTimetable(data);
        setClientTimetable(data);
      })
      .catch(() => {
        dispatch({
          type: "NEW_ERROR",
          payload: "There was an error loading your goals"
        });
      });
  }, []);
  return timetable ? (
    <Paper className="fade padding">
      <Typography variant="h4" gutterBottom>
        Date: {formatDate}
      </Typography>
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
            <Button onClick={() => setOpen(true)}>Change Date</Button>
            <Button color="secondary" style={{marginLeft: 8,}} onClick={autoFill}>{autofill ? "Autofill" : "Use AI Autofill"}</Button>
            {autofill && <Button onClick={() => setAutofill(false)} style={{marginLeft: 8,}} color="secondary"><CancelIcon /></Button>}
        </div>
        <Dialog
        open={autofillOpen}
        onClose={closeAutofill}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Welcome to AI Autofill.</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please enter the subjects you would like to revise in the slots you've selected. N.B. if you have selected any slots with data already in them, they will be overridden.
          </DialogContentText>
        </DialogContent>
        <DialogActions> 
          <Button onClick={closeAutofill} color="secondary">
            Cancel
          </Button>
          <Button onClick={submitAutofill} color="secondary" autoFocus>
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
            disabled={autofill ? selectedDate.getTime() >= maxAutofill.getTime() : selectedDate.getTime() >=  maxDate.getTime()}
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
            maxDate={maxDate}
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
        const splitted = formatDate.split("/")
        const day = String(new Date(
            splitted[2],
            splitted[1] - 1,
            splitted[0]
          ).getDay())
        if (
          timetable[formatDate] &&
          timetable[formatDate][hour] &&
          timetable[formatDate][hour].title !== ""
        ) {
          root = timetable[formatDate];
        } else if (timetable.weekrepeats) {
          if (
            timetable.weekrepeats[day] && timetable.weekrepeats[day][hour]
          ) {
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
            <Card style={{ marginTop: 8, flex: 1, marginLeft: 8 }} onClick={selectAutofill(hour)}
              className={autofill && timetable.autofill && timetable.autofill[day] && timetable.autofill[day][hour] && classes.autofillCard}>
              <CardContent>
                <div style={{ display: "flex", alignItems: "center" }}>
                    {autofill ?
                    autofill && timetable.autofill && timetable.autofill[day] && timetable.autofill[day][hour] ? <><InputBase
                    value={timetable.autofill[day][hour].title}
                    placeholder="Enter subject"
                    onChange={updateAutofill(hour)}
                    style={{ flex: 1, marginRight: 8 }}
                    onKeyDown={keyDown}
                    inputProps={{
                      maxLength: "64"
                    }}
                  />
                  <Tooltip title="Remove">
                  <IconButton onClick={selectAutofill(hour, "remove")} size="small"><RemoveIcon /></IconButton>
                  </Tooltip>
                  </>
                     : <Typography className={classes.autofillText}>Click to select</Typography>
                    :
                    <>
                  <InputBase
                    value={root && root[hour] ? root[hour].title : ""}
                    placeholder="Topic of the hour"
                    onChange={changeTitle(
                      formatDate,
                      hour,
                      root && root[hour] ? root[hour].type : "revision"
                    )}
                    style={{ flex: 1, marginRight: 8 }}
                    className={
                      root && root[hour] && root[hour].type === "exam"
                        ? classes.input
                        : ""
                    }
                    onKeyDown={keyDown}
                    inputProps={{
                      maxLength: "64"
                    }}
                  />
                  {root && root[hour].title !== "" && (
                    <>
                      {!isSmall && select}
                      <IconButton
                        onClick={e => {
                          setAnchorEl(e.currentTarget);
                          setHour(hour);
                        }}
                        size="small"
                      >
                        <DotsIcon />
                      </IconButton>
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
                          <MenuItem
                            onClick={setRepeat(
                              "none",
                              formatDate,
                              hour,
                              root[currentHour].type,
                              root[currentHour].title,
                              repeatType
                            )}
                          >
                            Doesn't repeat
                          </MenuItem>
                          <MenuItem
                            onClick={setRepeat(
                              "day",
                              formatDate,
                              hour,
                              root[currentHour].type,
                              root[currentHour].title
                            )}
                          >
                            Repeat daily
                          </MenuItem>
                          <MenuItem
                            onClick={setRepeat(
                              "week",
                              formatDate,
                              hour,
                              root[currentHour].type,
                              root[currentHour].title
                            )}
                          >
                            Repeat weekly
                          </MenuItem>
                          {isSmall && select}
                        </Menu>
                      )}
                    </>
                  )}
                  </>
                  }
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
