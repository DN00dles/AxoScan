import React, { useState } from 'react';
import ReceiptBox from './ReceiptBox';
import ReceiptList from './ReceiptList';
import { useSelector } from 'react-redux';

export default function Profile() {
  //func moved to receipt list 
  const { receiptArr } = useSelector(state => state.receipt)

  // fetch receipt Array here if its first time

  return (
    <div className="profile-container">
        <h1>Profile Page</h1>
      <ReceiptList
      //placeholder list = { receiptArr }
        receiptArr={receiptArr}
      />
      
    </div>
  );
}

//Profile Page

// ReceipetList

// ReceiptList
// map render all the receipts in each of their "ReceiptBox"


//ReceiptBox