import json
from flask import Flask, Blueprint, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import func, or_
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm import DeclarativeBase
from flask_cors import CORS
from modelsDB import NewsModel, AsylumCountryModel, SupportGroupsModel
class Base(DeclarativeBase):
    pass

search_news_api = Blueprint('search_news_api', __name__)
search_asylum_countries_api = Blueprint('search_asylum_countries_api', __name__)

@search_news_api.route('/<query>', methods=['GET'])
def get_search_results(query):
    try:
        search_words = query.split()
        # return search_words
        results = {}
        for word in search_words:
            word_results = perform_news_search(word)
            # TODO Check for duplicates 
            results['news'] = word_results
        return jsonify(results)
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@search_news_api.route('/api/test', methods=['GET'])
def get_search_results_test():
    try:
        temp = {'hello': 'hello2'}
        return jsonify(temp)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def perform_news_search(word):
    word_lower = word.lower()
    results = NewsModel.query.filter(or_(func.lower(NewsModel.title).like(f"%{word_lower}%"), 
                                         func.lower(NewsModel.content).like(f"%{word_lower}%"),
                                         func.lower(NewsModel.author).like(f"%{word_lower}%"),
                                         func.lower(NewsModel.description).like(f"%{word_lower}%"),
                                         func.lower(NewsModel.source_name).like(f"%{word_lower}%"))).all()
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

################################################################

@search_asylum_countries_api.route('/<query>', methods=['GET'])
def get_search_results(query):
    try:
        search_words = query.split()
        # return search_words
        results = {}
        for word in search_words:
            word_results = perform_countries_search(word)
            # TODO Check for duplicates 
            results['countries'] = word_results
        return jsonify(results)
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
def perform_countries_search(word):
    word_lower = word.lower()
    results = AsylumCountryModel.query.filter(or_(func.lower(AsylumCountryModel.name).like(f"%{word_lower}%"), 
                                         func.lower(AsylumCountryModel.capital).like(f"%{word_lower}%"),
                                         func.lower(AsylumCountryModel.flag).like(f"%{word_lower}%"),
                                         func.lower(AsylumCountryModel.languages).like(f"%{word_lower}%"),
                                         func.lower(AsylumCountryModel.region).like(f"%{word_lower}%"))).all()
    found_results = []
    for countries_item in results:
        temp_dict = {
            'id': countries_item.id,
            'name': countries_item.name,
            'capital': countries_item.capital,
            'region': countries_item.region,
            'population': countries_item.population,
            'languages': countries_item.languages,
            'flag': countries_item.flag,
        }
        found_results.append(temp_dict)
    return found_results

################################################################


if __name__ == '__main__':  
   flaskApp.run(port=5000, debug=True)
   
