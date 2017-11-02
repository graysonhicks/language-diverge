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
		maintainAspectRatio: true,
		legend: {
			display: false
		},
		scales: {
			xAxes: [
				{
					gridLines: {
						display: false
					},
					barPercentage: 0.95,
					categoryPercentage: 0.95
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
							labels: this.state.soData.map((item, index) => index),
							datasets: [
								{
									data: this.state.soData.map((item, index) => item.languages.length),
									backgroundColor: this.state.soData.map(item => colors[Math.floor(Math.random() * colors.length)])
								}
							]
						}}
						options={this.options}
					/>
				)}
			</div>
		);
	}
}

export default StackOverflow;
