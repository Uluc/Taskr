import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Heading, HeaderContainer } from "../styles/typography";
import { BackIcon } from "../styles/icons";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";

import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";

import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Fab from "@material-ui/core/Fab";

import AddIcon from "@material-ui/icons/Add";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";

import { withStyles } from "@material-ui/core/styles";


const useStyles = (theme) => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },

  submit: {
    margin: theme.spacing(3, 0, 2),
  },

});


const Todo = (props) => (
  <TableRow>
    <TableCell padding="checkbox">
      <Checkbox
        checked={props.todo.completed}
        inputProps={{ "aria-label": "primary checkbox" }}
      />
    </TableCell>
    <TableCell>{props.todo.title}</TableCell>
    <TableCell align="right">{props.todo.description}</TableCell>
    <TableCell align="right">{props.todo.duration}</TableCell>
    <TableCell align="right">{props.todo.date.substring(0, 10)}</TableCell>
    <TableCell align="right">
      <IconButton aria-label="edit" href={"/edit/" + props.todo._id}>
        <EditIcon fontSize="small" />
      </IconButton>

      <IconButton
        aria-label="delete"
        href="#"
        onClick={() => {
          props.deleteTodo(props.todo._id);
        }}
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
    </TableCell>
  </TableRow>
);

class TodoList extends Component {
  constructor(props) {
    super(props);

    this.deleteTodo = this.deleteTodo.bind(this);

    this.state = {
      todos: [],
    };
  }

  componentDidMount() {
    const { user } = this.props.auth;
    const userId = user.id;
  
    axios
      .get("http://localhost:5000/todos/user/" + userId)
      .then((response) => {
        this.setState({
          todos: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteTodo(id) {

    axios.delete("http://localhost:5000/todos/" + id).then((response) => {
      console.log(response.data);
    });

    this.setState({
      todos: this.state.todos.filter((el) => el._id !== id),
    });

  }

  // completion(id) {

  //   const changeTodo = axios.get("http://localhost:5000/todos/" + id)

   
  //   axios
  //     .post("http://localhost:5000/todos/update/" + id, changeTodo)
  //     .then((res) => console.log(res.data));
  // }

  todoList() {
    return this.state.todos.map((currentTodo) => {
      return (
       
          <Todo
            key={currentTodo._id}
            todo={currentTodo}
            deleteTodo={this.deleteTodo}
          />
      );
    });
  }

  render() {

    const {classes} = this.props;

    return (
      <Container maxWidth="md">
        <Grid container justify="center">
          <HeaderContainer>
            <Link to="/dashboard">
              <BackIcon />
            </Link>

            <Heading>Tasks</Heading>
          </HeaderContainer>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Complete</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell align="right">Description</TableCell>
                  <TableCell align="right">Duration</TableCell>
                  <TableCell align="right">Date</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{this.todoList()}</TableBody>
            </Table>
          </TableContainer>

          <Fab color="primary" aria-label="add" href="/create" className = {classes.submit}>
            <AddIcon />
          </Fab>
        </Grid>
      </Container>
    );
  }
}

TodoList.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(withStyles(useStyles)(TodoList));
