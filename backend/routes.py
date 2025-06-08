from flask import Blueprint, request, jsonify
from passlib.hash import bcrypt
import jwt
from pydantic import ValidationError
from config import JWT_SECRET, ALGORITHM
from models import RegisterModel, LoginModel, TokenResponse

auth_bp = Blueprint('auth', __name__)
users_db = {}

@auth_bp.route('/register', methods=['POST'])
def register():
    try:
        data = RegisterModel(**request.json)
    except ValidationError as e:
        return jsonify({"error": e.errors()}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 400
    if data.email in users_db:
        return jsonify({"error": "User already exists"}), 400
    if data.password != data.confirmPassword:
        return jsonify({"error": "Passwords do not match"}), 400
    users_db[data.email] = bcrypt.hash(data.password) # secure password with hash before storing
    print('users_db', users_db)
    return jsonify({"message": "Registered successfully"}), 200 # convert python dict to json response

@auth_bp.route('/login', methods=['POST'])
def login():
    try:
        data = LoginModel(**request.json)
    except ValidationError as e:
        return jsonify({"error": e.errors()}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 400
    hashed = users_db.get(data.email)
    if not hashed or not bcrypt.verify(data.password, hashed):
        return jsonify({"error": "Invalid credentials"}), 400

    token = jwt.encode({"sub": data.email}, JWT_SECRET, algorithm=ALGORITHM)
    return jsonify({"token": token})