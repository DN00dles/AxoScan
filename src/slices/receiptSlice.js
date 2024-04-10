import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  // states for tracking user info
  receiptArr: [{
    name: 'receipt1',
    total: 128,
  }, 
  {
    name: 'receipt2',
    total: 400,
  },
  {
    name: 'receipt3',
    total: 600,
  }]

  // state for favorite flights
};

export const receiptSlice = createSlice({
  name: 'receipt',
  initialState,
  reducers: {
    setReceiptList(state, action) {
      state.receiptArr = action.payload;
    },
    addReceipt(state, action) {
      state.receiptArr.push(action.payload);
    }
  },
});

export const {
  setReceiptList,
  addReceipt,
} = receiptSlice.actions;

export default receiptSlice.reducer;
