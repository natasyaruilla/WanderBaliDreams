import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/homepage.jsx';
import LandingPage from './components/landingPage.jsx';
import DetailPage from './components/PlaceDetail.jsx';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/place/:id" element={<DetailPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
