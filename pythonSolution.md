# Python for Data Analysis

## Data Cleaning

### Python Script to Clean Data

This script reads a CSV file using Pandas, drops rows with missing values, and outputs the cleaned data.

```python
import pandas as pd

# Read the CSV file
df = pd.read_csv('data.csv')

# Drop rows with missing values
cleaned_df = df.dropna()

# Output the cleaned data
cleaned_df.to_csv('cleaned_data.csv', index=False)

print("Data cleaned successfully. Output saved to 'cleaned_data.csv'.")
