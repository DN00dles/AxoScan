import React, { useState } from 'react';

function ReceiptBox(){
  const [count, setCount] = useState(0);
  return(
    <div>
      <h3>Receipt Box</h3>
      <select name = "receipt-selector">
      <option value="hello">Hello</option>
      <option value="bye">bye</option>
      </select>
      </div>
  )
}

export default ReceiptBox; 