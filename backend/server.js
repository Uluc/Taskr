const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const passport = require("passport");
const account = require("./routes/account");


require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true  });

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Connected");
});

//MIDDLEWARE
app.use(cors());
app.use(express.json());

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
// Routes
app.use("/accounts", account);

const todosRouter = require("./routes/todos");
const subjectRouter = require("./routes/subjects")
const typeRouter = require("./routes/types")
 
app.use("/todos", todosRouter);
app.use("/subjects", subjectRouter);
app.use("/types", typeRouter);

//LISTEN SERVER
app.listen(port, () => {
  console.log(`Server is running on: ${port}`);
});
