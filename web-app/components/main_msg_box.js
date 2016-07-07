var systemInfo = {

	msgSystem: {
		needed: true,
		throughput: 0,
		producerACK: false,
		multipleConsumers: false,
		builtInRouting: false
	},

	ingestionSystem: {
		stream: false,
		batch: true,
		exactlyOnce: false
	},

	db: {
		graph: false,
		document: false,
		column: true,
		kv: false
	}

};

var API_URL = "http://127.0.0.1:3000/api/query";

var React = require('react');
var WelcomeMsg = require('./welcome_msg_box');
var OptionForm = require('./option_form');
var DeployPage = require('./deploy_page');

var MainMsgBox = React.createClass({

	//Sets the initial state of the component
	getInitialState: function(){
		return {
			name: 'Anon',
			stage: 0,
			finalOptions: {}
		}
	},

	//custom event handler for input onChange
	handleNameChange: function(e){
		this.setState({
			name: e.target.value
		});
	},

	updateFinalOptions: function(options) {
		console.log("Setting state");
		console.log(this.state.finalOptions);
		console.log(options);
		this.setState({
			finalOptions: options
		});
	},

	handleDeploy: function() {
		// deploy
		this.nextStage();
	},

	render: function(){
		trueFalseOptions = { "Yes":true,
							 "No":false
						   };
		ingestionOptions = { "Streaming. Eg: Storm/Spark Streaming": "stream", 
							 "Batch Processing. Eg: Spark SQL": "batch"
						   };
		storageOptions = { "Document Store. ( MongoDB/Elasticsearch )": "document",
						   "Column-based Store. (HBase/Cassandra )": "column",
						   "Key-Value. ( Redis )": "kv",
						   "Graph. ( Neo4j )": "graph"
						 };
		switch (this.state.stage) {
			case 0:
				return (
					<WelcomeMsg name={this.state.name}
								handleNameChange={this.handleNameChange}
								handleUpdate={this.updateSysInfo} 
					 			handleSubmit={this.nextStage} />
					);
			case 1:
				return (
					<OptionForm question="Do you need a messaging system?"
								sysType="msgSystem"
								property="needed"
								options={trueFalseOptions} 
								handleUpdate={this.updateSysInfo}
								handleNext={this.nextStage}
								noIncr="3"
								type="radio" 
								name="msg1" />
					);
			case 2:
				return (
					<OptionForm question="Will your messaging system have multiple consumers? Eg: Spark Streaming & Spark SQL"
							    sysType="msgSystem"
							    property="multipleConsumers"
							    handleUpdate={this.updateSysInfo}
							    options={trueFalseOptions}
							    handleNext={this.nextStage}
							    type="radio"
							    name="msg2" />
					);
			case 3:
				return (
					<OptionForm question="Do you need built-in routing/filtering options in the messaging system?"
								sysType="msgSystem"
								property="builtInRouting"
								handleUpdate={this.updateSysInfo} 
								options={trueFalseOptions}
								handleNext={this.nextStage}
								type="radio"
								name="msg3" />
					);
			case 4:
				return (
					<OptionForm question="What kind of ingestion system do you need?"
								sysType="ingestionSystem"
								handleUpdate={this.updateSysInfo}
								options={ingestionOptions}
								handleNext={this.nextStage}
								type="checkbox"
								name="ingest1" />
					);
			case 5:
				return (
					<OptionForm question="Do you need exactly-once semantics?"
								sysType="ingestionSystem"
								property="exactlyOnce"
								handleUpdate={this.updateSysInfo}
								options={trueFalseOptions}
								handleNext={this.nextStage}
								type="radio"
								name="ingest2" />
					);
			case 6:
				return (
					<OptionForm question="What kind of storage are you looking for?"
								sysType="db"
								handleUpdate={this.updateSysInfo}
								options={storageOptions}
								handleNext={this.nextStage}
								type="checkbox"
								name="store1" />
					);
			case 7:
			    return (
			      	<DeployPage options={this.state.finalOptions}
			      				handleDeploy={this.handleDeploy} 
			      				onLoadFunction={this.getFinalOptions} />);

		}
	},

	getFinalOptions: function() {
		$.get(API_URL, systemInfo, function (result) {
	      console.log(result);
	      this.setState({
	        finalOptions: result
	      });
	    }.bind(this));
	},

	nextStage: function(incr) {

		var stage = this.state.stage;

		if (incr) {
			stage += parseInt(incr);
		}

		else {
			stage += 1;
		}

		this.setState({
		stage : stage
		})
	},

	prevStage: function() {
	  this.setState({
	    stage : this.state.stage - 1
	  })
	},

	updateSysInfo: function (sysInfoObj) {
		systemInfo.msgSystem = Object.assign({}, systemInfo.msgSystem, sysInfoObj.msgSystem);
		systemInfo.ingestionSystem = Object.assign({}, systemInfo.ingestionSystem, sysInfoObj.ingestionSystem);
		systemInfo.db = Object.assign({}, systemInfo.db, sysInfoObj.db);
		console.log(systemInfo);
	}
});

module.exports = MainMsgBox;