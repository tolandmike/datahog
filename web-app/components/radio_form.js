var RadioForm = React.createClass({
	
	render: function() {

		var options = this.props.options;

		var inputElements = []

		for(var option in options){
			inputElements.push(<label>{option}</label>);
			inputElements.push(<input type="radio" value={options[option]}/>)
		}

		return(
			//onChange is a REACT-specific tag to handle the onCHange event
			<div className="formDiv">
				<label>{this.props.question}</label>
				{inputElements}
				<button onClick={ this.nextClick }>Next</button>
			</div>
		)
	},

	nextClick: function(e) {
		e.preventDefault();
		this.props.handleNext();
	}
});

module.exports = RadioForm;