var express = require('express'),
http = require('http');

var app = express();
var port = 3000;

var router = express.Router();

router.get('/', function(req, res) {
	res.json({test: "successful"});
});

router.get('/query', function(req, res) {
	console.log(req.query);
	res.header("Access-Control-Allow-Origin", "*");
  	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.json(queryDB(req.query));
});

app.use('/api', router);

var server = http.createServer(app).listen(port, "0.0.0.0", function() {
  console.log('Listening on port ' + port);
});

function queryDB(query) {

	msgSystems = [];

	if (query.msgSystem.needed == 'true') {
		if (query.msgSystem.builtInRouting == 'true') {
			msgSystems.push("RabbitMQ");
		}
		else {
			msgSystems.push("Apache Kafka");
		}
	}

	ingestionSystems = [];

	if (query.ingestionSystem.stream == 'true'){

		ingestionSystems.push("Spark Streaming");
		if (query.ingestionSystem.exactlyOnce == 'true'){
			ingestionSystems.push("Storm with Trident");
		}

		else {
			ingestionSystems.push("Storm");
		}
	}

	else {
		ingestionSystems.push("Spark SQL");
	}

	dbs = [];

	if (query.db.column == 'true'){
		dbs.push("HBase");
	}

	if (query.db.graph == 'true'){
		dbs.push("Neo4j");
	}

	if (query.db.document == 'true'){
		dbs.push("MongoDB");
	}

	if (query.db.kv == 'true'){
		dbs.push("Redis");
	}

	results = {};

	//obvious cleanup opportunity
	if (query.msgSystem.needed =='true') {
		for (var i=0;i<msgSystems.length;i++){
			for (var j=0;j<ingestionSystems.length;j++){
				for (var k=0; k<dbs.length; k++){
					var str = msgSystems[i] + " -> " + ingestionSystems[j] + " -> " + dbs[k];
					results[str] = "Deployment Script";
				}
			}
		}
	}

	else {
		for (var j=0;j<ingestionSystems.length;j++){
				for (var k=0; k<dbs.length; k++){
					var str = ingestionSystems[j] + " -> " + dbs[k];
					results[str] = "Deployment Script";
				}
			}
	}
	return results;
}
