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

	componentWillReceiveProps(nextProps) {
		if (nextProps.extinctData) {
			this.setState({
				loading: false,
				uniqueYears: nextProps.uniqueYears,
				languages: nextProps.languages
			});
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
		return (
			<div className="ExtinctTimeline chart">
				<div className="chart-heading">Programming Languages Creation by Year</div>
				{this.state.loading ? (
					<Loading />
				) : (
					<Bar
						data={{
							labels: this.state.uniqueYears,
							datasets: this.state.languages
						}}
						options={this.options}
					/>
				)}
			</div>
		);
	}
}

export default ExtinctTimeline;
