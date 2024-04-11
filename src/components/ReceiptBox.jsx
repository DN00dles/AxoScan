import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteReceipt } from '../slices/receiptSlice';

function ReceiptBox({receiptName, receiptContent, receiptId}){
  const [collapsed, setCollapsed] = useState(true);
  const dispatch = useDispatch();
  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  }

  const Items = receiptContent.map((el, idx) => {
    return (
      <div key={idx}>
        <p>type: {el.type}</p>
        <p>price: {el.value}</p>
      </div>
    )
  })

  const handleDelete = async () => {
    try {
      await fetch(`/api/receipts/${receiptId}`, {
        method: 'DELETE',
      });
    
      dispatch(deleteReceipt(receiptId));

    } catch (err) {
        console.log(err);
    }
  }

  return (
    <div className='receipt-box'>
      <div onClick={toggleCollapse} style={{ cursor: 'pointer'}}>
        <h3>{receiptName}</h3>
        <button className="expand-collapse-button"
        >
          {collapsed ? 'Expand' : 'Collapse'}
        </button>
        <button className="delete-btn" onClick={handleDelete}>DELETE</button>
      </div>
      {!collapsed && (
        <div className="items-container">
          {/* Wrap Items in a scrollable container */}
          <div className="scroll-box">
            {Items}
          </div>
        </div>
      )}
    </div>
  );
}

export default ReceiptBox; 
//using store name & date of purchase as receipt names 
