from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase
from flask_cors import CORS

class Base(DeclarativeBase):
    pass

db = SQLAlchemy(model_class=Base)

flaskApp = Flask(__name__)
CORS(flaskApp)
# configure the SQLite database, relative to the app instance folder
flaskApp.config["SQLALCHEMY_DATABASE_URI"] = "mysql+pymysql://ukraine_team_6:team6Ukraine$@ukraine-refugees-db.cbkes4k4cdrq.us-east-2.rds.amazonaws.com/ukraine_crisis_db"
# initialize the app with the extension
db.init_app(flaskApp)
