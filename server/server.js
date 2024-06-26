import express from 'express';
import path from 'path';
import {mongoose} from 'mongoose'
import authRoutes from './routes/authRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import 'dotenv/config';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
const __dirname = import.meta.dirname;

//use dotenv package to load the environment variables from the .env file
dotenv.config();

const PORT = 3000;
const app = express();
// delcare routers

mongoose.connect(process.env.MONGO_URI, {
  // Tells mongoose to use new URL parser for parsing connection strings to avoid depreciation warngings 
  // useNewUrlParser: true,
  //Enables new unified topology engine in MONGO db's Node.js driver, reccomended for new projects
  // useUnifiedTopology: true,
  // sets the name of the DB that our collections are part of
  dbName: 'receipts'
})
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log('Mongo Connection error', err));

// handle parsing request body
app.use(express.json());

app.use(cookieParser());
// favicon error handler
app.get('/favicon.ico', (req, res) => res.status(204));

// static routes

//authenticaiton routes
app.use('/auth', authRoutes)

// serve all static dist files on production build
app.use('/assets', express.static(path.resolve(__dirname, '../dist/assets/')));

// app.use(express.static(path.resolve('index.html'));
app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../dist/index.html'));
});  

// route handlers
app.use('/api', uploadRoutes);

//catch-all route handler for any requests to an unknown route
app.get('*', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../dist/index.html'));
}); 

// global error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' }, 
  }
  let errorObj = Object.assign({}, defaultErr, err);
  res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});


// route handler to then send to middleware, then we can work ond atabase to connect / send data to databsae

