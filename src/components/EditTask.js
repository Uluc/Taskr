import React, { Component } from "react";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import { withStyles } from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";

import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const useStyles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    display: "flex",
    flexDirection: "row",
  },
  formButton: {},
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
});

class EditTodo extends Component {
  constructor(props) {
    super(props);

    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: "",
      description: "",
      title: "",
      section: "",
      type: "",
      completed: false,
      duration: "",
      date: new Date(),
      users: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/todos/" + this.props.match.params.id)
      .then((response) => {
        this.setState({
          username: response.data.username,
          description: response.data.description,
          title: response.data.title,
          duration: response.data.duration,
          date: new Date(response.data.date),
        });
      })
      .catch(function (error) {
        console.log(error);
      });

    axios
      .get("http://localhost:5000/users/")
      .then((response) => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map((user) => user.username),
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
    console.log(e.target.value);
    console.log([e.target.id]);
    console.log(e.target.id);
  };

  onChangeSection = (e) => {
    this.setState({
      section: e.target.value,
    });
  };

  onChangeType = (e) => {
    this.setState({
      type: e.target.value,
    });
  };

  onChangeDate(date) {
    this.setState({
      date: date,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const todo = {
      description: this.state.description,
      title: this.state.title,
      section: this.state.section,
      type: this.state.type,
      completed: this.state.completed,
      duration: this.state.duration,
      date: this.state.date,
    };

    console.log(todo);

    axios
      .post(
        "http://localhost:5000/todos/update/" + this.props.match.params.id,
        todo
      )
      .then((res) => console.log(res.data));

    window.location = "/list";
  }

  render() {
    const { errors } = this.state;
    const { classes } = this.props;

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <EditIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Edit Task
          </Typography>
          <form className={classes.form} noValidate onSubmit={this.onSubmit}>
            <TextField
              onChange={this.onChange}
              value={this.state.title}
              variant="standard"
              margin="normal"
              required
              fullWidth
              id="title"
              label="Title"
              name="title"
            />

            <TextField
              onChange={this.onChange}
              value={this.state.description}
              variant="standard"
              margin="normal"
              required
              fullWidth
              name="description"
              label="Description"
              id="description"
            />

            <TextField
              onChange={this.onChange}
              value={this.state.duration}
              variant="standard"
              margin="normal"
              required
              fullWidth
              type="number"
              name="duration"
              label="Duration"
              id="duration"
            />

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                id="date-picker-inline"
                label="Date"
                required
                value={this.state.date}
                onChange={this.onChangeDate}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
                fullWidth
              />
            </MuiPickersUtilsProvider>

            <FormControl className={classes.formControl}>
              <InputLabel id="type_label">Type</InputLabel>
              <Select
                value={this.state.type}
                onChange={this.onChangeType}
                margin="normal"
                className={classes.selectEmpty}
                label="Type"
                required
                fullWidth
                id="type"
              >
                <MenuItem value={"school"}>School</MenuItem>
                <MenuItem value={"menu"}>Work</MenuItem>
                <MenuItem value={"personal"}>Personal</MenuItem>
                <MenuItem value={"chores"}>Chores</MenuItem>
                <MenuItem value={"other"}>Other</MenuItem>
                <MenuItem>
                  <Button className={classes.formButton} color="primary">
                    New Type
                  </Button>
                </MenuItem>
              </Select>
            </FormControl>

            <FormControl className={classes.formControl}>
              <InputLabel id="Section_label">Section</InputLabel>
              <Select
                id="section"
                value={this.state.section}
                onChange={this.onChangeSection}
                margin="normal"
                className={classes.selectEmpty}
                label="Section"
                required
                fullWidth
              >
                <MenuItem value={"CSC4242"}>CSC4242</MenuItem>
                <MenuItem>
                  <Button className={classes.formButton} color="primary">
                    New Section
                  </Button>
                </MenuItem>
              </Select>
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Save
            </Button>
          </form>
        </div>
      </Container>
    );
  }
}

export default withStyles(useStyles)(EditTodo);
