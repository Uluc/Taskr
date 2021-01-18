import React from 'react'
import {BrowserRouter as Router, Route} from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"

function App() {
  return (
    <Router>
      <Navbar/>
      <br/>
      <Route path = "/" exact component={TodoList}/>
      <Route path = "/edit/:id" exact component={EditTodo}/>
      <Route path = "/create" exact component={CreateTodo}/>
      <Route path = "/user" exact component={CreateTodo}/>
    </Router>

  );
}

export default App;
