import sqlite3

conn = sqlite3.connect('./news.db', check_same_thread=False)
c = conn.cursor()

# c.execute("DROP table user")
# c.execute("DROP table article")
# c.execute("DROP table review")

c.execute("""CREATE TABLE IF NOT EXISTS user(
        user_id INTEGER PRIMARY KEY AUTOINCREMENT,
        public_addr TEXT ,
        name TEXT,
        email TEXT,
        balance INTEGER)
        """)

c.execute("""CREATE TABLE IF NOT EXISTS article(
        user_id INTEGER,
        news_id INTEGER KEY,
        status INTEGER DEFAULT 0,
        timestamp TEXT,
        tags TEXT,
        FOREIGN KEY(user_id) REFERENCES user(user_id))
        """)

c.execute("""CREATE TABLE IF NOT EXISTS review(
        review_id INTEGER PRIMARY KEY AUTOINCREMENT DEFAULT 1,
        news_id INTEGER,
        reviewer_id INTEGER,
        status INTEGER,
        FOREIGN KEY(reviewer_id) REFERENCES user(user_id),
        FOREIGN KEY(news_id) REFERENCES article(news_id))
        """)

print("DB initialized successfully")
conn.commit()
conn.close()