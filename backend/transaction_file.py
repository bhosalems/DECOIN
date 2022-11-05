import sqlite3
import random

class NewsDatabase:
    def __init__(self):
        self.conn = sqlite3.connect('../data/news.db', check_same_thread=False)
        
    
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