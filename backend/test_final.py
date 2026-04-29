import requests

print("=" * 50)
print("🧪 TESTING YOUR FAKE NEWS DETECTION SYSTEM")
print("=" * 50)

test_cases = [
    # REAL NEWS (Should say REAL)
    ("Punjab Board announces matric exams from May 15, 2026", "REAL"),
    ("HEC announces scholarship for 5000 deserving students", "REAL"),
    ("Schools will reopen on Monday after summer break", "REAL"),
    
    # FAKE NEWS (Should say FAKE)
    ("Free laptops for all students", "FAKE"),
    ("Students get paid Rs.10,000 for attending school daily", "FAKE"),
    ("No fail policy announced for next 5 years", "FAKE"),
]

for news, expected in test_cases:
    response = requests.post("http://localhost:5000/api/detect-news", 
                            json={"news_text": news})
    result = response.json()
    
    status = "✅" if result['prediction'].upper() == expected else "❌"
    print(f"\n{status} Expected: {expected}")
    print(f"   News: {news[:50]}...")
    print(f"   Result: {result['prediction'].upper()} ({result['confidence']:.1f}%)")