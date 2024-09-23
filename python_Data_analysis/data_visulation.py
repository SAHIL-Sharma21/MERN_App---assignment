import pandas as pd
import matplotlib.pyplot as plt

# Read the data
df = pd.read_csv('data.csv')

# Plot the age distribution
plt.figure(figsize=(10, 6))
df['age'].value_counts().sort_index().plot(kind='bar')
plt.title('Age Distribution of Users')
plt.xlabel('Age')
plt.ylabel('Number of Users')
plt.xticks(rotation=45)
plt.grid(axis='y')
plt.tight_layout()
plt.show()
