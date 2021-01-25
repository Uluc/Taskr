const router = require("express").Router();
let Todo = require("../models/todo.model");

router.route("/").get((req, res) => {
  Todo.find()
    .then((todos) => res.json(todos))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const title = req.body.title;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  const newTodo = new Todo({
    username,
    description,
    title,
    duration,
    date,
  });

  newTodo
    .save()
    .then(() => res.json("Todo added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Todo.findById(req.params.id)
    .then((exercise) => res.json(exercise))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Todo.findByIdAndDelete(req.params.id)
    .then((todos) => res.json(todos))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Todo.findById(req.params.id)
    .then((todos) => {
      (todos.username = req.body.username),
        (todos.description = req.body.description),
        (todos.title = req.body.title),
        (todos.duration = req.body.duration),
        (todos.date = req.body.date);

      todos
        .save()
        .then(() => res.json("Todo Updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })

    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/user/:userId").get((req, res) => {
  Todo.find({username: req.params.userId})
    .then((todos) => res.json(todos))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
