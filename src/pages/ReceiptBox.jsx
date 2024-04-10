import React, { useState } from 'react';

function ReceiptBox({receiptName, receiptContent}){
  const [collapsed, setCollapsed] = useState(true);
  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  }
  return(

    <div>
      <div onClick={toggleCollapse}>
        <h3>{receiptName}</h3>
        <button>{collapsed ? 'Expand' : 'Collapse'}</button>
      </div>
      {!collapsed && <p>{receiptContent}</p>}
      
    </div>
  )
}

export default ReceiptBox; 
//using store name & date of purchase as receipt names 
