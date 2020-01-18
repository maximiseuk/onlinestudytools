/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import { Link, useHistory } from "react-router-dom";
import { startCase } from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Autocomplete from "@material-ui/lab/Autocomplete";
import getCookie from "../api/cookies";
import { Chip } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import ButtonLink from "@material-ui/core/Link";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles(theme => ({
  password: {
    width: "calc(50% - 4px)"
  },
  repeatPassword: {
    width: "calc(50% - 4px)",
    marginLeft: 8
  },
  firstName: {
    width: "calc(50% - 4px)"
  },
  lastName: {
    width: "calc(50% - 4px)",
    marginLeft: 8
  },
  link: {
    color: theme.palette.primary.main
  }
}));

export default () => {
  const { stringify } = JSON,
    initialState = {
      email: "",
      username: "",
      firstName: "",
      lastName: "",
      code: "",
      password: "",
      repeatPassword: ""
    },
    subjects = [
      "Maths",
      "Chemistry",
      "Physics",
      "Biology",
      "Computing",
      "Astronomy",
      "Greek",
      "Latin",
      "English literature",
      "English language",
      "Art",
      "Technology",
      "French",
      "Further maths",
      "German",
      "Spanish",
      "Business",
      "Mandarin",
      "Drama",
      "Economics",
      "Food tech",
      "Politics",
      "History",
      "Geography",
      "Italian",
      "Religious studies",
      "Music",
      "Psychology",
      "Statistics",
      "Sociology",
      "Citizenship",
      "Urdu",
      "Underwater basket weaving"
    ],
    dispatch = useDispatch(),
    [welcomeOpen, setWelcomeOpen] = useState(false),
    [disclaimerOpen, setDisclaimerOpen] = useState(false),
    [scores, setScores] = useState({}),
    classes = useStyles(),
    [values, setValues] = useState(initialState),
    [helpers, setHelpers] = useState(initialState),
    [agreed, setAgreed] = useState(false),
    [userSubjects, setUserSubjects] = useState([]),
    history = useHistory(),
    login = e => {
      e.preventDefault();
      fetch("https://maximise.herokuapp.com/users/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: stringify({
          email: values.email,
          username: values.username,
          firstName: values.firstName,
          lastName: values.lastName,
          password: values.password,
          code: values.code
        })
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          if (JSON.stringify(data.errors) !== "{}") {
            let newErrors = helpers;
            for (let key in data.errors) {
              newErrors[key] = data.errors[key];
            }
            setHelpers(newErrors);
          } else {
            setWelcomeOpen(true);
            const d = new Date();
            localStorage.setItem("email", values.email);
            localStorage.setItem("name", values.firstName);
            document.cookie = `email=${
              data.response.username
            }; expires ${d.getTime() + 4e12}; path=/`;
            document.cookie = `sessionID=${
              data.response.sessionID
            }; expires ${d.getTime() + 4e12}; path=/`;
          }
        })
        .catch(() => {
          dispatch({
            type: "NEW_ERROR",
            payload: "There was an error signing you up"
          });
        });
    },
    finish = () => {
      fetch("https://maximise.herokuapp.com/users/update_data/subjects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: stringify({
          newData: {
            subjects: userSubjects,
            grades: scores
          },
          sessionID: getCookie("sessionID"),
          username: getCookie("email")
        })
      })
        .then(res => res.json())
        .then(data => {
          dispatch({
            type: "CHANGE_SUBJECTS",
            payload: userSubjects
          });
          history.replace("/home");
        })
        .catch(() => {
          dispatch({
            type: "NEW_ERROR",
            payload: "There was an error uploading your subjects"
          });
        });
    },
    clear = () => {
      setValues(initialState);
      setHelpers(initialState);
    },
    handleChange = field => e => {
      let newState = {};
      if (e.target.value === "") {
        newState = {
          [field]: "Field required"
        };
      } else {
        newState = {
          [field]: ""
        };
      }
      if (field === "repeatPassword") {
        if (e.target.value.length === 0) {
          newState = {
            repeatPasswordError: ""
          };
        } else if (e.target.value !== values.password) {
          newState = {
            repeatPassword: "Passwords must match"
          };
        }
      } else if (field === "password") {
        if (e.target.value.length < 6) {
          newState = {
            password: "Password must at least 6 characters"
          };
        }
        if (values.repeatPassword.length === 0) {
          newState = {
            ...newState,
            repeatPassword: ""
          };
        } else if (values.repeatPassword !== e.target.value) {
          newState = {
            ...newState,
            repeatPassword: "Passwords must match"
          };
        }
      } else if (field === "email") {
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(String(e.target.value).toLowerCase())) {
          newState = {
            email: "Email address invalid"
          };
        }
      }
      setValues({
        ...values,
        [field]: e.target.value
      });
      setHelpers({
        ...helpers,
        ...newState
      });
      if (field === "firstName" || field === "surname") {
        setValues({
          ...values,
          [field]: e.target.value
            .toLowerCase()
            .split(" ")
            .map(s => s.charAt(0).toUpperCase() + s.substring(1))
            .join(" ")
        });
      }
    },
    changeScores = a => e => {
      setScores({
        ...scores,
        [a]: e.target.value
      });
    },
    changeSubjects = val => {
      let newScores = scores;
      val.forEach(a => {
        if (!newScores[a]) {
          newScores[a] = 5;
        }
      });
      setScores(newScores);
      setUserSubjects(val);
    };
  useEffect(() => {
    if (getCookie("email") !== "") {
      history.replace("/home");
    }
  }, []);
  return (
    <Paper className="fade padding" style={{ maxWidth: 600, margin: "0 auto" }}>
      <Dialog open={welcomeOpen}>
        <DialogTitle>Welcome to Maximise Online Study Tools!</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            To help us make your experience amazing, please enter the subjects
            you're taking below (press enter to add a new subject). You can
            always change these in settings if you want. Once you've entered
            them, enter the grade your currently working at for each one.
          </DialogContentText>
          <Autocomplete
            multiple
            freeSolo
            filterSelectedOptions
            onChange={(e, val) => changeSubjects(val)}
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
          {userSubjects.map((a, i) => (
            <div
              style={{ display: "flex", alignItems: "center", marginTop: 8 }}
              key={a}
            >
              <Typography style={{ marginRight: 8 }}>{a}</Typography>
              <FormControl
                variant="filled"
                style={{ width: 96, marginLeft: "auto" }}
                size="small"
              >
                <InputLabel id="demo-simple-select-filled-label">
                  Grade
                </InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={scores[a]}
                  onChange={changeScores(a)}
                >
                  {[...Array(9).keys()].map(x => (
                    <MenuItem value={x + 1} key={x}>
                      {x + 1}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={finish} color="primary" autoFocus>
            Go
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={disclaimerOpen} onClose={() => setDisclaimerOpen(false)}>
        <DialogTitle>Disclaimer</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            We created the <span className="highlight">Maximise</span> revision
            planner to give you a personalised revision plan that{" "}
            <span className="highlight">helps</span> to maximise your revision
            efficiency. <span className="highlight">However</span>, this tool
            should be treated as an example of a{" "}
            <span className="highlight">possible</span> time schedule, rather
            than a key to great marks - that only comes with{" "}
            <span className="highlight">time</span> and{" "}
            <span className="highlight">effort</span>. It is therefore{" "}
            <span className="highlight">not</span> intended to entirely decide
            all of your revision timetabling, nor will it{" "}
            <span className="highlight">guarantee</span> achieving specific
            grades for any exam. This tool is simply{" "}
            <span className="highlight">a source of time schedule</span> that{" "}
            <span className="highlight">may help to maximise</span> your
            revision time.
            <br />
            <br />
            In short, the <span className="highlight">Maximise</span> revision
            planner can help to make a great revision plan, but{" "}
            <span className="highlight">you</span> know your{" "}
            <span className="highlight">strengths</span> and{" "}
            <span className="highlight">weaknesses</span> best, so we ask that
            you apply your <span className="highlight">own</span> input to your
            revision plan as well.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDisclaimerOpen(false)}
            color="primary"
            autoFocus
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Typography variant="h4" gutterBottom>
        Sign up to <span className="highlight">Maximise</span>
      </Typography>
      <form onSubmit={login}>
        {Object.keys(initialState)
          .filter(x => x !== "agreed")
          .map(field => (
            <TextField
              label={startCase(field)}
              placeholder={
                field === "code" ? "Product code found on revision pack" : ""
              }
              value={values[field]}
              onChange={handleChange(field)}
              margin="normal"
              variant="filled"
              helperText={helpers[field] ? helpers[field] + " " : ""}
              error={helpers[field] !== ""}
              key={field}
              type={field.includes("assword") ? "password" : "text"}
              fullWidth
              className={classes[field]}
            />
          ))}
        <FormControlLabel
          control={
            <Checkbox
              checked={agreed}
              onChange={e => setAgreed(e.target.checked)}
              value="agreed"
              color="primary"
            />
          }
          label={
            <span>
              I have read the{" "}
              <ButtonLink
                className={classes.link}
                href="#"
                onClick={e => {
                  e.preventDefault();
                  setDisclaimerOpen(true);
                }}
              >
                Disclaimer
              </ButtonLink>
            </span>
          }
        />
        <div style={{ display: "flex", marginTop: 8, marginBottom: 16 }}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={
              stringify(initialState) !== stringify(helpers) ||
              Object.keys(values).filter(
                x => values[x] === "" || values[x] === undefined
              ).length > 0 ||
              !agreed
            }
          >
            Sign up
          </Button>
          <Button
            variant="outlined"
            color="primary"
            style={{
              marginLeft: "auto"
            }}
            onClick={clear}
          >
            Clear
          </Button>
        </div>
        <Divider />
        <Typography
          variant="h5"
          gutterBottom
          style={{
            marginTop: 8
          }}
        >
          Already have an account?
        </Typography>
        <Button
          component={Link}
          to="/login"
          variant="contained"
          color="primary"
        >
          Login Here
        </Button>
      </form>
    </Paper>
  );
};
