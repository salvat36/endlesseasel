#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request
from flask_restful import Resource


# Local imports
from config import app, db, api
from models import User, Review, Artwork, UserArtwork
# Views go here!

# Home Route
@app.route('/')
def home():
    raise KeyError('wrong key')


if __name__ == '__main__':
    app.run(port=5555, debug=True, use_debugger=False, use_reloader=False)
