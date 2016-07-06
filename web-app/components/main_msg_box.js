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
		polyglot: false,
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

var React = require('react');
var WelcomeMsg = require('./welcome_msg_box');
var RadioForm = require('./radio_form');

var MainMsgBox = React.createClass({

	//Sets the initial state of the component
	getInitialState: function(){
		return {
			name: 'Rohan',
			stage: 0
		}
	},

	//custom event handler for input onChange
	handleNameChange: function(e){
		//to change the state
		this.setState({
			name: e.target.value
		});
	},

	render: function(){
		switch(this.state.stage) {
			case 0:
				return (
					<WelcomeMsg name={this.state.name} handleNameChange={this.handleNameChange} handleSubmit={this.nextStage}/>
					);
			case 1:
				options = {"Yes":true, "No":false};
				return (
					<RadioForm question="Do you need a messaging system?" options={options} handleNext={this.nextStage} />
					);
		}
	},

	nextStage: function() {
	  this.setState({
	    stage : this.state.stage + 1
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
	}
});

module.exports = MainMsgBox;