import React, { useState } from 'react';
import DragAndDrop from './DragAndDrop';
import Instructions from './Instructions';
import TitleHeader from './TitleHeader';
import '../styles/Home.css';
import '../styles/Home.css';
import Footer from './Footer';
import UploadButton from './UploadButton';
import Pie from './Pie';
import { useDispatch, useSelector } from 'react-redux';
import { setReceiptArr } from '../slices/receiptSlice';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import bImg from '../assets/background-img.png';


export default function Home() {
  const [hasUploaded, setHasUploaded] = useState(false);
  const [lineItems, setLineItems] = useState([]);
  const total = lineItems.reduce((acc, curr) => acc + curr.value, 0);
  console.log(total);

  // helper function for grabbing receipts from DB
  const { receiptArr } = useSelector(state => state.receipt)
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  // Check if the session is currently active
  // Make a fetch request with the cookie
  // If there is an active session, do nothing
  // If there is no active session or the session is expired, redirect

  const checkSession = async () => {
    const response = await fetch('/auth/checkSession');
    const data = await response.json();
    if (data.login === 'failed') {
      // Redirect to login page
      // window.location.href = '/login';
      navigate('/login');
    }
  };


  // Check session on page load
  useEffect(() => {
    checkSession();
  }, []);


  


  return (
    <div className="home-container" style={{backgroundImage: `url(${bImg})`}}>
      <TitleHeader className="header" />
      <div className="content-container">
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
      </div>
      <Footer />
    </div>

  );
}
