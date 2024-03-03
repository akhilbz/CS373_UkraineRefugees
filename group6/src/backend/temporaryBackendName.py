# Going to use flask to get from the database and make it a rest API
from flask import Flask, jsonify, request

flaskApp = Flask(__name__)

# Sample data 
temp = [
    {"id": 1, "title": "News 1", "author": "Author 1"},
    {"id": 2, "title": "News 2", "author": "Author 2"}
]

@flaskApp.route("/api/news", methods=['GET'])
def get_sample():
    return jsonify(temp)