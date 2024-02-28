from flask import Flask
from flask_cors import CORS, cross_origin

from scripts.testimonies import getTestimonials
from scripts.news import getNews
from scripts.supportGroups import getGroups



application = Flask(__name__)
CORS(application)

@application.route('/')
def home():
    return 'Welcome to Ukraine Crisis API'


@application.route('/refugee-testimonials', methods=['GET'])
@cross_origin()
def testimonies():
    print("GRABBING TESTIMONIALS")
    return getTestimonials()

@application.route('/news', methods=['GET'])
@cross_origin()
def news():
    print("GRABBING NEWS")
    return getNews()

@application.route('/supportGroups', methods=['GET'])
@cross_origin()
def supportGroup():
    print("GRABBING Support Group")
    return getGroups()

if __name__ == '__main__':
    application.run(port=8000)
