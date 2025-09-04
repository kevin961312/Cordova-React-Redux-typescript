import React from 'react';
import { useNavigate } from 'react-router-dom';
import './OtherPage.scss';

const OtherPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <main className="other-main">
      <div className="other-card">
        <h2>Other Page</h2>
        <p>This is the other page content.</p>
        <button onClick={() => navigate('/')}>Go to Home Page</button>
      </div>
    </main>
  );
};

export default OtherPage;
