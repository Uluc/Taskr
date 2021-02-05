
import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {Heading,HeaderContainer} from "../styles/typography"
import {BackIcon} from "../styles/icons"

const Todo = (props) => (
  <tr>
    <td>{props.todo.description}</td>
    <td>{props.todo.duration}</td>
    <td>{props.todo.duration}</td>
    <td>{props.todo.date.substring(0, 10)}</td>
    <td>
      <Link to={"/edit/" + props.todo._id}>edit</Link> |{" "}
      <a
        href="#"
        onClick={() => {
          props.deleteTodo(props.todo._id);
        }}
      >
        Delete
      </a>
    </td>
  </tr>
);

export default class Todos extends Component {
  constructor(props) {
    super(props);

    this.deleteTodo = this.deleteTodo.bind(this);

    this.state = {
      todos: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/todos/")
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

  todoList() {
    return this.state.todos.map((currentTodo) => {
      return (
        <Todo
          todo={currentTodo}
          deleteTodo={this.deleteTodo}
          key={currentTodo._id}
        />
      );
    });
  }

  render() {
    return (
      <div className= "container center-align ">
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.todoList()}</tbody>
        </table>
      </div>
    );
  }
}
