import React, { Component } from "react";
import Link from "@material-ui/core/Link";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import Button from "@material-ui/core/Button";

import PropTypes from "prop-types";
import { connect } from "react-redux";

const useStyles = (theme) => ({
  depositContext: {
    flex: 1,
  },
  root: {
    width: "100%",
    maxWidth: "36ch",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
  list: {
    height: "85%",
  },
  button: {
    margin: theme.spacing(3, 0, 1),
  },
});

class Welcome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
    };
  }

  componentDidMount() {
    const { user } = this.props.auth;
    const userId = user.id;
  }

  render() {
    const { classes } = this.props;
    const { user } = this.props.auth;

    return (
      <React.Fragment>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Welcome Back <strong>{user.firstName}</strong>
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="textSecondary"
          component="p"
        >
          Lets Perfect Your Taskflow!
        </Typography>

        <Button
          fullWidth
          variant="contained"
          color="secondary"
          className={classes.button}
        >
          Taskflow
        </Button>

        <Button
          fullWidth
          variant="contained"
          color="secondary"
          className={classes.button}
        >
          Calendar
        </Button>

        <Button
          fullWidth
          variant="contained"
          color="secondary"
          className={classes.button}
        >
          Notes
        </Button>

        <Button
          fullWidth
          variant="contained"
          color="secondary"
          className={classes.button}
        >
          Logout
        </Button>

      </React.Fragment>
    );
  }
}

Welcome.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(withStyles(useStyles)(Welcome));
