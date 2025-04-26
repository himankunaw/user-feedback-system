import React, { useState } from 'react';

const FeedbackList = ({ feedback, isLoading, error }) => {
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const truncateText = (text) => {
    const firstLine = text.split('\n')[0];
    return firstLine.length > 60 ? `${firstLine.substring(0, 60)}...` : firstLine;
  };

  if (isLoading) return <div className="loading">Loading feedback...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!feedback?.length) return <div className="empty">No feedback found</div>;

  return (
    <div className="feedback-container">
      {feedback.map((item) => (
        <div 
          key={item._id}
          className={`feedback-card ${expandedId === item._id ? 'expanded' : ''}`}
          onClick={() => toggleExpand(item._id)}
        >
          <div className="card-header">
            <span className="category-badge">{item.category}</span>
            <span className="username">{item.userName}</span>
            <span className="date">
              {new Date(item.createdAt).toLocaleString()}
            </span>
            <span className="expand-toggle">
              {expandedId === item._id ? '▲' : '▼'}
            </span>
          </div>

          <div className="preview-content">
            {expandedId !== item._id && (
              <p className="preview-text">{truncateText(item.feedbackText)}</p>
            )}
          </div>

          {expandedId === item._id && (
            <div className="full-content">
              <div className="detail-meta">
                <span className="email">{item.email}</span>
              </div>
              <p>{item.feedbackText}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FeedbackList;