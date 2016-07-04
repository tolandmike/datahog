var express = require('express'),
http = require('http'),
routes = require('./routes');

var app = express();
var port = 8000;

// Set handlebars as the templating engine
app.use("/", express.static(__dirname + "/public/"));

app.get('/', routes.index);

var server = http.createServer(app).listen(port, function() {
  console.log('Listening on port ' + port);
});

var io = require('socket.io').listen(server);

