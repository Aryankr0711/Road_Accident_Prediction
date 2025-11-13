import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import PredictionForm from './components/PredictionForm';

function App() {
  return (
    <div className="App">
      <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-gradient">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="text-center mb-5">
                <i className="fas fa-exclamation-triangle fa-3x text-danger mb-3" style={{ color: '#ff6b6b' }}></i>
                <h1 className="display-4 fw-bold text-black">Road Accident Risk Assessment</h1>
                <p className="lead text-black">Analyze road conditions to predict accident risk probability</p>
              </div>
              <PredictionForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;