from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required
from sqlalchemy.exc import SQLAlchemyError

from ..models.category_model import Category

from server.app import db

from ..models.product_model import Product
from ..utils.validation import empty_data


product_bp = Blueprint("product", __name__, url_prefix="/products")


@product_bp.route("/", methods=["GET"])
# @jwt_required()
def get_products():
    product_list = db.session.query(Product).join(Category).all()
    return jsonify([product.to_dict() for product in product_list])


@product_bp.route("/register", methods=["POST"])
# @jwt_required()
def add_product():
    data = request.get_json()
    name = data.get("name")
    quantity = data.get("quantity")
    price = data.get("price")
    category_id = data.get("category")

    try:
        quantity = int(quantity)
        price = float(price)
    except ValueError:
        return jsonify({"error": "Invalid quantity or price format"}), 400

    if empty_data(name, quantity, price):
        return jsonify({"empty_error": "All fields must be filled"})

    category = db.session.query(Category).filter_by(id=category_id).first()

    try:
        product = Product(
            pname=name, quantity=quantity, price=price, category_id=category.id
        )
    except AttributeError:
        return jsonify({"error": "Invalid category"}), 400

    existing_product = db.session.query(Product).filter_by(pname=name).filter()

    if existing_product.first():
        return jsonify({"error": "Product name already exists"}), 400

    errors = product.validate()

    if errors:
        return jsonify({"error": errors}), 400

    try:
        db.session.add(product)
        db.session.commit()
        return "Product added successfully", 201
    except SQLAlchemyError:
        db.session.rollback()
        return jsonify({"error": "An error occurred while adding product"}), 500


@product_bp.route("/product/<id>", methods=["GET"])
# @jwt_required()
def get_product_by_id(id):
    product = Product.query.get_or_404(id)
    return jsonify(
        {
            "id": product.id,
            "name": product.pname,
            "quantity": product.quantity,
            "price": product.price,
            "category_id": product.category_id,
            "category_name": product.category.name,
        }
    )


@product_bp.route("/product/<id>", methods=["PUT"])
# @jwt_required()
def update_product(id):
    data = request.get_json()
    product = Product.query.get_or_404(id)

    if "name" in data:
        product.pname = data["name"]

    if "quantity" in data:
        try:
            product.quantity = int(data["quantity"])
        except ValueError:
            return jsonify({"error": "Invalid quantity format"}), 400

    if "price" in data:
        try:
            product.price = float(data["price"])
        except ValueError:
            return jsonify({"error": "Invalid price format"}), 400

    errors = product.validate()

    if errors:
        return jsonify({"error": errors}), 400
    try:
        db.session.commit()
        return jsonify({"message": "Product updated successfully"})
    except SQLAlchemyError:
        db.session.rollback()
        return jsonify({"error": "An error occurred while updating the product"}), 500


@product_bp.route("/product/<id>", methods=["DELETE"])
# @jwt_required()
def delete_product(id):
    product = Product.query.get_or_404(id)
    try:
        db.session.delete(product)
        db.session.commit()
        return jsonify({"message": "Product deleted successfully"})
    except SQLAlchemyError:
        db.session.rollback()
        return jsonify({"error": "An error occurred while deleting the product"}), 500
