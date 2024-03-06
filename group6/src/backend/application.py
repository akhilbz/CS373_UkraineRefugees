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
    published_at = db.Column(db.String(255), nullable=False)
    source_name = db.Column(db.String(255), nullable=False)
    content = db.Column(db.Text, nullable=False)
    image_url = db.Column(db.Text, nullable=True)
    date_added = db.Column(db.DateTime, nullable=False)


class AsylumCountryModel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    capital = db.Column(db.String(255), nullable=False)
    region = db.Column(db.String(255), nullable=False)
    population = db.Column(db.Integer, nullable=False)
    languages = db.Column(db.String(255), nullable=False)
    flag = db.Column(db.Text, nullable=True)

class SupportGroupsModel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    location = db.Column(db.String(255), nullable=False)
    phn_no = db.Column(db.String(16), nullable=False)
    rating = db.Column(db.Double, nullable=False)
    mission_stmt = db.Column(db.Text, nullable=False)
    website_url = db.Column(db.Text, nullable=False)
    picture_url = db.Column(db.Text, nullable=False)
    
@application.route("/")
def home():
    return "Welcome to Ukraine Crisis API"


@application.route("/countries", methods=["GET"])
@cross_origin()
def countries():
    print("GRABBING COUNTRIES")
    return getCountries()

def populate_countries():
    countries_data = getCountries()  

    for country_info in countries_data:
        country = AsylumCountryModel(
            name=country_info["name"],
            capital=country_info.get("capital", "Not Available"),
            region=country_info.get("region", "Not Available"),
            population=country_info.get("population", 0),
            languages=country_info.get("languages", "Not Available"),
            flag=country_info.get("flag", "Not Available"),
        )
        db.session.add(country)
    
    try:
        db.session.commit()
    except Exception as e:
        db.session.rollback()  # Rollback the changes on error
        print(f"Error: {e}")  # Log or print the error
    finally:
        db.session.close()  # Close the session

@application.route("/news", methods=["GET"])
@cross_origin()
def news():
    print("GRABBING NEWS")
    return getNews()

def populate_news():
    news_data = getNews()
    
    for news in news_data:
        news = NewsModel(
            
        )
        db.session.add(news)
    
    try:
        db.session.commit()
    except Exception as e:
        db.session.rollback()  # Rollback the changes on error
        print(f"Error: {e}")  # Log or print the error
    finally:
        db.session.close()  # Close the session

@application.route("/supportGroups", methods=["GET"])
@cross_origin()
def supportGroup():
    print("GRABBING Support Group")
    return getInfo()

def populate_support_group():
    support_group_data = getInfo()
    
    for support_group in support_group_data:
        support_group_instance = SupportGroupsModel(
            name=support_group["Name"],
            location=support_group.get("Location", "Not Available"),
            phn_no=support_group.get("Phone", "Not Available"),
            rating=support_group.get("Rating", -1),
            mission_stmt=support_group.get("Mission_statement", "Mission statement not found"),
            website_url=support_group.get("Website", "Not Available"),
            picture_url=support_group.get("Picture", "Not Available")
        )
        db.session.add(support_group_instance)
    
    try:
        db.session.commit()
    except Exception as e:
        db.session.rollback()  # Rollback the changes on error
        print(f"Error: {e}")  # Log or print the error
    finally:
        db.session.close()  # Close the session

if __name__ == "__main__":
    application.run(port=5000, debug=True)