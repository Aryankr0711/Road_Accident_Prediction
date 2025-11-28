import React, { useState } from 'react';
import axios from 'axios';
import { Card, Form, Button, Row, Col, Alert, Spinner } from 'react-bootstrap';

const PredictionForm = () => {
  const [formData, setFormData] = useState({
    road_type: '',
    num_lanes: 2,
    curvature: 0.5,
    speed_limit: 60,
    lighting: '',
    weather: '',
    road_signs_present: '',
    public_road: '',
    time_of_day: '',
    holiday: '',
    school_season: '',
    num_reported_accidents: 0
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNumberChange = (name, delta) => {
    setFormData(prev => ({
      ...prev,
      [name]: Math.max(0, prev[name] + delta)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setPrediction(null);

    try {
      const requestData = {
        ...formData,
        num_lanes: parseInt(formData.num_lanes),
        curvature: parseFloat(formData.curvature),
        speed_limit: parseInt(formData.speed_limit),
        road_signs_present: formData.road_signs_present === 'true' ? 1 : 0,
        public_road: formData.public_road === 'true' ? 1 : 0,
        holiday: formData.holiday === 'true' ? 1 : 0,
        school_season: formData.school_season === 'true' ? 1 : 0,
        num_reported_accidents: parseInt(formData.num_reported_accidents)
      };

      console.log('Sending request data:', requestData);
      
      // Use correct endpoint based on environment
      const apiUrl = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
        ? 'http://localhost:5000/predict' 
        : '/predict';
      console.log('Using API endpoint:', apiUrl);
      
      const response = await axios.post(apiUrl, requestData, {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 15000
      });
      
      console.log('Received response:', response.data);
      
      if (response.data && typeof response.data.accident_risk === 'number') {
        setPrediction(response.data.accident_risk);
      } else {
        throw new Error('Invalid response format from server');
      }
    } catch (err) {
      console.error('Full error details:', err);
      let errorMessage = 'An error occurred while making the prediction';
      
      if (err.response) {
        console.log('Response error:', err.response.status, err.response.data);
        errorMessage = err.response.data?.error || `Server error: ${err.response.status} - Check if backend is running`;
      } else if (err.request) {
        console.log('Request error:', err.request);
        errorMessage = 'Network error: Unable to connect to server - Check backend connection';
      } else {
        console.log('Other error:', err.message);
        errorMessage = err.message || errorMessage;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = () => {
    return Object.values(formData).every(value => value !== '');
  };

  const getRiskLevel = (probability) => {
    if (probability < 0.3) return { level: 'Low Risk', color: '#28a745', bgColor: 'rgba(40, 167, 69, 0.2)' };
    if (probability <= 0.7) return { level: 'Moderate Risk', color: '#ffc107', bgColor: 'rgba(255, 193, 7, 0.2)' };
    return { level: 'High Risk', color: '#dc3545', bgColor: 'rgba(220, 53, 69, 0.2)' };
  };

  const SimpleProgressBar = ({ percentage, color, label }) => (
    <div className="progress-bar-wrapper">
      <div className="progress-header">
        <span className="progress-label">{label}</span>
        <span className="progress-value">{percentage.toFixed(1)}%</span>
      </div>
      <div className="progress-container">
        <div 
          className="progress-fill" 
          style={{ width: `${percentage}%`, backgroundColor: color }}
        ></div>
      </div>
    </div>
  );

  const RiskGaugeWidget = ({ probability }) => {
    const riskLevel = getRiskLevel(probability);
    const percentage = probability * 100;
    
    return (
      <div className="risk-gauge-container">
        <div className="gauge-circle">
          <svg viewBox="0 0 100 100" className="gauge-svg">
            <circle cx="50" cy="50" r="45" className="gauge-background" />
            <circle 
              cx="50" 
              cy="50" 
              r="45" 
              className="gauge-progress"
              style={{
                strokeDasharray: `${(percentage / 100) * 282.6} 282.6`,
                stroke: riskLevel.color
              }}
            />
          </svg>
          <div className="gauge-content">
            <div className="gauge-percentage">{percentage.toFixed(1)}%</div>
            <div className="gauge-label">Risk</div>
          </div>
        </div>
        <div className="gauge-footer">
          <span 
            className="risk-badge"
            style={{ backgroundColor: riskLevel.color }}
          >
            {riskLevel.level}
          </span>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="prediction-form-wrapper">
        {/* Form Section */}
        <Card className="prediction-form-card">
          <Card.Body className="form-body">
            {/* Road Characteristics Section */}
            <div className="form-section">
              <div className="section-header">
                <div className="section-icon road-icon">
                  <i className="fas fa-road"></i>
                </div>
                <div className="section-title-group">
                  <h5 className="section-title">Road Characteristics</h5>
                  <p className="section-subtitle">Define the road infrastructure details</p>
                </div>
              </div>
              
              <Form.Group className="form-group-horizontal">
                <Row>
                  <Col lg={4} md={6} className="form-col">
                    <Form.Group>
                      <Form.Label className="form-label-custom">
                        <i className="fas fa-signs-post"></i> Road Type
                      </Form.Label>
                      <Form.Select
                        name="road_type"
                        value={formData.road_type}
                        onChange={handleInputChange}
                        className="form-select-custom"
                        required
                      >
                        <option value="">Select road type</option>
                        <option value="urban">Urban</option>
                        <option value="rural">Rural</option>
                        <option value="highway">Highway</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  <Col lg={4} md={6} className="form-col">
                    <Form.Group>
                      <Form.Label className="form-label-custom">
                        <i className="fas fa-arrows-alt-h"></i> Number of Lanes
                      </Form.Label>
                      <div className="number-input-group">
                        <Button
                          variant="outline-light"
                          size="sm"
                          onClick={() => handleNumberChange('num_lanes', -1)}
                          disabled={formData.num_lanes <= 1}
                          className="number-btn"
                        >
                          <i className="fas fa-minus"></i>
                        </Button>
                        <span className="number-display">{formData.num_lanes}</span>
                        <Button
                          variant="outline-light"
                          size="sm"
                          onClick={() => handleNumberChange('num_lanes', 1)}
                          className="number-btn"
                        >
                          <i className="fas fa-plus"></i>
                        </Button>
                      </div>
                    </Form.Group>
                  </Col>

                  <Col lg={4} md={6} className="form-col">
                    <Form.Group>
                      <Form.Label className="form-label-custom">
                        <i className="fas fa-curve"></i> Curvature (0-1)
                      </Form.Label>
                      <Form.Control
                        type="number"
                        name="curvature"
                        value={formData.curvature}
                        onChange={handleInputChange}
                        step="0.01"
                        min="0"
                        max="1"
                        className="form-control-custom"
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Form.Group>
            </div>

            {/* Traffic & Speed Section */}
            <div className="form-section">
              <div className="section-header">
                <div className="section-icon traffic-icon">
                  <i className="fas fa-tachometer-alt"></i>
                </div>
                <div className="section-title-group">
                  <h5 className="section-title">Traffic & Speed</h5>
                  <p className="section-subtitle">Set traffic conditions and speed parameters</p>
                </div>
              </div>
              
              <Form.Group className="form-group-horizontal">
                <Row>
                  <Col lg={4} md={6} className="form-col">
                    <Form.Group>
                      <Form.Label className="form-label-custom">
                        <i className="fas fa-gauge-high"></i> Speed Limit (km/h)
                      </Form.Label>
                      <Form.Control
                        type="number"
                        name="speed_limit"
                        value={formData.speed_limit}
                        onChange={handleInputChange}
                        min="1"
                        className="form-control-custom"
                        required
                      />
                    </Form.Group>
                  </Col>

                  <Col lg={4} md={6} className="form-col">
                    <Form.Group>
                      <Form.Label className="form-label-custom">
                        <i className="fas fa-clock"></i> Time of Day
                      </Form.Label>
                      <Form.Select
                        name="time_of_day"
                        value={formData.time_of_day}
                        onChange={handleInputChange}
                        className="form-select-custom"
                        required
                      >
                        <option value="">Select time of day</option>
                        <option value="morning">Morning</option>
                        <option value="afternoon">Afternoon</option>
                        <option value="evening">Evening</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  <Col lg={4} md={6} className="form-col">
                    <Form.Group>
                      <Form.Label className="form-label-custom">
                        <i className="fas fa-car"></i> Reported Accidents
                      </Form.Label>
                      <div className="number-input-group">
                        <Button
                          variant="outline-light"
                          size="sm"
                          onClick={() => handleNumberChange('num_reported_accidents', -1)}
                          disabled={formData.num_reported_accidents <= 0}
                          className="number-btn"
                        >
                          <i className="fas fa-minus"></i>
                        </Button>
                        <span className="number-display">{formData.num_reported_accidents}</span>
                        <Button
                          variant="outline-light"
                          size="sm"
                          onClick={() => handleNumberChange('num_reported_accidents', 1)}
                          className="number-btn"
                        >
                          <i className="fas fa-plus"></i>
                        </Button>
                      </div>
                    </Form.Group>
                  </Col>
                </Row>
              </Form.Group>
            </div>

            {/* Environmental Conditions Section */}
            <div className="form-section">
              <div className="section-header">
                <div className="section-icon weather-icon">
                  <i className="fas fa-cloud-sun"></i>
                </div>
                <div className="section-title-group">
                  <h5 className="section-title">Environmental Conditions</h5>
                  <p className="section-subtitle">Specify weather and lighting conditions</p>
                </div>
              </div>
              
              <Form.Group className="form-group-horizontal">
                <Row>
                  <Col lg={4} md={6} className="form-col">
                    <Form.Group>
                      <Form.Label className="form-label-custom">
                        <i className="fas fa-cloud"></i> Weather
                      </Form.Label>
                      <Form.Select
                        name="weather"
                        value={formData.weather}
                        onChange={handleInputChange}
                        className="form-select-custom"
                        required
                      >
                        <option value="">Select weather condition</option>
                        <option value="clear">Clear</option>
                        <option value="rainy">Rainy</option>
                        <option value="foggy">Foggy</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  <Col lg={4} md={6} className="form-col">
                    <Form.Group>
                      <Form.Label className="form-label-custom">
                        <i className="fas fa-lightbulb"></i> Lighting
                      </Form.Label>
                      <Form.Select
                        name="lighting"
                        value={formData.lighting}
                        onChange={handleInputChange}
                        className="form-select-custom"
                        required
                      >
                        <option value="">Select lighting condition</option>
                        <option value="daylight">Daylight</option>
                        <option value="dim">Dim</option>
                        <option value="night">Night</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  <Col lg={4} md={6} className="form-col">
                    <Form.Group>
                      <Form.Label className="form-label-custom">
                        <i className="fas fa-signs-post"></i> Road Signs
                      </Form.Label>
                      <Form.Select
                        name="road_signs_present"
                        value={formData.road_signs_present}
                        onChange={handleInputChange}
                        className="form-select-custom"
                        required
                      >
                        <option value="">Select option</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
              </Form.Group>
            </div>

            {/* Road Type & Context Section */}
            <div className="form-section">
              <div className="section-header">
                <div className="section-icon context-icon">
                  <i className="fas fa-map"></i>
                </div>
                <div className="section-title-group">
                  <h5 className="section-title">Road Type & Context</h5>
                  <p className="section-subtitle">Additional road and temporal context</p>
                </div>
              </div>
              
              <Form.Group className="form-group-horizontal">
                <Row>
                  <Col lg={3} md={6} className="form-col">
                    <Form.Group>
                      <Form.Label className="form-label-custom">
                        <i className="fas fa-road"></i> Public Road
                      </Form.Label>
                      <Form.Select
                        name="public_road"
                        value={formData.public_road}
                        onChange={handleInputChange}
                        className="form-select-custom"
                        required
                      >
                        <option value="">Select option</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  <Col lg={3} md={6} className="form-col">
                    <Form.Group>
                      <Form.Label className="form-label-custom">
                        <i className="fas fa-calendar-days"></i> Holiday
                      </Form.Label>
                      <Form.Select
                        name="holiday"
                        value={formData.holiday}
                        onChange={handleInputChange}
                        className="form-select-custom"
                        required
                      >
                        <option value="">Select option</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  <Col lg={3} md={6} className="form-col">
                    <Form.Group>
                      <Form.Label className="form-label-custom">
                        <i className="fas fa-graduation-cap"></i> School Season
                      </Form.Label>
                      <Form.Select
                        name="school_season"
                        value={formData.school_season}
                        onChange={handleInputChange}
                        className="form-select-custom"
                        required
                      >
                        <option value="">Select option</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  <Col lg={3} md={6} className="form-col">
                    <Form.Group>
                      <Form.Label className="form-label-custom" style={{visibility: 'hidden'}}>
                        Submit
                      </Form.Label>
                      <Button
                        type="submit"
                        className="btn-submit-form"
                        disabled={!isFormValid() || loading}
                        onClick={handleSubmit}
                      >
                        {loading ? (
                          <>
                            <Spinner animation="border" size="sm" className="me-2" />
                            Analyzing...
                          </>
                        ) : (
                          <>
                            <i className="fas fa-bolt"></i> Predict Risk
                          </>
                        )}
                      </Button>
                    </Form.Group>
                  </Col>
                </Row>
              </Form.Group>
            </div>
          </Card.Body>
        </Card>

        {/* Error Alert */}
        {error && (
          <Alert variant="danger" className="error-alert">
            <i className="fas fa-exclamation-circle"></i> {error}
          </Alert>
        )}

        {/* Results Section */}
        {prediction !== null && (
          <div className="results-section">
            {/* Row 1: Risk Assessment and Detailed Breakdown */}
            <Row className="g-3 mb-3">
              <Col xs={12} md={6}>
                <Card className="result-card primary-result h-100">
                  <Card.Body className="result-card-body">
                    <div className="result-header">
                      <h4 className="result-title">Risk Assessment</h4>
                      <p className="result-subtitle">AI-powered prediction</p>
                    </div>
                    <RiskGaugeWidget probability={prediction} />
                  </Card.Body>
                </Card>
              </Col>
              <Col xs={12} md={6}>
                <Card className="result-card secondary-result h-100">
                  <Card.Body className="result-card-body">
                    <div className="result-header">
                      <h4 className="result-title">Detailed Breakdown</h4>
                      <p className="result-subtitle">Visual risk metrics</p>
                    </div>
                    <div className="breakdown-content">
                      <SimpleProgressBar 
                        percentage={prediction * 100} 
                        color={getRiskLevel(prediction).color} 
                        label="Accident Risk" 
                      />
                      <SimpleProgressBar 
                        percentage={(1 - prediction) * 100} 
                        color="#28a745" 
                        label="Safety Level" 
                      />
                      <SimpleProgressBar 
                        percentage={Math.min(100, (formData.speed_limit / 120) * 100)} 
                        color="#17a2b8" 
                        label="Speed Factor" 
                      />
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            {/* Row 2: All Insight Cards in Single Row */}
            <Row className="g-3">
              <Col xs={6} sm={3}>
                <Card className="insight-card safety-score h-100">
                  <Card.Body className="insight-body text-center">
                    <div className="insight-icon">
                      <i className="fas fa-shield-alt"></i>
                    </div>
                    <div className="insight-content">
                      <div className="insight-value">{(100 - prediction * 100).toFixed(1)}%</div>
                      <div className="insight-label">Safety Score</div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col xs={6} sm={3}>
                <Card className="insight-card risk-level h-100">
                  <Card.Body className="insight-body text-center">
                    <div className="insight-icon">
                      <i className="fas fa-exclamation-triangle"></i>
                    </div>
                    <div className="insight-content">
                      <div className="insight-value">{getRiskLevel(prediction).level.split(' ')[0]}</div>
                      <div className="insight-label">Risk Level</div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col xs={6} sm={3}>
                <Card className="insight-card road-type h-100">
                  <Card.Body className="insight-body text-center">
                    <div className="insight-icon">
                      <i className="fas fa-road"></i>
                    </div>
                    <div className="insight-content">
                      <div className="insight-value text-uppercase">{formData.road_type.slice(0, 3)}</div>
                      <div className="insight-label">Road Type</div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col xs={6} sm={3}>
                <Card className="insight-card speed-info h-100">
                  <Card.Body className="insight-body text-center">
                    <div className="insight-icon">
                      <i className="fas fa-tachometer-alt"></i>
                    </div>
                    <div className="insight-content">
                      <div className="insight-value">{formData.speed_limit}</div>
                      <div className="insight-label">Speed (km/h)</div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            {/* Conditions Summary */}
            <Card className="conditions-card">
              <Card.Body className="conditions-body">
                <h5 className="conditions-title">
                  <i className="fas fa-list-check"></i> Current Conditions Summary
                </h5>
                <div className="conditions-grid">
                  <div className="condition-badge">
                    <span className="badge-icon">🌤️</span>
                    <span className="badge-text">{formData.weather.charAt(0).toUpperCase() + formData.weather.slice(1)}</span>
                  </div>
                  <div className="condition-badge">
                    <span className="badge-icon">💡</span>
                    <span className="badge-text">{formData.lighting.charAt(0).toUpperCase() + formData.lighting.slice(1)}</span>
                  </div>
                  <div className="condition-badge">
                    <span className="badge-icon">🕐</span>
                    <span className="badge-text">{formData.time_of_day.charAt(0).toUpperCase() + formData.time_of_day.slice(1)}</span>
                  </div>
                  <div className="condition-badge">
                    <span className="badge-icon">🛣️</span>
                    <span className="badge-text">{formData.num_lanes} Lanes</span>
                  </div>
                  {formData.holiday === 'true' && (
                    <div className="condition-badge holiday-badge">
                      <span className="badge-icon">📅</span>
                      <span className="badge-text">Holiday Period</span>
                    </div>
                  )}
                  {formData.school_season === 'true' && (
                    <div className="condition-badge school-badge">
                      <span className="badge-icon">🎓</span>
                      <span className="badge-text">School Season</span>
                    </div>
                  )}
                </div>
              </Card.Body>
            </Card>

            {/* Safety Recommendations */}
            <Card className="recommendations-card">
              <Card.Body className="recommendations-body">
                <h5 className="recommendations-title">
                  <i className="fas fa-lightbulb"></i> Safety Recommendations
                </h5>
                <div className="recommendations-content">
                  {prediction < 0.3 && (
                    <div className="recommendation low-risk">
                      <i className="fas fa-check-circle"></i>
                      <span>Your route appears safe. Maintain standard safety protocols and continue to monitor conditions.</span>
                    </div>
                  )}
                  {prediction >= 0.3 && prediction <= 0.7 && (
                    <div className="recommendation moderate-risk">
                      <i className="fas fa-info-circle"></i>
                      <span>Exercise caution on this route. Be vigilant and adjust driving according to observed conditions.</span>
                    </div>
                  )}
                  {prediction > 0.7 && (
                    <div className="recommendation high-risk">
                      <i className="fas fa-exclamation-circle"></i>
                      <span>High accident risk detected. Consider alternative routes or reconsider travel plans if possible.</span>
                    </div>
                  )}
                  
                  {formData.speed_limit > 80 && (
                    <div className="recommendation warning">
                      <i className="fas fa-exclamation-triangle"></i>
                      <span>High speed limits detected. Reduce speed and increase following distance to other vehicles.</span>
                    </div>
                  )}
                  
                  {formData.weather === 'foggy' && (
                    <div className="recommendation warning">
                      <i className="fas fa-exclamation-triangle"></i>
                      <span>Foggy conditions reduce visibility. Use headlights and reduce speed for better control.</span>
                    </div>
                  )}
                  
                  {formData.lighting === 'night' && (
                    <div className="recommendation warning">
                      <i className="fas fa-exclamation-triangle"></i>
                      <span>Night driving detected. Ensure proper lighting and take regular breaks to avoid fatigue.</span>
                    </div>
                  )}
                  
                  {formData.road_signs_present === 'false' && (
                    <div className="recommendation warning">
                      <i className="fas fa-exclamation-triangle"></i>
                      <span>Limited road signage. Extra caution is advised. Stay alert for potential hazards.</span>
                    </div>
                  )}
                </div>
              </Card.Body>
            </Card>
          </div>
        )}
      </div>
    </>
  );
};

export default PredictionForm;
