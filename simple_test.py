import pandas as pd
import pickle

# Load the model
with open("model.pkl", "rb") as f:
    model = pickle.load(f)

print("Model loaded successfully")

# Create test data like in the Flask app
test_data = {
    "road_type": ["urban"],
    "num_lanes": [2],
    "curvature": [0.5],
    "speed_limit": [60],
    "lighting": ["daylight"],
    "weather": ["clear"],
    "road_signs_present": [1],
    "public_road": [1],
    "time_of_day": ["morning"],
    "holiday": [0],
    "school_season": [0],
    "num_reported_accidents": [0]
}

df = pd.DataFrame(test_data)
print("Test DataFrame:")
print(df)
print("DataFrame dtypes:")
print(df.dtypes)

try:
    prediction = model.predict(df)[0]
    print(f"Prediction successful: {prediction}")
except Exception as e:
    print(f"Prediction failed: {e}")