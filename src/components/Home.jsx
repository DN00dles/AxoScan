import React, { useState } from 'react';
import DragAndDrop from './DragAndDrop';
import Instructions from './Instructions';
import TitleHeader from './TitleHeader';
import '../styles/Home.css';
import Footer from './Footer';
import UploadButton from './UploadButton';
import Pie from './Pie';
import { useDispatch, useSelector } from 'react-redux';
import { setReceiptArr } from '../slices/receiptSlice';
import { useEffect } from 'react';

export default function Home() {
  const [hasUploaded, setHasUploaded] = useState(false);
  const [lineItems, setLineItems] = useState([]);
  const total = lineItems.reduce((acc, curr) => acc + curr.value, 0);
  console.log(total);

  // helper function for grabbing receipts from DB
  const { receiptArr } = useSelector(state => state.receipt)
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

  //is the session currently active???
  // make a fetch request with the cookie
  // if there is a session, then do nothing
  // if there isn't, then redirect


  return (
    <div className="home-container">
      <TitleHeader className="header" />

      {hasUploaded ? (
        <>
          <Pie lineItems={lineItems} />

          <p style={{ margin: '0px, 0px', padding: '0px, 0px', fontSize: '20px' }}>Total: ${+total.toFixed(2)}</p>

          {/* <UploadButton style={{ marginRight: '10px' }} setHasUploaded={setHasUploaded} setLineItems={setLineItems} /> */}
        </>
      ) : (
        <Instructions />
      )}

      <DragAndDrop setHasUploaded={setHasUploaded} setLineItems={setLineItems} />
      
      <Footer />
    </div>
  );
}
