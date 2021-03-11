const router = require("express").Router();
let Type = require("../models/type");

router.route("/").get((req, res) => {
  Type.find()
    .then((types) => res.json(types))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
    const user_id = req.body.user_id;
    const name = req.body.name;
    const color = req.body.color;
  
    const newtype = new Type({
      user_id,
      name,
      color,
    });
  
    newtype
      .save()
      .then(() => res.json("Type added!"))
      .catch((err) => res.status(400).json("Error: " + err));
  });

  router.route("/:id").get((req, res) => {
    Type.findById(req.params.id)
      .then((Type) => res.json(Type))
      .catch((err) => res.status(400).json("Error: " + err));
  });

  router.route("/:id").delete((req, res) => {
    Type.findByIdAndDelete(req.params.id)
      .then((Type) => res.json(Type))
      .catch((err) => res.status(400).json("Error: " + err));
  });

  router.route("/update/:id").post((req, res) => {
    Type.findById(req.params.id)
      .then((types) => {
        (types.user_id = req.body.user_id),
        (types.name = req.body.name),
        (types.color = req.body.color),
  
        types
          .save()
          .then(() => res.json("Type Updated!"))
          .catch((err) => res.status(400).json("Error: " + err));
      })
  
      .catch((err) => res.status(400).json("Error: " + err));
  });

  router.route("/user/:userId").get((req, res) => {
    Type.find({user_id: req.params.userId})
      .then((type) => res.json(type))
      .catch((err) => res.status(400).json("Error: " + err));
  });
  
  module.exports = router;