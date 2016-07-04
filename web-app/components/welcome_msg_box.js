//Stage 0
var WelcomeMsg = React.createClass({
	
	render: function() {
		return(
			//onChange is a REACT-specific tag to handle the onCHange event
			<div>
				<label>Name</label>
				<input type="text"
					   value={this.props.name}
					   onChange={this.props.handleNameChange} />
				<span>Welcome {this.props.name}! Before we present you with options, let's understand your use case!</span>
				<button onClick={ this.start }>Start</button>
			</div>
		)
	},

	start: function(e) {
		e.preventDefault();
	}
});

module.exports = WelcomeMsg;