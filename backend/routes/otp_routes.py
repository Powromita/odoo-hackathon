from flask import Blueprint, request, jsonify
from utils.otp_store import generate_otp, save_otp, verify_otp, clear_otp


otp_bp = Blueprint("otp", __name__, url_prefix="/otp")

# NOTE: In production send OTP via email/SMS. Here we print to console for testing.

@otp_bp.post("/forgot-password")
def forgot_password():
    data = request.json or {}
    email = data.get("email")
    if not email:
        return jsonify({"error": "email required"}), 400

    # optionally check if user exists (skipped if you want open flow)
    # if email not in users_db: return 404

    otp = generate_otp()
    save_otp(email, otp)

    # for dev: print OTP to terminal so you can copy it
    print(f"[DEV] OTP for {email}: {otp}")

    return jsonify({"message": "OTP sent"}), 200

@otp_bp.post("/verify-otp")
def verify_otp_route():
    data = request.json or {}
    email = data.get("email")
    otp = data.get("otp")
    if not email or not otp:
        return jsonify({"error": "email and otp required"}), 400

    if verify_otp(email, otp):
        clear_otp(email)  # optional: consume OTP on successful verify
        return jsonify({"message": "OTP verified"}), 200

    return jsonify({"error": "invalid or expired otp"}), 400

@otp_bp.post("/reset-password")
def reset_password():
    data = request.json or {}
    email = data.get("email")
    new_password = data.get("new_password") or data.get("password")  # accept either key
    if not email or not new_password:
        return jsonify({"error": "email and new_password required"}), 400

    # TODO: save new_password to your user DB. Here we just return success.
    # Example: users[email]["password"] = hash(new_password)
    print(f"[DEV] Password reset for {email}, new_password: {new_password}")
    return jsonify({"message": "password reset successful"}), 200
