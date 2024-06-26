import React from 'react';
import { Button } from 'antd';

const App = ({ setHasUploaded }) => {
  const handleClick = (event) => {
    setHasUploaded(false);
  };
  return (
    <Button className="upload-button" onClick={handleClick} style={{ marginBottom: '50px' }}>
      Back to Upload
    </Button>
  );
};
export default App;
