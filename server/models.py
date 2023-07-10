from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates

from config import db, bcrypt


# User Model
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String)
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
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

# User Relationships
    user_artworks = db.relationship('UserArtwork', back_populates = 'user', cascade= 'all')
    reviews = db.relationship('Review', back_populates = 'user')
    artworks = association_proxy('user_artworks', 'artwork')

#!Add User Serialization 

    serialize_only = ('id', 'username', 'email', 'cart', 'artworks')

#! Add Validations

# User Representation
    def __repr__(self):
        return f'User {self.id}, {self.username}, {self.email}'


# Artwork Model
class Artwork(db.Model, SerializerMixin):
    __tablename__ = 'artworks'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    genre = db.Column(db.String)
    price = db.Column(db.Float)
    title = db.Column(db.String)
    image = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

#Artwork Relationships
    user_artworks = db.relationship('UserArtwork', back_populates = 'artwork', cascade='all')
    reviews = db.relationship('Review', back_populates = 'artwork')
    users = association_proxy('user_artworks', 'user')
    #DO WE NEED TO ADD USER to connect FK user_ID?

#!Add Artwork Serialization 
    serialize_only = ('id', 'user_id', 'genre', 'price', 'title', 'image', 'reviews')

#! Add Validations

# Artwork Representation
    def __repr__(self):
        return f'Artwork {self.id}, {self.user_id}, {self.title}, {self.image}'

# Reviews Model
class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    artwork_id = db.Column(db.Integer, db.ForeignKey('artworks.id'))
    rating = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, server_default = db.func.now())
    description = db.Column(db.String)

#Review Relationships
    user = db.relationship('User', back_populates='reviews')
    artwork = db.relationship('Artwork', back_populates = 'reviews')

#!Add Review Serialization 
    serialize_only = ('id', 'user_id', 'artwork_id', 'rating', 'description' )

#! Add Validations

# Review Representation
    def __repr__(self):
        return f'Review {self.id}, {self.user_id}, {self.rating}, {self.description}'
    

#UserArtwork Model
class UserArtwork(db.Model, SerializerMixin):
    __tablename__ = 'user_artworks'

    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    artwork_id = db.Column(db.Integer, db.ForeignKey('artworks.id'))
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

#UserArtwork Relationships
    user = db.relationship('User', back_populates = 'user_artworks')
    artwork = db.relationship('Artwork', back_populates = 'user_artworks')


#!Add UserArtwork Serialization 
    serialize_only = ('id', 'user_id', 'artwork_id')

#! Add Validations

# UserArtwork Representation
    def __repr__(self):
        return f'UserArtwork {self.id}, {self.user_id}, {self.artwork_id}'

