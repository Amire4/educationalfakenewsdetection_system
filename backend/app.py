# app.py - COMPLETELY FIXED VERSION

from dotenv import load_dotenv
import os

load_dotenv()

from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token
import joblib
from datetime import timedelta
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000", "http://127.0.0.1:3000"])

app.config['SECRET_KEY'] = 'edverify-secret-key-2024'
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

# Load model
print("=" * 50)
print("Loading your trained model...")
print("=" * 50)

try:
    model = joblib.load('pakistan_education_final_model.pkl')
    vectorizer = joblib.load('pakistan_education_final_vectorizer.pkl')
    print("Model loaded successfully!")
except Exception as e:
    print(f"Error loading model: {e}")
    model = None
    vectorizer = None

# Email config
SENDER_EMAIL = "ranaamirshahzad630@gmail.com"
SENDER_PASSWORD = "znmd wgxf yiir agzj"
RECEIVER_EMAIL = "ranaamirshahzad630@gmail.com"

users_db = {}

# Education keywords
education_keywords = [
    'exam', 'result', 'admission', 'scholarship', 'school', 'college', 
    'university', 'board', 'education', 'student', 'teacher', 'test',
    'degree', 'course', 'marks', 'grade', 'semester', 'laptop', 'paper',
    'date sheet', 'roll number', 'admit card', 'practical', 'theory',
    'annual', 'supplementary', 'special', 'retake', 'improvement'
]

# Real patterns
real_patterns = [
    # Exam Related
    'exam date announced', 'date sheet released', 'roll number slip',
    'admit card issued', 'result announced', 'practical exam schedule',
    'theory exam schedule', 'annual exam', 'supplementary exam',
    'special exam', 'retake exam', 'improvement exam', 'board exam',
    'university exam', 'college exam', 'school exam', 'mid term exam',
    'final term exam', 'pre board exam', 'mock exam', 'practice exam',
    'sample paper', 'model paper', 'past paper', 'previous paper',
    'solved paper', 'answer key', 'marking scheme', 'grading policy',
    'passing marks', 'minimum marks', 'required marks', 'exam center list',
    'exam postponed', 'exam rescheduled', 'exam fee submission',
    'exam form last date', 'exam admit card download', 'exam result date',
    
    # Scholarship Related
    'scholarship for deserving', 'need based scholarship', 'merit scholarship',
    'need cum merit', 'talent scholarship', 'sports scholarship',
    'special scholarship', 'minority scholarship', 'female scholarship',
    'provincial scholarship', 'national scholarship', 'international scholarship',
    'hec scholarship', 'punjab scholarship', 'sindh scholarship',
    'kpk scholarship', 'balochistan scholarship', 'gilgit scholarship',
    'ajk scholarship', 'fata scholarship', 'open merit', 'self finance',
    'sponsored scholarship', 'donor scholarship', 'scholarship application date',
    'scholarship interview date', 'scholarship test date', 'scholarship result date',
    'fully funded scholarship', 'partial scholarship',
    
    # Admission Related
    'admission schedule', 'admission form available', 'admission deadline extended',
    'classes start from', 'classes resume from', 'online admission portal',
    'school admission schedule', 'school registration dates',
    'college admission schedule', 'college registration dates',
    'university admission schedule', 'university registration dates',
    'admission open', 'admission closed', 'merit list announced',
    'waiting list released', 'fee structure announced',
    
    # Government/Board Related
    'ministry of education announced', 'hec announced',
    'punjab board announced', 'sindh board announced',
    'kpk board announced', 'balochistan board announced',
    'federal board announced', 'education minister said',
    'secretary education said', 'chairman hec said',
    'vice chancellor said', 'principal said', 'director education said',
    'chief minister approved', 'prime minister approved',
    'cabinet approved', 'education budget increased',
    'education funding allocated', 'development fund released',
    'education policy approved', 'new education policy',
    'education reforms announced', 'curriculum revised',
    'syllabus updated', 'books revised', 'textbooks updated',
    
    # School/College Related
    'school reopening date', 'school closing date', 'school holiday announced',
    'school timings changed', 'school fee structure', 'school uniform changed',
    'school transport facility', 'school meal program', 'midday meal scheme',
    'teacher training program', 'staff development program',
    'faculty development program', 'school library inaugurated',
    'school sports day', 'school annual function', 'parent teacher meeting',
    
    # Selection/Merit Related
    'selected on merit', 'select on merit', 'merit based selection',
    'on merit basis', 'merit list', 'open merit', 'merit position',
    'phase 3 selected student got laptops', 'phase 1 selected student got laptops',
    'laptop for selected students', 'eligible students list',
    
    # Result Related
    'result announced today', 'result declared', 'result out now',
    'check result online', 'result gazette', 'result statistics',
    'passing percentage', 'top position holders', 'topper list',
    
    # Vacation/Holiday Related
    'summer vacation announced', 'winter vacation announced',
    'spring break announced', 'fall break announced', 'public holiday',
    'school closed due to', 'college closed',
    
    # Other Real Education News
    'cctv cameras installed', 'monitor cameras in examination halls',
    'education task force', 'education commission report',
    'college prospectus released', 'degree distribution ceremony',
    'hostel allocation', 'transport service started', 'counseling session',
    'career fair announced', 'job fair in university', 'internship program',
]

# Fake patterns
fake_patterns = [
    # Free Items (Most Common Fakes)
    'free laptop', 'free ipad', 'free tablet', 'free car', 'free bike',
    'free e-bike', 'free motorcycle', 'free scooter', 'free iphone',
    'free mobile', 'free smartphone', 'free android', 'free samsung',
    'free airpods', 'free headphones', 'free smartwatch', 'free fitness band',
    'free power bank', 'free charger', 'free data cable', 'free sim card',
    'free internet package', 'free wifi', 'free dongle', 'free printer',
    'free scanner', 'free photocopier', 'free projector', 'free smartboard',
    'free whiteboard', 'free marker', 'free notebook', 'free diary',
    'free pen', 'free pencil', 'free scale', 'free geometry box', 'free bag',
    'free backpack', 'free school bag', 'free uniform', 'free shoes',
    'free socks', 'free tie', 'free badge', 'free id card', 'free lunch box',
    'free water bottle', 'free tiffin', 'free meal', 'free breakfast',
    'free snack', 'free milk', 'free juice', 'free cold drink',
    'free energy drink', 'free coffee', 'free tea', 'free biscuit',
    'free chocolate', 'free candy', 'free gift', 'free prize', 'free reward',
    'free incentive', 'free bonus', 'free voucher', 'free coupon',
    'free discount', 'free membership', 'free subscription', 'free trial',
    'free demo', 'free workshop', 'free seminar', 'free training',
    'free course', 'free certificate', 'free degree', 'free diploma',
    'free masters', 'free phd', 'free doctorate', 'free scholarship',
    'free stipend', 'free allowance', 'free grant', 'free funding',
    'free loan', 'free credit', 'free cash', 'free money', 'free cheque',
    'free draft', 'free transfer', 'free remittance', 'free wallet',
    'free paytm', 'free easypaisa', 'free jazzcash', 'free upaisa',
    'free sadapay', 'free nayapay', 'free job', 'free visa', 'free ticket',
    
    # Money/Cash Related
    'get paid', 'daily attendance reward', 'cash reward', 'cash prize',
    'cash bonus', 'cash incentive', 'cash back', 'cashback', 'money back',
    'refund', 'reimbursement', 'compensation', 'rs.5000', 'rs.10000',
    'rs.15000', 'rs.20000', 'rs.25000', 'rs.30000', 'rs.35000', 'rs.40000',
    'rs.45000', 'rs.50000', 'rs.55000', 'rs.60000', 'rs.65000', 'rs.70000',
    'rs.75000', 'rs.80000', 'rs.85000', 'rs.90000', 'rs.95000', 'rs.100000',
    'rupees', 'rupee reward', 'daily payout', 'weekly payment', 'hourly wage',
    'per day earning', 'per student payment', 'per head payment',
    
    # Exam Fakes
    'no fail policy', 'pass without exam', 'automatic pass', 'guaranteed pass',
    '100% pass', '100 percent pass', 'full marks', '100 marks', '100/100',
    'perfect score', 'perfect result', 'perfect marks', 'no exam',
    'exam cancelled', 'exam cancelled permanently', 'exam postponed fake',
    'exam eliminated', 'exam removed', 'exam abolished', 'exam scrapped',
    'exam terminated', 'exam discontinued', 'exam waived', 'exam exempted',
    'exam skipped', 'exam cheated', 'exam leaked', 'exam paper leak',
    'paper leak', 'answer key leak', 'guess paper', 'prediction paper',
    'sure paper', 'confirmed paper', 'expected paper',
    
    # Easy Marks/Promotion Fakes
    '50% marks guaranteed', '60% marks guaranteed', '70% marks guaranteed',
    '80% marks guaranteed', '90% marks guaranteed', '50 percent marks',
    '60 percent marks', '70 percent marks', '80 percent marks',
    '90 percent marks', 'just for filling form', 'filling form pass',
    'fill the form', 'submit form', 'complete form', 'registration only pass',
    'enrollment only', 'admission only', 'application only', 'attendance only',
    'presence only', 'sitting only', 'appearing only', 'showing up only',
    'coming only', 'being there only', 'existing only', 'breathing only',
    'living only', 'surviving only', 'promoted without exam',
    'without studying pass', 'without merit admission', 'no test required',
    
    # "All" Based Fakes
    'all students get', 'all students will', 'every student gets',
    'every student will', 'each student gets', 'each student will',
    'per student gets', 'per student will', 'student gets free',
    'students get free', 'every single student', 'absolutely every student',
    'literally every student', 'all will get', 'everyone will get',
    'scholarship to all', 'scholarship for all', 'given to all',
    'for every student', 'all without exam', 'all without merit',
    
    # No Criteria Fakes
    'without exception', 'without distinction', 'without discrimination',
    'regardless of merit', 'regardless of marks', 'regardless of attendance',
    'regardless of income', 'regardless of background', 'regardless of province',
    'no merit required', 'no marks needed', 'no criteria', 'no condition',
    'no requirement', 'no eligibility', 'no qualification', 'no prerequisite',
    'no precondition', 'no stipulation', 'no term', 'no rule', 'no regulation',
    'no policy', 'no law', 'no act', 'no ordinance', 'no decree', 'no statute',
    
    # Government Giving Fakes
    'government gives free', 'government announces free', 'government offering free',
    'government providing free', 'government distributing free',
    'government handing out free', 'government delivering free',
    'government sending free', 'government granting free', 'government awarding free',
    'PM announces free', 'PM offering free', 'PM providing free',
    'CM announces free', 'CM offering free', 'CM providing free',
    'chief minister free', 'prime minister free', 'president free',
    'governor free', 'mayor free', 'minister free', 'secretary free',
    
    # Viral/Forward Messages
    'forward this message', 'share this post', 'tag your friends',
    'comment below', 'subscribe now', 'follow us', 'like and share',
    'viral news', 'breaking news fake', 'urgent news', 'important announcement',
    'must read', 'must share', 'must forward', 'must inform', 'must tell',
    'must notify', 'must alert', 'must warn', 'hurry up', 'limited time',
    'limited offer', 'limited period', 'limited seats', 'limited stock',
    'limited quantity', 'limited supply', 'limited availability',
    'act now', 'apply now', 'register now', 'enroll now', 'join now',
    'buy now', 'order now', 'book now', 'reserve now', 'claim now',
    'get now', 'grab now', 'secure now', 'lock now', 'take now', 'avail now',
    'benefit now', 'profit now', 'earn now', 'make now', 'receive now',
    'obtain now', 'acquire now', 'gain now', 'win now', 'whatsapp viral',
    'facebook viral', 'instagram reel', 'tiktok viral', 'forward to everyone',
    'share maximum groups', 'send to all contacts', 'copy paste message',
    'chain message', 'chain mail', 'forward or else', '10 people forward',
    
    # Scholarship Fakes
    'instant scholarship', 'immediate scholarship', 'spot scholarship',
    'walk-in scholarship', 'on the spot scholarship', 'same day scholarship',
    'next day scholarship', 'within week scholarship', 'within month scholarship',
    'scholarship without application', 'scholarship without form',
    'scholarship without fee', 'scholarship without interview',
    'scholarship without test', 'scholarship without requirement',
    'scholarship without condition', 'scholarship without eligibility',
    '100% scholarship guaranteed', 'full scholarship without merit',
    
    # Job Fakes
    'free job', 'guaranteed job', 'instant job', 'immediate job', 'spot job',
    'walk-in job', 'on the spot job', 'same day job', 'next day job',
    'job without interview', 'job without test', 'job without experience',
    'job without degree', 'job without qualification', 'high salary guaranteed',
    'huge salary', 'massive salary', 'enormous salary', 'incredible salary',
    'unbelievable salary', 'astonishing salary', 'remarkable salary',
    
    # Previous Recipients Fakes
    'previous laptop recipients eligible', 'already received can apply',
    'already got can reapply', 'previous beneficiaries eligible',
    'past recipients eligible', 'former recipients eligible',
    'earlier recipients eligible', 'prior recipients eligible',
    'laptop already taken can apply', 'scholarship already taken can apply',
    'already availed can apply', 'already claimed can apply', 'already used can apply',
    
    # Political Fakes (Non-Education)
    'imran khan is died', 'imran khan died in jail', 'imran khan killed',
    'nawaz sharif died', 'zardari died', 'army chief resigned',
    'prime minister resigned fake', 'government collapsed',
    
    # Scheme Fakes
    'free laptop scheme', 'free ipad scheme', 'free tablet scheme',
    'free car scheme', 'free bike scheme', 'free mobile scheme',
    'cash reward scheme', 'monthly stipend scheme', 'daily payout scheme',
    'sarkari free scheme', 'government free offer', 'state free scheme',
    'pm laptop scheme fake', 'cm laptop scheme fake',
]

def detect_fake_news(text):
    text_lower = text.lower()
    
    fake_score = 0
    real_score = 0
    
    # ============================================
    # FAKE INDICATORS (Har fake word se +20 fake score)
    # ============================================
    fake_indicators = {
        'free': 25, 'gift': 25, 'prize': 20, 'reward': 20,
        'without': 25, 'money': 25, 'bonus': 20, '100%': 30,
        'guaranteed': 25, 'no exam': 30, 'without study': 30,
        'just fill form': 25, 'get paid': 25, 'daily earning': 25,
        'all students': 15, 'every student': 15, 'all will get': 20,
        'free laptop': 35, 'free ipad': 35, 'free scholarship': 35,
        'without merit': 30, 'no criteria': 25, 'no requirement': 25
    }
    
    # ============================================
    # REAL INDICATORS (Har real word se +20 real score)
    # ============================================
    real_indicators = {
        'selected on merit': 40, 'merit list': 30, 'merit based': 30,
        'exam date announced': 25, 'result announced': 25,
        'admission schedule': 20, 'board announced': 20,
        'education minister': 20, 'hec announced': 25,
        'scholarship for deserving': 30, 'need based': 25,
        'official notification': 25, 'government official': 20
    }
    
    # Calculate scores
    for word, score in fake_indicators.items():
        if word in text_lower:
            fake_score += score
            print(f"Fake indicator: {word} (+{score})")
    
    for word, score in real_indicators.items():
        if word in text_lower:
            real_score += score
            print(f"Real indicator: {word} (+{score})")
    
    # ============================================
    # DECISION BASED ON SCORES
    # ============================================
    
    # Special case: Merit selection always REAL
    if 'selected on merit' in text_lower or 'select on merit' in text_lower:
        print(f"✅ REAL: Merit selection found")
        return {'success': True, 'is_real': True, 'confidence': 98.0, 'prediction': 'real'}
    
    # Special case: Free + Scholarship without merit = FAKE
    if ('free' in text_lower and 'scholarship' in text_lower) and 'merit' not in text_lower:
        print(f"🚨 FAKE: Free scholarship without merit")
        return {'success': True, 'is_real': False, 'confidence': 99.0, 'prediction': 'fake'}
    
    # Compare scores
    if fake_score >= 30 and real_score < 20:
        print(f"🚨 FAKE: fake_score={fake_score}, real_score={real_score}")
        return {'success': True, 'is_real': False, 'confidence': min(99, fake_score), 'prediction': 'fake'}
    elif real_score >= 20 and fake_score < 30:
        print(f"✅ REAL: real_score={real_score}, fake_score={fake_score}")
        return {'success': True, 'is_real': True, 'confidence': min(95, real_score), 'prediction': 'real'}
    elif fake_score > real_score:
        print(f"⚠️ FAKE: fake_score({fake_score}) > real_score({real_score})")
        return {'success': True, 'is_real': False, 'confidence': 85.0, 'prediction': 'fake'}
    else:
        print(f"✅ REAL: real_score({real_score}) >= fake_score({fake_score})")
        return {'success': True, 'is_real': True, 'confidence': 85.0, 'prediction': 'real'}

# ========== API ROUTES ==========

@app.route('/', methods=['GET'])
def home():
    return jsonify({
        'message': 'Backend is running!',
        'endpoints': ['/api/predict', '/api/health', '/api/signup', '/api/login']
    }), 200

@app.route('/api/predict', methods=['POST', 'OPTIONS'])
def predict():
    """Main prediction endpoint - FIXED"""
    if request.method == 'OPTIONS':
        return '', 200
    
    try:
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No data provided', 'is_real': False, 'confidence': 0}), 400
        
        news_text = data.get('news_text', data.get('text', '')).strip()
        
        if not news_text:
            return jsonify({'error': 'News text required', 'is_real': False, 'confidence': 0}), 400
        
        if len(news_text) < 3:
            return jsonify({'error': 'Text too short (minimum 3 characters)', 'is_real': False, 'confidence': 0}), 400
        
        # Get prediction
        result = detect_fake_news(news_text)
        
        # Handle invalid/error case
        if not result.get('success', True):
            return jsonify({
                'error': result.get('error', 'Unable to analyze content'),
                'is_real': False,
                'confidence': 0
            }), 400
        
        # Get values - ensure confidence is a normal number
        is_real = result.get('is_real', False)
        confidence = result.get('confidence', 50.0)
        
        # Fix if confidence is weird (like 9500.0)
        if confidence > 100:
            confidence = confidence / 100  # Convert 9500 to 95
        confidence = min(max(confidence, 0), 100)  # Clamp to 0-100
        
        return jsonify({
            'success': True,
            'is_real': is_real,
            'prediction': 'real' if is_real else 'fake',
            'confidence': round(confidence, 1),
            'message': f"This news is {'REAL' if is_real else 'FAKE'} with {round(confidence, 1)}% confidence"
        }), 200
        
    except Exception as e:
        print(f"Prediction error: {e}")
        return jsonify({'error': str(e), 'is_real': False, 'confidence': 0}), 500

@app.route('/api/detect-news', methods=['POST', 'OPTIONS'])
def detect_news():
    """Alternative prediction endpoint"""
    if request.method == 'OPTIONS':
        return '', 200
    return predict()

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({
        'status': 'healthy',
        'users': len(users_db),
        'model_loaded': model is not None
    }), 200

@app.route('/api/signup', methods=['POST'])
def signup():
    try:
        data = request.get_json()
        name = data.get('name', '').strip()
        email = data.get('email', '').strip().lower()
        password = data.get('password', '')
        
        if not name or not email or not password:
            return jsonify({'detail': 'All fields required'}), 400
        
        if len(password) < 6:
            return jsonify({'detail': 'Password must be at least 6 characters'}), 400
        
        if email in users_db:
            return jsonify({'detail': 'Email already registered'}), 400
        
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        
        users_db[email] = {
            'name': name,
            'email': email,
            'password': hashed_password
        }
        
        access_token = create_access_token(identity=email, expires_delta=timedelta(days=1))
        
        return jsonify({
            'access_token': access_token,
            'token_type': 'bearer',
            'user': {'name': name, 'email': email}
        }), 201
    except Exception as e:
        return jsonify({'detail': str(e)}), 500

@app.route('/api/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        email = data.get('email', '').strip().lower()
        password = data.get('password', '')
        
        user = users_db.get(email)
        if not user:
            return jsonify({'detail': 'Invalid email or password'}), 401
        
        if not bcrypt.check_password_hash(user['password'], password):
            return jsonify({'detail': 'Invalid email or password'}), 401
        
        access_token = create_access_token(identity=email, expires_delta=timedelta(days=1))
        
        return jsonify({
            'access_token': access_token,
            'token_type': 'bearer',
            'user': {'name': user['name'], 'email': user['email']}
        }), 200
    except Exception as e:
        return jsonify({'detail': str(e)}), 500

@app.route('/api/contact', methods=['POST', 'OPTIONS'])
def handle_contact():
    if request.method == 'OPTIONS':
        return '', 200
    
    try:
        data = request.get_json()
        name = data.get('name', '')
        user_email = data.get('email', '')
        subject = data.get('subject', '')
        message = data.get('message', '')
        
        msg = MIMEMultipart()
        msg['From'] = SENDER_EMAIL
        msg['To'] = RECEIVER_EMAIL
        msg['Subject'] = f"New Contact Form Submission"
        
        body = f"""
New Contact Form Submission

Name: {name}
Email: {user_email}
Subject: {subject}
Message: {message}
        """
        
        msg.attach(MIMEText(body, 'plain'))
        
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(SENDER_EMAIL, SENDER_PASSWORD)
        server.send_message(msg)
        server.quit()
        
        return jsonify({'success': True, 'message': 'Message sent successfully'}), 200
        
    except Exception as e:
        print(f"Email error: {e}")
        return jsonify({'success': False, 'message': str(e)}), 500

if __name__ == '__main__':
    print("=" * 50)
    print("🚀 BACKEND RUNNING on http://localhost:5000")
    print("🤖 Fake News Detection API")
    print("📡 POST to /api/predict with {'news_text': 'your text'}")
    print("=" * 50)
    app.run(debug=True, port=5000)