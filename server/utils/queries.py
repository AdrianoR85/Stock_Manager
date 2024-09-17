from ..models.category_model import Category
from ..models.product_model import Product
from sqlalchemy import func, desc
from ..app import db


def get_total_categories_in_stock():
    query_result = db.session.query(Product.category_id).distinct().count()
    return [{"quantity":query_result}]


def get_total_products_in_stock():
    query_result = db.session.query(
        func.sum(Product.quantity).label("total_quantity")
    ).scalar()
    # total_products_in_stock = [{"quantity": row.total_quantity} for row in query_total_products_in_stock]
    return [{"quantity":query_result}]


def get_total_value_of_products_in_stock():
    query_result = db.session.query(
        func.sum(Product.price * Product.quantity).label("total_value")
    ).scalar()
    return [{"value":query_result}]


def get_different_types_of_products():
    query_result = db.session.query(Product).count()
    return [{"quantity":query_result}]


def get_top_five_expensive_categories():
    query = (
        db.session.query(
            Category.name,
            func.sum(Product.quantity).label(
                "quantity"
            ),
            func.sum(Product.price * Product.quantity).label("total_value"),
        )
        .join(Product, Product.category_id == Category.id)
        .group_by(Category.name)
        .order_by(desc("total_value"))
        .limit(5)
    )

    result = [
        {"category": row.name, "quantity": row.quantity, "total_value": row.total_value}
        for row in query.all()
    ]
    return result


def get_top_five_expensive_products():
    query = (
        db.session.query(
            Product.pname,
            func.sum(Product.quantity).label("quantity"),
            func.sum(Product.price * Product.quantity).label("total_value"),
        )
        .group_by(Product.pname)
        .order_by(desc("total_value"))
        .limit(5)
    )

    result = [
        {"product": row.pname, "quantity": row.quantity, "total_value": row.total_value}
        for row in query.all()
    ]
    return result
