import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteReceipt } from '../slices/receiptSlice';

function ReceiptBox({receiptName, receiptContent, receiptId, merchantName, merchantAddress, merchantCoordinates}){
  const [collapsed, setCollapsed] = useState(true);
  const dispatch = useDispatch();
  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  }

  let lon = '';
  let lat = '';

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

  if (merchantCoordinates) {
    lon = merchantCoordinates.lon.toString();
    lat = merchantCoordinates.lat.toString();
  }

  return (
    <div className='receipt-box'>
      <div onClick={toggleCollapse} style={{ cursor: 'pointer'}}>
        <h3>{merchantName}</h3>
        <h3>{merchantAddress}</h3>

        <button style={{
          fontSize: '16px',
          padding: '8px, 12px',
          backgroundColor: '#1809ff',
          color: '#fff',
          border: '20px',
          cursor: 'pointer'
        }}>
          {collapsed ? 'Expand' : 'Collapse'}
        </button>
        <button onClick={handleDelete}>DELETE</button>
      </div>
      <div className='receipt-box-expand-contents' style={{display: 'flex'}}>
        {!collapsed && (
          <div className="items-container">
            {/* Wrap Items in a scrollable container */}
            <div className="scroll-box">
              {Items}
            </div>
          </div>
        )}

        {!collapsed && merchantCoordinates &&
          <iframe width="400" height="200" 
            src={`https://api.maptiler.com/maps/basic-v2/?key=4QKXJlp5Aa2z67I3VAzx#15.0/${lat}/${lon}`}>
          </iframe>
        }
      </div>
    </div>
  );
}

export default ReceiptBox; 
//using store name & date of purchase as receipt names 
