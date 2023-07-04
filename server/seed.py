#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Artwork, UserArtwork, Review

#User Seed
def create_users():
    users = []
    for _ in range(50):
        user = User(
            username = fake.name(),
            password_hash = 'password',
            email = fake.email(),
            cart = fake.word(),
            created_at = fake.date_time(),
            updated_at = fake.date_time()
        )
        users.append(user)
    return users

#Artwork Seed
def create_artworks(users):
    artworks = []
    genres = ["Abstract","Impressionism","Surrealism","Cubism","Realism","Expressionism","Pop Art","Minimalism","Photorealism","Digital Art"]
    for _ in range (20):
        artwork = Artwork(
            user_id = rc([user.id for user in users]),
            genre = rc(genres),
            price = randint(5,25),
            title = fake.word(),
            image = fake.image_url(width=200, height=200),
            created_at = fake.date_time(),
            updated_at = fake.date_time()
        )
        artworks.append(artwork)
    return artworks

#User Artwork Seed
def create_user_artworks(users, artworks):
    user_artworks = []
    for _ in range (50):
        user_artwork = UserArtwork(
            user_id = rc([user.id for user in users]),
            artwork_id = rc([artwork.id for artwork in artworks]),
            created_at = fake.date_time(),
            updated_at = fake.date_time()
        )
        user_artworks.append(user_artwork)
    return user_artworks

#Review Seed
def create_reviews(users, artworks):
    reviews = []
    for _ in range (50):
        review = Review(
            user_id = rc([user.id for user in users]),
            artwork_id = rc([artwork.id for artwork in artworks]),
            rating = randint(1,10),
            created_at = fake.date_time(),
            description = fake.sentence()
        )
        reviews.append(review)
    return reviews

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Clearing the canvas...")
        User.query.delete()
        Artwork.query.delete()
        UserArtwork.query.delete()
        Review.query.delete()

        print('Prepping the paint')
        users = create_users()
        db.session.add_all(users)
        db.session.commit()

        print('Painting the Canvas')
        artworks = create_artworks(users)
        db.session.add_all(artworks)
        db.session.commit()

        print('Critique mode engaged')
        reviews = create_reviews(users, artworks)
        db.session.add_all(reviews)
        db.session.commit()

        print('and Walla!')
        user_artworks = create_user_artworks(users, artworks)
        db.session.add_all(user_artworks)
        db.session.commit()

