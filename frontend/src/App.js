import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import PredictionForm from './components/PredictionForm';

function App() {
  return (
    <div className="App">
      <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-gradient">
        {/* Floating Emojis */}
        <div className="emoji-decoration">🚦</div>
        <div className="emoji-decoration">🚗</div>
        <div className="emoji-decoration">🛣️</div>
        <div className="emoji-decoration">🚙</div>
        <div className="emoji-decoration">⚠️</div>
        <div className="emoji-decoration">🚧</div>
        
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="text-center mb-5">
                {/* Traffic Icons */}
                <div className="traffic-icons">
                  <span className="traffic-icon">🚦</span>
                  <span className="traffic-icon">🛣️</span>
                  <span className="traffic-icon">🚗</span>
                  <span className="traffic-icon">⚠️</span>
                </div>
                
                <h1 className="display-4 fw-bold text-black mb-3">
                  Road Accident Risk Assessment
                </h1>
                <p className="lead text-white-75 mb-4">
                  🔍 Analyze road conditions to predict accident risk probability 📊
                </p>
                <div className="d-flex justify-content-center gap-3 mb-4">
                  <span className="badge bg-primary px-3 py-2">🚦 Smart Analysis</span>
                  <span className="badge bg-success px-3 py-2">📈 Real-time Prediction</span>
                  <span className="badge bg-warning px-3 py-2">🛡️ Safety First</span>
                </div>
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