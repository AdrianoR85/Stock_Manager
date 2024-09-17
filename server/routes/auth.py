from server.app import db
from flask import Blueprint, request, jsonify 
from server.models.staff_model import Staff
from ..util.validation import check_password_sha2
from flask_jwt_extended import create_access_token
from datetime import timedelta


user_bp = Blueprint("staff", __name__, url_prefix='/')

@user_bp.route("/login", methods=["POST"])
def login():
  data = request.get_json()
  username = data.get('username')
  password = data.get('password')

  user = db.session.query(Staff).filter_by(username=username).first()

  if user:
    stored_hash = user.password

    if check_password_sha2(stored_hash, password):
      access_token = create_access_token(identity=user.id, expires_delta=timedelta(minutes=30))
      return jsonify({"success": True, "token": access_token }), 200
    else:
      return jsonify({"success": False, "message": "Invalid Password"}), 401

  return jsonify({"success": False, "message": "Invalid Username"}), 401
  
