import React from 'react';
import Home from './components/Home.jsx';
import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path='/home' element={<Home />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
