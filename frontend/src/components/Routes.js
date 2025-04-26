import React from 'react';
import { Routes, Route } from 'react-router-dom';
import FeedbackForm from './FeedbackForm';
import FeedbackDashboard from './FeedbackDashboard';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<FeedbackForm />} />
      <Route path="/view-feedback" element={<FeedbackDashboard />} />
    </Routes>
  );
};

export default AppRoutes;