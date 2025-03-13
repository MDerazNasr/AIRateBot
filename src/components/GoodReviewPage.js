import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const GoodReviewPage = () => {
  const navigate = useNavigate();
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  
  const keywordOptions = [
    'friendly',
    'efficient',
    'affordable',
    'high quality',
    'outstanding',
    'clean',
    'innovative'
  ];
  
  const toggleKeyword = (keyword) => {
    if(selectedKeywords.includes(keyword)) {
      setSelectedKeywords(selectedKeywords.filter(k => k !== keyword));
    } else {
      setSelectedKeywords([...selectedKeywords, keyword]);
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if(selectedKeywords.length === 0) {
      alert('Please select at least one keyword');
      return;
    }
    // Store keywords in localStorage for later use
    localStorage.setItem('selectedKeywords', JSON.stringify(selectedKeywords));
    navigate('/generate-comment');
  };
  
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Select Keywords that describe your experience</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'inline-block', textAlign: 'left' }}>
          {keywordOptions.map((keyword, index) => (
            <div key={index}>
              <label>
                <input 
                  type="checkbox" 
                  value={keyword} 
                  onChange={() => toggleKeyword(keyword)}
                  checked={selectedKeywords.includes(keyword)}
                />
                {keyword}
              </label>
            </div>
          ))}
        </div>
        <div style={{ marginTop: '20px' }}>
          <button type="submit">Continue</button>
        </div>
      </form>
      <button onClick={() => navigate('/')}>Back to Home</button>
    </div>
  );
};

export default GoodReviewPage;
