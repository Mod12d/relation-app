# Neo4j Example with GraphQL and Apollo

This is a simple set up for Next using Neo4j Database with GraphQL and Apollo. Neo4j's Movies dataset example is used to run the example.


## run local
 
>.env
```

// Environment variables required to connect the app with your Neo4j database
NEO4J_URI=""
NEO4J_USER=""
NEO4J_PASSWORD=""

DATABASE_URL=postgres://(ユーザ名):(パスワード)@(ホスト名):(ポート番号)/(DB名)
// CORSで許可するオリジン

// ローカルで動かす場合の設定。HerokuにデプロイしたときはVercelのURLになる
ORIGINS="http://localhost:3000"

// herokuで動かしているか、ローカルなのかを判定するために使用
DEVELOPMENT_KEY=local

```

=======
