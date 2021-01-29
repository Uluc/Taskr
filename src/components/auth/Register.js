import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

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
});


class Register extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      password2: "",
      errors: {},
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }
  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    };
    this.props.registerUser(newUser, this.props.history);
  };
  render() {
    const { errors } = this.state;
    const { classes } = this.props;

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <form className={classes.form} noValidate onSubmit={this.onSubmit}>

          <TextField
              onChange={this.onChange}
              value={this.state.firstName}
              error={errors.firstName}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="firstName"
              label="First Name"
              name="firstName"
              autoFocus
            />
             <TextField
              onChange={this.onChange}
              value={this.state.lastName}
              error={errors.email}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoFocus
            />
            <TextField
              onChange={this.onChange}
              value={this.state.email}
              error={errors.email}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoFocus
            />
            <TextField
              onChange={this.onChange}
              value={this.state.password}
              error={errors.password}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
             <TextField
              onChange={this.onChange}
              value={this.state.password2}
              error={errors.password2}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="password2"
              label="Password"
              name="password2"
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
          </form>
        </div>
      </Container>
      // <div className="container">
      //   <div className="row">
      //     <div className="col s8 offset-s2">
      //       <Link to="/" className="btn-flat waves-effect">
      //         <i className="material-icons left">keyboard_backspace</i> Back to
      //         home
      //       </Link>
      //       <div className="col s12" style={{ paddingLeft: "11.250px" }}>
      //         <h4>
      //           <b>Register</b>
      //         </h4>
      //         <p className="grey-text text-darken-1">
      //           Already have an account? <Link to="/login">Log in</Link>
      //         </p>
      //       </div>
      //       <form noValidate onSubmit={this.onSubmit}>
      //         <div className="input-field col s12">
      //           <input
      //             onChange={this.onChange}
      //             value={this.state.name}
      //             error={errors.firstName}
      //             id="firstName"
      //             type="text"
      //             className={classnames("", {
      //               invalid: errors.firstName,
      //             })}
      //           />
      //           <label htmlFor="firstName">First Name</label>
      //           <span className="red-text">{errors.firstName}</span>
      //         </div>
      //         <div className="input-field col s12">
      //           <input
      //             onChange={this.onChange}
      //             value={this.state.name}
      //             error={errors.name}
      //             id="lastName"
      //             type="text"
      //             className={classnames("", {
      //               invalid: errors.lastName,
      //             })}
      //           />
      //           <label htmlFor="lastName">Last Name</label>
      //           <span className="red-text">{errors.lastName}</span>
      //         </div>
      //         <div className="input-field col s12">
      //           <input
      //             onChange={this.onChange}
      //             value={this.state.email}
      //             error={errors.email}
      //             id="email"
      //             type="email"
      //             className={classnames("", {
      //               invalid: errors.email,
      //             })}
      //           />
      //           <label htmlFor="email">Email</label>
      //           <span className="red-text">{errors.email}</span>
      //         </div>
      //         <div className="input-field col s12">
      //           <input
      //             onChange={this.onChange}
      //             value={this.state.password}
      //             error={errors.password}
      //             id="password"
      //             type="password"
      //             className={classnames("", {
      //               invalid: errors.password,
      //             })}
      //           />
      //           <label htmlFor="password">Password</label>
      //           <span className="red-text">{errors.password}</span>
      //         </div>
      //         <div className="input-field col s12">
      //           <input
      //             onChange={this.onChange}
      //             value={this.state.password2}
      //             error={errors.password2}
      //             id="password2"
      //             type="password"
      //             className={classnames("", {
      //               invalid: errors.password2,
      //             })}
      //           />
      //           <label htmlFor="password2">Confirm Password</label>
      //           <span className="red-text">{errors.password2}</span>
      //         </div>
      //         <div className="col s12" style={{ paddingLeft: "11.250px" }}>
      //           <button
      //             style={{
      //               width: "150px",
      //               borderRadius: "3px",
      //               letterSpacing: "1.5px",
      //               marginTop: "1rem",
      //             }}
      //             type="submit"
      //             className="btn btn-large waves-effect waves-light hoverable blue accent-3"
      //           >
      //             Sign up
      //           </button>
      //         </div>
      //       </form>
      //     </div>
      //   </div>
      // </div>
    );
  }
}
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(mapStateToProps, { registerUser })(withStyles(useStyles)((withRouter(Register))));
