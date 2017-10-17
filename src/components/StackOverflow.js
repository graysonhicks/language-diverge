import React, { Component } from "react";
import "../styles/StackOverflow.css";

import { Line } from "react-chartjs-2";
import Loading from "./Loading";

class StackOverflow extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: true
		};
	}

	componentDidMount() {
		this.props.getChartData("computer").then(json => {
			this.setState(
				{
					soData: json.data
				},
				() => {
					this.setState({ loading: false });
				}
			);
		});
	}

	render() {
		return (
			<div className="StackOverflow chart">
				<div className="chart-heading">Stack Overflow Data</div>
				{this.state.loading ? (
					<Loading />
				) : (
					<Line
						data={{
							labels: [2011, 2012, 2013, 2014, 2015, 2016],
							datasets: [
								{
									data: [20, 30, 40, 10, 18, 45]
								}
							]
						}}
					/>
				)}
			</div>
		);
	}
}

export default StackOverflow;
