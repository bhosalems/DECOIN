import tweepy
from tweepy import OAuth1UserHandler, API
from keyword_ex import extract

class Tweet:
    def __init__(self,keys):
        cons_key = keys["cons"]
        cons_secret = keys["cons_secret"]
        access_key = keys["acc"]
        access_secret = keys["acc_secret"]
        auth = tweepy.OAuthHandler(cons_key, cons_secret)
        auth.set_access_token(access_key, access_secret)
        self.api = tweepy.API(auth)
    
    def fetch_tweets(self, text):
        # keywords = extract(text)
        # new = []
        # for word in keywords:
        #     new.append('#'+word)
        # search = " ".join(new)
        search = 'apple or uk'
        limit = 50
        tweets = tweepy.Cursor(self.api.search_tweets, q=search, tweet_mode='extended').items(limit)
        twt = []
        # tweets = self.api.search_tweets(search)
        for tweet in tweets:
            twt.append(tweet.id)
        return twt


if __name__ == '__main__':
    text = "Apple is planning to buy U.K startup for $1 billion."
    keys = {"cons": "RVYNRvLMepLrtNvqh3mmseXsP",
            "cons_secret": "2DGvSVFZkhzJDV6rJc5xEzX0nLTsO2ZOpdmxhxv0s5GNerDVga",
            "acc": "1567974750953119744-oOLwIBeSKiG6AkLMtJ4rh7SG4SsRZW",
            "acc_secret": "oSAREuIqziAVOI7wTDsRBCAiGD2uQGocdPSMe0bDAiHd1"}

    twt_obj = Tweet(keys)
    twt = twt_obj.fetch_tweets(text)
    print(twt)
    