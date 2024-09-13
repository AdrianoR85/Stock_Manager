from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
from flask_cors import CORS

import os

load_dotenv()

db = SQLAlchemy()

def create_app():
  app = Flask(__name__)
  app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
  app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

  db.init_app(app)

  CORS(app)

  from .models.models import Staff, Product

  from .routes import auth, home, product
  app.register_blueprint(home.home_bp, url_prefix='/')
  app.register_blueprint(auth.user_bp, url_prefix='/user')
  app.register_blueprint(product.product_bp)

  with app.app_context():
    db.create_all()
  
  return app

if __name__ == '__main__':
  app = create_app()
  app.run(debug=True)