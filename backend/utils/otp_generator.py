# simple in-memory OTP store for demo/testing
import random
import time

otp_data = {}  # { email: { otp: "123456", ts: 1234 } }

def generate_otp():
    return str(random.randint(100000, 999999))

def save_otp(email, otp):
    otp_data[email] = {"otp": otp, "ts": time.time()}

def verify_otp(email, otp, expiry_seconds=300):
    entry = otp_data.get(email)
    if not entry:
        return False
    if time.time() - entry["ts"] > expiry_seconds:
        del otp_data[email]
        return False
    return entry["otp"] == otp

def clear_otp(email):
    otp_data.pop(email, None)
