# Going to use flask to get from the database and make it a rest API
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase

class Base(DeclarativeBase):
  pass

db = SQLAlchemy(model_class=Base)

flaskApp = Flask(__name__)
# configure the SQLite database, relative to the app instance folder
flaskApp.config["SQLALCHEMY_DATABASE_URI"] = "mysql+pymysql://ukraine_team_6:team6Ukraine$@ukraine-refugees-db.cbkes4k4cdrq.us-east-2.rds.amazonaws.com/ukraine_crisis_db"
# initialize the app with the extension
db.init_app(flaskApp)

# News Model
class NewsModel(db.Model):
    id = db.Column(db.Integer, primary_key=True) # main key to the news intance
    author = db.Column(db.String(255), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)  
    published_at = db.Column(db.DateTime, nullable=False)  
    source_name = db.Column(db.String(255), nullable=False) 
    content = db.Column(db.Text, nullable=False)  
    image_url = db.Column(db.String(255), nullable=True)
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
    rating = db.Column(db.Integer, nullable=False)
    region = db.Column(db.String(255), nullable=False)
    website_url = db.Column(db.Text, nullable=False)

@flaskApp.route("/")
def home():
    return "Welcome to Ukraine Crisis API v1"

# Route to fetch news data from the database
@flaskApp.route('/api/news', methods=['GET'])
def get_db_news():
    try:
        news_data = NewsModel.query.all()

        # Convert the query result to a list of dictionaries
        news_list = []
        for item in news_data:
            news_dict = {
                'author': item.author,
                'title': item.title,
                'description': item.description,
                'publishedAt': item.publishedAt,
                'name': item.name,
                'content': item.content,
                'urlToImage': item.urlToImage
            }
            news_list.append(news_dict)

        return jsonify(news_list)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Route to fetch country data from the database
@flaskApp.route('/api/asylum-countries', methods=['GET'])
def get_db_asylum_countries():
    try:
        asylum_data = AsylumCountryModel.query.all()

        # Convert the query result to a list of dictionaries
        asylum_list = []
        for item in asylum_data:
            country_dict = {
                'name': item.name,
                'capital': item.capital,
                'region': item.region,
                'population': item.population,
                'languages': item.languages,
                'flag': item.flag
            }
            asylum_list.append(country_dict)

        return jsonify(asylum_list)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@flaskApp.route('/api/asylum-countries/<country>', methods=['GET'])
def get_db_country_singular(country):
    try:
        country_data = AsylumCountryModel.query.filter_by(name=country).first()
        if(not country_data) :
            raise Exception("Country not found")
        country_dict = {
            'name': country_data.name,
            'capital': country_data.capital,
            'region': country_data.region,
            'population': country_data.population,
            'languages': country_data.languages,
            'flag': country_data.flag
        }
        return jsonify(country_dict)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Route to fetch support group data from the database
@flaskApp.route('/api/support-groups', methods=['GET'])
def get_db_support_groups():
    try:
        support_groups_data = SupportGroupsModel.query.all()
        support_groups_list = []
        for item in support_groups_data:
            support_group_dict = {
                'id': item.id,
                'name': item.name,
                'location': item.location,
                'phn_no': item.phn_no,
                'rating': item.rating,
                'region': item.region,
                'website_url': item.website_url
            }
            support_groups_list.append(support_group_dict)

        return jsonify(support_groups_list)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Sample data 
temp = [
    {"id": 1, "title": "News 1", "author": "Author 1"},
    {"id": 2, "title": "News 2", "author": "Author 2"}
]

@flaskApp.route("/api/sample-get", methods=['GET'])
def get_sample():
    return jsonify(temp), 200

@flaskApp.route('/api/sample-post', methods=['POST'])
def create_sample():
    try:
        data = request.json
        new_sample = {
            'id': len(temp) + 1,
            'title': data['title'],
            'author': data['author']
        }
        temp.append(new_sample)
        return jsonify(new_sample), 201
    except:
        return 400

if __name__ == "__main__":
    flaskApp.run(port=5000, debug=True);
