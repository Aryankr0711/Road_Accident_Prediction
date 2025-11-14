from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import pickle
import pandas as pd
import os
import gc
import logging

app = Flask(__name__, static_folder='frontend/build', static_url_path='')
CORS(app, origins=['https://yourdomain.com'])  # Restrict CORS

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Global model variable
model = None

def load_model():
    global model
    if model is None:
        try:
            with open("model.pkl", "rb") as f:
                model = pickle.load(f)
            print("Model loaded successfully")
        except FileNotFoundError:
            print("model.pkl not found")
            model = None
        except Exception as e:
            print(f"Error loading model: {e}")
            model = None
    return model

@app.route('/health')
def health_check():
    return jsonify({'status': 'healthy', 'model_loaded': model is not None})

@app.route('/predict', methods=['POST'])
def predict_risk():
    try:
        current_model = load_model()
        if current_model is None:
            logger.error('Model not available')
            return jsonify({'error': 'Service unavailable'}), 503
            
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No data provided'}), 400

        # Validate required fields
        required_fields = [
            'road_type', 'num_lanes', 'curvature', 'speed_limit',
            'lighting', 'weather', 'road_signs_present', 'public_road',
            'time_of_day', 'holiday', 'school_season', 'num_reported_accidents'
        ]

        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Missing field: {field}'}), 400

        # Validate road_type
        if data['road_type'] not in ['urban', 'rural', 'highway']:
            return jsonify({'error': 'Invalid road_type'}), 400

        # Validate lighting
        if data['lighting'] not in ['daylight', 'dim', 'night']:
            return jsonify({'error': 'Invalid lighting'}), 400

        # Validate weather
        if data['weather'] not in ['rainy', 'clear', 'foggy']:
            return jsonify({'error': 'Invalid weather'}), 400

        # Validate time_of_day
        if data['time_of_day'] not in ['morning', 'afternoon', 'evening']:
            return jsonify({'error': 'Invalid time_of_day'}), 400

        # Validate curvature range
        if not (0 <= data['curvature'] <= 1):
            return jsonify({'error': 'Curvature must be between 0 and 1'}), 400

        # Convert request to dataframe
        df_data = {
            "road_type": [data['road_type']],
            "num_lanes": [int(data['num_lanes'])],
            "curvature": [float(data['curvature'])],
            "speed_limit": [int(data['speed_limit'])],
            "lighting": [data['lighting']],
            "weather": [data['weather']],
            "road_signs_present": [int(data['road_signs_present'])],
            "public_road": [int(data['public_road'])],
            "time_of_day": [data['time_of_day']],
            "holiday": [int(data['holiday'])],
            "school_season": [int(data['school_season'])],
            "num_reported_accidents": [int(data['num_reported_accidents'])]
        }

        df = pd.DataFrame(df_data)
        print("DataFrame created:")
        print(df)
        print("DataFrame dtypes:")
        print(df.dtypes)

        # Make prediction
        prediction = current_model.predict(df)[0]
        
        # Clean up memory
        del df
        gc.collect()
        
        return jsonify({"accident_risk": float(prediction)})

    except Exception as e:
        gc.collect()
        return jsonify({'error': str(e)}), 500

@app.route('/')
def root():
    # Serve React app
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/<path:path>')
def serve_react_app(path):
    # Serve React app for all other routes
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=False, host='0.0.0.0', port=port)