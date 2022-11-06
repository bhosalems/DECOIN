import flask
from flask import request, jsonify
from logging import FileHandler,WARNING
from backend.transaction_file import NewsDatabase
import os
import json
from flask_cors import CORS
import datetime
from factcheck import google_factcheck
app = flask.Flask(__name__)
file_handler = FileHandler('errorlog.txt')
file_handler.setLevel(WARNING)
CORS(app)
# app.config["DEBUG"] = True
NEWS_JSON_FILE = 'data/news.json'
NEWS_FEED_NUM = 3

# Dummy data is just used for unittest
dummy_data = {
    1:{"email":"kanda@gmail.com", "public_addr":"ASDFGERTDF", "name":"Mahesh Bhosale", "balance":100},
    2:{"email":"karela@gmail.com", "public_addr":"SDFGSDFSS", "name":"Ram Bhosale", "balance":20},
    3:{"email":"wanga@gmail.com", "public_addr":"SDRHBJHUI", "name":"Kana Thosale", "balance":300},
    4:{"email":"batata@gmail.com", "public_addr":"SGHFJGFBVN", "name":"Shriri Sonavane", "balance":400},
    5:{"email":"tomato@gmail.com", "public_addr":"RESDARXGER", "name":"Tanmay Dharmadhikari", "balance":150},
    6:{"email":"kela@gmail.com", "public_addr":"SDRHBJHUI", "name":"Kana Thof", "balance":345},
    7:{"email":"ala@gmail.com", "public_addr":"HJSGVGHTR", "name":"Shriri Sosdffsvane", "balance":256},
    8:{"email":"lasun@gmail.com", "public_addr":"DHKVHTRFV", "name":"Tskjnjk uahdg", "balance":5448},
    9:{"email":"dfg@gmail.com", "public_addr":"DFGSJGHJB", "name":"GFCHTF TYFTYF", "balance":633} ,
    10:{"email":"ytur@gmail.com", "public_addr":"YGFTYFRTFG", "name":"UHUJ YGKYUG", "balance":78578}  
}

dummy_news = {
        1:{"user_id": "1", "tags": "Sports", "article" : "Hiha hahi hihs hidh"},
        2:{"user_id": "2", "tags": "Movie", "article" : "Hiha hesgfhj hahi hihs hidh"},
        3:{"user_id": "1", "tags": "Study", "article" : "sfsf erfgre erfregdb "},
        4:{"user_id": "3", "tags": "Sports", "article" : "jkfekwf uhdgugfv uiyd uw"},
        5:{"user_id": "2", "tags": "Dance", "article" : "jhweguw agd yuwfhu gh ft7ewfy vyuef"},
        6:{"user_id": "4", "tags": "Politics", "article" : "oiweriw sf ueyui h"},
        7:{"user_id": "5", "tags": "War", "article" : "iruhiuf iirowuhfr uiwejkhbluieryifhe"},
        8:{"user_id": "1", "tags": "Sports", "article" : "Hiopkvfopa ei9ueoi "},
        9:{"user_id": "3", "tags": "Movie", "article" : "90qru23kdasnmlk oijwiKEF"},
        10:{"user_id": "2", "tags": "Study", "article" : "9238UKNJFK lopif jhguyFIO "},
        11:{"user_id": "3", "tags": "Sports", "article" : "W98UR980 OUJFIOU93OKJAOPFE EOWIP"},
        12:{"user_id": "3", "tags": "Dance", "article" : "qw9riu90 q9ud9-kajdfp"},
        13:{"user_id": "4", "tags": "Politics", "article" : "w0ei09pn w9ei90opi0qe"},
        14:{"user_id": "5", "tags": "War", "article" : "queoi q9iu9qa 9qi90lk jhefioui "}
    }

dummy_reviews = {
        1:{"user_id": "3", "news_id":"1", "status":"1"},
        2:{"user_id": "4", "news_id":"1", "status":"1"},
        3:{"user_id": "7", "news_id":"1", "status":"2"},
        4:{"user_id": "2", "news_id":"1", "status":"2"},
        5:{"user_id": "1", "news_id":"1", "status":"2"},
        6:{"user_id": "3", "news_id":"2", "status":"1"},
        7:{"user_id": "4", "news_id":"2", "status":"1"},
        8:{"user_id": "7", "news_id":"2", "status":"1"},
        9:{"user_id": "2", "news_id":"2", "status":"2"},
        10:{"user_id": "1", "news_id":"2", "status":"2"},
        11:{"user_id": "3", "news_id":"3", "status":"1"},
        12:{"user_id": "4", "news_id":"3", "status":"1"},
        13:{"user_id": "7", "news_id":"3", "status":"1"},
        14:{"user_id": "2", "news_id":"3", "status":"1"},
        15:{"user_id": "1", "news_id":"3", "status":"1"},
        16:{"user_id": "3", "news_id":"4", "status":"1"},
        17:{"user_id": "4", "news_id":"4", "status":"1"},
        18:{"user_id": "7", "news_id":"4", "status":"1"},
        19:{"user_id": "2", "news_id":"4", "status":"1"},
        20:{"user_id": "1", "news_id":"4", "status":"1"},
        21:{"user_id": "3", "news_id":"4", "status":"1"},
        22:{"user_id": "4", "news_id":"5", "status":"1"},
        23:{"user_id": "7", "news_id":"5", "status":"1"},
        24:{"user_id": "2", "news_id":"5", "status":"1"},
        25:{"user_id": "1", "news_id":"5", "status":"1"},
        26:{"user_id": "3", "news_id":"5", "status":"1"},
        27:{"user_id": "4", "news_id":"6", "status":"1"},
        28:{"user_id": "7", "news_id":"6", "status":"1"},
        29:{"user_id": "2", "news_id":"6", "status":"1"},
        30:{"user_id": "1", "news_id":"6", "status":"1"},
        31:{"user_id": "3", "news_id":"6", "status":"1"},
        32:{"user_id": "4", "news_id":"7", "status":"1"},
        33:{"user_id": "7", "news_id":"7", "status":"1"},
        34:{"user_id": "2", "news_id":"7", "status":"1"},
        35:{"user_id": "1", "news_id":"7", "status":"1"},
        36:{"user_id": "3", "news_id":"7", "status":"1"},
        37:{"user_id": "4", "news_id":"8", "status":"1"},
        38:{"user_id": "7", "news_id":"8", "status":"1"},
        39:{"user_id": "2", "news_id":"8", "status":"1"},
        40:{"user_id": "1", "news_id":"8", "status":"1"},
        41:{"user_id": "3", "news_id":"8", "status":"1"},
        42:{"user_id": "4", "news_id":"9", "status":"1"},
        43:{"user_id": "7", "news_id":"9", "status":"1"},
        44:{"user_id": "2", "news_id":"9", "status":"1"},
        45:{"user_id": "1", "news_id":"9", "status":"2"},
        46:{"user_id": "3", "news_id":"9", "status":"1"},
        47:{"user_id": "4", "news_id":"9", "status":"1"},
        48:{"user_id": "7", "news_id":"9", "status":"1"},
        49:{"user_id": "2", "news_id":"10", "status":"2"},
        50:{"user_id": "1", "news_id":"10", "status":"2"},
        50:{"user_id": "3", "news_id":"10", "status":"2"},
        51:{"user_id": "4", "news_id":"10", "status":"1"},
        52:{"user_id": "7", "news_id":"10", "status":"1"},
        53:{"user_id": "2", "news_id":"11", "status":"2"},
        54:{"user_id": "1", "news_id":"11", "status":"2"},
        55:{"user_id": "3", "news_id":"11", "status":"2"},
        56:{"user_id": "4", "news_id":"11", "status":"1"},
        57:{"user_id": "8", "news_id":"12", "status":"1"},
        58:{"user_id": "2", "news_id":"12", "status":"1"},
        59:{"user_id": "7", "news_id":"12", "status":"2"},
        60:{"user_id": "1", "news_id":"12", "status":"2"},
        61:{"user_id": "3", "news_id":"12", "status":"2"}
    }

def get_data(request):
    data = json.loads(request.data)
    final_data=json.loads(data)
    return final_data


@app.route('/api/v1/register/', methods=['POST'])
def register():
    print("in register")
    db_obj = NewsDatabase()
    final_data = get_data(request)
    user_data = {}
    if 'email' in final_data:
        user_data['email'] = str(final_data['email'])
    if 'public_addr' in final_data:
        user_data['public_addr'] = str(final_data['public_addr'])
    if 'name' in final_data:
        user_data['name'] = str(final_data['name'])
    if 'balance' in final_data:
        user_data['balance'] = final_data['balance']
    db_obj.insert_user(user_data)
    return jsonify(user_data)


@app.route('/api/v1/login/', methods=['GET'])
def login():
     
    db_obj = NewsDatabase()
    validate_data = {}
    final_data = request.headers.get('public_addr')
    print("type of final data", type(final_data))
    print("final data",final_data)
   
    valid, data = db_obj.authenticate_user(final_data)
    print("valid",valid,"data",data)
    if valid:
        return jsonify(data)
    else:
        return  jsonify({"error": "error",}), 403


def read_news_json():
    with open(NEWS_JSON_FILE,'r+') as file:
        file_data = json.load(file)
    return file_data


@app.route('/api/v1/newsfeed/', methods=['GET', 'POST'])
def newsfeed():
    db_obj = NewsDatabase()
    latest_news_ids = db_obj.fecth_newsfeed()[:NEWS_FEED_NUM]
    print("latest_news_ids",latest_news_ids)
    news_feed = []
    file_data = read_news_json()
    for id in latest_news_ids:
        
        news_feed.append(file_data[str(id)])
    return jsonify(news_feed)


@app.route('/api/v1/vote/', methods=['POST','GET'])
def vote():
    db_obj = NewsDatabase()
    # final_data = get_data(request)
    final_data = json.loads(request.data)
    print("final+data",final_data)
    user_id, news_id, rev = final_data['user_id'], final_data['news_id'], final_data['status']
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


@app.route('/api/v1/publish/', methods=['GET','POST'])
def publish():
    print("in publish")
    db_obj = NewsDatabase()
    article_data = {}
    final_data = get_data(request)
    print("final",final_data)
    print("final",type(final_data))
    article_body = str(final_data['article'])
    article_data['news_id'] = db_obj.get_newsid()
    article_data['user_id'] = final_data['user_id']
    article_data['timestamp'] = datetime.datetime.now()
    article_data['tags'] = final_data['tags']
    db_obj.insert_article(article_data)
    write_json((int(article_data['news_id']), article_body), NEWS_JSON_FILE)
    return "Successfully submitted"


@app.route('/api/v1/fetchreview/', methods=['GET', 'POST'])
def fetch_forreview():
    db_obj = NewsDatabase()
    file_data = read_news_json()
    # final_data = get_data(request)
    user_data = request.headers.get('user_id')
    user_data=json.loads(user_data)
    # print(type(user_data))
    user_id = user_data['id']
    article_data = []
    res = db_obj.fetch_forreview(user_data['id'])
    for r in res:
        # article_data=[ 
        #            {"id":r[0], "tags":r[1], "timestamp":r[2], "data":file_data[str(r[0])
        #               ]
        #               }
        article_data.append( {"id":r[0], 
                              "tags":r[1], 
                         "timestamp":r[2], 
                        "data":file_data[str(r[0])]
                           })
    print("article_data",article_data)
    return jsonify(article_data)


@app.route('/api/v1/factcheck/', methods=['GET', 'POST'])
def factcheck():
    query = request.forms['query']
    res = google_factcheck(query)
    return res

@app.route('/api/v1/')
def hello_world():
    return "Hello World"


@app.route('/api/v1/test/', methods=['GET'])
def unit_test():
    args = dict(request.args)
    if 'testid' in args:
        testid = args['testid']
    if testid == 'register':
        with app.test_request_context() as mock_context:
            id=int(args['id'])
            mock_context.request.forms=dummy_data[id]
            # print_request_data()
            res = register()
    elif testid == 'login':
        with app.test_request_context() as mock_context:
            id=int(args['id'])
            mock_context.request.forms = dummy_data[id]
            res = login()
            # print_request_data()
    elif testid == 'publish':
        with app.test_request_context() as mock_context:
            id=int(args['id'])
            mock_context.request.forms = dummy_news[id]
            res = publish()
    elif testid == 'vote':
        with app.test_request_context() as mock_context:
            id=int(args['id'])
            mock_context.request.forms = dummy_reviews[id]
            res = vote()
    elif testid == 'newsfeed':
        with app.test_request_context() as mock_context:
            res = newsfeed()
    elif testid == 'fetchreview':
        with app.test_request_context() as mock_context:
            id=int(args['id'])
            mock_context.request.forms = {'user_id':id}
            res = fetch_forreview()
    return res

def print_request_data():
    print(flask.request.forms)

app.run()
