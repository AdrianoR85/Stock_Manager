from ..app import db 
from werkzeug.security import check_password_hash

class Staff(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  username = db.Column(db.String(20), unique=True, nullable=False)
  password = db.Column(db.String(20), nullable=False)

  def check_password(self, password):
    return check_password_hash(self.password, password)

  
class Product(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  pname = db.Column(db.String(20), unique=True, nullable=False)
  quantity = db.Column(db.Integer, nullable=False, default=0)
  price = db.Column(db.Integer, nullable=False, default=0.00)

  def validate(self) -> list:
    error = []
    if self.pname.isnumeric():
      error.append({'name_error':'name must be alpha or lower'})
    if len(self.pname) < 2:
      error.append({'name_error': 'name must be at least 3 characters long'})
    if self.quantity < 0:
      error.append({'quantity_error': 'quantity must be a positive number'})
    if self.price < 0:
      error.append({'price_error': 'price must be a positive float'})
    
    return error
  
  def to_dict(self):
    return {
      'id': self.id,
      'name': self.pname,
      'quantity': self.quantity,
      'price': self.price
    }


