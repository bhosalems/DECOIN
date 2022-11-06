import sqlite3
import random
import os
from factcheck import intent,google_factcheck,reddit_check,twitter_check

class NewsDatabase:
    def __init__(self):
        db_path = os.path.abspath(os.path.dirname(__file__)) + '/../data/news.db'
        self.conn = sqlite3.connect(db_path, check_same_thread=False)
        
    
    def insert_user(self,data):
        c = self.conn.cursor()
        #extract user data
        # user_id = data["user_id"]
        pub_addr = data["public_addr"]
        name = data["name"]
        email = data["email"]
        balance = data['balance']

        c.execute("INSERT INTO user(public_addr, name, email, balance) VALUES(?,?,?,?)", (pub_addr, name, email, balance))
        print("User data inserted in database")
        self.conn.commit()
        # self.conn.close()
    def get_newsid(self):
        c = self.conn.cursor()
        c.execute("SELECT count(*) FROM article")
        val = c.fetchone()[0]
        if not val:
            return 1
        else:
            c.execute("SELECT MAX(news_id) from article")
            news_id = c.fetchone()[0]+1
            return news_id

    
    def insert_article(self,article):
        c = self.conn.cursor()
        user_id = article["user_id"]
        # news_id = article["news_id"]
        timestamp = article["timestamp"]
        tags = article["tags"]

        news_id = self.get_newsid()
        c.execute("INSERT INTO article(user_id, news_id, timestamp, tags) VALUES(?,?,?,?)", (user_id, news_id,timestamp, tags))
        self.conn.commit

        print("Article data inserted in database")
        self.insert_review( news_id, 0)


    def insert_review(self,news_id, status):
        c = self.conn.cursor()
        #compile list of 5 random users
        c.execute("SELECT user_id FROM user")
        tmp = c.fetchall()
        users = [t[0] for t in tmp]
        
        # NOTE Unomment only for testing
        # users = [3, 4, 7, 2, 1]
        
        r_list = random.sample(users, 5)
        for reviewer_id in r_list:
            c.execute("INSERT INTO review(reviewer_id, news_id, status) VALUES(?,?,?)", (reviewer_id, news_id, status))
        print("Review data inserted in database")
        self.conn.commit()


    def fecth_newsfeed(self):
        c = self.conn.cursor()
        #compile list of 5 random users
        c.execute("SELECT * FROM article WHERE status=1 order by timestamp DESC")
        tmp = c.fetchall()
        res = [t[1] for t in tmp]
        return res

    # def fetch(self, uid):
    #     c = self.conn.cursor()
    #     c.execute("SELECT user_id, public_addr FROM user WHERE user_id = ? ",(uid,))
    #     user_details = c.fetchone()
    #     # print(user_details)
    #     return user_details

    #called when reviews are submitted

    def fetch_forreview(self,user_id):
        c = self.conn.cursor()
        c.execute("SELECT article.news_id, article.tags, article.timestamp from article JOIN review WHERE article.news_id=review.news_id and article.status=0 and review.reviewer_id = ?", (user_id,))
        val = c.fetchall()
        return val

    def update_review_status(self, user_id, news_id, rev):
        c = self.conn.cursor()
        c.execute("UPDATE review SET status = ? WHERE news_id = ? and reviewer_id = ?", (rev, news_id, user_id))
        
        #find majority
        c.execute("SELECT count(status) FROM review WHERE news_id = ? and status = 1",(news_id,))
        val = c.fetchone()[0]
        if val>=3:
            c.execute("UPDATE article SET status = 1 WHERE news_id = ?", (news_id,))
        
        c.execute("SELECT count(status) FROM review WHERE news_id = ? and status = 2",(news_id,))
        val = c.fetchone()[0]
        if val>=3:            
            c.execute("UPDATE article SET status = 2 WHERE news_id = ?", (news_id,))
        self.conn.commit()
        

    def authenticate_user(self ,pad):
        c = self.conn.cursor()
        c.execute("SELECT * FROM user WHERE public_addr = ? ", (pad,))
        val = c.fetchone()
        if val:
            data = {'user_id':val[0],
                    'public_add':val[1],
                    'email':val[2],
                    'name':val[3]
                    }
            return True, data
        else:
            return False, {}
    
    #called when user opens an article
    def bal_onview(self,user_id):
        c = self.conn.cursor()
        c.execute("SELECT balance FROM user WHERE user_id = ? ", (user_id,))
        balance = int(c.fetchone()[0])
        if balance >= 0.1:
            balance -= 0.1
            c.execute("UPDATE user SET balance = ? WHERE user_id = ?", (balance, user_id))
            self.conn.close()
            return True
        else:
            return False
    
    #called when the status in article column is updated to 1
    def bal_onpublish(self, user_id):
        c = self.conn.cursor()
        c.execute("SELECT balance FROM user WHERE user_id = ? ", (user_id,))
        balance = int(c.fetchone()[0])
        balance += 0.1
        c.execute("UPDATE user SET balance = ? WHERE user_id = ?", (balance, user_id))
        self.conn.close()

    #called when reviewer submits after article review
    def bal_onreview(self,reviewer_id):
        c = self.conn.cursor()
        c.execute("SELECT balance FROM user WHERE user_id = ? ", (reviewer_id,))
        balance = int(c.fetchone()[0])
        balance += 0.05
        c.execute("UPDATE user SET balance = ? WHERE user_id = ?", (balance, reviewer_id))
        self.conn.close()

    def check_intent(self, text):
        return intent.intent_check(text)
        

    def check_relevancy(self, text):
        count = 0
        reddit_obj = reddit_check.Reddit()
        count += reddit_obj.fetch_reddit(text)
        try:
            twitter_obj = twitter_check.Tweet()
            count += twitter_obj.fetch_tweets(text)
        except:
            count = count
        if count > 100:
            return "relevant"
        else:
            return "irrelevant"

    def check_fact(self,text):
        sentences = text.split(".")
        reviews = []
        for line in sentences:
            review = google_factcheck.factcheck(line)
            if review:
                reviews.append(review)
            else:
                pass
        if review:
            return random.choice(reviews)
        else:
            return "not a relevant article"



    def close_dbcon(self):
        self.conn.close()

    
if __name__ == '__main__':
    data1 = {
        "user_id":111,
        "public_addr":"somethingsomething",
        "name":"tony stark",
        "email":"tony@hotmail.com"
    }
    data2 = {
        "user_id":222,
        "public_addr":"xdxdxdxd",
        "name":"phony hark",
        "email":"phony@hotmail.com"
    }
    db_obj = NewsDatabase()
    # db_obj.insert(data1)
    # db_obj.insert(data2)
    user_details = db_obj.fetch(222)
    print(user_details)
    db_obj.close_dbcon()