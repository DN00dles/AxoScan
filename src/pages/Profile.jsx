import React, { useEffect, useState } from 'react';
import ReceiptList from '../components/ReceiptList';
import { useSelector, useDispatch } from 'react-redux';
import { setReceiptArr } from '../slices/receiptSlice.js';
import TitleHeader from '../components/TitleHeader.jsx';
import Footer from '../components/Footer.jsx';

export default function Profile() {
  //func moved to receipt list 
  const { receiptArr } = useSelector(state => state.receipt)

  // helper function for grabbing receipts from DB
  const dispatch = useDispatch();
  const fetchReceipts = async () => {
    const response = await fetch('/api/receipts');

    const data = await response.json();

    console.log('FETCHED DATA: ', data);

    dispatch(setReceiptArr(data));
  }

  // fetch receipt Array here if its first time
  useEffect(() => {
    if (receiptArr.length === 0) {
        console.log('fetching...')
        fetchReceipts()
    }
  }, [])

  return (
    <>
    <TitleHeader className="header" />
      <div className="profile-container">
      
        <div className="receiptlist-container">
          <ReceiptList receiptArr={receiptArr} />
        </div>
      </div>
    <Footer />
    </>
  );
}


//Profile Page

// ReceipetList

// ReceiptList
// map render all the receipts in each of their "ReceiptBox"


//ReceiptBox