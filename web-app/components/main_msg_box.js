var React = require('react');
var WelcomeMsg = require('./welcome_msg_box');

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
					<WelcomeMsg name={this.state.name} nameChange={this.handleNameChange} />
					);
		}
	}
});

module.exports = MainMsgBox;

//ReactDOM.render(<MainMsgBox />, document.getElementById('app'));
//ReactDOM.render(<MainMsgBox />, document.getElementById('app'));