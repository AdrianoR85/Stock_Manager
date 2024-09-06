from flask import Flask
import os
def create_app():
  app = Flask(__name__)
  app.config['DATABASE']=os.path.join('data', 'store.sqlite')

  try:
    os.makedirs('data')
  except OSError:
    pass

  from . import db
  db.init_app(app)

  from . import auth
  app.register_blueprint(auth.bp)

  return app