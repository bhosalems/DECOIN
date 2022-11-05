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


@app.route('/api/v1/newsfeed/', methods=['GET','POST'])
def newsfeed():
    return

