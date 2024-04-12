import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Fix import statement
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import DailyList from './Components/DailyList';
import Projects from './Components/ProjectsList';
import TotalEarnings from './Components/TotalEarnings';
import './App.css'; // Import CSS file for global styling

function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes> {/* Use Routes instead of Route */}
        <Route exact path="/" element={<Home />} />
        <Route path="/dailylist" element={<DailyList />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/earnings" element={<TotalEarnings />} />
      </Routes> {/* Move Navbar component outside Routes */}
    </BrowserRouter>
  );
}

export default App;
