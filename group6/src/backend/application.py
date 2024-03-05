from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin
from flask_migrate import Migrate
from scripts.countries import getCountries
from scripts.news import getNews
from scripts.supportGroups import getInfo


application = Flask(__name__)  # Create a Flask instance
application.config["SQLALCHEMY_DATABASE_URI"] = (
    "mysql+pymysql://ukraine_team_6:team6Ukraine$@ukraine-refugees-db.cbkes4k4cdrq.us-east-2.rds.amazonaws.com/ukraine_crisis_db"  # Add MySQL Database
)
db = SQLAlchemy(application)

CORS(application)
migrate = Migrate(application, db)


# News Model
class NewsModel(db.Model):
    id = db.Column(db.Integer, primary_key=True)  # main key to the news intance
    author = db.Column(db.String(255), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)
    published_at = db.Column(db.DateTime, nullable=False)
    source_name = db.Column(db.String(255), nullable=False)
    content = db.Column(db.Text, nullable=False)
    image_url = db.Column(db.Text, nullable=True)
    date_added = db.Column(db.DateTime, nullable=False)


class CountryModel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    capital = db.Column(db.String(255), nullable=False)
    region = db.Column(db.String(255), nullable=False)
    population = db.Column(db.Integer, nullable=False)
    languages = db.Column(db.String(255), nullable=False)
    flag = db.Column(db.Text, nullable=True)


@application.route("/")
def home():
    return "Welcome to Ukraine Crisis API"


@application.route("/countries", methods=["GET"])
@cross_origin()
def countries():
    print("GRABBING COUNTRIES")
    return getCountries()


@application.route("/news", methods=["GET"])
@cross_origin()
def news():
    print("GRABBING NEWS")
    return getNews()


@application.route("/supportGroups", methods=["GET"])
@cross_origin()
def supportGroup():
    print("GRABBING Support Group")
    return getInfo()


if __name__ == "__main__":
    application.run(port=5000, debug=True)

