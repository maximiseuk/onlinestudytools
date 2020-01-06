import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import { DatePicker } from "@material-ui/pickers";
import { Card, CardContent, useMediaQuery, Typography, makeStyles, InputBase } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles(theme => ({
    paper: {
        padding: 0,
        border: `2px solid ${theme.palette.primary.main}`,
    }
}));

export default () => {
    const sample = {
        "6/1/2020": {
            "9:00 - 10:00": {
                type: "exam",
                title: "Maths - Surds"
            },
            "13:00 - 14:00": {
                type: "revision",
                title: "Biology - cells"
            },
            "14:00 - 15:00": {
                type: "break",
                title: "Football"
            }
        },
        "9/1/2020": {
            "10:00 - 11:00": {
                type: "exam",
                title: "Maths - Surds"
            },
            "14:00 - 15:00": {
                type: "revision",
                title: "Biology - stem cells"
            },
            "16:00 - 17:00": {
                type: "break",
                title: "Tenns"
            }
        },
    }
    const
        classes = useStyles(),
        minDate = new Date(),
        maxDate = new Date(),
        [selectedDate, setSelectedDate] = useState(minDate),
        [open, setOpen] = useState(false),
        formatDate = selectedDate.getDate() + "/" + (selectedDate.getMonth() + 1) + "/" + selectedDate.getFullYear(),
        isSmall = useMediaQuery("(max-width: 800px)"),
        [timetable, setTimetable] = useState(sample),
        [clientTimetable, setClientTimetable] = useState(sample),
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
        changeType = (date, hour) => e => {
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
                        ...restOfHour,
                        type: e.target.value,
                    },
                },
            });
        },
        changeTitle = (date, hour) => e => {
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
                        ...restOfHour,
                        title: e.target.value,
                    },
                },
            });
        },
        keyDown = e => {
            if (e.key === "Enter") {
                e.target.blur();
            }
        };
    maxDate.setMonth(maxDate.getMonth() + 2);
    useEffect(() => {
        setTimetable(clientTimetable);
    }, [clientTimetable]);
    return (
        <Paper className="fade padding">
<Typography variant="h4" gutterBottom>Date: {formatDate}</Typography>
            <Button onClick={() => setOpen(true)}>Change Date</Button>
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
            Close
          </Button>
        </DialogActions>
      </Dialog>
            {hours.map(hour => (
                <div style={{display: "flex"}} key={hour}>
                    <Card style={{marginTop: 8, width: isSmall ? 72 : 144, display: "flex", alignItems: "center"}}>
                        <CardContent>
                            <span className="highlight">{isSmall ? hour.split(" -")[0] : hour}</span>
                        </CardContent>
                    </Card>
                    <Card style={{marginTop: 8, flex: 1, marginLeft: 8,}}>
                        <CardContent>
                            <div style={{display: "flex", alignItems: "center"}}>
                                <InputBase
                                    value={
                                        timetable[formatDate] !== undefined && timetable[formatDate][hour] !== undefined && timetable[formatDate][hour].title !== ""
                                            ? timetable[formatDate][hour].title
                                            : ""
                                    }
                                    placeholder="Topic of the hour"
                                    onChange={changeTitle(formatDate, hour)}
                                    style={{flex: 1,}}
                                    onKeyDown={keyDown}
                                />
                                {timetable[formatDate] !== undefined && timetable[formatDate][hour] !== undefined && timetable[formatDate][hour].title !== "" && 
                                    <Select
                                        value={
                                            timetable[formatDate] !== undefined && timetable[formatDate][hour] !== undefined && timetable[formatDate][hour].type !== undefined
                                                ? timetable[formatDate][hour].type
                                                : "revision"
                                        }
                                        onChange={changeType(formatDate, hour)}
                                        style={{marginLeft: "auto"}}
                                        MenuProps={{
                                            PaperProps: {
                                                className: classes.paper,
                                            }
                                        }}
                                    >
                                        <MenuItem value="exam">Exam</MenuItem>
                                        <MenuItem value="revision">Revision</MenuItem>
                                        <MenuItem value="break">Break</MenuItem>
                                    </Select>
                                }
                            </div>
                        </CardContent>
                    </Card>
                </div>
            ))}
        </Paper>
    );
};