var OptionForm = React.createClass({
	
	render: function() {

		var options = this.props.options;
		var inputType = this.props.type;
		var groupName = this.props.name;
		var inputElements = [];

		for(var option in options){
			inputElements.push(<input type={inputType} value={options[option]} name={groupName} onChange={this.optionSelect} />);
			inputElements.push(<label className="light">{option}</label>);
			inputElements.push(<br/>);
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

	optionSelect: function(e) {
		sysInfo = this.getSysInfoObj();
		sysType = this.props.sysType;
		property = this.props.property;
		if (property) {
			this.changeProperty(sysInfo, sysType, property, e.target.value);	
		}
		else {
			this.changeProperty(sysInfo, sysType, e.target.value, e.target.checked);
		}
	},

	getSysInfoObj: function() {
		sysType = this.props.sysType;
		sysInfo = {}
		sysInfo[sysType] = {}
		return sysInfo;
	},

	changeProperty: function(obj, type, prop, value) {
		obj[type][prop] = value;
		this.props.handleUpdate(obj);
	},

	nextClick: function(e) {
		e.preventDefault();
		this.props.handleNext();
	}
});

module.exports = OptionForm;