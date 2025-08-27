import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="page">
      <h1>Home Page</h1>
      <button onClick={() => navigate('/other')}>Go to Other Page</button>
    </div>
  );
};

export default HomePage;