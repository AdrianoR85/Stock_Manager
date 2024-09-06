from werkzeug.security import check_password_hash, generate_password_hash
from .db import get_db
from werkzeug.security import check_password_hash, generate_password_hash
from flask import Blueprint, url_for, request, jsonify

bp = Blueprint('auth', __name__, url_prefix='/auth')

@bp.route('/register', methods=['POST'])
def register():
  if request.method == 'POST':
    username = request.form.get('username')
    password = request.form.get('password')
    email = request.form.get('email')
    db = get_db()
    error = []

    if not username:
      error.append('Username is required.')
    elif not password:
      error.append('Password is required.')
    elif not email:
      error.append('Email is required.')

    if len(error) == 0:
      try:
        db.execute(
          'INSERT INTO user (username, password, email) VALUES (?,?,?)',
          (username, generate_password_hash(password), email)
        )
        db.commit()
        return jsonify({'success': True, 'message': 'User registered successfully'}), 200
      
      except db.IntegrityError:
        error.append(f"User {username} is already registered.")
    
    return jsonify({'success': False, 'message': error}), 400  
