import React, { useState } from 'react';
import axios from 'axios';
import { Card, Form, Button, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { Doughnut, Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  LineElement,
  PointElement,
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  LineElement,
  PointElement
);

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
      // Convert string values to appropriate types
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
      const response = await axios.post('http://localhost:5000/predict', requestData);
      console.log('Received response:', response.data);
      setPrediction(response.data.accident_risk);
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred while making the prediction');
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = () => {
    return Object.values(formData).every(value => value !== '');
  };

  const getRiskLevel = (probability) => {
    if (probability < 0.3) return { level: 'Low Risk', color: '#28a745' };
    if (probability <= 0.7) return { level: 'Moderate Risk', color: '#ffc107' };
    return { level: 'High Risk', color: '#dc3545' };
  };

  const getDoughnutData = (probability) => {
    const riskProb = probability;
    const safeProb = 1 - probability;
    const riskLevel = getRiskLevel(probability);

    return {
      labels: ['Risk Probability', 'Safe Probability'],
      datasets: [{
        data: [riskProb, safeProb],
        backgroundColor: [riskLevel.color, '#6c757d'],
        borderColor: ['#ffffff', '#ffffff'],
        borderWidth: 2,
      }],
    };
  };

  const getBarData = (probability) => {
    const riskLevel = getRiskLevel(probability);
    const levels = ['Low Risk', 'Moderate Risk', 'High Risk'];
    const colors = ['#28a745', '#ffc107', '#dc3545'];

    const currentIndex = levels.indexOf(riskLevel.level);
    const values = levels.map((level, index) =>
      index <= currentIndex ? (index === currentIndex ? probability * 100 : (index === 0 ? 30 : index === 1 ? 70 : 100)) : 0
    );

    return {
      labels: levels,
      datasets: [{
        label: 'Risk Level (%)',
        data: values,
        backgroundColor: colors.map((color, index) =>
          index === currentIndex ? color : 'rgba(108, 117, 125, 0.3)'
        ),
        borderColor: colors,
        borderWidth: 1,
      }],
    };
  };

  const getLineData = (probability) => {
    const timeLabels = ['6 AM', '9 AM', '12 PM', '3 PM', '6 PM', '9 PM', '12 AM'];
    const baseRisk = probability * 100;
    const riskVariations = [
      baseRisk * 0.7,  // 6 AM - Lower risk
      baseRisk * 1.2,  // 9 AM - Higher risk (rush hour)
      baseRisk * 0.9,  // 12 PM - Moderate risk
      baseRisk * 0.8,  // 3 PM - Lower risk
      baseRisk * 1.3,  // 6 PM - Highest risk (evening rush)
      baseRisk * 1.1,  // 9 PM - Moderate-high risk
      baseRisk * 0.6   // 12 AM - Lowest risk
    ];

    return {
      labels: timeLabels,
      datasets: [{
        label: 'Risk Probability (%)',
        data: riskVariations,
        borderColor: '#ff6b35',
        backgroundColor: 'rgba(255, 107, 53, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#ff6b35',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 6,
      }],
    };
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: 'white',
          font: { size: 14 }
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.label}: ${(context.parsed * 100).toFixed(2)}%`;
          }
        }
      }
    },
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          color: 'white',
          callback: function(value) {
            return value + '%';
          }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      },
      x: {
        ticks: {
          color: 'white'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.parsed.y}%`;
          }
        }
      }
    },
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: 'white',
          callback: function(value) {
            return value.toFixed(1) + '%';
          }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      },
      x: {
        ticks: {
          color: 'white'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      }
    },
    plugins: {
      legend: {
        labels: {
          color: 'white'
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.parsed.y.toFixed(2)}%`;
          }
        }
      }
    },
  };

  return (
    <>
      <Card className="shadow-lg border-0 rounded-4">
        <Card.Body className="p-4">
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group>
                  <Form.Label className="fw-semibold">
                    🛣️ Road Type
                  </Form.Label>
                  <Form.Select
                    name="road_type"
                    value={formData.road_type}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select road type</option>
                    <option value="urban">Urban</option>
                    <option value="rural">Rural</option>
                    <option value="highway">Highway</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={6} className="mb-3">
                <Form.Group>
                  <Form.Label className="fw-semibold">
                    🛣️ Number of Lanes
                  </Form.Label>
                  <div className="d-flex align-items-center">
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => handleNumberChange('num_lanes', -1)}
                      disabled={formData.num_lanes <= 1}
                    >
                      <i className="fas fa-minus"></i>
                    </Button>
                    <Form.Control
                      type="number"
                      name="num_lanes"
                      value={formData.num_lanes}
                      onChange={handleInputChange}
                      className="text-center mx-2"
                      min="1"
                      required
                      readOnly
                    />
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => handleNumberChange('num_lanes', 1)}
                    >
                      <i className="fas fa-plus"></i>
                    </Button>
                  </div>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6} className="mb-3">
                <Form.Group>
                  <Form.Label className="fw-semibold">
                    🌀 Curvature (0-1)
                  </Form.Label>
                  <Form.Control
                    type="number"
                    name="curvature"
                    value={formData.curvature}
                    onChange={handleInputChange}
                    step="0.01"
                    min="0"
                    max="1"
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={6} className="mb-3">
                <Form.Group>
                  <Form.Label className="fw-semibold">
                    🏁 Speed Limit (km/h)
                  </Form.Label>
                  <Form.Control
                    type="number"
                    name="speed_limit"
                    value={formData.speed_limit}
                    onChange={handleInputChange}
                    min="1"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6} className="mb-3">
                <Form.Group>
                  <Form.Label className="fw-semibold">
                    💡 Lighting
                  </Form.Label>
                  <Form.Select
                    name="lighting"
                    value={formData.lighting}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select lighting condition</option>
                    <option value="daylight">Daylight</option>
                    <option value="dim">Dim</option>
                    <option value="night">Night</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={6} className="mb-3">
                <Form.Group>
                  <Form.Label className="fw-semibold">
                    ☁️ Weather
                  </Form.Label>
                  <Form.Select
                    name="weather"
                    value={formData.weather}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select weather condition</option>
                    <option value="clear">Clear</option>
                    <option value="rainy">Rainy</option>
                    <option value="foggy">Foggy</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6} className="mb-3">
                <Form.Group>
                  <Form.Label className="fw-semibold">
                    🚦 Road Signs Present
                  </Form.Label>
                  <Form.Select
                    name="road_signs_present"
                    value={formData.road_signs_present}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select option</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={6} className="mb-3">
                <Form.Group>
                  <Form.Label className="fw-semibold">
                    🏢 Public Road
                  </Form.Label>
                  <Form.Select
                    name="public_road"
                    value={formData.public_road}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select option</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6} className="mb-3">
                <Form.Group>
                  <Form.Label className="fw-semibold">
                    🕰️ Time of Day
                  </Form.Label>
                  <Form.Select
                    name="time_of_day"
                    value={formData.time_of_day}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select time of day</option>
                    <option value="morning">Morning</option>
                    <option value="afternoon">Afternoon</option>
                    <option value="evening">Evening</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={6} className="mb-3">
                <Form.Group>
                  <Form.Label className="fw-semibold">
                    ⚠️ Number of Reported Accidents
                  </Form.Label>
                  <Form.Control
                    type="number"
                    name="num_reported_accidents"
                    value={formData.num_reported_accidents}
                    onChange={handleInputChange}
                    min="0"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6} className="mb-3">
                <Form.Group>
                  <Form.Label className="fw-semibold">
                    🎆 Holiday
                  </Form.Label>
                  <Form.Select
                    name="holiday"
                    value={formData.holiday}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select option</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={6} className="mb-3">
                <Form.Group>
                  <Form.Label className="fw-semibold">
                    🏫 School Season
                  </Form.Label>
                  <Form.Select
                    name="school_season"
                    value={formData.school_season}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select option</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <div className="text-center mt-4">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={!isFormValid() || loading}
                className="px-5 py-3 fw-semibold"
              >
                {loading ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" />
                    🔄 Calculating Risk...
                  </>
                ) : (
                  <>
                    📊 Calculate Risk Assessment 🛡️
                  </>
                )}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>

      {error && (
        <Alert variant="danger" className="mt-4 rounded-4">
          ⚠️ {error}
        </Alert>
      )}

      {prediction !== null && (
        <div className="mt-4">
          <Card className="border-0 rounded-4 prediction-result">
            <Card.Body className="text-center p-4">
              <div className="mb-3">
                <div className="fs-1 mb-3">⚠️🚦⚠️</div>
                <h4 className="fw-bold text-white">🛡️ Road Accident Risk Assessment 🛡️</h4>
              </div>
              <div className="display-4 fw-bold text-white mb-2">
                {(prediction * 100).toFixed(2)}%
              </div>
              <p className="text-white-50 mb-3">📊 Probability of Road Accident 📊</p>
              <div className="mb-3">
                <span className="badge fs-6 px-3 py-2" style={{
                  backgroundColor: getRiskLevel(prediction).color,
                  color: 'white'
                }}>
                  {getRiskLevel(prediction).level === 'Low Risk' ? '🟢' : 
                   getRiskLevel(prediction).level === 'Moderate Risk' ? '🟡' : '🔴'} {getRiskLevel(prediction).level}
                </span>
              </div>
            </Card.Body>
          </Card>

          {/* Enhanced Dashboard */}
          <Row className="mt-4">
            <Col lg={4} md={6} className="mb-4">
              <Card className="border-0 rounded-4" style={{ background: 'rgba(30, 30, 30, 0.95)' }}>
                <Card.Body className="p-3">
                  <h5 className="text-white text-center mb-3">📊 Risk Distribution</h5>
                  <div style={{ height: '250px' }}>
                    <Doughnut data={getDoughnutData(prediction)} options={doughnutOptions} />
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={4} md={6} className="mb-4">
              <Card className="border-0 rounded-4" style={{ background: 'rgba(30, 30, 30, 0.95)' }}>
                <Card.Body className="p-3">
                  <h5 className="text-white text-center mb-3">📈 Risk Level Indicator</h5>
                  <div style={{ height: '250px' }}>
                    <Bar data={getBarData(prediction)} options={barOptions} />
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={4} md={12} className="mb-4">
              <Card className="border-0 rounded-4" style={{ background: 'rgba(30, 30, 30, 0.95)' }}>
                <Card.Body className="p-3">
                  <h5 className="text-white text-center mb-3">🕰️ Hourly Risk Trend</h5>
                  <div style={{ height: '250px' }}>
                    <Line data={getLineData(prediction)} options={lineOptions} />
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Additional Statistics Dashboard */}
          <Row className="mt-3">
            <Col md={12}>
              <Card className="border-0 rounded-4" style={{ background: 'rgba(30, 30, 30, 0.95)' }}>
                <Card.Body className="p-4">
                  <h5 className="text-white text-center mb-4">📊 Road Safety Analytics Dashboard</h5>
                  <Row>
                    <Col md={3} className="text-center mb-3">
                      <div className="p-3 rounded" style={{ background: 'rgba(40, 167, 69, 0.2)' }}>
                        <div className="fs-2 mb-2">🛡️</div>
                        <h6 className="text-white">Safety Score</h6>
                        <div className="fs-4 fw-bold text-success">
                          {(100 - prediction * 100).toFixed(1)}%
                        </div>
                      </div>
                    </Col>
                    <Col md={3} className="text-center mb-3">
                      <div className="p-3 rounded" style={{ background: 'rgba(255, 193, 7, 0.2)' }}>
                        <div className="fs-2 mb-2">⚠️</div>
                        <h6 className="text-white">Risk Level</h6>
                        <div className="fs-4 fw-bold text-warning">
                          {getRiskLevel(prediction).level.split(' ')[0]}
                        </div>
                      </div>
                    </Col>
                    <Col md={3} className="text-center mb-3">
                      <div className="p-3 rounded" style={{ background: 'rgba(23, 162, 184, 0.2)' }}>
                        <div className="fs-2 mb-2">🚦</div>
                        <h6 className="text-white">Road Type</h6>
                        <div className="fs-6 fw-bold text-info text-capitalize">
                          {formData.road_type} 🛣️
                        </div>
                      </div>
                    </Col>
                    <Col md={3} className="text-center mb-3">
                      <div className="p-3 rounded" style={{ background: 'rgba(220, 53, 69, 0.2)' }}>
                        <div className="fs-2 mb-2">🏁</div>
                        <h6 className="text-white">Speed Limit</h6>
                        <div className="fs-4 fw-bold text-danger">
                          {formData.speed_limit} km/h
                        </div>
                      </div>
                    </Col>
                  </Row>
                  
                  <Row className="mt-3">
                    <Col md={12}>
                      <div className="text-center p-3 rounded" style={{ background: 'rgba(108, 117, 125, 0.2)' }}>
                        <h6 className="text-white mb-3">📊 Current Conditions Summary</h6>
                        <div className="d-flex justify-content-center flex-wrap gap-3">
                          <span className="badge bg-secondary px-3 py-2">
                            ☁️ {formData.weather.charAt(0).toUpperCase() + formData.weather.slice(1)}
                          </span>
                          <span className="badge bg-secondary px-3 py-2">
                            💡 {formData.lighting.charAt(0).toUpperCase() + formData.lighting.slice(1)}
                          </span>
                          <span className="badge bg-secondary px-3 py-2">
                            🕰️ {formData.time_of_day.charAt(0).toUpperCase() + formData.time_of_day.slice(1)}
                          </span>
                          <span className="badge bg-secondary px-3 py-2">
                            🛣️ {formData.num_lanes} Lanes
                          </span>
                          {formData.holiday === 'true' && (
                            <span className="badge bg-warning px-3 py-2">
                              🎆 Holiday
                            </span>
                          )}
                          {formData.school_season === 'true' && (
                            <span className="badge bg-info px-3 py-2">
                              🏫 School Season
                            </span>
                          )}
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};

export default PredictionForm;