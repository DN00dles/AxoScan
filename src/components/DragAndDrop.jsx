import { useState } from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import '../styles/DragAndDrop.css';
import axios from 'axios';
const { Dragger } = Upload;
import ProgressBar from './ProgressBar';
import { useDispatch } from 'react-redux';
import { addReceipt } from '../slices/receiptSlice';


const DragAndDrop = ({ setHasUploaded, setLineItems }) => {
  const [fileList, setFileList] = useState([]);
  const dispatch = useDispatch();

  const customRequest = async ({ file, onSuccess, onError }) => {
    const formData = new FormData();
    formData.append('file', file);
    console.log('file: ', file);

    // update url from backend
    // WHY NOT JUST USE THE ACTION PROPERTY ON DRAGGER?
    // WHY NOT JUST USE THE ACTION PROPERTY ON DRAGGER?
    try {
      console.log('formData: ', formData);
      const response = await axios.post('/api/upload', formData);
      message.success(`${file.name}, file uploaded successfully`);

      // RETURNED DATA WILL BE AN OBJECT WITH TWO PROPERTIES
      // RECEIPT ARRAY (THE RECEIPTS ITEMIZED ARRAY)
      // RECEIPT (THE DOCUMENT FOR THAT RECEIPT IN MONGO DB)
      console.log('Server Response: ', response.data);

      // Update line items to plot pie chart
      if (response.data) {
        setLineItems(response.data.receiptArr);
      }

      // Update receiptArr to show on profile
      // if result is from the memorize middleware, then not re-added to DB
      // therefore, will not be added to our current list of receipts
      if (response.data.receipt) dispatch(addReceipt(response.data.receipt));

      setHasUploaded(true);
      onSuccess(response.data);
    } catch (error) {
      console.error('Server Response: ', error);
      message.error(`${file.name}, file upload failed`);
      onError(error);
    }
  };

  const props = {
    name: 'file',
    multiple: false,
    customRequest,
    onChange(info) {
      const { status } = info.file;

      console.log('status change: ', status)

      if (status !== 'uploading') {
        console.log('uploading...')
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        // call the receipt api to get the pie
        // rerender the pie chart
        console.log('uploading success')
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        console.log('uploading error')
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };
  
  return (
    <Dragger {...props}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">Click or drag file to this area to upload</p>
    </Dragger>
  );

};
export default DragAndDrop;