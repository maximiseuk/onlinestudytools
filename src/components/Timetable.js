/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import { DatePicker } from "@material-ui/pickers";
import { Card, CardContent, useMediaQuery, Typography, makeStyles, InputBase, IconButton, Tooltip } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import DotsIcon from "@material-ui/icons/MoreVert";
import { useDispatch } from "react-redux";
import CircularProgress from '@material-ui/core/CircularProgress';
import { omit } from "lodash";
import NextIcon from "@material-ui/icons/KeyboardArrowRight";
import PreviousIcon from "@material-ui/icons/KeyboardArrowLeft";

const useStyles = makeStyles(theme => ({
    paper: {
        padding: 0,
        border: `2px solid ${theme.palette.primary.main}`,
    },
    input: {
        color: theme.palette.primary.main
    },
    loadingContainer: {
        textAlign: "center",
        margin: "0 auto",
        paddingTop: "40%",
    },
}));

export default () => {
    const
        classes = useStyles(),
        dispatch = useDispatch(),
        minDate = new Date(),
        maxDate = new Date(),
        [selectedDate, setSelectedDate] = useState(minDate),
        [currentHour, setHour] = useState(""),
        [anchorEl, setAnchorEl] = useState(null),
        [open, setOpen] = useState(false),
        formatDate = selectedDate.getDate() + "/" + (selectedDate.getMonth() + 1) + "/" + selectedDate.getFullYear(),
        isSmall = useMediaQuery("(max-width: 800px)"),
        [timetable, setTimetable] = useState(false),
        [clientTimetable, setClientTimetable] = useState(false),
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
        ],
        changeType = (date, hour, title) => e => {
            
            hour = isSmall ? currentHour : hour;
            const
                restOfDate = timetable[date] === undefined
                    ? {}
                    : timetable[date],
                restOfHour = timetable[date] === undefined
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
                        type: e.target.value,
                    },
                },
            });
        },
        changeTitle = (date, hour, type) => e => {
            const
                restOfDate = timetable[date] === undefined
                    ? {}
                    : timetable[date],
                restOfHour = timetable[date] === undefined
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
                        title: e.target.value,
                    },
                },
            });
        },
        keyDown = e => {
            if (e.key === "Enter") {
                e.target.blur();
            }
        },
        setRepeat = (mode, date, hour, type, title, repeatType) => () => {
            if (mode === "day" || mode === "week") {
                const
                    restOfWeekRepeats = timetable[mode + "repeats"]
                        ? mode !== "week"
                            ? omit(timetable.weekrepeats, currentHour)
                            : timetable.weekrepeats
                        : {},
                    restOfDayRepeats = timetable[mode + "repeats"]
                        ? mode !== "day" && timetable.dayrepeats[currentHour] && timetable.dayrepeats[currentHour].title === title && timetable.dayrepeats[currentHour].type === type
                            ? omit(timetable.dayrepeats, currentHour)
                            : timetable.dayrepeats
                        : {},
                    restOfRepeatType = timetable[mode + "repeats"] ? timetable[mode + "repeats"] : {},
                    splitted = date.split("/"),
                    day = mode === "week" ? {
                        day: new Date(splitted[2], splitted[1] - 1, splitted[0]).getDay(),
                    } : {};
                setClientTimetable({
                    ...timetable,
                    weekrepeats: restOfWeekRepeats,
                    dayrepeats: restOfDayRepeats,
                    [mode + "repeats"]: {
                        ...restOfRepeatType,
                        [currentHour]: {
                            type,
                            title,
                            ...day,
                        }
                    }
                });
            } else {
                if (repeatType !== "") {
                    if (timetable[repeatType + "repeats"][currentHour].title === title && timetable[repeatType + "repeats"][currentHour].type === type) {
                        setClientTimetable({
                            ...timetable,
                            [repeatType + "repeats"]: omit(timetable[repeatType + "repeats"], currentHour),
                        });
                    }
                } else if (timetable.weekrepeats && timetable.weekrepeats[currentHour] && timetable.weekrepeats[currentHour].title === title && timetable.weekrepeats[currentHour].type === type) {
                    setClientTimetable({
                        ...timetable,
                        weekrepeats: omit(timetable.weekrepeats, currentHour),
                    });
                } else if (timetable.dayrepeats && timetable.dayrepeats[currentHour] && timetable.dayrepeats[currentHour].title === title && timetable.dayrepeats[currentHour].type === type) {
                    setClientTimetable({
                        ...timetable,
                        dayrepeats: omit(timetable.dayrepeats, currentHour),
                    });
                }
            }
            setAnchorEl(null);
        };
    maxDate.setMonth(maxDate.getMonth() + 2);
    minDate.setHours(23, 59, 29, 999);
    maxDate.setHours(0, 0, 0, 0);
    useEffect(() => {
        setTimetable(clientTimetable);
        console.log(clientTimetable);
        
    }, [clientTimetable]);
    useEffect(() => {
        fetch("/timetable.json"/*"/get_data/timetable"*/)
        .then(res => res.json())
        .then(data => {
            setTimetable(data);
            setClientTimetable(data);
        })
        .catch(() => {
            dispatch({
                type: "NEW_ERROR",
                payload: "There was an error loading your goals",
            });
        });
    }, []);
    return (
        timetable ? (
        <Paper className="fade padding">
<Typography variant="h4" gutterBottom>Date: {formatDate}</Typography>
<div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
    <Tooltip title="Previous Day">
            <IconButton onClick={() => {
                const newDate =new Date(selectedDate);
                newDate.setDate(newDate.getDate() - 1);
                setSelectedDate(new Date(newDate));
            }} disabled={minDate.getTime() >= selectedDate.getTime()}
                >
            <PreviousIcon />
            </IconButton></Tooltip>
            <Button onClick={() => setOpen(true)}>Change Date</Button>
            <Tooltip title="Next Day">
            <IconButton onClick={() => {
                const newDate =new Date(selectedDate);
                newDate.setDate(newDate.getDate() + 1);
                setSelectedDate(new Date(newDate));
            }} disabled={selectedDate.getTime() >= maxDate.getTime()}>
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
            if (timetable[formatDate] && timetable[formatDate][hour] && timetable[formatDate][hour].title !== "") {
                root = timetable[formatDate];
            } else if (timetable.weekrepeats) {
                if (timetable.weekrepeats[hour] && new Date(formatDate.split("/")[2], formatDate.split("/")[1] - 1,formatDate.split("/")[0]).getDay() === timetable.weekrepeats[hour].day) {
                    root = timetable.weekrepeats;
                    repeatType = "week";
                } else if (timetable.dayrepeats && timetable.dayrepeats[hour]) {
                    root = timetable.dayrepeats;
                    repeatType = "day";
                }
            } else if (timetable.dayrepeats && timetable.dayrepeats[hour]) {
                root = timetable.dayrepeats;
                repeatType = "day";
            }
            
            const select = root[isSmall ? currentHour : hour] && root[isSmall ? currentHour : hour].title !== "" && <Select
            value={
                root && root[isSmall ? currentHour : hour]
                    ? root[isSmall ? currentHour : hour].type
                    : "revision"
            }
            onChange={changeType(formatDate, hour, root[isSmall ? currentHour : hour].title )}
            style={{marginLeft: isSmall ? 16 : "auto"}}
            MenuProps={{
                PaperProps: {
                    className: classes.paper,
                }
            }}
        >
            <MenuItem value="exam">Exam</MenuItem>
            <MenuItem value="revision">Revision</MenuItem>
            <MenuItem value="break">Break</MenuItem>
        </Select>;
                return (
                <div style={{display: "flex"}} key={hour}>
                    <Card style={{marginTop: 8, width: isSmall ? 72 : 144, display: "flex", alignItems: "center"}}>
                        <CardContent>
                            <Typography className="highlight">{isSmall ? hour.split(" -")[0] : hour}</Typography>
                        </CardContent>
                    </Card>
                    <Card style={{marginTop: 8, flex: 1, marginLeft: 8,}}>
                        <CardContent>
                            <div style={{display: "flex", alignItems: "center"}}>
                                <InputBase
                                    value={root && root[hour] ? root[hour].title : ""}
                                    placeholder="Topic of the hour"
                                    onChange={changeTitle(formatDate, hour, root && root[hour] ? root[hour].type : "revision")}
                                    style={{flex: 1,marginRight: 8,}}
                                    className={root && root[hour] && root[hour].type === "exam" ? classes.input : ""}
                                    onKeyDown={keyDown}
                                    inputProps={{
                                        maxLength: "64"
                                    }}
                                />
                                {root && root[hour].title !== "" &&
                                    <>
                                    {!isSmall && select}
                                    <IconButton onClick={e => {
                                        setAnchorEl(e.currentTarget);
                                        setHour(hour);
                                    }} size="small">
                                        <DotsIcon />
                                    </IconButton>
                                    {root[currentHour] && <Menu
                                        anchorEl={anchorEl}
                                        keepMounted
                                        open={Boolean(anchorEl)}
                                        onClose={() => setAnchorEl(null)}
                                        PaperProps={{
                                            className: classes.paper,
                                        }}
                                    >
                                        <MenuItem onClick={setRepeat("none", formatDate, hour, root[currentHour].type, root[currentHour].title, repeatType)}>Doesn't repeat</MenuItem>
                                        <MenuItem onClick={setRepeat("day", formatDate, hour, root[currentHour].type, root[currentHour].title)}>Repeat daily</MenuItem>
                                        <MenuItem onClick={setRepeat("week", formatDate, hour, root[currentHour].type, root[currentHour].title)}>Repeat weekly</MenuItem>
                                        {isSmall && select}
                                    </Menu>}
                                    </>
                                }
                            </div>
                        </CardContent>
                    </Card>
                </div>
                )
})}
        </Paper>
        )
        : <div className={classes.loadingContainer}>
        <CircularProgress />
    </div>
    );
};