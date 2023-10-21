import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sundays from './pages/Sundays';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/pages/Sundays" element={<Sundays />} />
        <Route path="*" element={<Sundays />} />
      </Routes>
    </Router>
  );
}

export default App;
