import React, { Component } from "react";
import Link from "@material-ui/core/Link";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import Title from "./Title";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import HomeIcon from "@material-ui/icons/Home";
import BusinessIcon from "@material-ui/icons/Business";
import SchoolIcon from "@material-ui/icons/School";
import PersonIcon from "@material-ui/icons/Person";
import BubbleChartIcon from "@material-ui/icons/BubbleChart";
import Grid from "@material-ui/core/Grid";
import ListSubheader from "@material-ui/core/ListSubheader";

import Moment from "react-moment";

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
});

function Logo(props) {
  const avatar = props.avatar;
  console.log(avatar);
  if (avatar === "work") {
    return <BusinessIcon />;
  } else if (avatar === "school") {
    return <SchoolIcon />;
  } else if (avatar === "personal") {
    return <PersonIcon />;
  } else if (avatar === "chores") {
    return <HomeIcon />;
  } else {
    return <BubbleChartIcon />;
  }
}

const Todo = (props) => (
  <ListItem>
    <ListItemAvatar>
      <Avatar>
        <Logo avatar={props.todo.type} />
      </Avatar>
    </ListItemAvatar>

    <ListItemText
      primary={
        <Grid container justify="space-between">
          <Link color="textPrimary" href={"/edit/" + props.todo._id}>
            <Typography
              display="inline"
              variant="h6"
              color="textPrimary"
              align="left"
            >
              {props.todo.title}
            </Typography>
          </Link>

          <Typography
            display="inline"
            variant="h6"
            color="primary"
            align="right"
          >
            <Moment date={props.todo.date} format="MMM DD, YYYY" />
          </Typography>
        </Grid>
      }
      secondary={
        <React.Fragment>
          <Typography
            component="span"
            variant="body2"
            display="block"
            color="textPrimary"
          >
            {props.todo.section}
          </Typography>

          {props.todo.description}
        </React.Fragment>
      }
    />
  </ListItem>
);

class TodoDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
    };
  }

  componentDidMount() {
    const { user } = this.props.auth;
    const userId = user.id;

    axios
      .get("http://localhost:5000/todos/user/" + userId + "?sort=date")
      .then((response) => {
        this.setState({
          todos: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  todoList() {
    return this.state.todos.map((currentTodo) => {
      return (
        <React.Fragment>
          <Todo todo={currentTodo} key={currentTodo._id} />
        </React.Fragment>
      );
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Link color="primary" href="/list">
          <Title>Tasks</Title>
        </Link>
        <List style={{ maxHeight: "100%", overflow: "auto" }}>
          {this.todoList()}
        </List>
      </React.Fragment>
    );
  }
}

TodoDashboard.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(withStyles(useStyles)(TodoDashboard));
