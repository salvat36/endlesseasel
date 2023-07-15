#!/usr/bin/env python3

# Standard library imports
import json

# Remote library imports
from flask import request
from flask_restful import Resource
from flask import Flask, request, make_response, session


# Local imports
from config import app, db, api, openai
from models import User, Review, Artwork, UserArtwork


# 1.set prompt to a variable with request.get_json() to grab Data
# 2.create formik form on front end to create request to pass into variable here
# 3.collect response from the api
# 4.add response to the database
# 5.display database data to user as image or do I display response first??
# 6. limit rate requests or et?


# OpenAI Request
@app.route("/create")
def createImageFromPrompt():
    data = request.get_json()
    prompt = data.get('prompt')
    image = openai.Image.create(
        prompt="A cute baby turtle, ultra realistic, 4k high res, steampunk style",
        n=1,
        size="256x256",
    )

    image_url= {image['data'][0]['url']}
    return {'image_url': image_url}
    # return f"""
    # <h1>EndlessEasel</h1>
    # <img src={image['data'][0]['url']}>
    # """


@app.route("/artworks", methods=['POST'])
def createArtworkFromPrompt():
    data = request.get_json()
    try:
        new_artwork = Artwork(
            user_id=session['user.id'],
            genre=data.get("genre"),
            price=data.get("price"),
            title=data.get("title"),
            image=data.get('image'),
        )
        db.session.add(new_artwork)
        db.session.commit()
        # session["user.id"] = new_artwork.id
        return make_response(new_artwork.to_dict(), 201)
    except Exception as e:
        return make_response({"error": [str(e)]})


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
        db.session.rollback()
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
        else:
            raise ValueError("Incorrect username or password")
    except Exception as e:
        return make_response({"error": [str(e)]}, 401)


# Logout Route
@app.route("/logout", methods=["DELETE"])
def logout():
    try:
        if session.get("user_id"):
            session["user_id"] = None
            return make_response({"message": "Logout successful"}, 204)
        else:
            raise ValueError("User is not logged in")
    except ValueError as e:
        return make_response({"error": str(e)}, 401)


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
        try:
            user = db.session.get(User, id)
            if user:
                return make_response(user.to_dict(), 200)
            else:
                raise ValueError("No user ID found")
        except Exception as e:
            return make_response({"error": str(e)}, 404)

    def patch(self, id):
        if "user_id" not in session:
            return make_response({"error": "Unauthorized"}, 401)
        try:
            updated_user = User.query.filter_by(id=session.get("user_id")).first()
            if not updated_user:
                return make_response({"error": "User not found in database"}, 404)
            data = request.get_json()
            updated_user.username = data.get("username")
            updated_user.password = data.get("password")
            updated_user.email = data.get("email")
            db.session.commit()
            return make_response(updated_user.to_dict(), 200)
        except Exception as e:
            return make_response({"error": str(e)}, 422)

    def delete(self, id):
        if "user_id" not in session:
            return make_response({"error": "Unauthorized"}, 401)
        try:
            user = db.session.get(User, id)
            if user:
                db.session.delete(user)
                db.session.commit()
                return make_response("", 200)
        except Exception as e:
            return make_response({"error": [str(e)]})


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
        if "user_id" not in session:
            return make_response({"error": "Unauthorized"}, 401)
        try:
            artwork = db.session.get(Artwork, id)
            return make_response(artwork.to_dict(), 200)
        except Exception as e:
            return make_response({"errors": [str(e)]}, 404)


api.add_resource(ArtworkById, "/artworks/<int:id>")


# View for ALL UserArtworks
class UserArtworks(Resource):
    def get(self):
        if "user_id" not in session:
            return make_response({"error": "Unauthorized"}, 401)
        user_artworks = [ua.to_dict() for ua in UserArtwork.query.all()]
        return make_response(user_artworks, 200)

    def post(self):
        if "user_id" not in session:
            return make_response({"error": "Unauthorized"}, 401)
        data = request.get_json()
        try:
            new_UserArtwork = UserArtwork(
                user_id=session.get("user_id"), artwork_id=request.get_json()["id"]
            )
            db.session.add(new_UserArtwork)
            db.session.commit()
            return make_response(new_UserArtwork.to_dict(), 201)
        except Exception as e:
            return make_response({"errors": [str(e)]}, 400)


api.add_resource(UserArtworks, "/user-artworks")


# View for ONE UserArtwork
class UserArtworkById(Resource):
    def get(self, id):
        if "user_id" not in session:
            return make_response({"error": "Unauthorized"}, 401)
        if user_artwork := db.session.get(UserArtwork, id):
            return make_response(user_artwork.to_dict(), 200)
        return make_response({"error": "UserArtwork not found"}, 404)

    def delete(self, id):
        if "user_id" not in session:
            return make_response({"error": "Unauthorized"}, 401)
        user_id = session.get("user_id")
        if user_artwork := UserArtwork.query.filter_by(
            user_id=user_id, artwork_id=id
        ).first():
            db.session.delete(user_artwork)
            db.session.commit()
            return make_response("", 200)
        return make_response({"error": "UserArtwork not found"})


api.add_resource(UserArtworkById, "/user-artworks/<int:id>")


# View for ALL Reviews
class Reviews(Resource):
    def get(self):
        reviews = [r.to_dict() for r in Review.query.all()]
        return make_response(reviews, 200)

    def post(self):
        data = request.get_json()
        try:
            new_review = Review(
                user_id=session.get("user_id"),
                rating=data.get("rating"),
                description=data.get("description"),
                artwork_id=data.get("artwork_id"),
            )
            db.session.add(new_review)
            db.session.commit()
            return make_response(new_review.to_dict(), 201)
        except Exception as e:
            return make_response({"errors": [str(e)]}, 400)


api.add_resource(Reviews, "/reviews")


class ReviewsByArtworkId(Resource):
    def get(self, artwork_id):
        try:
            reviews = [
                r.to_dict() for r in Review.query.filter_by(artwork_id=artwork_id).all()
            ]
            return make_response(reviews, 200)
        except Exception as e:
            return make_response({"error": str(e)})


api.add_resource(ReviewsByArtworkId, "/artworks/<int:artwork_id>/reviews")


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
