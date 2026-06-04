import os
import cv2
import numpy as np
from skimage.feature import hog
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import joblib

print("=" * 60)
print("🚀 TRAINING IMAGE MODEL (REAL vs FAKE only)")
print("=" * 60)

# =====================================================
# PATHS
# =====================================================
TRAIN_REAL_DIR = "images/train/real"
TRAIN_FAKE_DIR = "images/train/fake"
TEST_REAL_DIR = "images/test/real"
TEST_FAKE_DIR = "images/test/fake"
IMG_SIZE = (128, 128)

# =====================================================
# FEATURE EXTRACTION FUNCTION
# =====================================================
def extract_features(image_path):
    try:
        img = cv2.imread(image_path)
        if img is None:
            return None
        
        img = cv2.resize(img, IMG_SIZE)
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        
        # HOG features
        hog_features = hog(gray, orientations=9, pixels_per_cell=(8, 8),
                          cells_per_block=(2, 2), visualize=False)
        
        # Color histograms
        hist_r = cv2.calcHist([img], [0], None, [32], [0, 256]).flatten()
        hist_g = cv2.calcHist([img], [1], None, [32], [0, 256]).flatten()
        hist_b = cv2.calcHist([img], [2], None, [32], [0, 256]).flatten()
        
        features = np.concatenate([hog_features, hist_r, hist_g, hist_b])
        return features
    except Exception as e:
        return None

# =====================================================
# LOAD IMAGES
# =====================================================
def load_images(folder_path, label):
    images = []
    labels = []
    
    if not os.path.exists(folder_path):
        print(f"   Folder not found: {folder_path}")
        return images, labels
    
    for filename in os.listdir(folder_path):
        if filename.lower().endswith(('.png', '.jpg', '.jpeg')):
            img_path = os.path.join(folder_path, filename)
            features = extract_features(img_path)
            if features is not None:
                images.append(features)
                labels.append(label)
    
    print(f"   Loaded {len(images)} images from {os.path.basename(folder_path)}")
    return images, labels

# =====================================================
# LOAD TRAINING DATA
# =====================================================
print("\n📥 Loading training images...")

X_train = []
y_train = []

# REAL images (label=1)
real_train, real_labels = load_images(TRAIN_REAL_DIR, 1)
X_train.extend(real_train)
y_train.extend(real_labels)

# FAKE images (label=0)
fake_train, fake_labels = load_images(TRAIN_FAKE_DIR, 0)
X_train.extend(fake_train)
y_train.extend(fake_labels)

print(f"\n✅ Training data: {len(real_train)} REAL, {len(fake_train)} FAKE")

# =====================================================
# LOAD TEST DATA
# =====================================================
print("\n📥 Loading test images...")

X_test = []
y_test = []

# REAL test
real_test, real_test_labels = load_images(TEST_REAL_DIR, 1)
X_test.extend(real_test)
y_test.extend(real_test_labels)

# FAKE test
fake_test, fake_test_labels = load_images(TEST_FAKE_DIR, 0)
X_test.extend(fake_test)
y_test.extend(fake_test_labels)

print(f"✅ Test data: {len(real_test)} REAL, {len(fake_test)} FAKE")

if len(X_train) == 0:
    print("\n❌ No training images found!")
    exit()

# =====================================================
# TRAIN MODEL
# =====================================================
print("\n🏗️ Training Random Forest model...")

X_train = np.array(X_train)
y_train = np.array(y_train)

model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# =====================================================
# EVALUATE
# =====================================================
if len(X_test) > 0:
    X_test = np.array(X_test)
    y_test = np.array(y_test)
    y_pred = model.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    print(f"\n✅ Test Accuracy: {accuracy * 100:.2f}%")

# =====================================================
# SAVE MODEL
# =====================================================
print("\n💾 Saving model...")
joblib.dump(model, 'image_notification_model.pkl')
print("✅ Model saved as 'image_notification_model.pkl'")

print("\n" + "=" * 60)
print("✅ TRAINING COMPLETE!")
print("=" * 60)