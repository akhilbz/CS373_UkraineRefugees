from flask import Flask
from flask_cors import CORS, cross_origin

from scripts.testimonies import getTestimonials


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

if __name__ == '__main__':
    application.run(port=8000)
