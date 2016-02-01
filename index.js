var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var http = require('http');

if (!process.env.DATABASE_URI) {
  console.log('DATABASE_URI not specified, falling back to localhost.');
}

var api = new ParseServer({
  databaseURI: process.env.DATABASE_URI          || 'mongodb://localhost:27017/dev',
  cloud: __dirname + process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
  appId: process.env.APP_ID                      || 'myAppId',
  masterKey: process.env.MASTER_KEY              || 'myMasterKey',
  javascriptKey: process.env.JS_KEY              || 'myJsKey',
  restAPIKey: process.env.REST_KEY               || 'myRestKey',
  dotNetKey: process.env.DOT_NET_KEY             || 'myDotNetKey',
  clientKey: process.env.CLIENT_KEY              || 'myClientKey'
});

var app = express();

// Serve the Parse API on the /parse URL prefix
var mountPath = process.env.PARSE_MOUNT || '/parse';
app.use(mountPath, api);

// Parse Server plays nicely with the rest of your web routes
app.get('/', function(req, res) {
  res.status(200).send('MyParse is running.');
});

var port = process.env.PORT || 1337;
var httpServer = http.createServer(app);
httpServer.listen(port, function() {
  console.log('MyParse running on port ' + port + '.');
});
