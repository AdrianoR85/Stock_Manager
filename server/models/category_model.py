from ..app import db


class Category(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(50), unique=True, nullable=False)
  products = db.relationship("Product", backref="category", lazy=True)

  def validate(self) -> list:
    error = []
    if self.name.isnumeric():
      error.append({"name_error": "name must be alpha or lower"})
    if len(self.name) < 2:
      error.append({"name_error": "name must be at least 3 characters long"})

    return error
  
  def to_dict(self):
    return {
      "id": self.id,
      "name": self.name,
    }
