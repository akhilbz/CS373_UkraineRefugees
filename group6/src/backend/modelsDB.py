from flask_sqlalchemy import SQLAlchemy

# Create the SQLAlchemy db instance
db = SQLAlchemy()

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

