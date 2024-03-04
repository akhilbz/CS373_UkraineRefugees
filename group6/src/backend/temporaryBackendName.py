# Going to use flask to get from the database and make it a rest API
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase

class Base(DeclarativeBase):
  pass

db = SQLAlchemy(model_class=Base)

flaskApp = Flask(__name__)
# configure the SQLite database, relative to the app instance folder
flaskApp.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///project.db"
# initialize the app with the extension
db.init_app(flaskApp)

class News(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    author = db.Column(db.String(255))
    title = db.Column(db.String(255))
    description = db.Column(db.Text)
    publishedAt = db.Column(db.DateTime)
    name = db.Column(db.String(255))
    content = db.Column(db.Text)
    urlToImage = db.Column(db.String(255))

# Route to fetch news data from the database
@flaskApp.route('/api/news', methods=['GET'])
def get_news():
    try:
        news_data = News.query.all()

        # Convert the query result to a list of dictionaries
        news_list = []
        for news_item in news_data:
            news_dict = {
                'author': news_item.author,
                'title': news_item.title,
                'description': news_item.description,
                'publishedAt': news_item.publishedAt,
                'name': news_item.name,
                'content': news_item.content,
                'urlToImage': news_item.urlToImage
            }
            news_list.append(news_dict)

        return jsonify(news_list)
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
