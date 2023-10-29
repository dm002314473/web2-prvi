import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import UserProfile from './components/UserProfile';
import UnosIObrada from './components/UnosIObrada';
import Schedule from './components/Schedule';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <LoginButton />
        <LogoutButton />
        <UserProfile />
        <br />
        <Routes>
          <Route path="/" element={<UnosIObrada />} />
          <Route path="/Schedule/:name/:competitors/:sport" element={<Schedule/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
