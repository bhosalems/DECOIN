import flask
from flask import request, jsonify
from logging import FileHandler,WARNING
from trans_file import NewsDatabase
import os
import json
from flask_cors import CORS
import datetime
app = flask.Flask(__name__)
file_handler = FileHandler('errorlog.txt')
file_handler.setLevel(WARNING)
CORS(app)
app.config["DEBUG"] = True
NEWS_JSON_FILE = '../data/news.json'
NEWS_FEED_NUM = 5

@app.route('/api/v1/register/', methods=['GET','POST'])
def register():
    db_obj = NewsDatabase()
    user_data = {}
    if 'email' in request.forms:
        user_data['email'] = str(request.forms['email'])
    if 'public_addr' in request.forms:
        user_data['public_addr'] = str(request.forms['public_addr'])
    if 'name' in request.forms:
        user_data['name'] = request.forms['name']
    if 'balance' in request.forms:
        user_data['balance'] = request.forms['balance']
    db_obj.insert_user(user_data)
    return jsonify(user_data)


@app.route('/api/v1/login/', methods=['GET'])
def login():
    db_obj = NewsDatabase()
    validate_data = {}
    if 'public_addr' in request.forms:
        valid, data = db_obj.authenticate_user(request.forms['public_addr'])
    validate_data['valid'] = valid
    validate_data['data'] = data
    return jsonify(validate_data)


def read_news_json():
    with open(NEWS_JSON_FILE,'r+') as file:
        file_data = json.load(file)
    return file_data


@app.route('/api/v1/newsfeed/', methods=['GET', 'POST'])
def newsfeed():
    db_obj = NewsDatabase()
    latest_news_ids = db_obj.fecth_newsfeed()[:NEWS_FEED_NUM]
    news_feed = {}
    file_data = read_news_json()
    for id in latest_news_ids:
        news_feed[id] = file_data[str(id)]
    return jsonify(news_feed)


@app.route('/api/v1/vote/', methods=['GET'])
def vote():
    db_obj = NewsDatabase()
    user_id, news_id, rev = request.forms['user_id'], request.forms['news_id'], request.forms['status']
    db_obj.update_review_status(user_id, news_id, rev)
    return "Vote submitted successfully"


def write_json(new_data, filename=NEWS_JSON_FILE):
    if not os.path.exists(filename):
        open(filename, 'w').close()
        file_data = {}
        file_data[new_data[0]] = new_data[1]
        with open(filename,'r+') as file:
            file.seek(0)
            json.dump(file_data, file, indent = 4)
    else:
        with open(filename,'r+') as file:
            file_data = json.load(file)
            file_data[new_data[0]] = new_data[1]
            file.seek(0)
            json.dump(file_data, file, indent = 4)
    

