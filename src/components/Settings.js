import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { startCase } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import getCookie from "../api/cookies";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Chip } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  card: {
    marginBottom: 16
  }
}));

export default () => {
  const subjects = [
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
    classes = useStyles(),
    dispatch = useDispatch(),
    history = useHistory(),
    isLight = useSelector(state => state.lightTheme),
    userSubjects = useSelector(state => state.subjects),
    [lightTheme, setLightTheme] = useState(isLight),
    initialState = {
      oldPassword: "",
      newPassword: "",
      repeatPassword: ""
    },
    [values, setValues] = useState(initialState),
    [helpers, setHelpers] = useState(initialState),
    save = e => {
      e.preventDefault();
      const passwordData =
        helpers.repeatPassword === "" &&
        helpers.password === "" &&
        helpers.oldPassword === ""
          ? {
              oldPassword: values.oldPassword,
              newPassword: values.newPassword
            }
          : {};
      fetch("https://maximise.herokuapp.com/users/update_password", {
        method: "POST",
        body: JSON.stringify({
          newData: passwordData,
          sessionID: getCookie("sessionID"),
          username: getCookie("email")
        }),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          if (data.errors.length === 0) {
            setValues(initialState);
            setHelpers(initialState);
          } else {
            dispatch({
              type: "NEW_ERROR",
              payload: "There was an error updating your settings"
            });
          }
        })
        .catch(() => {
          dispatch({
            type: "NEW_ERROR",
            payload: "There was an error updating your settings"
          });
        });
    },
    logout = () => {
      /*fetch("/users/logout", {
                method: "POST",
            })
            .then(res => res.text())
            .then(data => {
                if (data === "success") {*/
      document.cookie =
        "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie =
        "theme=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie =
        "sessionID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      dispatch({
        type: "TOGGLE_THEME_TYPE",
        payload: false
      });
      history.replace(
        "/"
      ); /*
                } else {
                    dispatch({
                        type: "NEW_ERROR",
                        payload: "There was an error logging you out",
                    });
                }
            })
            
            .catch(() => {
                dispatch({
                    type: "NEW_ERROR",
                    payload: "There was an error logging you out",
                });
            });*/
    },
    handleChange = field => e => {
      setValues({
        ...values,
        [field]: e.target.value
      });
      let newState = {};
      if (field === "repeatPassword") {
        if (e.target.value.length === 0) {
          newState = {
            repeatPassword: ""
          };
        } else if (e.target.value !== values.newPassword) {
          newState = {
            repeatPassword: "Passwords must match"
          };
        } else {
          newState = {
            repeatPassword: ""
          };
        }
      }
      if (field === "newPassword") {
        if (e.target.value.length < 6) {
          newState = {
            newPassword: "Password must at least 6 characters"
          };
        } else {
          newState = {
            newPassword: ""
          };
        }
        if (e.target.value !== values.newPassword) {
          newState = {
            ...newState,
            repeatPassword: "Passwords must match"
          };
        } else {
          newState = {
            ...newState,
            repeatPassword: ""
          };
        }
      }
      if (field === "oldPassword") {
        if (e.target.value.length === 0) {
          newState = {
            oldPassword: "Please enter this field"
          };
        } else {
          newState = {
            oldPassword: ""
          };
        }
      }
      setHelpers({
        ...helpers,
        ...newState
      });
    },
    updateSubjects = val => {
      fetch(
        "https://maximise.herokuapp.com/users/update_data/subjects" /*"/get_data/subjects"*/,
        {
          method: "POST",
          body: JSON.stringify({
            sessionID: getCookie("sessionId"),
            username: getCookie("username"),
            newData: userSubjects
          })
        }
      )
        .then(res => res.json())
        .then(data => {
          if (data.errors.length > 0) {
            dispatch({
              type: "NEW_ERROR",
              payload: "There was an error updating your subjects"
            });
          } else {
            dispatch({
              type: "CHANGE_SUBJECTS",
              payload: val
            });
          }
        })
        .catch(err => {
          dispatch({
            type: "NEW_ERROR",
            payload: "There was an error updating your subjects"
          });
        });
      dispatch({
        type: "CHANGE_SUBJECTS",
        payload: val
      });
    };
  useEffect(() => {
    dispatch({
      type: "TOGGLE_THEME_TYPE",
      payload: lightTheme
    });
    const d = new Date();
    document.cookie = `theme=${
      lightTheme ? "light" : ""
    }; expires ${d.getTime() + 4e12}; path=/`;
  }, [lightTheme]);
  return (
    <Paper className="fade padding">
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Toggle <span className="highlight">light</span> theme
          </Typography>
          <FormGroup row>
            <FormControlLabel
              control={
                <Switch
                  checked={lightTheme}
                  onChange={e => setLightTheme(e.target.checked)}
                  value="lightTheme"
                  color="primary"
                />
              }
              label="Light Theme"
            />
          </FormGroup>
        </CardContent>
      </Card>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Change <span className="highlight">password</span>
          </Typography>
          <form onSubmit={save}>
            <Grid container spacing={2}>
              {Object.keys(initialState).map(field => (
                <Grid item xs={12} sm={4} key={field}>
                  <TextField
                    label={startCase(field)}
                    value={values[field]}
                    onChange={handleChange(field)}
                    variant="filled"
                    helperText={helpers[field] + " "}
                    fullWidth
                    error={helpers[field] !== ""}
                    type="password"
                    autoComplete="false"
                  />
                </Grid>
              ))}
            </Grid>
            <Button variant="contained" type="submit">
              Change
            </Button>
          </form>
        </CardContent>
      </Card>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Edit your <span className="highlight">subjects</span>
          </Typography>
          <Autocomplete
            multiple
            freeSolo
            filterSelectedOptions
            onChange={(e, val) => updateSubjects(val)}
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
        </CardContent>
      </Card>
      <Divider style={{ margin: "16px 0" }} />
      <Button variant="contained" onClick={logout}>
        Logout
      </Button>
    </Paper>
  );
};
