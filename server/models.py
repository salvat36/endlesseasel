from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates

from config import db, bcrypt


# User Model
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True)
    _password_hash = db.Column(db.String)
    email = db.Column(db.String)
    cart = db.Column(db.String)

# User Password_Hash
    @hybrid_property
    def password_hash(self):
        return self._password_hash

# User Password_Hash Setter
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

# User Password_Hash Authentication
    def authenticate(self, password):
        return bcrypt.check_password_hash(self.password_hash, password.encode('utf-8'))

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTie, onupdate=db.func.now())

# User Representation
    def __repr__(self):
        return f'User {self.id}, {self.username}, {self.email}'


# Artwork Model
class Artwork(db.Model, SerializerMixin):
    __tablename__ = 'artworks'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    genre = db.Column(db.String)
    price = db.Column(db.Float)
    title = db.Column(db.String)
    image = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

# Artwork Representation
    def __repr__(self):
        return f'Artwork {self.id}, {self.user_id}, {self.title}, {self.image}'

# Reviews Model
class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    artwork_id = db.Column(db.Integer, db.ForeignKey('artwork.id'))
    rating = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, server_default = db.func.now())
    description = db.Column(db.String)

# Review Representation
    def __repr__(self):
        return f'Review {self.id}, {self.user_id}, {self.rating}, {self.description}'

#UserArtwork Model
class UserArtwork(db.Model, SerializerMixin):
    __tablename__ = 'userartworks'

    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    artwork_id = db.Column(db.Integer, db.ForeignKey('artwork.id'))
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

# UserArtwork Representation
    def __repr__(self):
        return f'UserArtwork {self.id}, {self.user_id}, {self.artwork_id}'

