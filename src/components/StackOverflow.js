import React, { Component } from "react";
import "../styles/StackOverflow.css";

import { Bar } from "react-chartjs-2";
import Loading from "./Loading";

class StackOverflow extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: true
		};
	}
	componentDidMount() {
		if (!this.props.chartData) {
			this.props.getChartData("computer").then(json => {
				this.setState({
					loading: false
				});
			});
		} else {
			this.setState({
				loading: false
			});
		}
	}

	options = {
		tooltips: {
			callbacks: {
				label: (item, data) => {
					return data.datasets[item.datasetIndex].label + " " + (data.datasets[item.datasetIndex]["data"][item.index] * 100).toFixed(1) + "%";
				}
			}
		},
		maintainAspectRatio: true,
		legend: {
			display: false
		},
		scales: {
			yAxes: [
				{
					stacked: true,
					display: false
				}
			],
			xAxes: [
				{
					gridLines: {
						display: false
					},
					barPercentage: 0.95,
					categoryPercentage: 0.95,
					stacked: true
				}
			]
		}
	};

	render() {
		return (
			<div className="StackOverflow chart">
				<div className="chart-heading">Stack Overflow Data</div>
				{this.state.loading ? (
					<Loading />
				) : (
					<Bar
						data={{
							labels: ["2011", "2012", "2013", "2014", "2015", "2016"],
							datasets: this.props.chartData
						}}
						options={this.options}
					/>
				)}
			</div>
		);
	}
}

export default StackOverflow;
