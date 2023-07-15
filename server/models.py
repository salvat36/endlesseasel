from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates

from config import db, bcrypt


# User Model
class User(db.Model, SerializerMixin):
    __tablename__ = "users"

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
        password_hash = bcrypt.generate_password_hash(password.encode("utf-8"))
        self._password_hash = password_hash.decode("utf-8")

    # User Password_Hash Authentication
    def authenticate(self, password):
        return bcrypt.check_password_hash(self.password_hash, password.encode("utf-8"))

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    # User Relationships
    user_artworks = db.relationship("UserArtwork", back_populates="user", cascade="all")
    reviews = db.relationship("Review", back_populates="user")
    artworks = association_proxy("user_artworks", "artwork")

    # User Serialization

    serialize_only = ("id", "username", "email", "cart", "artworks")

    # User Validations
    @validates("username")
    def validate_username(self, key, username):
        if len(username) not in range(8, 31):
            raise ValueError("Username length must be between 8-30 characters")
        return username

    @validates("password")
    def validate_password(self, key, password):
        if type(password) not in [str] or not range(8, 101):
            raise ValueError(
                "Password length must be between a minimum of 8 characters"
            )

    @validates("email")
    def validate_email(self, key, email):
        if type(email) not in [str] or not range(5, 31):
            raise ValueError("Email length must be between a minimum of 8 characters")
        
        duplicate_email = User.query.filter(User.email == email).first()
        if duplicate_email:
            raise ValueError('Email address is already registered')

        return email

    # User Representation
    def __repr__(self):
        return f"User {self.id}, {self.username}, {self.email}"


# Artwork Model
class Artwork(db.Model, SerializerMixin):
    __tablename__ = "artworks"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    genre = db.Column(db.String)
    price = db.Column(db.Float)
    title = db.Column(db.String)
    image = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    # Artwork Relationships
    user_artworks = db.relationship(
        "UserArtwork", back_populates="artwork", cascade="all"
    )
    reviews = db.relationship("Review", back_populates="artwork")
    users = association_proxy("user_artworks", "user")

    # Artwork Serialization
    serialize_only = ("id", "user_id", "genre", "price", "title", "image", "reviews")

    # Artwork Validations
    @validates('genre')
    def validate_genre(self, key, genre):
        if not genre:
            raise ValueError("Artwork must include a Genre")

    @validates('price')
    def validate_price(self, key, price):
        if not price or not isinstance(price, (int, float)):
            raise ValueError("Artwork must include a valid price")

    @validates('title')
    def validate_title(self, key, title):
        if not title or title not in type(str):
            raise ValueError("Artwork must include a title")
    

    # Artwork Representation
    def __repr__(self):
        return f"Artwork {self.id}, {self.user_id}, {self.title}, {self.image}"


# Reviews Model
class Review(db.Model, SerializerMixin):
    __tablename__ = "reviews"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    artwork_id = db.Column(db.Integer, db.ForeignKey("artworks.id"))
    rating = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    description = db.Column(db.String)

    # Review Relationships
    user = db.relationship("User", back_populates="reviews")
    artwork = db.relationship("Artwork", back_populates="reviews")

    # Review Serialization
    serialize_only = ("id", "user_id", "artwork_id", "rating", "description")

    # Review Representation
    def __repr__(self):
        return f"Review {self.id}, {self.user_id}, {self.rating}, {self.description}"


# UserArtwork Model
class UserArtwork(db.Model, SerializerMixin):
    __tablename__ = "user_artworks"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    artwork_id = db.Column(db.Integer, db.ForeignKey("artworks.id"))
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    # UserArtwork Relationships
    user = db.relationship("User", back_populates="user_artworks")
    artwork = db.relationship("Artwork", back_populates="user_artworks")

    # UserArtwork Serialization
    serialize_only = ("id", "user_id", "artwork_id")

    # UserArtwork Validations
    @validates("user_id", "artwork_id")
    def validate_userartwork(self, key, value):
        if (
            key == "user_id"
            and hasattr(self, "artwork_id")
            and self.query.filter_by(user_id=value, artwork_id=self.artwork_id).first()
        ):
            raise ValueError("The Art already exists in your collection!")
        elif (
            key == "artwork_id"
            and hasattr(self, "user_id")
            and self.query.filter_by(user_id=self.user_id, artwork_id=value).first()
        ):
            raise ValueError("The Art already exists in your collection!")
        return value

    # UserArtwork Representation
    def __repr__(self):
        return f"UserArtwork {self.id}, {self.user_id}, {self.artwork_id}"
