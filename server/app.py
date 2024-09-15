from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
from flask_cors import CORS
from flask_jwt_extended import JWTManager

import os

load_dotenv()

db = SQLAlchemy()

def create_app():
  app = Flask(__name__)
  app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
  app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
  
  # configuration of JWT
  app.config['JWT_SECRET_KEY'] = 'super-secret-key'


  # Initialize JWT and SQLAlchemy
  jwt = JWTManager(app)
  db.init_app(app)

  CORS(app)

  from .models.staff_model import Staff
  from .models.product_model import Product
  from .models.category_model import Category

  from .routes import auth, category, product
  app.register_blueprint(auth.user_bp, url_prefix='/user')
  app.register_blueprint(category.category_bp,)
  app.register_blueprint(product.product_bp)

  with app.app_context():
    db.create_all()
  
  return app

if __name__ == '__main__':
  app = create_app()
  app.run(debug=True)