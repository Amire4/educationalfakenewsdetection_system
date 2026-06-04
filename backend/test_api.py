import requests

try:
    # Change: test-predict → predict
    response = requests.post('http://localhost:5000/api/predict', 
        json={'news_text': 'Punjab announces winter vacation for schools..'})  # ← "news_text" use karo
    
    print("Status Code:", response.status_code)
    print("Response:", response.json())
    
except Exception as e:
    print(f"Error: {e}")
    print("Make sure backend is running on port 5000")