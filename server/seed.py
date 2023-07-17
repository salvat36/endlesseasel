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
    images = [
        'https://images.nightcafe.studio/jobs/lU1FhnvdaV3eQrUsDLtt/lU1FhnvdaV3eQrUsDLtt--1--m3kz0.jpg?tr=w-1080,c-at_max', 
        'https://images.nightcafe.studio/jobs/lU1FhnvdaV3eQrUsDLtt/lU1FhnvdaV3eQrUsDLtt--1--m3kz0.jpg?tr=w-1080,c-at_max', 
        'https://images.nightcafe.studio/jobs/ctXeXAuZ7G8AxSSxv69q/ctXeXAuZ7G8AxSSxv69q--1--uxm3h.jpg?tr=w-1080,c-at_max', 
        'https://images.nightcafe.studio/jobs/SnURjssXWqHtwrhuRXSl/SnURjssXWqHtwrhuRXSl--1--rd0u7.jpg?tr=w-1080,c-at_max', 
        'https://images.nightcafe.studio/jobs/URRBNaKX4O9uB4agPixH/URRBNaKX4O9uB4agPixH--1--c1ws1.jpg?tr=w-1080,c-at_max', 
        'https://images.nightcafe.studio/jobs/lBLO4sv9pn0iLHGRt8gx/lBLO4sv9pn0iLHGRt8gx--1--l3hif.jpg?tr=w-1080,c-at_max', 
        'https://images.nightcafe.studio/jobs/6SCO9Kgttx7mCnBKQHdT/6SCO9Kgttx7mCnBKQHdT--1--afkie.jpg?tr=w-1080,c-at_max', 
        'https://images.nightcafe.studio/jobs/8TwA1zNtYpdd7RkqvjNX/8TwA1zNtYpdd7RkqvjNX--1--3ci6o.jpg?tr=w-320,c-at_max', 
        'https://images.nightcafe.studio/jobs/dg6YnuocQJDEhsf2Xy0n/dg6YnuocQJDEhsf2Xy0n--1--3pl6v.jpg?tr=w-320,c-at_max', 
        'https://images.nightcafe.studio/jobs/iEKfyjYzfD7NUunDk5lO/iEKfyjYzfD7NUunDk5lO--1--yqdlr.jpg?tr=w-320,c-at_max', 
        'https://images.nightcafe.studio/jobs/DTtILuTB3GYsWh8GwQpP/DTtILuTB3GYsWh8GwQpP--1--aha57.jpg?tr=w-320,c-at_max', 
        'https://images.nightcafe.studio/jobs/YeNMGidvNAEZwc9ARqWR/YeNMGidvNAEZwc9ARqWR--2--z1n0m.jpg?tr=w-320,c-at_max', 
        'https://images.nightcafe.studio/jobs/Ho9RMnhmbGY0MdIS64Gv/Ho9RMnhmbGY0MdIS64Gv--1--xtppr.jpg?tr=w-320,c-at_max', 
        'https://images.nightcafe.studio/jobs/7Qhzvqtuk1IwSsXnmAuD/7Qhzvqtuk1IwSsXnmAuD--1--wm6d1.jpg?tr=w-320,c-at_max', 
        'https://images.nightcafe.studio/jobs/E2ABbkCGUywonHRbWgxx/E2ABbkCGUywonHRbWgxx--1--d8eau.jpg?tr=w-320,c-at_max', 
        'https://images.nightcafe.studio/jobs/rS25PwjSJ5lCmaMNvRPL/rS25PwjSJ5lCmaMNvRPL--1--p3qw4.jpg?tr=w-320,c-at_max', 
        'https://images.nightcafe.studio/jobs/zZW4hoAnZShxguetnZ90/zZW4hoAnZShxguetnZ90--1--cad3b.jpg?tr=w-320,c-at_max', 
        'https://images.nightcafe.studio/jobs/pdG7zudKlK9nqgMVkmlT/pdG7zudKlK9nqgMVkmlT--1--jzek4.jpg?tr=w-320,c-at_max', 
        'https://images.nightcafe.studio/jobs/LGcffL44MiFf6hnme138/LGcffL44MiFf6hnme138--1--dd79u.jpg?tr=w-320,c-at_max', 
        'https://images.nightcafe.studio/jobs/Sb9CkFlTnf3aAImMt2g7/Sb9CkFlTnf3aAImMt2g7--1--1372m.jpg?tr=w-320,c-at_max', 
        'https://images.nightcafe.studio/jobs/KYDide4oXB6Q5NvwBHrI/KYDide4oXB6Q5NvwBHrI--1--dflzt.jpg?tr=w-320,c-at_max' 
        ]

    for i in range (20):
        artwork = Artwork(
            user_id = rc([user.id for user in users]),
            genre = rc(genres),
            price = randint(5,25),
            title = fake.word(),
            image = images[i],
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

        print('and voilà!')
        user_artworks = create_user_artworks(users, artworks)
        db.session.add_all(user_artworks)
        db.session.commit()

