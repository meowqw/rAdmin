from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask import Flask
from flask_login import LoginManager
from flask_admin import Admin
import os
from admin import config
from admin.views import MyAdminIndexView

app = Flask(__name__)

app.config['SECRET_KEY'] = 'secret'
app.config['SQLALCHEMY_DATABASE_URI'] = f'mysql+pymysql://{config.DB_LOGIN}:{config.DB_PASS}@{config.DB_HOST}:{config.DB_PORT}/{config.DB_NAME}?charset=utf8mb4'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
manager = LoginManager(app)

app_root = os.path.dirname(os.path.abspath(__file__))

new_Admin = Admin(app, name='RealtorBotAdmin', template_mode='bootstrap3', index_view=MyAdminIndexView())

from admin import admin, models, routes

with app.app_context():
    db.create_all()
