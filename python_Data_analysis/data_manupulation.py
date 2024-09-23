import pandas as pd

def get_top_age_above_30(df):
    filtered_df = df[df['age'] > 30]
    return filtered_df.head(5)


df = pd.read_csv('data.csv')
top_rows = get_top_age_above_30(df)
print(top_rows)
