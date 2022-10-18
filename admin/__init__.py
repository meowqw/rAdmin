from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask import Flask, jsonify, render_template, url_for, request, redirect, flash, request
from flask_login import LoginManager

import os
from admin import config


app = Flask(__name__)

app.config['SECRET_KEY'] = 'secret'
app.config['SQLALCHEMY_DATABASE_URI'] = f'mysql+pymysql://{config.DB_LOGIN}:{config.DB_PASS}@{config.DB_HOST}:{config.DB_PORT}/{config.DB_NAME}?charset=utf8mb4'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
manager = LoginManager(app)

app_root = os.path.dirname(os.path.abspath(__file__))


from admin import models, routes

with app.app_context():
    db.create_all()
