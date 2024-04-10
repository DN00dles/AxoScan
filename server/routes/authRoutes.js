import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const router = express.Router();
import cors from 'cors';
import multer from 'multer';
//multer variables
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
// eslint-disable-next-line no-unused-vars
import receiptController from '../controllers/receiptControllers.js';
import searchArray from '../controllers/searchArray.js';
import memorize from '../controllers/memorize.js';

// IMPORT MODEL INTO THE HERE OR CONTROLLER
// THATMODEL.CREATE
// THATMODEL.FIND

router.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173',
  })
);

// post request
//TODO: REVIEW THIS, WE MAY BE ABLE TO JUST REPLACE WITH MONGO DB
//MODEL.CREATE(FILE)
router.post('/upload', upload.single('file'), memorize, receiptController.uploadReceipt, 
searchArray.searched, receiptController.saveReceipt, 
(req, res) => res.status(200).json({
  receiptArr: res.locals.array,
  receipt: res.locals.receipt,
}));

// get request to get all receipts in collection
router.get('/receipts', receiptController.getReceipts, (req, res) => {
  res.status(200).json(res.locals.receiptArr);
});

// delete a receipt in collection
router.delete('/receipts/:id', receiptController.deleteReceipt, (req, res) => {
  res.status(200).json(res.locals.receipt)
})

// eslint-disable-next-line no-undef



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