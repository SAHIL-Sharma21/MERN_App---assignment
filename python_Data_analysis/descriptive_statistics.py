import pandas as pd
import numpy as np

# Read the data
df = pd.read_csv('data.csv')

# Calculate statistics
mean_age = np.mean(df['age'])
median_age = np.median(df['age'])
std_age = np.std(df['age'])

# Output the results
print(f"Mean Age: {mean_age}")
print(f"Median Age: {median_age}")
print(f"Standard Deviation of Age: {std_age}")
