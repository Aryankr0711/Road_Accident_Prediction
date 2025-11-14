import streamlit as st
import pickle
import pandas as pd
import numpy as np

# Minimal page config
st.set_page_config(page_title="Road Risk Predictor", page_icon="🚗", layout="centered")

# Load model with caching and error handling
@st.cache_resource
def load_model():
    try:
        with open("model.pkl", "rb") as f:
            return pickle.load(f)
    except:
        st.error("Model not found!")
        return None

model = load_model()

st.title("🚗 Road Accident Risk Predictor")

if model:
    col1, col2 = st.columns(2)
    
    with col1:
        road_type = st.selectbox("Road Type", ["urban", "rural", "highway"])
        num_lanes = st.number_input("Lanes", 1, 10, 2)
        curvature = st.slider("Curvature", 0.0, 1.0, 0.5)
        speed_limit = st.number_input("Speed Limit", 20, 150, 60)
        road_signs = st.selectbox("Road Signs", ["Yes", "No"])
        public_road = st.selectbox("Public Road", ["Yes", "No"])
    
    with col2:
        lighting = st.selectbox("Lighting", ["daylight", "dim", "night"])
        weather = st.selectbox("Weather", ["clear", "rainy", "foggy"])
        time_of_day = st.selectbox("Time", ["morning", "afternoon", "evening"])
        holiday = st.selectbox("Holiday", ["No", "Yes"])
        school_season = st.selectbox("School Season", ["No", "Yes"])
        accidents = st.number_input("Reported Accidents", 0, 100, 0)
    
    if st.button("Predict Risk"):
        data = pd.DataFrame({
            "road_type": [road_type],
            "num_lanes": [num_lanes],
            "curvature": [curvature],
            "speed_limit": [speed_limit],
            "lighting": [lighting],
            "weather": [weather],
            "road_signs_present": [1 if road_signs == "Yes" else 0],
            "public_road": [1 if public_road == "Yes" else 0],
            "time_of_day": [time_of_day],
            "holiday": [1 if holiday == "Yes" else 0],
            "school_season": [1 if school_season == "Yes" else 0],
            "num_reported_accidents": [accidents]
        })
        
        try:
            risk = model.predict(data)[0]
            st.metric("Risk Score", f"{risk:.3f}")
            
            if risk < 0.3:
                st.success("🟢 Low Risk")
            elif risk < 0.7:
                st.warning("🟡 Medium Risk")
            else:
                st.error("🔴 High Risk")
        except Exception as e:
            st.error(f"Prediction failed: {e}")