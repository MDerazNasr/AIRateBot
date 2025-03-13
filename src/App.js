import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import ComplaintPage from './components/ComplaintPage';
import GoodReviewPage from './components/GoodReviewPage';
import GenerateCommentPage from './components/GenerateCommentPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/complaint" element={<ComplaintPage />} />
        <Route path="/good-review" element={<GoodReviewPage />} />
        <Route path="/generate-comment" element={<GenerateCommentPage />} />
      </Routes>
    </div>
  );
}

export default App;
