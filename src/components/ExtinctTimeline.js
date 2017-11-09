import React, { Component } from "react";
import "../styles/ExtinctTimeline.css";

import { Bar } from "react-chartjs-2";
import Loading from "./Loading";

class ExtinctTimeline extends Component {
	constructor(props) {
		super(props);

		this.state = {
			uniqueYears: [],
			languages: [],
			loading: true
		};
	}

	componentDidMount() {
		this.props.getChartData("extinct").then(json => {
			this.setState(
				{
					extinctData: json.data.languages,
					uniqueYears: json.data.uniqueYears
				},
				() => {
					this.setState({
						loading: false
					});
				}
			);
		});
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
		return (
			<div className="ExtinctTimeline chart">
				<div className="chart-heading">Extinct Languages by Year</div>
				{this.state.loading ? (
					<Loading />
				) : (
					<Bar
						data={{
							labels: this.state.uniqueYears,
							datasets: this.state.extinctData
						}}
						options={this.options}
					/>
				)}
			</div>
		);
	}
}

export default ExtinctTimeline;
