# DECOIN - Decentralized Coin Incentivised News.
This repository is a submission to the [UB fall 2022 hackathon](https://devpost.com/software/decoin) 
## Inspiration
News articles serve as a highly relevant source of information on current topics and salient political issues. News coverage is not just the communication of facts; on the contrary, news articles put facts into context and transport specific opinions. Hence, how the news covers a topic or issue can decisively impact public debates and affect our collective decision-making.

For a time, “bias” was the term of choice to describe anything people hated about journalism, whether the power and influence of corporate news organizations to the choices reporters made in writing individual stories. But that's a thing in the past because DECOIN is here.

## What it does
We are a NEWS platform run BY THE PEOPLE FOR THE PEOPLE.

Our goal is to securely deliver factual and unbiased news.

We are a blockchain-powered news platform where individual users can submit news articles that are fact-checked by random individual reviewers making it agnostic to external influence by governmental organizations or otherwise. The reviews are also aided by advisories produced by ML-based models trained for fact-checking, intent analysis, and social relevancy checking.

To make the platform free of any influence, monetary or otherwise, neither publisher's identity nor the reviewer's identity is disclosed. So there can be no influence. Majority voting is applied before publishing the review. To keep the healthy user traffic and maintain the quality news throughput we make it a self-reliant ecosystem with decentralized currency - DECOIN. While registering, all users have to deposit a fixed amount DECOINs. Reviewers earn some DECOINs per review. This makes it a completely decentralized ecosystem.

## How we built it
Our blockchain system and ERC20 tokens are written in Solidity and the transactions are handled in the Metamask wallet. We are using python and flask for the backend. The front end is built using React js and Material UI. For automated analysis, we perform named keyword extraction using Spacy, intent analysis using vaderSentiment API, and checking factual claims using google FactCheck API which in turn uses Politifact API. We also perform an article trend check by doing a social media analysis using pushshift API and tweepy for searching trending relevant texts on Reddit and Twitter.

## Challenges we ran into
Since we were building a news platform, it was very important for us to fact-check. We had trouble finding trusted fact-checking sources but after thorough research, we finally fixed on using google fact check API along with other text analysis to ensure the data is accurate. We also got stuck on CORS issues while hitting backend APIs from React. This took a while for us to resolve but thanks to our mentors' quick guidance.

## Accomplishments that we're proud o to make it more viable.
We are really proud of implementing and building a full-stack blockchain application in under 24 hours.

## What we learned
Coming from different software backgrounds we as individual team members had to blend in and learn other technologies as a team.

## What's next for DECOIN
Going forward, all users need to buy a monthly subscription to get unlimited access to all the news to make it more viable.

## Built With
`docker`
`flask`
`python`
`react`
`solidity`
`sqlite`
