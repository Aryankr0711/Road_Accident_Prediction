import pandas as pd

# Load training data
df = pd.read_csv('train.csv', nrows=5)
print("Data types:")
print(df.dtypes)
print("\nSample data:")
print(df.head())

# Check unique values for categorical columns
categorical_cols = ['road_type', 'lighting', 'weather', 'time_of_day']
for col in categorical_cols:
    if col in df.columns:
        print(f"\n{col} unique values: {df[col].unique()}")

boolean_cols = ['road_signs_present', 'public_road', 'holiday', 'school_season']
for col in boolean_cols:
    if col in df.columns:
        print(f"\n{col} unique values: {df[col].unique()}")