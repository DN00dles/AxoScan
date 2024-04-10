import React, { useState } from 'react';
import ReceiptBox from './ReceiptBox';
import { useSelector } from 'react-redux';

export default function Profile() {
  const { receiptArr } = useSelector(state => state.receipt)

  // fetch receipt Array here if its first time

  return (
    <div className="profile-container">
        <h1>Profile Page</h1>
      <ReceiptBox
      //placeholder list = { receiptArr }
      />
      
    </div>
  );
}

//Profile Page

// ReceipetList

// ReceiptList
// map render all the receipts in each of their "ReceiptBox"


//ReceiptBox