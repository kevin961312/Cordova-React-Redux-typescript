import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';
import PrimaryButton from '../../components/PrimaryButton';
import './HomePage.rules.scss';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="home-layout">
      <main className="home-main">
        <div className="home-page-wrapper">
          <h2>Home Page</h2>
          <p>Welcome to the home page.</p>
          <PrimaryButton onClick={() => navigate('/other')}>Go to Other Page</PrimaryButton>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;