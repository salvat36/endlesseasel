#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request
from flask_restful import Resource
from flask import Flask, request, make_response, session


# Local imports
from config import app, db, api
from models import User, Review, Artwork, UserArtwork

# Views go here!


# Home Route
@app.route("/")
def home():
    return "<h1>EndlessEasel</h1>"


class Users(Resource):
    def get(self):
        users = [a.to_dict() for a in User.query.all()]
        return make_response(users, 200)


#! Need to add secret key to get this POST working
#     def post(self):
#         data = request.get_json()
#         try:
#             new_user = User(**data)
#             db.session.add(new_user)
#             db.session.commit()
#             session['user.id'] = new_user.id
#             return make_response(new_user.to_dict(), 201)
#         except Exception as e:
#             return make_response({'errors': [str(e)]}, 400)
api.add_resource(Users, "/users")


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


api.add_resource(Reviews, "/reviews")


# View for ONE Review
class ReviewById(Resource):
    def get(self, id):
        review = db.session.get(Review, id)
        if review:
            return make_response(review.to_dict(), 200)
        return make_response({"error": "Review not found"}, 404)


api.add_resource(ReviewById, "/reviews/<int:id>")


if __name__ == "__main__":
    app.run(port=5555, debug=True, use_debugger=False, use_reloader=False)
