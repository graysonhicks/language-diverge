import React, { Component } from "react";
import "../styles/StackOverflow.css";

import { Bar } from "react-chartjs-2";
import Loading from "./Loading";

var colors = [
	"#29a390",
	"#8f93ff",
	"#c7c9ff",
	"#0f147f",
	"#161cb5",
	"#ffd780",
	"#ffebbf",
	"#b37a00",
	"#ffaf00",
	"#ffaf80",
	"#ffd7bf",
	"#b34300",
	"#ff5f00",
	"#80fff7",
	"#bffffb",
	"#006d66",
	"#009c92"
];

class StackOverflow extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: true
		};
	}
	componentDidMount() {
		this.props.getChartData("computer").then(json => {
			console.log(json.data);
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
			<div className="StackOverflow chart">
				<div className="chart-heading">Stack Overflow Data</div>
				{this.state.loading ? (
					<Loading />
				) : (
					<Bar
						data={{
							labels: ["2011", "2012", "2013", "2014", "2015", "2016"],
							datasets: this.state.soData
						}}
						options={this.options}
					/>
				)}
			</div>
		);
	}
}

export default StackOverflow;
