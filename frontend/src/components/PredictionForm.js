import React, { useState } from 'react';
import axios from 'axios';
import { Card, Form, Button, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
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

  return (
    <>
      <Card className="shadow-lg border-0 rounded-4">
        <Card.Body className="p-4">
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group>
                  <Form.Label className="fw-semibold">
                    <i className="fas fa-road me-2"></i>Road Type
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
                    <i className="fas fa-arrows-alt-h me-2"></i>Number of Lanes
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
                    <i className="fas fa-wave-square me-2"></i>Curvature (0-1)
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
                    <i className="fas fa-tachometer-alt me-2"></i>Speed Limit (km/h)
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
                    <i className="fas fa-lightbulb me-2"></i>Lighting
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
                    <i className="fas fa-cloud-rain me-2"></i>Weather
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
                    <i className="fas fa-sign me-2"></i>Road Signs Present
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
                    <i className="fas fa-users me-2"></i>Public Road
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
                    <i className="fas fa-clock me-2"></i>Time of Day
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
                    <i className="fas fa-exclamation-triangle me-2"></i>Number of Reported Accidents
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
                    <i className="fas fa-calendar-alt me-2"></i>Holiday
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
                    <i className="fas fa-school me-2"></i>School Season
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
                    Calculating Risk...
                  </>
                ) : (
                  <>
                    <i className="fas fa-calculator me-2"></i>Calculate Risk
                  </>
                )}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>

      {error && (
        <Alert variant="danger" className="mt-4 rounded-4">
          <i className="fas fa-exclamation-triangle me-2"></i>
          {error}
        </Alert>
      )}

      {prediction !== null && (
        <div className="mt-4">
          <Card className="border-0 rounded-4 prediction-result">
            <Card.Body className="text-center p-4">
              <div className="mb-3">
                <i className="fas fa-exclamation-triangle fa-2x text-white mb-3"></i>
                <h4 className="fw-bold text-white">Road Accident Risk Assessment</h4>
              </div>
              <div className="display-4 fw-bold text-white mb-2">
                {(prediction * 100).toFixed(2)}%
              </div>
              <p className="text-white-50 mb-3">Probability of Road Accident</p>
              <div className="mb-3">
                <span className="badge fs-6 px-3 py-2" style={{
                  backgroundColor: getRiskLevel(prediction).color,
                  color: 'white'
                }}>
                  {getRiskLevel(prediction).level} Risk
                </span>
              </div>
            </Card.Body>
          </Card>

          <Row className="mt-4">
            <Col md={6} className="mb-4">
              <Card className="border-0 rounded-4" style={{ background: 'rgba(30, 30, 30, 0.95)' }}>
                <Card.Body className="p-3">
                  <h5 className="text-white text-center mb-3">Risk Distribution</h5>
                  <div style={{ height: '250px' }}>
                    <Doughnut data={getDoughnutData(prediction)} options={doughnutOptions} />
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} className="mb-4">
              <Card className="border-0 rounded-4" style={{ background: 'rgba(30, 30, 30, 0.95)' }}>
                <Card.Body className="p-3">
                  <h5 className="text-white text-center mb-3">Risk Level Indicator</h5>
                  <div style={{ height: '250px' }}>
                    <Bar data={getBarData(prediction)} options={barOptions} />
                  </div>
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