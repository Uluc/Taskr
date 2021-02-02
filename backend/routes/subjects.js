const router = require("express").Router();
let Subject = require("../models/subject");

router.route("/").get((req, res) => {
  Todo.find()
    .then((subjects) => res.json(subjects))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
    const username = req.body.username;
    const title = req.body.title;
  
    const newSubject = new Subject({
      username,
      title,
    });
  
    newSubject
      .save()
      .then(() => res.json("Subject added!"))
      .catch((err) => res.status(400).json("Error: " + err));
  });

  router.route("/:id").get((req, res) => {
    Subject.findById(req.params.id)
      .then((subject) => res.json(subject))
      .catch((err) => res.status(400).json("Error: " + err));
  });

  router.route("/:id").delete((req, res) => {
    Subject.findByIdAndDelete(req.params.id)
      .then((subject) => res.json(subject))
      .catch((err) => res.status(400).json("Error: " + err));
  });

  router.route("/update/:id").post((req, res) => {
    Subject.findById(req.params.id)
      .then((subjects) => {
        (subjects.username = req.body.username),
          (subjects.description = req.body.description),
          (subjects.title = req.body.title),
          (subjects.duration = req.body.duration),
          (subjects.date = req.body.date);
  
        subjects
          .save()
          .then(() => res.json("Todo Updated!"))
          .catch((err) => res.status(400).json("Error: " + err));
      })
  
      .catch((err) => res.status(400).json("Error: " + err));
  });

  router.route("/user/:userId").get((req, res) => {
    Subject.find({username: req.params.userId})
      .then((todos) => res.json(todos))
      .catch((err) => res.status(400).json("Error: " + err));
  });
  
  module.exports = router;