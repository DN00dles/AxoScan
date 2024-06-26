import React, { useEffect, useState } from "react";
import ReceiptList from "../components/ReceiptList";
import { useSelector, useDispatch } from "react-redux";
import { setReceiptArr } from "../slices/receiptSlice.js";
import TitleHeader from "../components/TitleHeader.jsx";
import Footer from "../components/Footer.jsx";
import { useNavigate } from "react-router-dom";
import bImg from '../assets/background-img.png';

export default function Profile() {
  //func moved to receipt list
  const { receiptArr } = useSelector((state) => state.receipt);
  const navigate = useNavigate();

  // helper function for grabbing receipts from DB
  const dispatch = useDispatch();
  const fetchReceipts = async () => {
    const response = await fetch("/api/receipts");

    const data = await response.json();

    console.log("FETCHED DATA: ", data);

    dispatch(setReceiptArr(data));
  };

  // fetch receipt Array here if its first time
  useEffect(() => {
    if (receiptArr.length === 0) {
      console.log("fetching...");
      fetchReceipts();
    }
  }, []);

  const checkSession = async () => {
    const response = await fetch("/auth/checkSession");
    const data = await response.json();
    if (data.login === "failed") {
      // Redirect to login page
      // window.location.href = '/login';
      navigate("/login");
    }
  };

  // Check session on page load
  useEffect(() => {
    checkSession();
  }, []);

  return (
    <>
    <TitleHeader className="header" />
      <div className="profile-container" style={{backgroundImage: `url(${bImg})`}}>
      
        <div className="receiptlist-container">
          <ReceiptList receiptArr={receiptArr} />
        </div>
      </div>
    <Footer />
    </>
  );
}


//Profile Page

// ReceipetList

// ReceiptList
// map render all the receipts in each of their "ReceiptBox"

//ReceiptBox
