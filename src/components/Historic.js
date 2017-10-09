import React, { Component } from "react";
import "../styles/Historic.css";
import _ from "underscore";

import { Line } from "react-chartjs-2";

class Historic extends Component {
	constructor(props) {
		super(props);

		this.state = {
			historicData: []
		};
	}
	componentDidMount() {
		this.props.getChartData("historic").then(json => this.setState({ historicData: json }));
	}

	render() {
		return (
			<div className="Historic">
				<Line
					data={{
						labels: _.pluck(this.state.historicData.data, "year"),
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

export default Historic;
