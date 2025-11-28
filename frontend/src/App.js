import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import PredictionForm from './components/PredictionForm';
import NewsArticles from './components/NewsArticles';
import { Nav, Tab } from 'react-bootstrap';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, Sector } from 'recharts';

function App() {
  const [activeTab, setActiveTab] = useState('home');

  const accidentsData = [
    { name: 'National Highways', value: 31.2 },
    { name: 'State Highways', value: 22 },
    { name: 'Other roads', value: 46.8 }
  ];

  const killedData = [
    { name: 'National Highways', value: 36.5 },
    { name: 'State Highways', value: 22.8 },
    { name: 'Other roads', value: 40.7 }
  ];

  const injuredData = [
    { name: 'National Highways', value: 30.9 },
    { name: 'State Highways', value: 23.1 },
    { name: 'Other roads', value: 46 }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const accidentTrends = [
    { year: '2019', fatal: 145332, grievous: 151335, minor: 131555, non: 28737, total: 456959 },
    { year: '2020', fatal: 127307, grievous: 112768, minor: 110314, non: 21792, total: 372181 },
    { year: '2021', fatal: 142163, grievous: 126394, minor: 119633, non: 24242, total: 412432 },
    { year: '2022', fatal: 155781, grievous: 143374, minor: 135360, non: 26797, total: 461312 },
    { year: '2023', fatal: 160509, grievous: 158576, minor: 133848, non: 27650, total: 480583 }
  ];

  const shareData = {
    2019: [
      { name: 'Fatal Accidents', value: 31.8 },
      { name: 'Grievous Injury', value: 33.1 },
      { name: 'Minor Injury', value: 28.8 },
      { name: 'Non-Injury', value: 6.3 }
    ],
    2020: [
      { name: 'Fatal Accidents', value: 34.2 },
      { name: 'Grievous Injury', value: 30.3 },
      { name: 'Minor Injury', value: 29.6 },
      { name: 'Non-Injury', value: 5.9 }
    ],
    2021: [
      { name: 'Fatal Accidents', value: 34.5 },
      { name: 'Grievous Injury', value: 30.6 },
      { name: 'Minor Injury', value: 29 },
      { name: 'Non-Injury', value: 5.9 }
    ],
    2022: [
      { name: 'Fatal Accidents', value: 33.8 },
      { name: 'Grievous Injury', value: 31.1 },
      { name: 'Minor Injury', value: 29 },
      { name: 'Non-Injury', value: 5.8 }
    ],
    2023: [
      { name: 'Fatal Accidents', value: 33.4 },
      { name: 'Grievous Injury', value: 33 },
      { name: 'Minor Injury', value: 27.9 },
      { name: 'Non-Injury', value: 5.8 }
    ]
  };

  const changeData = [
    { year: '2019', fatal: 1.11, grievous: 0.7, minor: -7, non: -17.6, total: -2.9 },
    { year: '2020', fatal: -12.4, grievous: -25.5, minor: -16.1, non: -24.2, total: -18.6 },
    { year: '2021', fatal: 11.7, grievous: 12.1, minor: 8.4, non: 11.2, total: 10.8 },
    { year: '2022', fatal: 9.6, grievous: 13.4, minor: 13.1, non: 10.5, total: 11.9 },
    { year: '2023', fatal: 3, grievous: 10.6, minor: -1.1, non: 3.2, total: 4.2 }
  ];

  return (
    <div className="App">
      <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
        {/* Navigation Bar */}
        <nav className="navbar-container">
          <div className="container">
            <div className="navbar-inner">
              <Nav variant="pills" className="navbar-tabs">
                <Nav.Item>
                  <Nav.Link eventKey="home" className="navbar-link">
                    Home
                    
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="prediction" className="navbar-link">
                    Prediction
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="eda" className="navbar-link">
                    Analytics
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </div>
          </div>
        </nav>

        <Tab.Content>
          <Tab.Pane eventKey="home">
            {/* Hero Section */}
            <section className="hero-section">
              <div className="hero-background"></div>
              <div className="hero-overlay"></div>
              
              <div className="hero-content">
                <div className="container">
                  <div className="row align-items-center g-4">
                    <div className="col-lg-6">
                      <div className="hero-text">
                        <h1 className="hero-title">
                          The Critical Need for Road Accident Prediction
                        </h1>
                        <p className="hero-subtitle">
                          Road accidents represent one of the most pressing global challenges, claiming lives and impacting economies worldwide. Our AI-powered prediction system leverages advanced machine learning to analyze risk factors including weather conditions, road types, traffic patterns, and environmental data.
                        </p>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="stats-container">
                        <div className="glass-card stat-item">
                          <div className="stat-icon stat-icon-deaths">
                            <i className="fas fa-users"></i>
                          </div>
                          <div className="stat-info">
                            <h5 className="stat-number">1.19M</h5>
                            <p className="stat-label">Deaths Annually</p>
                          </div>
                        </div>
                        <div className="glass-card stat-item">
                          <div className="stat-icon stat-icon-economy">
                            <i className="fas fa-chart-line"></i>
                          </div>
                          <div className="stat-info">
                            <h5 className="stat-number">3%</h5>
                            <p className="stat-label">Global GDP Impact</p>
                          </div>
                        </div>
                        <div className="glass-card stat-item">
                          <div className="stat-icon stat-icon-safety">
                            <i className="fas fa-shield-alt"></i>
                          </div>
                          <div className="stat-info">
                            <h5 className="stat-number">AI</h5>
                            <p className="stat-label">Prevention Focus</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Content Section */}
            <div className="content-section">
              <div className="container py-5">
                <div className="row justify-content-center mb-5">
                  <div className="col-lg-10">
                        {/* News Articles Section */}
                        <NewsArticles />

                    {/* Graphs Section */}
                    <h3 className="section-title mt-5">
                      Categories of Road Accidents, Fatalities and Injuries during 2023 (in percent)
                    </h3>
                    <div className="row text-center">
                      <div className="col-md-4 mb-4">
                        <div className="card professional-card h-100">
                          <div className="card-body p-3">
                            <h5 className="text-white fw-semibold mb-3">Accidents Distribution</h5>
                            <ResponsiveContainer width="100%" height={300}>
                              <PieChart>
                                <Pie
                                  data={accidentsData}
                                  dataKey="value"
                                  nameKey="name"
                                  cx="50%"
                                  cy="50%"
                                  outerRadius={80}
                                  fill="#8884d8"
                                  label={({ value }) => `${value}%`}
                                  activeShape={(props) => {
                                    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload } = props;
                                    return (
                                      <g>
                                        <Sector
                                          cx={cx}
                                          cy={cy}
                                          innerRadius={innerRadius}
                                          outerRadius={outerRadius + 10}
                                          startAngle={startAngle}
                                          endAngle={endAngle}
                                          fill={fill}
                                        />
                                        <text x={cx} y={cy - 10} textAnchor="middle" fill="#fff" fontSize="14" fontWeight="bold">
                                          {payload.name}
                                        </text>
                                        <text x={cx} y={cy + 10} textAnchor="middle" fill="#fff" fontSize="12">
                                          {`${payload.value}%`}
                                        </text>
                                      </g>
                                    );
                                  }}
                                >
                                  {accidentsData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                  ))}
                                </Pie>
                                <Legend />
                              </PieChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 mb-4">
                        <div className="card professional-card h-100">
                          <div className="card-body p-3">
                            <h5 className="text-white fw-semibold mb-3">Fatalities Distribution</h5>
                            <ResponsiveContainer width="100%" height={300}>
                              <PieChart>
                                <Pie
                                  data={killedData}
                                  dataKey="value"
                                  nameKey="name"
                                  cx="50%"
                                  cy="50%"
                                  outerRadius={80}
                                  fill="#8884d8"
                                  label={({ value }) => `${value}%`}
                                  activeShape={(props) => {
                                    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload } = props;
                                    return (
                                      <g>
                                        <Sector
                                          cx={cx}
                                          cy={cy}
                                          innerRadius={innerRadius}
                                          outerRadius={outerRadius + 10}
                                          startAngle={startAngle}
                                          endAngle={endAngle}
                                          fill={fill}
                                        />
                                        <text x={cx} y={cy - 10} textAnchor="middle" fill="#fff" fontSize="14" fontWeight="bold">
                                          {payload.name}
                                        </text>
                                        <text x={cx} y={cy + 10} textAnchor="middle" fill="#fff" fontSize="12">
                                          {`${payload.value}%`}
                                        </text>
                                      </g>
                                    );
                                  }}
                                >
                                  {killedData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                  ))}
                                </Pie>
                                <Legend />
                              </PieChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 mb-4">
                        <div className="card professional-card h-100">
                          <div className="card-body p-3">
                            <h5 className="text-white fw-semibold mb-3">Injuries Distribution</h5>
                            <ResponsiveContainer width="100%" height={300}>
                              <PieChart>
                                <Pie
                                  data={injuredData}
                                  dataKey="value"
                                  nameKey="name"
                                  cx="50%"
                                  cy="50%"
                                  outerRadius={80}
                                  fill="#8884d8"
                                  label={({ value }) => `${value}%`}
                                  activeShape={(props) => {
                                    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload } = props;
                                    return (
                                      <g>
                                        <Sector
                                          cx={cx}
                                          cy={cy}
                                          innerRadius={innerRadius}
                                          outerRadius={outerRadius + 10}
                                          startAngle={startAngle}
                                          endAngle={endAngle}
                                          fill={fill}
                                        />
                                        <text x={cx} y={cy - 10} textAnchor="middle" fill="#fff" fontSize="14" fontWeight="bold">
                                          {payload.name}
                                        </text>
                                        <text x={cx} y={cy + 10} textAnchor="middle" fill="#fff" fontSize="12">
                                          {`${payload.value}%`}
                                        </text>
                                      </g>
                                    );
                                  }}
                                >
                                  {injuredData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                  ))}
                                </Pie>
                                <Legend />
                              </PieChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-white-50 text-center mt-3">
                      Source: Ministry of Road Transport and Highways India
                    </p>

                    {/* Trend Analysis Graphs */}
                    <h3 className="section-title mt-5">
                      Road Accident Trends: 2019-2023
                    </h3>

                    {/* Accident Numbers Trend */}
                    <div className="row mb-4">
                      <div className="col-12">
                        <div className="card professional-card">
                          <div className="card-body p-4">
                            <h5 className="text-white fw-semibold mb-4">Accident Numbers by Category (2019-2023)</h5>
                            <ResponsiveContainer width="100%" height={400}>
                              <LineChart data={accidentTrends}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                                <XAxis dataKey="year" stroke="#fff" />
                                <YAxis stroke="#fff" />
                                <Tooltip
                                  contentStyle={{
                                    backgroundColor: '#333',
                                    borderColor: '#555',
                                    color: '#fff'
                                  }}
                                />
                                <Legend />
                                <Line type="monotone" dataKey="fatal" stroke="#0088FE" strokeWidth={2} name="Fatal Accidents" />
                                <Line type="monotone" dataKey="grievous" stroke="#00C49F" strokeWidth={2} name="Grievous Injury" />
                                <Line type="monotone" dataKey="minor" stroke="#FFBB28" strokeWidth={2} name="Minor Injury" />
                                <Line type="monotone" dataKey="non" stroke="#FF8042" strokeWidth={2} name="Non-Injury" />
                                <Line type="monotone" dataKey="total" stroke="#8884d8" strokeWidth={3} strokeDasharray="10 10" name="Total Accidents" />
                              </LineChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Percentage Changes */}
                    <div className="row mb-4">
                      <div className="col-12">
                        <div className="card professional-card">
                          <div className="card-body p-4">
                            <h5 className="text-white fw-semibold mb-4">Annual Percentage Changes by Category</h5>
                            <ResponsiveContainer width="100%" height={400}>
                              <BarChart data={changeData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                                <XAxis dataKey="year" stroke="#fff" />
                                <YAxis stroke="#fff" />
                                <Tooltip
                                  contentStyle={{
                                    backgroundColor: '#333',
                                    borderColor: '#555',
                                    color: '#fff'
                                  }}
                                />
                                <Legend />
                                <Bar dataKey="fatal" fill="#0088FE" name="Fatal Accidents" />
                                <Bar dataKey="grievous" fill="#00C49F" name="Grievous Injury" />
                                <Bar dataKey="minor" fill="#FFBB28" name="Minor Injury" />
                                <Bar dataKey="non" fill="#FF8042" name="Non-Injury" />
                                <Bar dataKey="total" fill="#8884d8" name="Total" />
                              </BarChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Accident Distribution Comparison */}
                    <div className="row mb-4">
                      <div className="col-md-6">
                        <div className="card professional-card h-100">
                          <div className="card-body p-3">
                            <h5 className="text-white fw-semibold mb-3">Distribution by Category (2019)</h5>
                            <ResponsiveContainer width="100%" height={250}>
                              <PieChart>
                                <Pie
                                  data={shareData[2019]}
                                  dataKey="value"
                                  nameKey="name"
                                  cx="50%"
                                  cy="50%"
                                  outerRadius={70}
                                  fill="#8884d8"
                                  label={({ value }) => `${value}%`}
                                  activeShape={(props) => {
                                    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload } = props;
                                    return (
                                      <g>
                                        <Sector
                                          cx={cx}
                                          cy={cy}
                                          innerRadius={innerRadius}
                                          outerRadius={outerRadius + 10}
                                          startAngle={startAngle}
                                          endAngle={endAngle}
                                          fill={fill}
                                        />
                                        <text x={cx} y={cy - 10} textAnchor="middle" fill="#fff" fontSize="12" fontWeight="bold">
                                          {payload.name}
                                        </text>
                                        <text x={cx} y={cy + 10} textAnchor="middle" fill="#fff" fontSize="10">
                                          {`${payload.value}%`}
                                        </text>
                                      </g>
                                    );
                                  }}
                                >
                                  {shareData[2019].map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                  ))}
                                </Pie>
                                <Legend />
                              </PieChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="card professional-card h-100">
                          <div className="card-body p-3">
                            <h5 className="text-white fw-semibold mb-3">Distribution by Category (2023)</h5>
                            <ResponsiveContainer width="100%" height={250}>
                              <PieChart>
                                <Pie
                                  data={shareData[2023]}
                                  dataKey="value"
                                  nameKey="name"
                                  cx="50%"
                                  cy="50%"
                                  outerRadius={70}
                                  fill="#8884d8"
                                  label={({ value }) => `${value}%`}
                                  activeShape={(props) => {
                                    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload } = props;
                                    return (
                                      <g>
                                        <Sector
                                          cx={cx}
                                          cy={cy}
                                          innerRadius={innerRadius}
                                          outerRadius={outerRadius + 10}
                                          startAngle={startAngle}
                                          endAngle={endAngle}
                                          fill={fill}
                                        />
                                        <text x={cx} y={cy - 10} textAnchor="middle" fill="#fff" fontSize="12" fontWeight="bold">
                                          {payload.name}
                                        </text>
                                        <text x={cx} y={cy + 10} textAnchor="middle" fill="#fff" fontSize="10">
                                          {`${payload.value}%`}
                                        </text>
                                      </g>
                                    );
                                  }}
                                >
                                  {shareData[2023].map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                  ))}
                                </Pie>
                                <Legend />
                              </PieChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-white-50 text-center mt-3">
                      Data Source: States/UTs (Police Departments)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Tab.Pane>

          <Tab.Pane eventKey="prediction">
            {/* Prediction Hero Section */}
            <section className="prediction-hero-section">
              <div className="prediction-hero-background"></div>
              <div className="prediction-hero-overlay"></div>

              <div className="prediction-hero-content">
                <div className="container">
                  <div className="prediction-hero-text">
                    <div className="prediction-badge">
                      <i className="fas fa-flask-vial"></i> AI-Powered Prediction
                    </div>
                    <h1 className="prediction-hero-title">
                      Road Accident Risk Assessment
                    </h1>
                    <p className="prediction-hero-subtitle">
                      Our advanced machine learning model analyzes real-time road conditions to predict accident risk probability. Provide detailed information about your route and receive an accurate risk assessment powered by AI.
                    </p>
                    <div className="prediction-features">
                      <div className="feature-item">
                        <span className="feature-icon">⚡</span>
                        <span className="feature-text">Instant Analysis</span>
                      </div>
                      <div className="feature-item">
                        <span className="feature-icon">🎯</span>
                        <span className="feature-text">Accurate Predictions</span>
                      </div>
                      <div className="feature-item">
                        <span className="feature-icon">🛡️</span>
                        <span className="feature-text">Safety Focused</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Prediction Form Section */}
            <div className="content-section prediction-content">
              <div className="container py-5">
                <div className="row justify-content-center">
                  <div className="col-lg-10">
                    <PredictionForm />
                  </div>
                </div>
              </div>
            </div>
          </Tab.Pane>

          <Tab.Pane eventKey="eda">
            <div className="content-section">
              <div className="container py-5">
                <div className="text-center mb-5">
                  <h1 className="display-4 fw-bold text-white mb-4">Exploratory Data Analysis</h1>
                  <p className="text-white-75">Comprehensive analysis of road accident prediction dataset</p>
                </div>

                {/* EDA Graphs Grid */}
                <div className="row">
                  {/* Road Type Distribution */}
                  <div className="col-lg-6 col-12 mb-4">
                    <div className="card professional-card">
                      <div className="card-body p-3">
                        <h6 className="text-white fw-semibold mb-3">Distribution of Road Types</h6>
                        <ResponsiveContainer width="100%" height={250}>
                          <PieChart>
                            <Pie data={[
                              { name: 'Urban', value: 35 },
                              { name: 'Rural', value: 40 },
                              { name: 'Highway', value: 25 }
                            ]} dataKey="value" cx="50%" cy="50%" outerRadius={70} fill="#8884d8" label={({ value }) => `${value}%`}
                            activeShape={(props) => {
                              const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload } = props;
                              return (
                                <g>
                                  <Sector cx={cx} cy={cy} innerRadius={innerRadius} outerRadius={outerRadius + 10} startAngle={startAngle} endAngle={endAngle} fill={fill} />
                                  <text x={cx} y={cy - 10} textAnchor="middle" fill="#fff" fontSize="12" fontWeight="bold">{payload.name}</text>
                                  <text x={cx} y={cy + 10} textAnchor="middle" fill="#fff" fontSize="10">{`${payload.value}%`}</text>
                                </g>
                              );
                            }}>
                              {[
                                { name: 'Urban', value: 35 },
                                { name: 'Rural', value: 40 },
                                { name: 'Highway', value: 25 }
                              ].map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Legend />
                          </PieChart>
                        </ResponsiveContainer>
                        <p className="text-white-75 mt-2 small">Shows the proportion of urban (35%), rural (40%), and highway roads in the dataset, with rural roads being the most common.</p>
                      </div>
                    </div>
                  </div>

                  {/* Number of Lanes Distribution */}
                  <div className="col-lg-6 col-12 mb-4">
                    <div className="card professional-card">
                      <div className="card-body p-3">
                        <h6 className="text-white fw-semibold mb-3">Distribution of Number of Lanes</h6>
                        <ResponsiveContainer width="100%" height={250}>
                          <BarChart data={[
                            { lanes: '1', count: 15 },
                            { lanes: '2', count: 30 },
                            { lanes: '3', count: 25 },
                            { lanes: '4', count: 30 }
                          ]}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                            <XAxis dataKey="lanes" stroke="#fff" />
                            <YAxis stroke="#fff" />
                            <Tooltip contentStyle={{ backgroundColor: '#333', color: '#fff' }} />
                            <Bar dataKey="count" fill="#00C49F" />
                          </BarChart>
                        </ResponsiveContainer>
                        <p className="text-white-75 mt-2 small">Two and four-lane roads are equally common at 30% each, followed by three-lane roads, with single lanes being least frequent.</p>
                      </div>
                    </div>
                  </div>

                  {/* Speed Limit Histogram */}
                  <div className="col-lg-6 col-12 mb-4">
                    <div className="card professional-card">
                      <div className="card-body p-3">
                        <h6 className="text-white fw-semibold mb-3">Speed Limit Distribution</h6>
                        <ResponsiveContainer width="100%" height={250}>
                          <BarChart data={[
                            { speed: '25-35', count: 20 },
                            { speed: '40-50', count: 50 },
                            { speed: '55-65', count: 20 },
                            { speed: '70+', count: 10 }
                          ]}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                            <XAxis dataKey="speed" stroke="#fff" />
                            <YAxis stroke="#fff" />
                            <Tooltip contentStyle={{ backgroundColor: '#333', color: '#fff' }} />
                            <Bar dataKey="count" fill="#FFBB28" />
                          </BarChart>
                        </ResponsiveContainer>
                        <p className="text-white-75 mt-2 small">Most roads have speed limits between 40-50 km/h, while very high speed limits (70+) are rare in the dataset.</p>
                      </div>
                    </div>
                  </div>

                  {/* Lighting Conditions */}
                  <div className="col-lg-6 col-12 mb-4">
                    <div className="card professional-card">
                      <div className="card-body p-3">
                        <h6 className="text-white fw-semibold mb-3">Lighting Conditions Distribution</h6>
                        <ResponsiveContainer width="100%" height={250}>
                          <PieChart>
                            <Pie data={[
                              { name: 'Daylight', value: 60 },
                              { name: 'Dim', value: 25 },
                              { name: 'Night', value: 15 }
                            ]} dataKey="value" cx="50%" cy="50%" outerRadius={70} fill="#8884d8" label={({ value }) => `${value}%`}
                            activeShape={(props) => {
                              const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload } = props;
                              return (
                                <g>
                                  <Sector cx={cx} cy={cy} innerRadius={innerRadius} outerRadius={outerRadius + 10} startAngle={startAngle} endAngle={endAngle} fill={fill} />
                                  <text x={cx} y={cy - 10} textAnchor="middle" fill="#fff" fontSize="12" fontWeight="bold">{payload.name}</text>
                                  <text x={cx} y={cy + 10} textAnchor="middle" fill="#fff" fontSize="10">{`${payload.value}%`}</text>
                                </g>
                              );
                            }}>
                              {[
                                { name: 'Daylight', value: 60 },
                                { name: 'Dim', value: 25 },
                                { name: 'Night', value: 15 }
                              ].map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Legend />
                          </PieChart>
                        </ResponsiveContainer>
                        <p className="text-white-75 mt-2 small">60% of observations occur during daylight conditions, making it the most common lighting scenario.</p>
                      </div>
                    </div>
                  </div>

                  {/* Weather Conditions */}
                  <div className="col-lg-6 col-12 mb-4">
                    <div className="card professional-card">
                      <div className="card-body p-3">
                        <h6 className="text-white fw-semibold mb-3">Weather Conditions Distribution</h6>
                        <ResponsiveContainer width="100%" height={250}>
                          <PieChart>
                            <Pie data={[
                              { name: 'Clear', value: 50 },
                              { name: 'Rainy', value: 35 },
                              { name: 'Foggy', value: 15 }
                            ]} dataKey="value" cx="50%" cy="50%" outerRadius={70} fill="#8884d8" label={({ value }) => `${value}%`}
                            activeShape={(props) => {
                              const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload } = props;
                              return (
                                <g>
                                  <Sector cx={cx} cy={cy} innerRadius={innerRadius} outerRadius={outerRadius + 10} startAngle={startAngle} endAngle={endAngle} fill={fill} />
                                  <text x={cx} y={cy - 10} textAnchor="middle" fill="#fff" fontSize="12" fontWeight="bold">{payload.name}</text>
                                  <text x={cx} y={cy + 10} textAnchor="middle" fill="#fff" fontSize="10">{`${payload.value}%`}</text>
                                </g>
                              );
                            }}>
                              {[
                                { name: 'Clear', value: 50 },
                                { name: 'Rainy', value: 35 },
                                { name: 'Foggy', value: 15 }
                              ].map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Legend />
                          </PieChart>
                        </ResponsiveContainer>
                        <p className="text-white-75 mt-2 small">Clear weather represents 50% of observations, while rainy and foggy conditions are less frequent at 35% and 15% respectively.</p>
                      </div>
                    </div>
                  </div>

                  {/* Time of Day */}
                  <div className="col-lg-6 col-12 mb-4">
                    <div className="card professional-card">
                      <div className="card-body p-3">
                        <h6 className="text-white fw-semibold mb-3">Time of Day Distribution</h6>
                        <ResponsiveContainer width="100%" height={250}>
                          <BarChart data={[
                            { time: 'Morning', count: 30 },
                            { time: 'Afternoon', count: 35 },
                            { time: 'Evening', count: 35 }
                          ]}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                            <XAxis dataKey="time" stroke="#fff" />
                            <YAxis stroke="#fff" />
                            <Tooltip contentStyle={{ backgroundColor: '#333', color: '#fff' }} />
                            <Bar dataKey="count" fill="#FF8042" />
                          </BarChart>
                        </ResponsiveContainer>
                        <p className="text-white-75 mt-2 small">Afternoon and evening periods are equally represented at 35% each, slightly higher than morning observations.</p>
                      </div>
                    </div>
                  </div>

                  {/* Accident Risk by Road Type */}
                  <div className="col-lg-6 col-12 mb-4">
                    <div className="card professional-card">
                      <div className="card-body p-3">
                        <h6 className="text-white fw-semibold mb-3">Accident Risk by Road Type</h6>
                        <ResponsiveContainer width="100%" height={250}>
                          <BarChart data={[
                            { road_type: 'Urban', risk: 0.32 },
                            { road_type: 'Rural', risk: 0.45 },
                            { road_type: 'Highway', risk: 0.28 }
                          ]}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                            <XAxis dataKey="road_type" stroke="#fff" />
                            <YAxis stroke="#fff" />
                            <Tooltip contentStyle={{ backgroundColor: '#333', color: '#fff' }} />
                            <Bar dataKey="risk" fill="#667eea" />
                          </BarChart>
                        </ResponsiveContainer>
                        <p className="text-white-75 mt-2 small">Rural roads show the highest average accident risk (0.45), while highways have the lowest at 0.28.</p>
                      </div>
                    </div>
                  </div>

                  {/* Accident Risk by Weather */}
                  <div className="col-lg-6 col-12 mb-4">
                    <div className="card professional-card">
                      <div className="card-body p-3">
                        <h6 className="text-white fw-semibold mb-3">Accident Risk by Weather Conditions</h6>
                        <ResponsiveContainer width="100%" height={250}>
                          <BarChart data={[
                            { weather: 'Clear', risk: 0.25 },
                            { weather: 'Rainy', risk: 0.42 },
                            { weather: 'Foggy', risk: 0.51 }
                          ]}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                            <XAxis dataKey="weather" stroke="#fff" />
                            <YAxis stroke="#fff" />
                            <Tooltip contentStyle={{ backgroundColor: '#333', color: '#fff' }} />
                            <Bar dataKey="risk" fill="#17a2b8" />
                          </BarChart>
                        </ResponsiveContainer>
                        <p className="text-white-75 mt-2 small">Foggy weather conditions show the highest accident risk (0.51), followed by rainy conditions at 0.42.</p>
                      </div>
                    </div>
                  </div>

                  {/* Accident Risk by Lighting */}
                  <div className="col-lg-6 col-12 mb-4">
                    <div className="card professional-card">
                      <div className="card-body p-3">
                        <h6 className="text-white fw-semibold mb-3">Accident Risk by Lighting Conditions</h6>
                        <ResponsiveContainer width="100%" height={250}>
                          <BarChart data={[
                            { lighting: 'Daylight', risk: 0.22 },
                            { lighting: 'Dim', risk: 0.38 },
                            { lighting: 'Night', risk: 0.45 }
                          ]}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                            <XAxis dataKey="lighting" stroke="#fff" />
                            <YAxis stroke="#fff" />
                            <Tooltip contentStyle={{ backgroundColor: '#333', color: '#fff' }} />
                            <Bar dataKey="risk" fill="#28a745" />
                          </BarChart>
                        </ResponsiveContainer>
                        <p className="text-white-75 mt-2 small">Night conditions show the highest accident risk (0.45), while daylight has the lowest at 0.22.</p>
                      </div>
                    </div>
                  </div>

                  {/* Risk vs Speed Limit Scatter */}
                  <div className="col-lg-6 col-12 mb-4">
                    <div className="card professional-card">
                      <div className="card-body p-3">
                        <h6 className="text-white fw-semibold mb-3">Relationship: Speed Limit vs Accident Risk</h6>
                        <ResponsiveContainer width="100%" height={250}>
                          <LineChart data={[
                            { speed_limit: 25, risk: 0.15 },
                            { speed_limit: 35, risk: 0.2 },
                            { speed_limit: 45, risk: 0.28 },
                            { speed_limit: 60, risk: 0.4 },
                            { speed_limit: 70, risk: 0.5 }
                          ]}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                            <XAxis dataKey="speed_limit" stroke="#fff" />
                            <YAxis stroke="#fff" />
                            <Tooltip contentStyle={{ backgroundColor: '#333', color: '#fff' }} />
                            <Line type="monotone" dataKey="risk" stroke="#FFBB28" strokeWidth={2} />
                          </LineChart>
                        </ResponsiveContainer>
                        <p className="text-white-75 mt-2 small">Higher speed limits correlate with increased accident risk, showing a positive linear relationship.</p>
                      </div>
                    </div>
                  </div>

                  {/* Risk vs Curvature Scatter */}
                  <div className="col-lg-6 col-12 mb-4">
                    <div className="card professional-card">
                      <div className="card-body p-3">
                        <h6 className="text-white fw-semibold mb-3">Risk Distribution by Road Curvature</h6>
                        <ResponsiveContainer width="100%" height={250}>
                          <BarChart data={[
                            { curvature: '0-0.2', risk: 0.25 },
                            { curvature: '0.2-0.4', risk: 0.35 },
                            { curvature: '0.4-0.6', risk: 0.45 },
                            { curvature: '0.6-0.8', risk: 0.52 },
                            { curvature: '0.8-1.0', risk: 0.58 }
                          ]}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                            <XAxis dataKey="curvature" stroke="#fff" />
                            <YAxis stroke="#fff" />
                            <Tooltip contentStyle={{ backgroundColor: '#333', color: '#fff' }} />
                            <Bar dataKey="risk" fill="#dc3545" />
                          </BarChart>
                        </ResponsiveContainer>
                        <p className="text-white-75 mt-2 small">Higher road curvature correlates with increased accident risk, with straight roads showing lower risk.</p>
                      </div>
                    </div>
                  </div>

                  {/* Risk by Number of Lanes */}
                  <div className="col-lg-6 col-12 mb-4">
                    <div className="card professional-card">
                      <div className="card-body p-3">
                        <h6 className="text-white fw-semibold mb-3">Accident Risk by Number of Lanes</h6>
                        <ResponsiveContainer width="100%" height={250}>
                          <LineChart data={[
                            { lanes: '1', risk: 0.55 },
                            { lanes: '2', risk: 0.4 },
                            { lanes: '3', risk: 0.32 },
                            { lanes: '4', risk: 0.28 }
                          ]}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                            <XAxis dataKey="lanes" stroke="#fff" />
                            <YAxis stroke="#fff" />
                            <Tooltip contentStyle={{ backgroundColor: '#333', color: '#fff' }} />
                            <Line type="monotone" dataKey="risk" stroke="#6c757d" strokeWidth={2} />
                          </LineChart>
                        </ResponsiveContainer>
                        <p className="text-white-75 mt-2 small">Single-lane roads show highest risk (0.55), while wider roads with more lanes demonstrate lower risk levels.</p>
                      </div>
                    </div>
                  </div>

                  {/* Risk by Time of Day */}
                  <div className="col-lg-6 col-12 mb-4">
                    <div className="card professional-card">
                      <div className="card-body p-3">
                        <h6 className="text-white fw-semibold mb-3">Accident Risk by Time of Day</h6>
                        <ResponsiveContainer width="100%" height={250}>
                          <BarChart data={[
                            { time: 'Morning', risk: 0.28 },
                            { time: 'Afternoon', risk: 0.35 },
                            { time: 'Evening', risk: 0.42 }
                          ]}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                            <XAxis dataKey="time" stroke="#fff" />
                            <YAxis stroke="#fff" />
                            <Tooltip contentStyle={{ backgroundColor: '#333', color: '#fff' }} />
                            <Bar dataKey="risk" fill="#ffc107" />
                          </BarChart>
                        </ResponsiveContainer>
                        <p className="text-white-75 mt-2 small">Evening shows the highest accident risk (0.42), with morning having the lowest average risk.</p>
                      </div>
                    </div>
                  </div>

                  {/* Effect of Road Signs */}
                  <div className="col-lg-6 col-12 mb-4">
                    <div className="card professional-card">
                      <div className="card-body p-3">
                        <h6 className="text-white fw-semibold mb-3">Impact of Road Signs on Accident Risk</h6>
                        <ResponsiveContainer width="100%" height={250}>
                          <BarChart data={[
                            { signs: 'Present', risk: 0.25 },
                            { signs: 'Absent', risk: 0.42 }
                          ]}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                            <XAxis dataKey="signs" stroke="#fff" />
                            <YAxis stroke="#fff" />
                            <Tooltip contentStyle={{ backgroundColor: '#333', color: '#fff' }} />
                            <Bar dataKey="risk" fill="#fd7e14" />
                          </BarChart>
                        </ResponsiveContainer>
                        <p className="text-white-75 mt-2 small">Roads with signs show significantly lower accident risk (0.25) compared to roads without signs (0.42).</p>
                      </div>
                    </div>
                  </div>

                  {/* Public vs Private Roads */}
                  <div className="col-lg-6 col-12 mb-4">
                    <div className="card professional-card">
                      <div className="card-body p-3">
                        <h6 className="text-white fw-semibold mb-3">Accident Risk: Public vs Private Roads</h6>
                        <ResponsiveContainer width="100%" height={250}>
                          <BarChart data={[
                            { type: 'Public', risk: 0.38 },
                            { type: 'Private', risk: 0.28 }
                          ]}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                            <XAxis dataKey="type" stroke="#fff" />
                            <YAxis stroke="#fff" />
                            <Tooltip contentStyle={{ backgroundColor: '#333', color: '#fff' }} />
                            <Bar dataKey="risk" fill="#20c997" />
                          </BarChart>
                        </ResponsiveContainer>
                        <p className="text-white-75 mt-2 small">Public roads show higher accident risk (0.38) compared to private roads, possibly due to heavier traffic.</p>
                      </div>
                    </div>
                  </div>

                  {/* Holiday and School Season Impact */}
                  <div className="col-lg-6 col-12 mb-4">
                    <div className="card professional-card">
                      <div className="card-body p-3">
                        <h6 className="text-white fw-semibold mb-3">Impact of Holidays and School Season</h6>
                        <ResponsiveContainer width="100%" height={250}>
                          <BarChart data={[
                            { condition: 'Holiday & School', risk: 0.45 },
                            { condition: 'Holiday No School', risk: 0.35 },
                            { condition: 'No Holiday School', risk: 0.32 },
                            { condition: 'No Holiday No School', risk: 0.28 }
                          ]}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                            <XAxis dataKey="condition" stroke="#fff" angle={-45} textAnchor="end" height={60} />
                            <YAxis stroke="#fff" />
                            <Tooltip contentStyle={{ backgroundColor: '#333', color: '#fff' }} />
                            <Bar dataKey="risk" fill="#e83e8c" />
                          </BarChart>
                        </ResponsiveContainer>
                        <p className="text-white-75 mt-2 small">Holiday periods combined with school season show highest risk (0.45), while regular non-holiday periods show lowest risk.</p>
                      </div>
                    </div>
                  </div>

                  {/* Number of Reported Accidents Distribution */}
                  <div className="col-lg-6 col-12 mb-4">
                    <div className="card professional-card">
                      <div className="card-body p-3">
                        <h6 className="text-white fw-semibold mb-3">Distribution of Reported Accident Numbers</h6>
                        <ResponsiveContainer width="100%" height={250}>
                          <PieChart>
                            <Pie data={[
                              { name: '0 Accidents', value: 40 },
                              { name: '1 Accident', value: 45 },
                              { name: '2 Accidents', value: 15 }
                            ]} dataKey="value" cx="50%" cy="50%" outerRadius={70} fill="#8884d8" label={({ value }) => `${value}%`}
                            activeShape={(props) => {
                              const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload } = props;
                              return (
                                <g>
                                  <Sector cx={cx} cy={cy} innerRadius={innerRadius} outerRadius={outerRadius + 10} startAngle={startAngle} endAngle={endAngle} fill={fill} />
                                  <text x={cx} y={cy - 10} textAnchor="middle" fill="#fff" fontSize="12" fontWeight="bold">{payload.name}</text>
                                  <text x={cx} y={cy + 10} textAnchor="middle" fill="#fff" fontSize="10">{`${payload.value}%`}</text>
                                </g>
                              );
                            }}>
                              {[
                                { name: '0 Accidents', value: 40 },
                                { name: '1 Accident', value: 45 },
                                { name: '2 Accidents', value: 15 }
                              ].map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Legend />
                          </PieChart>
                        </ResponsiveContainer>
                        <p className="text-white-75 mt-2 small">45% of roads have had 1 reported accident, 40% have 0 accidents, and 15% have experienced 2 accidents.</p>
                      </div>
                    </div>
                  </div>

                  {/* Correlation Insight */}
                  <div className="col-12 mb-4">
                    <div className="card professional-card">
                      <div className="card-body p-4 text-center">
                        <h6 className="text-white fw-semibold mb-3">Key EDA Insights Summary</h6>
                        <p className="text-white-75">
                          Analysis reveals that accident risk is highest in rural roads during foggy conditions at night, with high speed limits and sharp curves.
                          Road signs and multi-lane roads significantly reduce risk, while holidays during school season increase danger.
                          Numerical variables show positive correlation with accident risk.
                        </p>
                        <p className="text-white-75 mt-2">
                          Total sample size appears substantial with diverse representation across all categorical variables,
                          providing reliable foundation for predictive modeling.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </div>
  );
}

export default App;
