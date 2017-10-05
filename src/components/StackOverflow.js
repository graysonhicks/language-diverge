import React, { Component } from "react";
import "../styles/StackOverflow.css";

class StackOverflow extends Component {
	componentDidMount() {
		this.props.getChartData("computer").then(json => this.props.setChartData("computers", json.computers));
	}

	render() {
		return <div className="StackOverflow" />;
	}
}

export default StackOverflow;
