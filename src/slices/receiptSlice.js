import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  // states for tracking user info
  // receiptArr: [  {
  //   name: 'receipt1',
  //   total: 128,
  // }, 
  // {
  //   name: 'receipt2',
  //   total: 400,
  // },
  // {
  //   name: 'receipt3',
  //   total: 600,
  // }]

  receiptArr: []

};

export const receiptSlice = createSlice({
  name: 'receipt',
  initialState,
  reducers: {
    setReceiptArr(state, action) {
      console.log('RUNNING SET RECEIPTS')
      state.receiptArr = action.payload;
    },
    addReceipt(state, action) {
      state.receiptArr.push(action.payload);
    },
    deleteReceipt(state, action) {
      state.receiptArr = state.receiptArr.filter((receipt) => receipt._id !== action.payload);
    },
  },
});

export const {
  setReceiptArr,
  addReceipt,
  deleteReceipt,
} = receiptSlice.actions;

export default receiptSlice.reducer;
