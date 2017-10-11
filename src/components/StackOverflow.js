import React, { Component } from "react";
import "../styles/StackOverflow.css";

import { Line } from "react-chartjs-2";

class StackOverflow extends Component {
	componentDidMount() {
		// this.props.getChartData("computer").then(json => this.props.setChartData("stackOverFlowData", json));
	}

	render() {
		console.log(this.props);
		return (
			<div className="StackOverflow chart">
				<Line
					data={{
						labels: [12, 3, 4],
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
