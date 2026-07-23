const express = require("express");
const loginController = express();

//models
const userModel = require("../models/userModel");

loginController.post("/signup", async (req, res) => {
  // we need to create a user in db
  try {
    const dbRes = await userModel.create(req.body);
    res.json({
      message: "successfully create a new user",
      userDetails: req.body,
    });
  } catch (err) {
    res.status(409).send({
      message: "User Creation Filed. User already Exists",
      error: err.name,
    });
  }
});

loginController.post("/signin", async (req, res) => {
  // we need to validate user from db
  console.log(req.body);
  const user_email = req.body.userEmail;
  let foundUsers = [];
  // getting all the users that match email or username.
  try {
    if (/^[^@\s]*@[^@\s]*\.(com|in|ai)$/.test(user_email)) {
      const dbRes = await userModel.find({ email: user_email });
      foundUsers = dbRes;
    } else {
      const dbRes = await userModel.find({ userName: user_email });
      foundUsers = dbRes;
    }
    console.log(foundUsers, "foundUsers............")
    if (foundUsers.length > 0) {
      // validate the password.
      const valid = foundUsers.find(
        (user) => user.password == req.body.password,
      );
      console.log(valid, "valid ..........")
      if (valid) {
        res.json({
          message: "login Success",
          userDetails: valid,
          token: ""
        });
      } else {
        res.status(409).json({
          message: "Invalid Password",
        });
      }
    } else {
      res.status(409).json({
        message: "invalid email",
      });
    }
  } catch (error) {
    console.log(error.name, "mongo error in the node", error);
  }
});

module.exports = loginController;
