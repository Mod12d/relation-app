'''
tweepyでデータを取得する
'''

import tweepy
from os import getenv
from dotenv import load_dotenv
from neo4j import GraphDatabase
import pandas as pd

load_dotenv()
# 同じフォルダに.envファイルを入れておくと読み込んでくれる。

consumer_key = getenv('consumer_key')
consumer_secret = getenv('consumer_secret')
access_token = getenv('access_token')
access_token_secret = getenv('access_token_secret')

# Twitterオブジェクトの生成
auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
api = tweepy.API(auth, wait_on_rate_limit = True)

# idからfollowerを取得
def follower_get(screen_name):
    followers = api.get_followers(screen_name = screen_name)
    return followers

def get_follower_name_list(followers):
    follower_names = []
    for follower in followers:
        follower_names.append(follower.name)
    return follower_names

def get_follower_screen_name_list(followers):
    follower_screen_names = []
    for follower in followers:
        follower_screen_names.append(follower.screen_name)
    return follower_screen_names

def get_follower_description_list(followers):
    follower_description = []
    for follower in followers:
        follower_description.append(follower.desctiption)
    return follower_description

def get_follower_profile_image_url(followers):
    follower_profile_image = []
    for follower in followers:
        follower_profile_image.append(follower.profile_image)
    return follower_profile_image

def get_twitter_id(followers):
    follower_twitter_id  = []
    for follower in followers:
        follower_twitter_id.append(follower.id)
    return follower_twitter_id

def get_all_information(screen_name):
    followers = follower_get(screen_name)
    name_list = get_follower_name_list(followers)
    # description_list = get_follower_description_list(followers)
    # profile_image_url_list = get_follower_profile_image_url(followers)
    twitter_id_list = get_twitter_id(followers)
    df = pd.DataFrame(list(zip(name_list,twitter_id_list)), columns = ['name','twitter_id'])
    return df


if __name__ == "__main__":
    driver = GraphDatabase.driver("bolt://localhost:57687", auth=("neo4j", "password"))

    # ここから先を検討中
    def add_friend(tx, name, friend_name):
        tx.run("MERGE (a:Person {name: $name}) "
               "MERGE (friend:Person {name: $friend_name})-[:follow]->(a)",
               name=name, friend_name=friend_name)
    #
    screen_name = "shimabu_it"

    with driver.session() as session:
        name = []
        try:
            followers = follower_get(screen_name)
            names = get_follower_screen_name_list(followers)
        except:
            print("error"+ screen_name)

        for follower_name in names:
            names2 = []

            try:
                session.write_transaction(add_friend, screen_name, follower_name)
                # print(follower_name)
                follower_followers = follower_get(follower_name)
                names2 = get_follower_screen_name_list(follower_followers)
                # print(names2)
            except:
                # print("error" + follower_name)

            # followerのfollowerをとって、登録

            for follower_follower_name in names2:
                try:
                    session.write_transaction(add_friend, follower_name, follower_follower_name)
                    # print(follower_follower_name)
                except:
                    print("error"+ follower_follower_name)

    #

    driver.close()