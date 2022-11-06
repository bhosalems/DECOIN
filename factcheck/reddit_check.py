import requests
import pandas as pd
import re
from datetime import datetime
from psaw import PushshiftAPI
api = PushshiftAPI()
from keyword_ex import extract
import warnings
warnings.filterwarnings("ignore")

class Reddit:
    def __init__(self):
        self.global_submissions = pd.DataFrame()

    #pushshift api is down !!!
    def fetch_reddit(self, text):
        keywords = extract(text)
        # keywords = ['Apple', 'U.K', '$1 billion']
        subreddits = ['inthenews','USNews','onthescene','news','uncensorednews']
        for word in keywords:
            try:
                gen = api.search_submissions(q=word,
                                            subreddits= subreddits,
                                            filter=['id','title','selftext'],
                                            limit = 50,
                                            num_comments=">20")
                submissions_df = pd.DataFrame(list(gen))
                self.global_submissions = self.global_submissions.append(submissions_df)
            except:
                return
        news_id = list(self.global_submissions["id"])
        return len(news_id)

if __name__ == '__main__':
    text = "Apple is planning to buy U.K startup for $1 billion."
    red_obj = Reddit()
    news = red_obj.fetch_reddit(text)
    print(news)
