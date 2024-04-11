import React from 'react'
import ReceiptBox from './ReceiptBox'
// import { initialState } from '../slices/receiptSlice.js'
const MAX_CONTAINER_HEIGHT = 'calc(100vh - 200px)'; // Adjust as needed

export default function ReceiptList({ receiptArr }) {
    const Receipts = receiptArr.map((el, idx) => {
      return (
        <div className='receiptList-div'>
          <div style={{ maxHeight: MAX_CONTAINER_HEIGHT, overflowY: 'auto' }}></div>
        
        <ReceiptBox
        key={idx}
            receiptName={el.fileName}
            receiptContent={el.receipt}
            receiptId={el._id}
        />
        </div>
      )
    })
    return (
    <div className='receiptList-div'>
      <div style={{ maxHeight: MAX_CONTAINER_HEIGHT, overflowY: 'auto' }}></div>
      <h1>Receipt History:</h1>
      {Receipts}
    </div>
  )
}

  