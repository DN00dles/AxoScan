import React from 'react'
import ReceiptBox from './ReceiptBox'
// import { initialState } from '../slices/receiptSlice.js'

export default function ReceiptList({ receiptArr }) {
    const Receipts = receiptArr.map((el, idx) => {
      return (
        <ReceiptBox
        key={idx}
            receiptName={el.fileName}
            receiptContent={el.receipt}
            receiptId={el._id}
        />
      )
    })
    return (
    <div>
      {Receipts}
    </div>
  )
}

  