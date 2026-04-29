import pytesseract
from PIL import Image

# Tesseract path (VERY IMPORTANT)
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

# Load image
img = Image.open(r"D:\rana\fake_news_project\test.jpeg")

# Extract text
text = pytesseract.image_to_string(img)

print("Extracted Text:")
print(text)