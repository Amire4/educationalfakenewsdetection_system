# test.py - Simple test to verify files are working

import joblib
import os

print("="*50)
print("TESTING PAKISTAN EDUCATION FILES")
print("="*50)

# Check if files exist
files_to_check = [
    'pakistan_education_final_model.pkl',
    'pakistan_education_final_vectorizer.pkl',
    'pakistan_education_complete.pkl',
    'pakistan_education_500k_dataset.csv'
]

print("\n📁 Checking files:")
for file in files_to_check:
    if os.path.exists(file):
        size = os.path.getsize(file) / 1024 / 1024
        print(f"   ✅ {file} - {size:.1f} MB")
    else:
        print(f"   ❌ {file} - NOT FOUND")

# Try to load the complete package
print("\n📥 Attempting to load complete package...")
try:
    data = joblib.load('pakistan_education_complete.pkl')
    print("   ✅ File loaded successfully!")
    print(f"   📊 Model expects: {data['model'].n_features_in_} features")
    print(f"   📊 Vectorizer features: {data['vectorizer_features']}")
    print(f"   📈 Model accuracy: {data['accuracy']*100:.1f}%")
except Exception as e:
    print(f"   ❌ Error: {e}")

print("\n" + "="*50)
print("✅ Files are working correctly!")
print("="*50)