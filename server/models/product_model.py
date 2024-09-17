from ..app import db 

class Product(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  pname = db.Column(db.String(100), unique=True, nullable=False)
  quantity = db.Column(db.Integer, nullable=False, default=0)
  price = db.Column(db.Numeric(10,2), nullable=False, default=0.00)
  category_id = db.Column(db.Integer, db.ForeignKey('category.id'), nullable=False)


  def validate(self) -> list:
    error = []
    if self.pname.isnumeric():
      error.append({'name_error':'name must be alpha or lower'})
    if len(self.pname) < 2:
      error.append({'name_error': 'name must be at least 3 characters long'})
    if isinstance(self.quantity, str):
      error.append({'quantity_error': 'quantity must not be a string'})
    if self.quantity < 0:
      error.append({'quantity_error': 'quantity must be a positive number'})
    if isinstance(self.price, str) or self.price < 0:
      error.append({'price_error': 'price must be a positive number'})
    
    return error
  
  def to_dict(self):
    return {
      'id': self.id,
      'name': self.pname,
      'quantity': self.quantity,
      'price': self.price,
      'category': self.category.name 
    }