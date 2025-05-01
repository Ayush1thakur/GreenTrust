import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import '../style/HomeAfterLogin.css';
import AddRenewableSource from '../components/AddRenewableSources.jsx';
import EnergyInsights from '../components/EnergyPredictionInsight.jsx';

const HomeAfterLogin = () => {
  const [userName, setUserName] = useState('');
  const [selectedOption, setSelectedOption] = useState('🖊️ Add Your Renewable Source');
  const [surplusEnergy, setSurplusEnergy] = useState(0);
  const [energyPrice, setEnergyPrice] = useState(null);
  const [energyForecast, setEnergyForecast] = useState(null); // This will now be available to everyone
  const [earnings, setEarnings] = useState(0);
  const [greenScore, setGreenScore] = useState(0);

  useEffect(() => {
    const storedUser = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    const fetchUserName = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users/${storedUser}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Stored User:', storedUser);
        console.log('Token:', token);
        const data = await res.json();
        setUserName(data.name);
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    };

    if (storedUser && token) {
      fetchUserName();
    }
  }, []);

  useEffect(() => {

    const fetchEnergyForecast = async () => {
      const token = localStorage.getItem('token');
      console.log('Token used for forecast:', token);
    
      try {
        const response = await fetch('http://localhost:5000/api/forecast-energy', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
    
        if (!response.ok) {
          throw new Error(`API call failed: ${response.statusText}`);
        }
    
        const data = await response.json();
        console.log('Energy Forecast Array:', data.forecast);
        setEnergyForecast(data.forecast || []);
      } catch (error) {
        console.error(error.message);
      }
    };
    

    
    
    fetchEnergyForecast();
  }, []); // Runs once when the component is mounted

  const handleWalletLink = () => {
    window.location.href = '/wallet';
  };

  const handleEnergyListing = async () => {
    // Logic to list surplus energy (set energy price and quantity)
    const energyAmount = surplusEnergy; // Quantity user wants to sell
    const price = energyPrice; // Price user wants to set

    // Call your API to list energy for sale
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/list-energy`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ energyAmount, price }),
      });
      const data = await res.json();
      setEarnings(data.earnings); // Update earnings after successful listing
      alert('Energy listed successfully!');
    } catch (error) {
      console.error('Failed to list energy:', error);
    }
  };

  const renderCard = () => {
    switch (selectedOption) {
        case '🖊️ Add Your Renewable Source':
          return <AddRenewableSource />;

      case '🧠 AI Forecast':
        return <EnergyInsights energyForecast={energyForecast} />;

      case '📤 List Extra Energy for Sale':
        return (
          <div className="card">
            <h3>📤 List Extra Energy for Sale</h3>
            <label>Energy to Sell (kWh): <input type="number" value={surplusEnergy} onChange={(e) => setSurplusEnergy(e.target.value)} /></label>
            <label>Set Price (per kWh): <input type="number" value={energyPrice} onChange={(e) => setEnergyPrice(e.target.value)} /></label>
            <button onClick={handleEnergyListing}>List Energy</button>
          </div>
        );
      case '🔐 Smart Contract Setup':
        return (
          <div className="card">
            <h3>🔐 Smart Contract Setup</h3>
            <p>Automatically handles the deal with buyer paying in $GREEN tokens. You receive tokens after the deal is done.</p>
          </div>
        );
      case '💰 View Earnings':
        return (
          <div className="card">
            <h3>💰 View Earnings</h3>
            <p>Total energy sold: {surplusEnergy} kWh</p>
            <p>Tokens earned: {earnings} $GREEN</p>
          </div>
        );
      case '🌞 AI-Powered Energy Insights':
        return (
          <div className="card">
            <h3>🌞 AI-Powered Energy Insights</h3>
            <div>
              <h4>Energy Production Prediction</h4>
              <p>Get insights into your energy production for the next 7 days.</p>
              {energyForecast && (
                <ul>
                  {energyForecast.map((day, index) => (
                    <li key={index}>Day {index + 1}: {day.predictedOutput} kWh</li>
                  ))}
                </ul>
              )}
            </div>
            <h4>Tips to Reduce Energy Usage</h4>
            <p>Here are some tips to help you save energy and reduce costs:</p>
            <ul>
              <li>Switch to energy-efficient appliances.</li>
              <li>Use smart thermostats and timers.</li>
              <li>Consider solar or wind energy solutions.</li>
            </ul>
          </div>
        );
      case 'Personal Green Score':
        return (
          <div className="card">
            <h3>Personal Green Score</h3>
            <p>Your personal green score is based on your usage of clean energy. This score helps you track your contribution to a more sustainable world.</p>
            <p>Green Score: {greenScore}</p>
          </div>
        );
      default:
        return <div className="card">Select an option to see details.</div>;
    }
  };

  return (
    <>
      <Navbar isLoggedIn={true} userName={userName} onWalletClick={handleWalletLink} />
      <div className="dashboard-container">
        <div className="sidebar">
          <button onClick={() => setSelectedOption('🖊️ Add Your Renewable Source')}>🖊️ Add Your Renewable Source</button>
          <button onClick={() => setSelectedOption('🧠 AI Forecast')}>🧠 AI Forecast</button>
          <button onClick={() => setSelectedOption('📤 List Extra Energy for Sale')}>📤 List Extra Energy for Sale</button>
          <button onClick={() => setSelectedOption('🔐 Smart Contract Setup')}>🔐 Smart Contract Setup</button>
          <button onClick={() => setSelectedOption('💰 View Earnings')}>💰 View Earnings</button>
          <button onClick={() => setSelectedOption('🌞 AI-Powered Energy Insights')}>🌞 AI-Powered Energy Insights</button>
          <button onClick={() => setSelectedOption('Personal Green Score')}>Personal Green Score</button>
        </div>
        <div className="card-display">
          <h2>{selectedOption}</h2>
          {renderCard()}
        </div>
      </div>
    </>
  );
};

export default HomeAfterLogin;
