import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const GenerateCommentPage = () => {
  const navigate = useNavigate();
  const [generatedComment, setGeneratedComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const fetchGeneratedComment = async () => {
    setLoading(true);
    setError('');
    const keywords = JSON.parse(localStorage.getItem('selectedKeywords')) || [];
    try {
      const response = await fetch('http://localhost:5000/generate-review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keywords })
      });
      const data = await response.json();
      if(response.ok) {
        setGeneratedComment(data.comment);
      } else {
        setError(data.error || 'Error generating comment');
      }
    } catch (err) {
      setError('An error occurred.');
    }
    setLoading(false);
  };
  
  useEffect(() => {
    fetchGeneratedComment();
  }, []);
  
  const handleRegenerate = () => {
    fetchGeneratedComment();
  };
  
  const handleContinue = () => {
    // Redirect to the Google review page
    window.location.href = "https://www.google.com/search?q=your+business+name+google+reviews";
  };
  
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Your AI Generated Review Comment</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{color: 'red'}}>{error}</p>}
      {!loading && !error && (
        <>
          <p>{generatedComment}</p>
          <button onClick={handleRegenerate}>Regenerate Comment</button>
          <button onClick={handleContinue}>Continue</button>
        </>
      )}
      <button onClick={() => navigate('/')}>Back to Home</button>
    </div>
  );
};

export default GenerateCommentPage;
