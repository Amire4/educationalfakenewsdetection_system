import pandas as pd
import joblib
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report

print("="*50)
print("📚 Loading dataset...")
print("="*50)

# Load full dataset
df = pd.read_csv('pakistan_education_500k_dataset.csv')

print(f"Total samples: {len(df)}")
print(f"Columns: {df.columns.tolist()}")

# Check label distribution
print("\n📊 Label Distribution:")
print(df['label'].value_counts())

# Prepare data
X = df['text'].astype(str)
y = df['label']

# Split data
print("\n🔄 Splitting data...")
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

print(f"Training samples: {len(X_train)}")
print(f"Testing samples: {len(X_test)}")

# Create vectorizer
print("\n🔧 Creating TF-IDF vectorizer...")
vectorizer = TfidfVectorizer(max_features=5000, ngram_range=(1, 2))

X_train_vec = vectorizer.fit_transform(X_train)
X_test_vec = vectorizer.transform(X_test)

print(f"Vectorized shape: {X_train_vec.shape}")

# Train model
print("\n🤖 Training Logistic Regression model...")
model = LogisticRegression(max_iter=1000, random_state=42)
model.fit(X_train_vec, y_train)

# Evaluate
print("\n📊 Evaluating model...")
y_pred = model.predict(X_test_vec)
accuracy = accuracy_score(y_test, y_pred)

print(f"\n✅ Model Accuracy: {accuracy*100:.2f}%")
print("\n📋 Classification Report:")
print(classification_report(y_test, y_pred))

# Save model and vectorizer
print("\n💾 Saving model and vectorizer...")
joblib.dump(model, 'pakistan_education_final_model.pkl')
joblib.dump(vectorizer, 'pakistan_education_final_vectorizer.pkl')

print("\n✅ Model saved successfully!")
print("   - pakistan_education_final_model.pkl")
print("   - pakistan_education_final_vectorizer.pkl")