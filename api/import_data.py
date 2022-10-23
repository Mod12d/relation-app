'''
参考ファイル
https://github.com/neo4j-examples/twitter-graph-viz/blob/master/import.py
最初のところが動くかを確認
'''

import os
from neo4j import GraphDatabase, basic_auth

neo4jUrl = os.environ.get('NEO4J_URL',"bolt://localhost:57687")
neo4jUser = os.environ.get('NEO4J_USER',"neo4j")
neo4jPass = os.environ.get('NEO4J_PASSWORD',"password")
driver = GraphDatabase.driver(neo4jUrl, auth=basic_auth(neo4jUser, neo4jPass))

session = driver.session()

# Add uniqueness constraints.
if __name__ == "__main__":
    session.run( "CREATE CONSTRAINT ON (t:Tweet) ASSERT t.id IS UNIQUE;")
    session.run( "CREATE CONSTRAINT ON (u:User) ASSERT u.screen_name IS UNIQUE;")
    session.run( "CREATE CONSTRAINT ON (h:Hashtag) ASSERT h.name IS UNIQUE;")
    session.run( "CREATE CONSTRAINT ON (l:Link) ASSERT l.url IS UNIQUE;")
    session.run( "CREATE CONSTRAINT ON (s:Source) ASSERT s.name IS UNIQUE;")