from ..app import db 
from werkzeug.security import check_password_hash

class Staff(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  username = db.Column(db.String(20), unique=True, nullable=False)
  password = db.Column(db.String(20), nullable=False)

  def check_password(self, password):
    return check_password_hash(self.password, password)