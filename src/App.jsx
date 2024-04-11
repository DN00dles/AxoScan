import React from 'react';
import Home from './components/Home.jsx';
import Profile from './pages/Profile.jsx';
import Login from './pages/Login.jsx';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './index.css'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          //make line 15 home if you want to default to home
          <Route path='/login' element={<Login />}/>
          <Route path='/home' element={<Home />}/>
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
