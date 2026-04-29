import pytesseract
from PIL import Image

# Tesseract path
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

# 🔥 TAKE IMAGE INPUT FROM USER
image_path = input("Enter image path: ")

# Load image
img = Image.open(image_path)

# Extract text
text = pytesseract.image_to_string(img)

print("\nExtracted Text:\n", text)

# FAKE KEYWORDS
fake_keywords = [
    "cancelled forever","closed permanently","all students pass","no exams ever",
    "without exams","all exams cancelled","schools closed forever","universities shut down",
    "education system closed","no more studies","all classes cancelled","holiday for whole year",
    "permanent vacation","government closed schools forever","no need to attend school",
    "automatic promotion","everyone passed","no result announcement","no exams required",
    "free degrees for all","all boards cancelled","fake announcement","viral news",
    "share this message","forward this news","urgent message","breaking shocking news",
    "students promoted automatically","no admission required","all universities closed",
    "fake notification","not official","unverified news","rumor alert","fake circular",
    "fake update","exam system removed","degree without study","government decision leaked",
    "unauthorized notice","false information","misleading news","fake alert",
    "click to share","send to everyone","important viral message","this is not real",
    "fake news alert","education cancelled","schools banned permanently"
]

# COUNT MATCHES
match_count = 0

for word in fake_keywords:
    if word in text.lower():
        match_count += 1

# SCORE
total_keywords = len(fake_keywords)
score = (match_count / total_keywords) * 100

# RESULT
if match_count > 0:
    print("\nPrediction: FAKE NEWS ❌")
    print(f"Confidence: {score:.2f}%")
else:
    print("\nPrediction: REAL NEWS ✅")
    print(f"Confidence: {100 - score:.2f}%")