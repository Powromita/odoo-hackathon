from flask import Flask
from flask_cors import CORS
from routes.auth_routes import auth_bp
from routes.otp_routes import otp_bp

def create_app():
    app = Flask(__name__)
    CORS(app)  # allow all origins (ok for dev); restrict in production
    app.register_blueprint(auth_bp)
    app.register_blueprint(otp_bp)
    return app

if __name__ == "__main__":
    app = create_app()
    app.run(host="127.0.0.1", port=5000, debug=True)
