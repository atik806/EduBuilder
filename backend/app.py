import os
import secrets
import json
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import firebase_admin
from firebase_admin import credentials, db

# === Setup Firebase Credential from environment ===
cred_json = os.environ.get('GOOGLE_CREDENTIALS')
cred_dict = json.loads(cred_json)
cred = credentials.Certificate(cred_dict)

# === Initialize Firebase ===
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://edubuilder-e8208-default-rtdb.firebaseio.com/'
})

# === Flask App Config ===
app = Flask(__name__, static_folder='../frontend', static_url_path='')
CORS(app)

# === Admin Login Users ===
allowed_users = {
    'Admin@gmail.com': '15902580'
}
admin_tokens = set()

# === Routes ===
@app.route('/')
def serve_index():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory(app.static_folder, path)

@app.route('/api/contact', methods=['POST'])
def contact():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    message = data.get('message')

    if not name or not email or not message:
        return jsonify({'status': 'error', 'message': 'Missing fields'}), 400

    ref = db.reference('contacts')
    ref.push({
        'name': name,
        'email': email,
        'message': message
    })

    return jsonify({'status': 'success', 'message': f'Thank you for contacting us, {name}!'})

@app.route('/api/admin/login', methods=['POST'])
def admin_login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if username in allowed_users and allowed_users[username] == password:
        token = secrets.token_hex(16)
        admin_tokens.add(token)
        return jsonify({'token': token, 'user': username})

    return jsonify({'message': 'Invalid credentials'}), 401

@app.route('/api/admin/contacts', methods=['GET'])
def admin_get_contacts():
    auth_header = request.headers.get('Authorization')
    if not auth_header or not auth_header.startswith('Bearer '):
        return jsonify({'message': 'Missing or invalid Authorization header'}), 401

    token = auth_header.split(' ')[1]
    if token not in admin_tokens:
        return jsonify({'message': 'Invalid or expired token'}), 403

    ref = db.reference('contacts')
    contacts = ref.get()
    contacts_list = list(contacts.values()) if contacts else []

    return jsonify({'contacts': contacts_list})

if __name__ == '__main__':
    app.run(debug=True)
