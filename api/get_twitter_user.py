import tweepy
from os import getenv
from hello_neo4j import App
from dotenv import load_dotenv
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
followers = api.get_followers(screen_name = "shimabu_it")

follower_list = []

for follower in followers:
    follower_list.append(follower.name)

print(follower_list)






# if __name__ == "__main__":
#
#     app = App("bolt://localhost:57687", "neo4j", "password")
#
#     for follower in follower_list:
#         app.create_friendship(follower, "しまぶー", "follow")
#
#     app.close()

