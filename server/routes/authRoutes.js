import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const router = express.Router();

//adding post request to sign up
router.post('/signup', async (req,res) => {
  
  console.log('reqbody:', req.body);
  
  try{
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({ username: req.body.username, password: hashedPassword });
    await user.save();
    res.status(201).send({message: 'User created'});
  }catch{
    res.status(500).send({
      username: req.body.username,
      password: hashedPassword});
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
router.post('/login', async (req,res) => {
  const user = await User.findOne({username: req.body.username});
  if(user == null){
    return res.status(400).send('Cannot find user');
  }
  try{
    if(await bcrypt.compare(req.body.password, user.password)){
      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
      res.json({accessToken: accessToken});
    }else{
      res.send('Not allowed');
    }
  }catch{
    res.status(500).send();
  }
});

export default router;