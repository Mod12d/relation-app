import tweepy
import os
from hello_neo4j import App

consumer_key=
consumer_secret=
access_token=
access_token_secret=

#Twitterオブジェクトの生成
auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
api = tweepy.API(auth, wait_on_rate_limit = True)

# idからfollowerを取得
followers = api.get_followers(id = "shimabu_it")

follower_list = []

for follower in followers:
    follower_list.append(follower.name)



if __name__ == "__main__":

    app = App("bolt://localhost:57687", "neo4j", "password")

    for follower in follower_list:
        app.create_friendship(follower, "しまぶー", "follow")

    app.close()

