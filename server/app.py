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
@app.route('/')
def home():
    return '<h1>EndlessEasel</h1>'

class Users(Resource):
    def get(self):
        users = [user.to_dict() for user in User.query.all()]
        return make_response(users, 200)
    
    # def post(self):
    #     data = request.get_json()
    #     try:
    #         new_user = User(**data)
    #         db.session.add(new_user)
    #         db.session.commit()
    #         session['user.id'] = new_user.id
    #         return make_response(new_user.to_dict(), 201)
    #     except Exception as e:
    #         return make_response({'errors': [str(e)]}, 400)
api.add_resource(Users, '/users')





if __name__ == '__main__':
    app.run(port=5555, debug=True, use_debugger=False, use_reloader=False)
