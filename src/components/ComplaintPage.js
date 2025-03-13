import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ComplaintPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', complaint: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!formData.name || !formData.email || !formData.complaint) {
      setError('Please fill in all fields.');
      return;
    }
    try {
      const response = await fetch('http://localhost:5000/complaint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if(response.ok) {
        setSubmitted(true);
      } else {
        setError(data.error || 'Submission failed');
      }
    } catch (err) {
      setError('An error occurred.');
    }
  };
  
  if (submitted) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h2>Thank you for your feedback!</h2>
        <button onClick={() => navigate('/')}>Back to Home</button>
      </div>
    );
  }
  
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Report a Complaint</h1>
      {error && <p style={{color: 'red'}}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} />
        </div>
        <div>
          <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} />
        </div>
        <div>
          <textarea name="complaint" placeholder="Your Complaint" value={formData.complaint} onChange={handleChange} />
        </div>
        <button type="submit">Submit Complaint</button>
      </form>
      <button onClick={() => navigate('/')}>Back to Home</button>
    </div>
  );
};

export default ComplaintPage;
