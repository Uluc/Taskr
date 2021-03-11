import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { withStyles } from "@material-ui/core/styles";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import Select from "@material-ui/core/Select";

import Modal from "react-bootstrap/Modal";
import Button from "@material-ui/core/Button";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";

import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";

import AssignmentIcon from "@material-ui/icons/Assignment";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = (theme) => ({
  paper: {
    position: "absolute",
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 4, 3),
  },
  form: {
    width: "100%", // Fix IE 11 issue
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  avatar: {
    margin: theme.spacing(0),
  },
  formControl: {
    width: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  fixedHeight: {
    height: 200,
  },
  modalBody: {
    marginTop: theme.spacing(2),
  },
  root: {
    width: "100%",
  },
});

function Logo(props) {
  const avatar = props.avatar;

  return (
    <Avatar>
      <AssignmentIcon style={{ color: { avatar } }} />
    </Avatar>
  );
}

const Type = (props) => (
  <ListItem>
    <ListItemAvatar>
      <Logo avatar={props.type.color} />
    </ListItemAvatar>

    <ListItemText
      primary={
        <Grid container justify="space-between">
          <Typography
            display="inline"
            variant="body1"
            color="textPrimary"
            align="left"
          >
            {props.type.name}
          </Typography>
        </Grid>
      }
    />

    <IconButton aria-label="delete" href="#">
      <DeleteIcon fontSize="small" />
    </IconButton>
  </ListItem>
);

class TypeModal extends Component {
  constructor(props) {
    super(props);
    this.onChangeColor = this.onChangeColor.bind(this);
    this.onChangeName = this.onChangeName.bind(this);

    this.state = {
      users: [],
      name: "",
      color: "#5C6BC0",
      types: [],
    };
  }

  componentDidMount() {
    const { user } = this.props.auth;
    const userId = user.id;

    axios
      .get("http://localhost:5000/types/user/" + userId)
      .then((response) => {
        this.setState({
          types: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  typeList() {
    return this.state.types.map((currentType) => {
      return (
          <Type type={currentType} key={currentType._id} />
      );
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { user } = this.props.auth;

    const type = {
      user_id: user.id,
      name: this.state.name,
      color: this.state.color,
    };

    axios
      .post("http://localhost:5000/types/add", type)
      .then((res) => console.log(res.data));
  };

  onChangeColor(e) {
    console.log('hey');
    console.log(e.target.value);
    this.setState({ color: e.target.value });
    console.log(this.state.color);
  }

  onChangeName(e) {
    this.setState({ name: e.target.value });
  }

  reportSelected = event => {
    this.setState(() => {
      return {
        report: event.target.value
      }
    })
  };

  render() {
    const { classes } = this.props;

    const colors = [
      {
        color: "Violet",
        hex: "#231942"
      },
      {
        color: "Blue Crayola",
        hex: "#5C6BC0"
      },
      {
        color: "Bud Green",
        hex: "#7FB069"
      },
      {
        color: "Tart Green",
        hex: "#EF5350"
      },
      {
        color: "Fuchisa",
        hex: "#A65F88"
      },
      {
        color: "Burgundy",
        hex: "#A4303F"
      }
    ];

    return (
      <Modal
        className={classes.root}
        show={this.props.isOpen}
        size="sm"
        centered
        onHide={this.props.isClosed}
      >
        <Modal.Header closeButton>
          <Modal.Title>Types</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Grid item xs={12} md={12} lg={12}>
            <List>{this.typeList()}</List>
          </Grid>

          <Divider />

          <Typography
            variant="h5"
            color="textPrimary"
            className={classes.modalBody}
          >
            New Type:
          </Typography>

          <div>
            <form className={classes.form} noValidate onSubmit={this.onSubmit}>
              <TextField
                onChange={this.onChangeName}
                value={this.state.name}
                variant="standard"
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
              />

              <FormControl className={classes.formControl}>
                <InputLabel id="Color Selector">Color</InputLabel>
                <Select
                  onChange={this.reportSelected}
                  className={classes.selectEmpty}
                  value={this.state.color}
                >
                {colors.map(colors => (
                <MenuItem value={colors.hex} key={colors.hex}>
                  {colors.color}
                </MenuItem>
                 ))}
                  {/* <option value=""><em>None</em></option>
                  <option value="#231942">Violet</option>
                  <MenuItem value="#5C6BC0">Blue Crayola</MenuItem>
                  <MenuItem value="#7FB069">Bud Green</MenuItem>
                  <MenuItem value="#EF5350">Tart Orange</MenuItem>
                  <MenuItem value="#A65F88">Fuchisa</MenuItem>
                  <MenuItem value="#A4303F">Burgundy</MenuItem> */}
                </Select>
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Add Type
              </Button>
            </form>
          </div>
        </Modal.Body>

        <Modal.Footer></Modal.Footer>
      </Modal>
    );
  }
}

TypeModal.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(withStyles(useStyles)(TypeModal));
