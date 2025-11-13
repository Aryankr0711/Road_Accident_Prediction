import requests
import json

# Test data
test_data = {
    "road_type": "urban",
    "num_lanes": 2,
    "curvature": 0.5,
    "speed_limit": 60,
    "lighting": "daylight",
    "weather": "clear",
    "road_signs_present": True,
    "public_road": True,
    "time_of_day": "morning",
    "holiday": False,
    "school_season": False,
    "num_reported_accidents": 0
}

try:
    print("Testing Flask API...")
    response = requests.post('http://localhost:5000/predict', json=test_data)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.json()}")
except Exception as e:
    print(f"Error: {e}")