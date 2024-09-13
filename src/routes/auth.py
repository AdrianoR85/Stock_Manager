from src.app import db
from flask import Blueprint, request, jsonify, redirect, url_for
from src.models.models import Staff
from ..util.validation import check_password_sha2


user_bp = Blueprint("staff", __name__)

@user_bp.route("/login", methods=["POST"])
def login():
  if request.method == "POST":
    username = request.form.get("username")
    password = request.form.get("password") 

    user = db.session.query(Staff).filter_by(username=username).first()

    if user:
      stored_hash = user.password

      if check_password_sha2(stored_hash, password):
        return redirect(url_for("home.home"))
      else:
        return jsonify({"success": False, "message": "Invalid password"}), 401

    return jsonify({"success": False, "message": "Invalid username"}), 401
  
  return redirect(url_for("home.home"))
