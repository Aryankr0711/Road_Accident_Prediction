import pandas as pd
import pickle

# Load the trained pipeline model
with open("model.pkl", "rb") as f:
    loaded_model = pickle.load(f)

# Load the test dataset
# Load test data with safe encoding
test_df = pd.read_csv("Book1.csv")


# Keep a copy of ID column if needed
ids = test_df["id"] if "id" in test_df.columns else None

# Drop target column if exists mistakenly
if "accident_risk" in test_df.columns:
    test_df = test_df.drop(columns=["accident_risk"])

# Make predictions (raw test_df is fine because pipeline handles preprocessing)
y_pred_test = loaded_model.predict(test_df)

# Create output dataframe
output_df = pd.DataFrame({
    "id": ids,
    "predicted_accident_risk": y_pred_test
})

# Save to CSV
output_df.to_csv("test_predictions.csv", index=False)

print("Prediction saved to test_predictions.csv")
