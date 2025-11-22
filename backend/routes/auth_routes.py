from flask import Blueprint, request, jsonify

auth_bp = Blueprint("auth", __name__, url_prefix="/auth")

# simple in-memory users store for testing; replace with DB later
_users = {}

@auth_bp.post("/signup")
def signup():
    data = request.json or {}
    email = data.get("email")
    password = data.get("password")
    if not email or not password:
        return jsonify({"error": "email and password required"}), 400
    if email in _users:
        return jsonify({"error": "user exists"}), 400
    _users[email] = {"password": password}
    return jsonify({"message": "signup successful"}), 201

@auth_bp.post("/login")
def login():
    data = request.json or {}
    email = data.get("email")
    password = data.get("password")
    if not email or not password:
        return jsonify({"error": "email and password required"}), 400
    user = _users.get(email)
    if not user or user.get("password") != password:
        return jsonify({"error": "invalid credentials"}), 401
    return jsonify({"message": "login successful"}), 200
