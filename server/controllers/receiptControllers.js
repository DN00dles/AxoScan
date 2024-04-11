import fetch from 'node-fetch';
import FormData from 'form-data';
import Receipt from '../models/models.js';
import { ObjectId } from 'mongodb';
import { query } from 'express';

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
      res.locals.array = productArray;
      res.locals.merchantName = parsedData.merchantName.data;
      res.locals.merchantAddress = parsedData.merchantAddress.data;
      res.locals.fileName = req.file.originalname;
      return next();
    } catch (err) {
      return next({ log: 'Problem encountered fetching data from API', message: 'Could not retrieve receipt data' });
    }
  },

  // optional middleware, will essentially skip if address is not available on receipt
  async getCoords(req, res, next) {
    console.log('STARTING GETCOORDS')

    // if no address available, skip this middleware
    if (!res.locals.merchantAddress) return next();

    console.log('ADDRESS FOUND, FINDING COORDS...')
    const API_KEY = 'c32f34f30734402ab68f03a20bf5353a';
    let queryText = 'https://api.geoapify.com/v1/geocode/search?text=';

    // remove all ',' and split into word arr
    const addressArr = res.locals.merchantAddress.replace(/\,/g, "").split(' ');

    addressArr.forEach(word => {
      queryText += `%20${word}`;
    })

    queryText += `&format=json&apiKey=${API_KEY}`;

    console.log('queryText: ', queryText);

    try {
      const response = await fetch(queryText);
      const data = await response.json();

      // if no results, skip
      if (data.results.length === 0) return next();

      // just grab first result
      const lon = data.results[0].lon;
      const lat = data.results[0].lat;
      
      res.locals.merchantCoordinates = {
        lon: lon,
        lat: lat,
      };
      
      console.log('coords: ', res.locals.merchantCoordinates);
    }
    catch (err) {
      // don't let this middleware cause problems, if we can't get coordinates off address then skip middleware
    }

    return next();

  },

  async saveReceipt(req, res, next) {
    console.log('STARTING SAVERECEIPT');
    try {
      console.log(res.locals.array);
      const response = await Receipt.create({ 
        fileName: res.locals.fileName, 
        merchantName: res.locals.merchantName,
        merchantAddress: res.locals.merchantAddress,
        merchantCoordinates: res.locals.merchantCoordinates,
        receipt: res.locals.array 
      });
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
