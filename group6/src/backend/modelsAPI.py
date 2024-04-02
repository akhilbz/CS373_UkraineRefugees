# Going to use flask to get from the database and make it a rest API
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase
from flask_cors import CORS
from searchAPI import search_api
from modelsDB import db
from sqlalchemy import or_

class Base(DeclarativeBase):
    pass


# db = SQLAlchemy(model_class=Base)

flaskApp = Flask(__name__)
CORS(flaskApp)
# configure the SQLite database, relative to the app instance folder
flaskApp.config["SQLALCHEMY_DATABASE_URI"] = "mysql+pymysql://ukraine_team_6:team6Ukraine$@ukraine-refugees-db.cbkes4k4cdrq.us-east-2.rds.amazonaws.com/ukraine_crisis_db"
# initialize the app with the extension
db.init_app(flaskApp)

# class NewsModel(db.Model):
#     # main key to the news intance
#     id = db.Column(db.Integer, primary_key=True)
#     author = db.Column(db.String(255), nullable=False)
#     title = db.Column(db.String(255), nullable=False)
#     description = db.Column(db.Text, nullable=False)
#     published_at = db.Column(db.DateTime, nullable=False)
#     source_name = db.Column(db.String(255), nullable=False)
#     content = db.Column(db.Text, nullable=False)
#     image_url = db.Column(db.String(255), nullable=True)
#     # date_added = db.Column(db.DateTime, nullable=False)


# class AsylumCountryModel(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(255), nullable=False)
#     capital = db.Column(db.String(255), nullable=False)
#     region = db.Column(db.String(255), nullable=False)
#     population = db.Column(db.Integer, nullable=False)
#     languages = db.Column(db.String(255), nullable=False)
#     flag = db.Column(db.Text, nullable=True)


# class SupportGroupsModel(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(255), nullable=False)
#     location = db.Column(db.String(255), nullable=False)
#     phn_no = db.Column(db.String(16), nullable=False)
#     rating = db.Column(db.Double, nullable=False)
#     mission_stmt = db.Column(db.Text, nullable=False)
#     website_url = db.Column(db.Text, nullable=False)
#     picture_url = db.Column(db.Text, nullable=False)


@flaskApp.route("/")
def home():
    return "Welcome to Ukraine Crisis API v2"

# Route to fetch news data from the database


@flaskApp.route('/api/news', methods=['GET'])
def get_db_news():
    try:

        query = NewsModel.query
        authors = request.args.get("authors", "")
        news_query = NewsModel.query

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

        # news_data = NewsModel.query.all()

        # Convert the query result to a list of dictionaries
        news_list = []
        for item in news_data:
            news_dict = {
                'id': item.id,
                'author': item.author,
                'title': item.title,
                'description': item.description,
                'publishedAt': item.published_at,
                'name': item.source_name,
                'content': item.content,
                'urlToImage': item.image_url
            }
            news_list.append(news_dict)

        return jsonify(news_list)
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@flaskApp.route('/api/news/<int:id>', methods=['GET'])
def get_news_by_id(id):
    try:
        news_item = NewsModel.query.filter_by(id=id).first()
        if news_item:
            news_item_dict = {
                'id': news_item.id,
                'author': news_item.author,
                'title': news_item.title,
                'description': news_item.description,
                'publishedAt': news_item.published_at,
                'name': news_item.source_name,
                'content': news_item.content,
                'urlToImage': news_item.image_url
            }
            return jsonify(news_item_dict)
        else:
            return jsonify({'error': 'News item not found'}), 404

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Route to fetch country data from the database

flaskApp.register_blueprint(search_api, url_prefix='/api/search')

@flaskApp.route('/api/asylum-countries', methods=['GET'])
def get_db_asylum_countries():
    try:

        query = AsylumCountryModel.query
        regions = request.args.get("regions", "")
        country_query = AsylumCountryModel.query
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

        # asylum_data = AsylumCountryModel.query.all()

        # Convert the query result to a list of dictionaries
        asylum_list = []
        for item in asylum_data:
            country_dict = {
                'id': item.id,
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


@flaskApp.route('/api/asylum-countries/<int:id>', methods=['GET'])
def get_db_country_singular(id):
    try:
        country_data = AsylumCountryModel.query.filter_by(id=id).first()
        if (not country_data):
            raise Exception("Country not found")
        country_dict = {
            'id': country_data.id,
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

        query = SupportGroupsModel.query
        locations = request.args.get("location", "")
        support_query = SupportGroupsModel.query
        locations_list = [location.strip()
                          for location in locations.split(';')]
        
        print("LOCATION LIST: ", locations_list)

        if len(locations) > 0:
            possible_locations_filters = ["Alexandria , VA", "Cincinnati , OH",
                                          "FairFax, VA", "Minneapolis, MN", "New York , NY", "New York, , NY", "Santa Barbara , CA", "Washington , DC", "Minneapolis , MN",
                                          "Others"]

            if "Others" in locations_list:

                for location in locations_list:
                    if location in possible_locations_filters:
                        possible_locations_filters.remove(location)

                locations_list.remove("Others")

                support_query = support_query.filter(
                    ~SupportGroupsModel.location.in_(possible_locations_filters))

            else:
                support_query = support_query.filter(
                    SupportGroupsModel.location.in_(locations_list))
                    
            ratings = request.args.get("ratings", "")
            ratings_list = [rating.strip()
                        for rating in ratings.split(',')]
        print("RATINGS LIST: ", ratings_list)

        # Step 2: Generate filter conditions for each rating/range
        if (len(ratings) > 0):
            rating_conditions = []
            for rating in ratings_list:
                if '-' in rating:  # Handle range, e.g., '95-99'
                    low, high = map(float, rating.split('-'))
                    rating_conditions.append(
                        SupportGroupsModel.rating.between(low, high))
                elif rating.endswith('<'):  # Handle special case, e.g., '90<'
                    threshold = float(rating[:-1])
                    rating_conditions.append(
                        SupportGroupsModel.rating < threshold)
                else:  # Handle individual rating
                    rating_conditions.append(
                        SupportGroupsModel.rating == float(rating))

            # Apply the filter conditions if any exist
            if rating_conditions:
                print("GETTING HERE")
                support_query = support_query.filter(or_(*rating_conditions))

        sort_by = request.args.get('sort_by', 'id')
        order = request.args.get('order', 'asc')

        if sort_by == 'name':
            if order == 'asc':
                support_groups_data = support_query.order_by(
                    SupportGroupsModel.name.asc()).all()
            else:
                support_groups_data = support_query.order_by(
                    SupportGroupsModel.name.desc()).all()
        elif sort_by == 'location':
            if order == 'asc':
                support_groups_data = support_query.order_by(
                    SupportGroupsModel.location.asc()).all()
            else:
                support_groups_data = support_query.order_by(
                    SupportGroupsModel.location.desc()).all()
        elif sort_by == 'rating':
            if order == 'asc':
                support_groups_data = support_query.order_by(
                    SupportGroupsModel.rating.asc()).all()
            else:
                support_groups_data = support_query.order_by(
                    SupportGroupsModel.rating.desc()).all()
        elif sort_by == 'phn_no':
            if order == 'asc':
                support_groups_data = support_query.order_by(
                    SupportGroupsModel.phn_no.asc()).all()
            else:
                support_groups_data = support_query.order_by(
                    SupportGroupsModel.phn_no.desc()).all()
        elif sort_by == 'website':
            if order == 'asc':
                support_groups_data = support_query.order_by(
                    SupportGroupsModel.website_url.asc()).all()
            else:
                support_groups_data = support_query.order_by(
                    SupportGroupsModel.website_url.desc()).all()
        else:
            support_groups_data = support_query.all()

        support_groups_list = []
        for item in support_groups_data:
            support_group_dict = {
                'id': item.id,
                'name': item.name,
                'location': item.location,
                'phn_no': item.phn_no,
                'rating': item.rating,
                'website_url': item.website_url,
                'picture_url': item.picture_url
            }
            support_groups_list.append(support_group_dict)

        return jsonify(support_groups_list)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Route to fetch support group data from the database


@flaskApp.route('/api/support-groups/<int:id>', methods=['GET'])
def get_db_support_groups_singular(id):
    try:
        support_group = SupportGroupsModel.query.filter_by(id=id).first()
        if support_group:
            support_group_dict = {
                'id': support_group.id,
                'name': support_group.name,
                'location': support_group.location,
                'phn_no': support_group.phn_no,
                'rating': support_group.rating,
                'website_url': support_group.website_url,
                'picture_url': support_group.picture_url
            }
            return jsonify(support_group_dict)
        else:
            return jsonify({'error': 'Support group not found'}), 404

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Get all 3 tables


@flaskApp.route('/api/all', methods=['GET'])
def get_db_all(id):
    try:
        news_rows = NewsModel.query.all()
        asylum_rows = AsylumCountryModel.query.all()
        support_rows = SupportGroupsModel.query.all()

        # Convert rows to dictionary format
        news_data = [{
            'id': item.id,
            'author': item.author,
            'title': item.title,
            'description': item.description,
            'publishedAt': item.published_at,
            'name': item.source_name,
            'content': item.content,
            'urlToImage': item.image_url
        } for item in news_rows]
        asylum_data = [{
            'id': item.id,
            'name': item.name,
            'capital': item.capital,
            'region': item.region,
            'population': item.population,
            'languages': item.languages,
            'flag': item.flag
        } for item in asylum_rows]
        support_data = [{
            'id': item.id,
            'name': item.name,
            'location': item.location,
            'phn_no': item.phn_no,
            'rating': item.rating,
            'website_url': item.website_url,
            'picture_url': item.picture_url
        } for item in support_rows]

        return jsonify({'news': news_data, 'asylum': asylum_data, 'support': support_data})
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
    flaskApp.run(port=5000, debug=True)
