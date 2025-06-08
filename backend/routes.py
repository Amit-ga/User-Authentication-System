from flask import Blueprint, request, jsonify
from passlib.hash import bcrypt
import jwt
from config import JWT_SECRET, ALGORITHM
from utils import is_valid_email, is_valid_password

auth_bp = Blueprint('auth', __name__)
users_db = {}

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.json
    if not data:
        return jsonify({"error": "Empty request"}), 400
    email = data.get("email")
    valid_email = is_valid_email(email)
    if not list(valid_email.keys())[0]:
        return jsonify({"error": list(valid_email.values())[0]}), 401
    password = data.get("password")
    valid_password = is_valid_password(password)
    if not list(valid_password.keys())[0]:
        return jsonify({"error": list(valid_password.values())[0]}), 401
    users_db[email] = bcrypt.hash(password) # secure password with hash before storing
    print('users_db', users_db)
    return jsonify({"message": "Registered successfully"}), 200 # convert python dict to json response

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    if not data:
        return jsonify({"error": "Empty request"}), 400
    email = data.get("email")
    password = data.get("password")
    if not email or not password:
        return jsonify({"error": "Empty credentials"}), 400
    hashed = users_db.get(email)
    if not hashed or not bcrypt.verify(password, hashed):
        return jsonify({"error": "Invalid credentials"}), 401

    token = jwt.encode({"sub": email}, JWT_SECRET, algorithm=ALGORITHM)
    return jsonify({"token": token})