# Road Accident Risk Prediction

A modern web application for predicting road accident risk using Flask backend and React frontend.

## Features

- **Modern React Frontend**: Interactive and responsive UI built with React and Bootstrap
- **Flask Backend**: Robust API server with proper validation and CORS support
- **Real-time Prediction**: Instant risk calculation using your trained ML model
- **Comprehensive Inputs**: All major factors affecting road safety included
- **Attractive Design**: Gradient backgrounds, smooth animations, and professional styling

## Input Parameters

- **Road Type**: Urban, Rural, Highway (dropdown)
- **Number of Lanes**: Integer value (arrow buttons to adjust)
- **Curvature**: Float value between 0 and 1
- **Speed Limit**: Integer value (km/h)
- **Lighting**: Daylight, Dim, Night (dropdown)
- **Weather**: Clear, Rainy, Foggy (dropdown)
- **Road Signs Present**: Yes/No (dropdown)
- **Public Road**: Yes/No (dropdown)
- **Time of Day**: Morning, Afternoon, Evening (dropdown)
- **Holiday**: Yes/No (dropdown)
- **School Season**: Yes/No (dropdown)
- **Number of Reported Accidents**: Integer value

## Installation & Usage

### Prerequisites
- Python 3.7+
- Node.js 14+ and npm

### Quick Start
1. **Run the Application**:
   ```bash
   python run.py
   ```

   This will:
   - Install Python dependencies
   - Install Node.js dependencies
   - Start the Flask backend on `http://localhost:5000`
   - Start the React frontend on `http://localhost:3000`

2. **Open Browser**:
   Navigate to `http://localhost:3000` to use the application.

### Manual Setup (Alternative)

1. **Backend Setup**:
   ```bash
   pip install -r requirements.txt
   python app.py
   ```

2. **Frontend Setup** (in a separate terminal):
   ```bash
   cd frontend
   npm install
   npm start
   ```

## API Documentation

The Flask backend provides a REST API endpoint:

**POST** `/predict`

### Request Body
```json
{
  "road_type": "urban",
  "num_lanes": 2,
  "curvature": 0.5,
  "speed_limit": 60,
  "lighting": "daylight",
  "weather": "clear",
  "road_signs_present": true,
  "public_road": true,
  "time_of_day": "morning",
  "holiday": false,
  "school_season": false,
  "num_reported_accidents": 0
}
```

### Response
```json
{
  "accident_risk": 0.234
}
```

### Error Response
```json
{
  "error": "Error message description"
}
```

## Project Structure

```
road_accident_prediction/
├── app.py                    # Flask backend server
├── requirements.txt          # Python dependencies
├── run.py                    # Main startup script
├── model.pkl                 # Trained ML model
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── App.js           # Main React component
│   │   ├── App.css          # Main styles
│   │   ├── components/
│   │   │   └── PredictionForm.js  # Form component
│   │   └── index.js         # React entry point
│   ├── public/
│   │   └── index.html       # HTML template
│   └── package.json         # Node dependencies
└── README.md                # This file
```

## Technologies Used

- **Backend**: Flask, pandas, scikit-learn
- **Frontend**: React, React Bootstrap, Axios
- **Styling**: Bootstrap 5, Font Awesome icons
- **Build Tools**: Create React App

## Development

- Backend runs on `http://localhost:5000`
- Frontend runs on `http://localhost:3000` (proxied to backend in development)
- CORS enabled for cross-origin requests
- Hot reload enabled for both frontend and backend development