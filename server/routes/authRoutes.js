import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const router = express.Router();

//adding post request to sign up
router.post('/signup', async (req,res) => {
  try{
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({ username: req.body.username, password: hashedPassword });
    await user.save();
    res.status(201).send({message: 'User created'});
  }catch{
    res.status(500).send();
  }
});

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