import React, { Component } from "react";
import "../styles/Historic.css";

import { Bar } from "react-chartjs-2";
import Loading from "./Loading";

class Historic extends Component {
	constructor(props) {
		super(props);

		this.state = {
			uniqueYears: [],
			languages: [],
			loading: true
		};
	}

	componentDidMount() {
		this.props.getChartData("historic").then(json => {
			this.setState(
				{
					uniqueYears: json.data.uniqueYears,
					languages: json.data.languages
				},
				() => {
					this.setState({ loading: false });
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
		console.log(this.state);
		return (
			<div className="Historic chart">
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

export default Historic;
