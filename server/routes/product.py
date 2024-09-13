from flask import Blueprint, request, jsonify
from server.app import db
from sqlalchemy.exc import SQLAlchemyError
from ..models.models import Product
from ..util.validation import empty_data
from flask_jwt_extended import jwt_required

product_bp = Blueprint('product', __name__, url_prefix='/products')

@product_bp.route('/', methods=['GET'])
@jwt_required()
def get_products():
  product_list = db.session.query(Product).all()
  return jsonify([product.to_dict() for product in product_list])

@product_bp.route('/register', methods=['POST'])
@jwt_required()
def add_product():
  name = request.form.get('name')
  quantity = request.form.get('quantity')
  price = request.form.get('price')

  if empty_data(name, quantity, price):
    return jsonify({'empty_error': 'All fields must be filled'})

  try:
    quantity = int(quantity)
    price = float(price)
  except ValueError:
    return jsonify({'error': 'Invalid quantity or price format'}), 400

  product = Product(pname=name, quantity=quantity, price=price)

  existing_product = db.session.query(Product).filter_by(pname=name).filter()

  if existing_product.first():
    return jsonify({'error': 'Product name already exists'}), 400

  errors = product.validate()

  if errors:
    return jsonify({'error': errors}), 400
  
  try:
    db.session.add(product)
    db.session.commit()
    return 'Product added successfully', 201
  except SQLAlchemyError:
    db.session.rollback()
    return jsonify({'error': 'An error occurred while adding product'}), 500
    

@product_bp.route('/product/<id>', methods=['GET'])
@jwt_required()
def get_product_by_id(id):
  product = Product.query.get_or_404(id)
  return jsonify({
    'id': product.id,
    'name': product.pname,
    'quantity': product.quantity,
    'price': product.price
  })
  

@product_bp.route('/product/<id>', methods=['PUT'])
@jwt_required()
def update_product(id):
  data = request.get_json()
  product = Product.query.get_or_404(id)

  if 'name' in data:
    product.pname = data['name']
  
  if 'quantity' in data:
    try:
      product.quantity = int(data['quantity'])
    except ValueError:
      return jsonify({'error': 'Invalid quantity format'}), 400
  
  if 'price' in data:
    try:
      product.price = float(data['price'])
    except ValueError:
      return jsonify({'error': 'Invalid price format'}), 400
  
  errors = product.validate()
  
  if errors:
    return jsonify({'error': errors}), 400
  try:
    db.session.commit()
    return jsonify({'message': 'Product updated successfully'})
  except SQLAlchemyError:
    db.session.rollback()
    return jsonify({'error': 'An error occurred while updating the product'}), 500
  

@product_bp.route('/product/<id>', methods=['DELETE'])
@jwt_required()
def delete_product(id):
  product = Product.query.get_or_404(id)
  try:
    db.session.delete(product)
    db.session.commit()
    return jsonify({'message': 'Product deleted successfully'})
  except SQLAlchemyError:
    db.session.rollback()
    return jsonify({'error': 'An error occurred while deleting the product'}), 500
  

  
