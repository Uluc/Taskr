import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

class Landing extends Component {
  render() {
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              <span style={{ fontFamily: "monospace" }}>TASKR</span>
            </h4>
            <p className="flow-text grey-text text-darken-1">
              Perfect your taskflow
            </p>
            <br />
            <Button variant="text" color="default" href="/register">
              Register
            </Button>
            <Button variant="text" color="default" href="/login">
              Login
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
export default Landing;
