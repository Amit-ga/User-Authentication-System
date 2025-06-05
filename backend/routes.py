from flask import Blueprint, request, jsonify
from passlib.hash import bcrypt
import jwt
from config import JWT_SECRET, ALGORITHM

auth_bp = Blueprint('auth', __name__)
users_db = {}

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.json
    email = data.get("email")
    password = data.get("password")
    users_db[email] = bcrypt.hash(password) # secure password with hash before storing
    print('users_db', users_db)
    return jsonify({"message": "Registered successfully"}) # convert python dict to json response

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    hashed = users_db.get(email)
    if not hashed or not bcrypt.verify(password, hashed):
        return jsonify({"detail": "Invalid credentials"}), 401

    token = jwt.encode({"sub": email}, JWT_SECRET, algorithm=ALGORITHM)
    return jsonify({"token": token})