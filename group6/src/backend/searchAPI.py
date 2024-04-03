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
search_support_groups_api = Blueprint('search_support_groups_api', __name__)

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
    news_query = NewsModel.query.filter(or_(func.lower(NewsModel.title).like(f"%{word_lower}%"), 
                                         func.lower(NewsModel.content).like(f"%{word_lower}%"),
                                         func.lower(NewsModel.author).like(f"%{word_lower}%"),
                                         func.lower(NewsModel.description).like(f"%{word_lower}%"),
                                         func.lower(NewsModel.source_name).like(f"%{word_lower}%")))
    
    authors = request.args.get("authors", "")
    print("LENGTH: ", len(authors))

    if len(authors) > 0:
        possible_author_filters = ["zerohedge.com", "newsweek.com",
                                    "businessinsider.com", "ZEIT ONLINE: News -", "feedfeeder", "aol.com"]
        authors_list = [author.strip() for author in authors.split(',')]
        print("AUTHORS LIST: ", authors)

        if "Others" in authors_list:
            # Filter to include authors not in possible_author_filters
            for author in authors_list:
                if author in possible_author_filters:
                    possible_author_filters.remove(author)

            # Remove "others" from list to avoid errors
            authors_list.remove("Others")
            # Add additional authors to authors_list if needed, then filter
            news_query = news_query.filter(
                ~NewsModel.author.in_(possible_author_filters))

            print("POST OTHER COUNT: ", news_query.count())
        else:
            # Standard filtering by authors in authors_list
            news_query = news_query.filter(
                NewsModel.author.in_(authors_list))

    sources = request.args.get("sources", "")

    if len(sources) > 0:
        possible_source_filters = ["taz.de", "STERN.de",
                                    "Portfolio.hu", "Marketscreener.com", "Freerepublic.com",
                                    "DW (English)", "Diepresse.com", "Die Zeit", "Biztoc.com", "Others"]
        sources_list = [source.strip() for source in sources.split(',')]
        print("SOURCE LIST: ", sources)

        if "Others" in sources_list:

            for source in sources_list:
                if source in possible_source_filters:
                    possible_source_filters.remove(source)

            # Remove "others" from list to avoid errors
            sources_list.remove("Others")

            news_query = news_query.filter(
                ~NewsModel.source_name.in_(possible_source_filters))

        else:
            news_query = news_query.filter(
                NewsModel.source_name.in_(sources_list))

    sort_by = request.args.get('sort_by', 'id')
    order = request.args.get('order', 'asc')

    if sort_by == 'author':
        if order == 'asc':
            news_data = news_query.order_by(
                NewsModel.author.asc()).all()
        else:
            news_data = news_query.order_by(
                NewsModel.author.desc()).all()
    elif sort_by == 'title':
        if order == 'asc':
            news_data = news_query.order_by(
                NewsModel.title.asc()).all()
        else:
            news_data = news_query.order_by(
                NewsModel.title.desc()).all()
    elif sort_by == 'date':
        if order == 'asc':
            news_data = news_query.order_by(
                NewsModel.published_at.asc()).all()
        else:
            news_data = news_query.order_by(
                NewsModel.published_at.desc()).all()
    elif sort_by == 'source':
        if order == 'asc':
            news_data = news_query.order_by(
                NewsModel.source_name.asc()).all()
        else:
            news_data = news_query.order_by(
                NewsModel.source_name.desc()).all()
    elif sort_by == 'story':
        if order == 'asc':
            news_data = news_query.order_by(
                NewsModel.description.asc()).all()
        else:
            news_data = news_query.order_by(
                NewsModel.description.desc()).all()
    else:
        news_data = news_query.all()

    found_results = []
    for news_item in news_data:
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
    country_query = AsylumCountryModel.query.filter(or_(func.lower(AsylumCountryModel.name).like(f"%{word_lower}%"), 
                                         func.lower(AsylumCountryModel.capital).like(f"%{word_lower}%"),
                                         func.lower(AsylumCountryModel.flag).like(f"%{word_lower}%"),
                                         func.lower(AsylumCountryModel.languages).like(f"%{word_lower}%"),
                                         func.lower(AsylumCountryModel.region).like(f"%{word_lower}%")))
    
    regions = request.args.get("regions", "")
    regions_list = [region.strip() for region in regions.split(',')]

    if len(regions) > 0:
            country_query = country_query.filter(
                AsylumCountryModel.region.in_(regions_list))

    languages = request.args.get("languages", "")

    if len(languages) > 0:
        possible_languages_filters = ["Arabic", "English",
                                        "Spanish", "French", "Dutch", "German",
                                        "Other"]
        languages_list = [language.strip()
                            for language in languages.split(',')]

        if "Other" in languages_list:

            for language in languages_list:
                if language in possible_languages_filters:
                    possible_languages_filters.remove(language)

            # Remove "others" from list to avoid errors
            languages_list.remove("Other")

            country_query = country_query.filter(
                ~AsylumCountryModel.languages.in_(possible_languages_filters))

        else:
            country_query = country_query.filter(
                AsylumCountryModel.languages.in_(languages_list))

    sort_by = request.args.get('sort_by', 'id')
    order = request.args.get('order', 'asc')

    if sort_by == 'name':
        if order == 'asc':
            asylum_data = country_query.order_by(
                AsylumCountryModel.name.asc()).all()
        else:
            asylum_data = country_query.order_by(
                AsylumCountryModel.name.desc()).all()
    elif sort_by == 'capital':
        if order == 'asc':
            asylum_data = country_query.order_by(
                AsylumCountryModel.capital.asc()).all()
        else:
            asylum_data = country_query.order_by(
                AsylumCountryModel.capital.desc()).all()

    elif sort_by == 'region':
        if order == 'asc':
            asylum_data = country_query.order_by(
                AsylumCountryModel.region.asc()).all()
        else:
            asylum_data = country_query.order_by(
                AsylumCountryModel.region.desc()).all()
    elif sort_by == 'population':
        if order == 'asc':
            asylum_data = country_query.order_by(
                AsylumCountryModel.population.asc()).all()
        else:
            asylum_data = country_query.order_by(
                AsylumCountryModel.population.desc()).all()
    elif sort_by == 'languages':
        if order == 'asc':
            asylum_data = country_query.order_by(
                AsylumCountryModel.languages.asc()).all()
        else:
            asylum_data = country_query.order_by(
                AsylumCountryModel.languages.desc()).all()
    else:
        asylum_data = country_query.all()



    
    found_results = []
    for countries_item in asylum_data:
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

@search_support_groups_api.route('/<query>', methods=['GET'])
def get_search_results(query):
    try:
        search_words = query.split()
        # return search_words
        results = {}
        for word in search_words:
            word_results = perform_support_groups_search(word)
            # TODO Check for duplicates 
            results['support_groups'] = word_results
        return jsonify(results)
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
def perform_support_groups_search(word):
    word_lower = word.lower()
    support_group_query = SupportGroupsModel.query.filter(or_(func.lower(SupportGroupsModel.name).like(f"%{word_lower}%"), 
                                         func.lower(SupportGroupsModel.location).like(f"%{word_lower}%"),
                                         func.lower(SupportGroupsModel.mission_stmt).like(f"%{word_lower}%")))
    
    # regions = request.args.get("regions", "")
    # regions_list = [region.strip() for region in regions.split(',')]


    sort_by = request.args.get('sort_by', 'id')
    order = request.args.get('order', 'asc')

    if sort_by == 'name':
        if order == 'asc':
            support_group_data = support_group_query.order_by(
                SupportGroupsModel.name.asc()).all()
        else:
            support_group_data = support_group_query.order_by(
                SupportGroupsModel.name.desc()).all()
    elif sort_by == 'location':
        if order == 'asc':
            support_group_data = support_group_query.order_by(
                SupportGroupsModel.location.asc()).all()
        else:
            support_group_data = support_group_query.order_by(
                SupportGroupsModel.location.desc()).all()

    elif sort_by == 'region':
        if order == 'asc':
            support_group_data = support_group_query.order_by(
                SupportGroupsModel.mission_stmt.asc()).all()
        else:
            support_group_data = support_group_query.order_by(
                SupportGroupsModel.mission_stmt.desc()).all()
    else:
        support_group_data = support_group_query.all()


    # id = db.Column(db.Integer, primary_key=True)
    # name = db.Column(db.String(255), nullable=False)
    # location = db.Column(db.String(255), nullable=False)
    # phn_no = db.Column(db.String(16), nullable=False)
    # rating = db.Column(db.Double, nullable=False)
    # mission_stmt = db.Column(db.Text, nullable=False)
    # website_url = db.Column(db.Text, nullable=False)
    # picture_url = db.Column(db.Text, nullable=False)
    
    found_results = []
    for support_groups_item in support_group_data:
        temp_dict = {
            'id': support_groups_item.id,
            'name': support_groups_item.name,
            'location': support_groups_item.location,
            'phn_no': support_groups_item.phn_no,
            'rating': support_groups_item.rating,
            'mission_stmt': support_groups_item.mission_stmt,
            'website_url': support_groups_item.website_url,
            'picture_url': support_groups_item.picture_url,
        }
        found_results.append(temp_dict)
    return found_results


if __name__ == '__main__':  
   flaskApp.run(port=5000, debug=True)
   
