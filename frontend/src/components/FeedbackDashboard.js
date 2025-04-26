import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FeedbackList from './FeedbackList';

const FeedbackDashboard = ({ feedbackList: propsFeedbackList, isLoading: propsIsLoading, error: propsError }) => {
  const [filteredFeedback, setFilteredFeedback] = useState([]);
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const API_URL = process.env.REACT_APP_API_URL;
  
  useEffect(() => {
    // If props are provided, use them
    if (propsFeedbackList) {
      setFilteredFeedback(propsFeedbackList);
      setIsLoading(propsIsLoading);
      setError(propsError);
    } else {
      // Otherwise fetch data directly
      fetchFeedback();
    }
  }, [propsFeedbackList, propsIsLoading, propsError]);
  
  const fetchFeedback = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${API_URL}/view-feedback`, {
        params: {
          category: category !== 'all' ? category : undefined,
          sortBy
        }
      });
      console.log('Fetched feedback13:', response.data);
      setFilteredFeedback(response.data);
      setError(null);
    } catch (err) {
    //   setError('Failed to fetch feedback data. Please try again later.');
      console.error('Error fetching feedback:', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleCategoryChange = async (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
    
    try {
      setIsLoading(true);
      const response = await axios.get(`${API_URL}/view-feedback`, {
        params: {
          category: selectedCategory !== 'all' ? selectedCategory : undefined,
          sortBy
        }
      });
      console.log('Fetched feedback12:', response);
      setFilteredFeedback(response.data);
    } catch (err) {
      setError('Failed to filter feedback. Please try again.');
      console.error('Error filtering feedback:', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSortChange = async (e) => {
    const selectedSort = e.target.value;
    setSortBy(selectedSort);
    
    try {
      setIsLoading(true);
      const response = await axios.get(`${API_URL}/view-feedback`, {
        params: {
          category: category !== 'all' ? category : undefined,
          sortBy: selectedSort
        }
      });
      console.log('Fetched feedback11:', response);
      setFilteredFeedback(response.data);
    } catch (err) {
      setError('Failed to sort feedback. Please try again.');
      console.error('Error sorting feedback:', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="card">
      <h2>View Feedback</h2>
      
      <div className="feedback-filters">
        <div className="form-group">
          <label htmlFor="category-filter">Filter by Category</label>
          <select
            id="category-filter"
            value={category}
            onChange={handleCategoryChange}
          >
            <option value="all">All Categories</option>
            <option value="suggestion">Suggestions</option>
            <option value="bug">Bug Reports</option>
            <option value="feature">Feature Requests</option>
            <option value="other">Other</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="sort-by">Sort by</label>
          <select
            id="sort-by"
            value={sortBy}
            onChange={handleSortChange}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </div>
      <div className="feedback-container">
        <FeedbackList 
          feedback={filteredFeedback}
          isLoading={isLoading}
          error={error}
        />
      </div>
      {/* <FeedbackList 
        feedback={filteredFeedback}
        isLoading={isLoading}
        error={error}
      /> */}
    </div>
  );
};

export default FeedbackDashboard;