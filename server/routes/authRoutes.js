import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const router = express.Router();

//adding post request to sign up
router.post("/signup", async (req, res) => {
  try {
    const existingUser = await User.findOne({ username: req.body.username }); // Add await keyword here
    if (existingUser) {
      return res.status(400).send({ error: "Username already exists." });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      username: req.body.username,
      password: hashedPassword,
    });

    await user.save();
    res.status(201).send({ message: "User created" });
  } catch {
    res.status(500).send({
      username: req.body.username,
      password: hashedPassword,
    });
  }
});

/*
 createStudent(req, res, next) {
    console.log('Here!');
    console.log('body', req.body);
    const { firstName, lastName, age} = req.body;

    Student.create({
      firstName: firstName,
      lastName: lastName,
      age: age,}, (err, student) => {
      if (err){ 
        return next({
          log: 'Express error handler caught StudentController middleware error in createStudednt',
          status: 500,
          message: { err: 'An error occurred' },
        });
      } 
      res.locals.student = student;
      return next();
    });
  },
*/

//adding post request to login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user == null) {
      return res.status(400).send("Cannot find user");
    }
    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (isPasswordValid) {
      const accessToken = jwt.sign(
        { username: user.username },
        process.env.ACCESS_TOKEN_SECRET
      );
      console.log('a token,', accessToken);
      res.cookie('JWT', accessToken);
      res.status(200).json({login: 'success'});
    } else {
      res.status(200).json({login: 'fail'});
    }
  } catch (error) {
    res.status(500).send("Login failed");
  }
});

export default router;
