import React from 'react';
import { useNavigate } from 'react-router-dom';

const OtherPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="page">
      <h1>Other Page</h1>
      <button onClick={() => navigate('/')}>Go to Home Page</button>
    </div>
  );
};

export default OtherPage;