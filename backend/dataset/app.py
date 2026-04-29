from flask import Flask, request, jsonify
import pytesseract
from PIL import Image

app = Flask(__name__)

# Tesseract path
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

# Fake keywords
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

@app.route('/predict', methods=['POST'])
def predict():
    file = request.files['image']
    
    img = Image.open(file)
    text = pytesseract.image_to_string(img)

    match_count = 0
    for word in fake_keywords:
        if word in text.lower():
            match_count += 1

    total_keywords = len(fake_keywords)
    score = (match_count / total_keywords) * 100

    if match_count > 0:
        result = "FAKE"
        confidence = score
    else:
        result = "REAL"
        confidence = 100 - score

    return jsonify({
        "prediction": result,
        "confidence": round(confidence, 2),
        "extracted_text": text
    })

if __name__ == '__main__':
    app.run(debug=True)