var DeployPage = React.createClass({

	componentDidMount: function() {
		this.props.onLoadFunction();
	},
	
	render: function() {

		var options = this.props.options;
		var inputElements = [];

		for(var option in options){
			inputElements.push(<input type="radio" value={options[option]} name="deployOptions" />);
			inputElements.push(<label className="light">{option}</label>);
			inputElements.push(<br/>);
		}

		return(
			//onChange is a REACT-specific tag to handle the onCHange event
				<div className="formDiv">
					<label>Based on your requirements, these are our recommended options. Select an option to understand why
					it fits your needs</label>
					{inputElements}
					<button onClick={ this.nextClick }>Deploy</button>
				</div>
		)
	},

	nextClick: function(e) {
		e.preventDefault();
		this.props.handleDeploy();
	}
});

module.exports = DeployPage;