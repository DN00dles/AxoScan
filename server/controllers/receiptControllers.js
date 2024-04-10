import fetch from 'node-fetch';
import FormData from 'form-data';
import Receipt from '../models/models.js';
import { ObjectId } from 'mongodb';

const receiptController = {
  async uploadReceipt(req, res, next) {
    try {
      console.log(req.file);
      const form = new FormData();
      form.append('refresh', 'false');
      form.append('incognito', 'false');
      form.append('extractTime', 'false');
      form.append('extractLineItems', 'true');
      form.append('file', req.file.buffer, req.file.originalname);

      const options = {
        method: 'POST',
        headers: { accept: 'application/json', apikey: 'b6abedc0f43c11ee9433edbb2578dfab' },
      };

      options.body = form;

      const response = await fetch('https://api.taggun.io/api/receipt/v1/verbose/file', options);
      const parsedData = await response.json();
      //TODO: parsedData has EVERYTHING
      // find the path to get store name, and anything else that might be useful!
      console.log(parsedData);
      const productArray = parsedData.entities.productLineItems;
      res.locals.fileName = req.file.originalname;
      res.locals.array = productArray;
      return next();
    } catch (err) {
      return next({ log: 'Problem encountered fetching data from API', message: 'Could not retrieve receipt data' });
    }
  },

  async saveReceipt(req, res, next) {
    console.log('STARTING SAVERECEIPT');
    try {
      console.log(res.locals.array);
      const response = await Receipt.create({ fileName: res.locals.fileName, receipt: res.locals.array });
      res.locals.receipt = await response;
      return next();
    } catch (err) {
      return next({ log: 'Problem encountered sending information to Database', message: 'Problem with receipt response from DB' });
    }
  },

  async getReceipts(req, res, next) {
    try {
      const response = await Receipt.find();

      res.locals.receiptArr = response;

      return next();

    } catch (err) {
      return next({
        log: 'problem in getReceipts controller',
        message: {err: 'cannot get receipts'}
      })
    }
  },

  async deleteReceipt(req, res, next) {
    const id = req.params.id;

    try {
      const response = await Receipt.findByIdAndDelete(id);

      res.locals.receipt = response;

      console.log(res.locals.receipt);

      return next();

    } catch (err) {
      return next({
        log: 'problem in deleteReceipts controller',
        message: {err: 'cannot delete receipt'}
      })
    }
  }
};



export default receiptController;
