import json
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import func
from sqlalchemy.orm import sessionmaker
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

class NewsModel(db.Model):
    # main key to the news intance
    id = db.Column(db.Integer, primary_key=True)
    author = db.Column(db.String(255), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)
    published_at = db.Column(db.DateTime, nullable=False)
    source_name = db.Column(db.String(255), nullable=False)
    content = db.Column(db.Text, nullable=False)
    image_url = db.Column(db.String(255), nullable=True)
    # date_added = db.Column(db.DateTime, nullable=False)


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

@flaskApp.route('/api/search/<query>', methods=['GET'])
def get_search_results(query):
    try:
        search_words = query.split()
        # return search_words
        results = {}
        for word in search_words:
            word_results = perform_search(word)
            # TODO Check for duplicates 
            results['news'] = word_results
        return jsonify(results)
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@flaskApp.route('/api/test', methods=['GET'])
def get_search_results_test():
    try:
        temp = {'hello': 'hello2'}
        return jsonify(temp)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def perform_search(word):
    results = NewsModel.query.filter(func.match(NewsModel.title, NewsModel.content).against(word)).all()
    found_results = []
    for news_item in results:
        temp_dict = {
            'id': news_item.id,
            'author': news_item.author,
            'title': news_item.title,
            'description': news_item.description,
            'publishedAt': news_item.published_at,
            'name': news_item.source_name,
            'content': news_item.content,
            'urlToImage': news_item.image_url
        }
        found_results.append(temp_dict)
    return found_results

if __name__ == '__main__':  
   flaskApp.run(debug=True)