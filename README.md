# MyParse

Parse Server on Heroku

Parse Server: https://parse.com/docs/server/guide

### 使い方

#### 手元に開発環境を用意する場合

* このリポジトリをクローン
* HerokuにてMongoDBのアドオンを設定
'''
heroku addons:create mongolab:sandbox
'''
* Herokuにて以下を設定に追加
'''
heroku addons:create mongolab:sandbox
'''
heroku config:set ■■■=△△△
'''
 * DATABASE_URI(Required) : mongodb://...
 * PARSE_MOUNT(Optional) : /parse
 * PORT(Optional) : 1337
 * CLOUD_CODE_MAIN(Optional) : /cloud/main.js
 * APP_ID(Optional) : xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
 * MASTER_KEY(Optional) : xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
 * JS_KEY(Optional) : xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
 * REST_KEY(Optional) : xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
 * DOT_NET_KEY(Optional) : xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
 * CLIENT_KEY(Optional) : xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
* Deploy it with: `git push heroku master`

#### Herokuへ直接デプロイする場合

* Herokuでアプリケーションを作成
* Heroku - Resources より MongoLab の Sandboxプラン を追加
* Heroku - Settings より 環境変数を追加
 * DATABASE_URI(Required) : mongodb://...
 * PARSE_MOUNT(Optional) : /parse
 * PORT(Optional) : 1337
 * CLOUD_CODE_MAIN(Optional) : /cloud/main.js
 * APP_ID(Optional) : xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
 * MASTER_KEY(Optional) : xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
 * JS_KEY(Optional) : xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
 * REST_KEY(Optional) : xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
 * DOT_NET_KEY(Optional) : xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
 * CLIENT_KEY(Optional) : xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
* このリポジトリをフォークする
* Deployment method に Github (中央)を選択
* Connect to GitHub　でフォークしたリポジトリを選択
* Manual deploy　より master ブランチをデプロイ実行


### 動作確認

```
curl -X POST \
  -H "X-Parse-Application-Id: APP_ID" \
  -H "Content-Type: application/json" \
  -d '{"score":1337,"playerName":"Sean Plott","cheatMode":false}' \
  https://appname.herokuapp.com/parse
```

JavaScriptからの使用例:

```
Parse.initialize('APP_ID','JS_KEY');
Parse.serverURL = 'https://appname.herokuapp.com/parse';
var obj = new Parse.Object('GameScore');
obj.set('score',1337);
obj.save().then(function(obj) {
  console.log(obj.toJSON());
  var query = new Parse.Query('GameScore');
  query.get(obj.id).then(function(objAgain) {
    console.log(objAgain.toJSON());
  }, function(err) {console.log(err); });
}, function(err) { console.log(err); });
```

