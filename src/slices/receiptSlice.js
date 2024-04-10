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

  username: '',
  password: '',
  receiptArr: []

};

export const receiptSlice = createSlice({
  name: 'receipt',
  initialState,
  reducers: {
    setUsername(state, action) {
      state.username = action.payload;
    },
    setPassword(state, action) {  
      state.password = action.payload;
    },
    setReceiptArr(state, action) {
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
  setUsername,
  setPassword,
  setReceiptArr,
  addReceipt,
  deleteReceipt,
} = receiptSlice.actions;

export default receiptSlice.reducer;
