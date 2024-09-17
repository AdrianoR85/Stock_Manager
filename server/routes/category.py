from flask import Blueprint, request, jsonify
from ..app import db
from ..models.category_model import Category
from sqlalchemy.exc import SQLAlchemyError

category_bp = Blueprint('category', __name__)

@category_bp.route('/category')
def get_category():
  categories = db.session.query(Category).all()
  return jsonify([category.to_dict() for category in categories])


@category_bp.route('/new_category', methods=['POST'])
def add_category():
  data =  request.get_json()
  name = data.get('name')

  if not name:
    return jsonify({'error': 'Name is required'}), 400
  
  existing_product = db.session.query(Category).filter_by(name=name).filter()
  if existing_product.first():
    return jsonify({'error': 'Category name already exists'}), 400
  
  category = Category(name=name)

  try:
    db.session.add(category)
    db.session.commit()
    return jsonify({'success': True}), 201
  except SQLAlchemyError as e:
    db.session.rollback()
    return jsonify({"error": "An error occurred while adding product"}), 500
