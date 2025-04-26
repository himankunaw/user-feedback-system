import React, { useState } from 'react';
import axios from 'axios';

const FeedbackForm = ({ onFeedbackSubmit }) => {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    feedbackText: '',
    category: 'suggestion'
  });
  const [message, setMessage] = useState({ type: '', text: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.userName || !formData.email || !formData.feedbackText) {
      setMessage({ type: 'error', text: 'Please fill in all required fields' });
      return;
    }

    if (!isValidEmail(formData.email)) {
      setMessage({ type: 'error', text: 'Please enter a valid email address' });
      return;
    }

    try {
      setIsSubmitting(true);
      await axios.post(`${API_URL}/submit-feedback`, formData);
      
      // Reset form and show success message
      setFormData({
        userName: '',
        email: '',
        feedbackText: '',
        category: 'suggestion'
      });
      setMessage({ type: 'success', text: 'Feedback submitted successfully!' });
      
      // Notify parent component to refresh feedback list
      if (onFeedbackSubmit) {
        onFeedbackSubmit();
      }
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'Failed to submit feedback. Please try again.' 
      });
      console.error('Error submitting feedback:', error);
    } finally {
      setIsSubmitting(false);
      
      // Clear success message after 5 seconds
      if (message.type === 'success') {
        setTimeout(() => {
          setMessage({ type: '', text: '' });
        }, 5000);
      }
    }
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className="card">
      <h2>Submit Feedback</h2>
      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name *</label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="suggestion">Suggestion</option>
            <option value="bug">Bug Report</option>
            <option value="feature">Feature Request</option>
            <option value="other">Other</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="text">Feedback *</label>
          <textarea
            id="feedbackText"
            name="feedbackText"
            value={formData.feedbackText}
            onChange={handleChange}
            required
          />
        </div>
        
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;