from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
import random

#calculate the negative, positive, neutral and compound scores, plus verbal evaluation
def intent_check(sentence):

    # Create a SentimentIntensityAnalyzer object.
    sid_obj = SentimentIntensityAnalyzer()

    sentiment_dict = sid_obj.polarity_scores(sentence)
    negative = sentiment_dict['neg']
    neutral = sentiment_dict['neu']
    positive = sentiment_dict['pos']
    compound = sentiment_dict['compound']

    if sentiment_dict['compound'] >= 0.05 :
        overall_sentiment = random.choice(['positive','practical','constructive','pragmatic','productive','effective'])

    elif sentiment_dict['compound'] <= - 0.05 :
        overall_sentiment = random.choice(['negetive','cynical','bleak','pessimistic','dismissive','obstructive'])

    else :
        overall_sentiment = random.choice(['neutral','unbiased','unprejudiced','open-minded','fair','non-partisan','objective'])
  
    # return negative, neutral, positive, compound, overall_sentiment
    return overall_sentiment

text = 'Democratic Georgia gubernatorial bad candidate Stacey Abrams argued that she will loose her election on Tuesday if voters can "navigate" the alleged voter suppression systems installed in her state by her opponent Gov. Brian Kemp, R-Ga.She spent a good portion of her interview with MSNBC anchor Ali Velshi on Saturday complaining about Georgia Republicans’ supposed voter suppression initiatives and attempts to "game the system" to stay in power next election day, despite record early voting turnout across the state. The conversation began with the host bringing up polling which has Abrams "trailing Gov. Kemp by double digits." Though he mentioned how some polling experts claim that the race is tighter than it seems.'
print(intent_check(text))