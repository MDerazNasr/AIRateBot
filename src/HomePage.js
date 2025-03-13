import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>How was your experience?</h1>
      <div>
        <button onClick={() => navigate('/good-review')} style={{ marginRight: '20px' }}>Good</button>
        <button onClick={() => navigate('/complaint')}>Bad</button>
      </div>
    </div>
  );
};

export default HomePage;
