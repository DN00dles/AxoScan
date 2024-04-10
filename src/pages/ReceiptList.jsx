import React from 'react'
import ReceiptBox from './ReceiptBox'
// import { initialState } from '../slices/receiptSlice.js'

export default function ReceiptList({ receiptArr }) {
    const Receipts = receiptArr.map((el, idx) => {
      return (
        <ReceiptBox
        key={idx}
            receiptName={el.name}
            receiptContent={el.total}
        />
      )
    })
    return (
    <div>
      {Receipts}
    </div>
  )
}

// [1,2,3,4] => [2, 4, 6, 8]

// [rec1, rec2, rec3] => [<ReceiptBox>, <ReceiptBox></ReceiptBox>, <ReceiptBox></ReceiptBox>]

// const Flights = receiptArr.map((el, idx) => {
//     return (
//       <Flight
//         key={idx}
//         flight_id={el.id}
//       />
//     );
//   });

  