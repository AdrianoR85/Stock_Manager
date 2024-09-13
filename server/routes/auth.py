from server.app import db
from flask import Blueprint, request, jsonify, redirect, url_for
from server.models.models import Staff
from ..util.validation import check_password_sha2


user_bp = Blueprint("staff", __name__)

@user_bp.route("/login", methods=["POST"])
def login():
  data = request.get_json()
  username = data.get('username')
  password = data.get('password')
  error = []

  user = db.session.query(Staff).filter_by(username=username).first()

  if user:
    stored_hash = user.password

    if check_password_sha2(stored_hash, password):
      return jsonify({"success": True, "message": 'Login Successfully' }), 200
    else:
      return jsonify({"success": False, "message": "Invalid Password"}), 401

  return jsonify({"success": False, "message": "Invalid Username"}), 401
  
