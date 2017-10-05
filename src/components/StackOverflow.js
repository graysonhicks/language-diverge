import React, { Component } from "react";
import "../styles/StackOverflow.css";

import { Line } from "react-chartjs-2";

class StackOverflow extends Component {
	componentDidMount() {
		this.props.getChartData("computer").then(json => this.props.setChartData("stackOverFlowData", json));
	}

	render() {
		return (
			<div className="StackOverflow">
				<Line
					data={{
						labels: this.props.stackOverFlowData.labels,
						datasets: [
							{
								data: [20, 30, 40]
							}
						]
					}}
				/>
			</div>
		);
	}
}

export default StackOverflow;
