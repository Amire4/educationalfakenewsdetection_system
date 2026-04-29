import pandas as pd

# Sahi file name use karo
df = pd.read_csv('pakistan_education_500k_dataset.csv', nrows=5)

print("Columns:", df.columns.tolist())
print("\nFirst 5 rows:")
print(df.head())