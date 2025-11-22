import random
import time

# simple in-memory OTP storage
otp_data = {}

def generate_otp():
    return str(random.randint(100000, 999999))

def save_otp(email, otp):
    otp_data[email] = {"otp": otp, "timestamp": time.time()}

def verify_otp(email, otp):
    if email not in otp_data:
        return False

    stored = otp_data[email]["otp"]
    timestamp = otp_data[email]["timestamp"]

    # OTP expires in 5 minutes
    if time.time() - timestamp > 300:
        return False

    return otp == stored

def clear_otp(email):
    if email in otp_data:
        del otp_data[email]