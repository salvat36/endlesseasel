# EndlessEasel
- Created by Ryan Salvato

## Introduction

- Welcome to EndlessEasel!  This app serves as a playground for Artists/Creators.  You're able to explore a collection of vast AI generated Artworks by other users.  Save your favorite works of art for later use and even generate your own artwork to share with the EndlessEasel community!

***
## Features

User Accounts: Users can easily sign up, log in, and manage their profiles. They have the flexibility to edit or delete their profile information as needed.

AI Art Gallery: Explore a diverse and extensive collection of AI-generated artworks contributed by other users.

Engagement and Interaction: Users can engage with the AI art community by leaving comments on artworks they appreciate or saving their favorite pieces to revisit later.

Creative Expression: Encouraging creativity, users can craft their own AI-generated image prompts. They have the freedom to bring to life whatever their heart and mind can envision using the power of AI.
## File Structure

```console
├── CONTRIBUTING.md    # Guidelines for contributors
├── LICENSE.md         # Project's license information
├── Pipfile            # Dependency specifications using Pipenv
├── Pipfile.lock       # Locked versions of dependencies
├── README.md          # This file - the project's README
├── client             # Frontend directory
│   ├── README.md      # Client-specific README
│   ├── build          # Build output for the client app
│   ├── node_modules   # Node.js dependencies
│   ├── package-lock.json   # Lock file for Node.js dependencies
│   ├── package.json   # Node.js package configuration
│   ├── public         # Static assets for the client app
│   └── src            # Source code for the client app
├── requirements.txt   # Python dependencies for the server
└── server             # Backend directory
    ├── app.py         # Main application file
    ├── config.py      # Configuration settings for the server
    ├── migrations     # Database migrations folder
    ├── models.py      # Data models for the server
    └── seed.py        # Data seeding script

```
## Cloning the Project
```bash
# Cloning the repo locally
$ git clone https://github.com/salvat36/endlesseasel

# Installing frontend dependencies
$ npm install

# Creating the python virtual environment and installing dependencies
$ pipenv install && pipenv shell

# Generating the secret key
$ python -c 'import secrets; print(secrets.token_hex())'
# Creating the dotenv file
$ touch .env
$ echo "FLASK_APP=index.py" >> .env
$ echo "SECRET_KEY=<your-secret-key>" >> .env

# If you're using an external postgres database
$ echo "POSTGRES_URL=<your-postgres-url>" >> .env

# Creating the database
$ cd server
$ flask db init
$ flask db migrate
$ flask db upgrade

# Starting the backend flask server
$ flask run

# Starting the frontend next server
$ cd client
$ npm start

```
## Packages Used

- Node Modules
- MUI
"@emotion/react"
"@emotion/styled"
"@mui/icons-material"
"@mui/material"

- React
"react"
"react-router-dom"
"react-dom"
"formik"
"yup"
 "eslint"

- Python Packages
flask-sqlalchemy 
flask-migrate 
sqlalchemy-serializer
flask-restful
flask-cors
flask-bcrypt
faker
python-dotenv
openai
sqlalchemy 
sqlalchemy-serializer
importlib
importlib-metadata
importlib-resources
python-dotenv
psycopg2-binary
openai

## Contributing

Contributions are more than welcome. Please follow the below 

- Fork the repo on GitHub
- Clone the project to your own machine
- Commit changes to your own branch
- Push your work back up to your fork
- Submit a Pull request so that we can review your changes

**NOTE: Be sure to merge the latest from "upstream" before making a pull request!

MIT License

Copyright (c) 2023 Ryan Salvato

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CO