import React, { Component } from "react";
import "../styles/ExtinctTimeline.css";

import { Bar } from "react-chartjs-2";
import Loading from "./Loading";

class ExtinctTimeline extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: true
		};
	}

	componentDidMount() {
		if (!this.props.chartData) {
			this.props.getChartData("extinct").then(json => {
				this.setState({ loading: false });
			});
		} else {
			this.setState({ loading: false });
		}
	}
	options = {
		tooltips: {
			callbacks: {
				label: (item, data) => {
					return data.datasets[item.datasetIndex].label;
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
					stacked: true
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
		console.log(this.props);
		return (
			<div className="ExtinctTimeline chart">
				<div className="chart-heading">Extinct Languages by Year</div>
				{this.state.loading ? (
					<Loading />
				) : (
					<Bar
						data={{
							labels: this.props.chartData.uniqueYears,
							datasets: this.props.chartData.languages
						}}
						options={this.options}
					/>
				)}
			</div>
		);
	}
}

export default ExtinctTimeline;
