#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request
from flask_restful import Resource
from flask import Flask, request, make_response, session


# Local imports
from config import app, db, api
from models import User, Review, Artwork, UserArtwork


# Home Route
@app.route("/")
def home():
    return """
    <h1>EndlessEasel</h1>
    <img src='https://images.nightcafe.studio/jobs/YbfjF0xAPTQHTkbeCSCU/YbfjF0xAPTQHTkbeCSCU--1--1iy5g.jpg?tr=w-828,c-at_max' alt='not found' >
    """


# Signup Route
@app.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()
    try:
        new_user = User(
            password_hash=data.get("password"),
            username=data.get("username"),
            email=data.get("email"),
        )
        db.session.add(new_user)
        db.session.commit()
        session["user.id"] = new_user.id
        return make_response(new_user.to_dict(), 201)
    except Exception as e:
        return make_response({"errors": [str(e)]}, 400)


# Login Route
@app.route("/login", methods=["POST"])
def login():
    try:
        username = request.get_json().get("username")
        password_hash = request.get_json().get("password")
        user = User.query.filter_by(username=username).first()
        if user and user.authenticate(password_hash):
            session["user_id"] = user.id
            return make_response(user.to_dict(), 200)
    except Exception as e:
        return make_response({"error": str(e)}, 401)


# Logout Route
@app.route("/logout", methods=["DELETE"])
def logout():
    if session.get("user_id"):
        session["user_id"] = None
        return make_response({"message": "Logout successful"}, 204)
    return make_response({"error": "Unable to logout"})


# Authenticate Route
@app.route("/authenticate", methods=["GET"])
def get():
    id = session.get("user_id")
    user = db.session.get(User, id)
    if id and user:
        return make_response(user.to_dict(), 200)
    return make_response({"error": "Unauthorized"}, 401)


# View for ALL Users
class Users(Resource):
    def get(self):
        users = [a.to_dict() for a in User.query.all()]
        return make_response(users, 200)


api.add_resource(Users, "/users")


# Views for ONE User
class UserById(Resource):
    def get(self, id):
        user = db.session.get(User, id)
        if user:
            return make_response(user.to_dict(), 200)
        return make_response({"error": "User ID not found"}, 404)

    def delete(self, id):
        user = db.session.get(User, id)
        if user:
            db.session.delete(user)
            db.session.commit()
            return make_response("", 200)
        return make_response({"error": "User ID not found"})


api.add_resource(UserById, "/users/<int:id>")


# Views for ALL Artworks
class Artworks(Resource):
    def get(self):
        artworks = [a.to_dict() for a in Artwork.query.all()]
        return make_response(artworks, 200)


api.add_resource(Artworks, "/artworks")


# Views for ONE Artwork
class ArtworkById(Resource):
    def get(self, id):
        artwork = db.session.get(Artwork, id)
        if artwork:
            return make_response(artwork.to_dict(), 200)
        return make_response({"error": "Artwork not found"}, 404)


api.add_resource(ArtworkById, "/artworks/<int:id>")


# View for ALL UserArtworks
class UserArtworks(Resource):
    def get(self):
        user_artworks = [ua.to_dict() for ua in UserArtwork.query.all()]
        return make_response(user_artworks, 200)


api.add_resource(UserArtworks, "/user-artworks")


# View for ONE UserArtwork
class UserArtworkById(Resource):
    def get(self, id):
        user_artwork = db.session.get(UserArtwork, id)
        if user_artwork:
            return make_response(user_artwork.to_dict(), 200)
        return make_response({"error": "UserArtwork not found"}, 404)


api.add_resource(UserArtworkById, "/user-artworks/<int:id>")


# View for ALL Reviews
class Reviews(Resource):
    def get(self):
        reviews = [r.to_dict() for r in Review.query.all()]
        return make_response(reviews, 200)

    def post(self):
        data = request.get_json()
        try:
            new_review = Review(**data)
            db.session.add(new_review)
            db.session.commit()
            return make_response(new_review.to_dict(), 201)
        except Exception as e:
            return make_response({"errors": [str(e)]}, 400)


api.add_resource(Reviews, "/reviews")


# View for ONE Review
class ReviewById(Resource):
    def get(self, id):
        review = db.session.get(Review, id)
        if review:
            return make_response(review.to_dict(), 200)
        return make_response({"error": "Review not found"}, 404)

    def delete(self, id):
        review = db.session.get(Review, id)
        if review:
            db.session.delete(review)
            db.session.commit()
            return make_response("", 200)
        return make_response({"error": "Review ID not found"})


api.add_resource(ReviewById, "/reviews/<int:id>")


if __name__ == "__main__":
    app.run(port=5555, debug=True, use_debugger=False, use_reloader=False)
