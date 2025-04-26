import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import FeedbackForm from './components/FeedbackForm';
import FeedbackDashboard from './components/FeedbackDashboard';

function App() {
  const [feedbackList, setFeedbackList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshData, setRefreshData] = useState(false);
  const [activeTab, setActiveTab] = useState('submit'); // 'submit' or 'view'

  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${API_URL}/view-feedback`);
        setFeedbackList(response.data.data);
        setError(null);
      } catch (err) {
        // setError('Failed to fetch feedback data. Please try again later.');
        console.error('Error fetching feedback:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeedback();
  }, [API_URL, refreshData]);

  const handleAddFeedback = () => {
    setRefreshData(!refreshData);
    // Optionally switch to view tab after successful submission
    setActiveTab('view');
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="app">
      <Navbar />
      <main className="main">
        <div className="container">
          <div className="tabs">
            <button 
              className={`tab-button ${activeTab === 'submit' ? 'active' : ''}`}
              onClick={() => handleTabChange('submit')}
            >
              Submit Feedback
            </button>
            <button 
              className={`tab-button ${activeTab === 'view' ? 'active' : ''}`}
              onClick={() => handleTabChange('view')}
            >
              View Feedback
            </button>
          </div>

          {activeTab === 'submit' ? (
            <FeedbackForm onFeedbackSubmit={handleAddFeedback} />
          ) : (
            <FeedbackDashboard 
              feedbackList={feedbackList} 
              isLoading={isLoading} 
              error={error} 
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;