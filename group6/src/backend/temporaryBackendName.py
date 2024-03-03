# Going to use flask to get from the database and make it a rest API
from flask import Flask

flaskApp = Flask(__name__)

@flaskApp.route("/")
