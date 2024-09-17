from flask import Blueprint, jsonify

from ..utils.queries import (
    get_different_types_of_products,
    get_top_five_expensive_categories,
    get_top_five_expensive_products,
    get_total_categories_in_stock,
    get_total_products_in_stock,
    get_total_value_of_products_in_stock,
)

from flask_jwt_extended import jwt_required

home_bp = Blueprint(
    "home",
    __name__,
)


@home_bp.route("/data", methods=["GET"])
# @jwt_required
def dashboard():
    total_categories_in_stock = get_total_categories_in_stock()
    total_products_in_stock = get_total_products_in_stock()
    total_value_of_products_in_stock = get_total_value_of_products_in_stock()
    different_types_of_products = get_different_types_of_products()
    top_five_categories = get_top_five_expensive_categories()
    top_five_products = get_top_five_expensive_products()

    return jsonify(
        {
            "total_category_in_stock": total_categories_in_stock,
            "total_products_in_stock": total_products_in_stock,
            "total_values_of_products_in_stocke": total_value_of_products_in_stock,  # this is incorrect, it should be query_get_total_quantity_product.
            "different_types_of_products": different_types_of_products,
            "top_five_product": top_five_products,
            "top_five_category": top_five_categories
        }
    )
