from flask import Blueprint, request, jsonify
from ..app import db 
from ..models.category_model import Category
from sqlalchemy.exc import SQLAlchemyError
from flask_jwt_extended import jwt_required
category_bp = Blueprint('category', __name__)

@category_bp.route('/category', methods=['GET'])
# @jwt_required
def get_category():
  categories = db.session.query(Category).all()
  return jsonify([category.to_dict() for category in categories])
