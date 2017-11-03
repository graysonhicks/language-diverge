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
					so2011: json.data["so2011"],
					so2012: json.data["so2012"],
					so2013: json.data["so2013"],
					so2014: json.data["so2014"],
					so2015: json.data["so2015"],
					so2016: json.data["so2016"]
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
							datasets: [
								{
									data: Object.keys(this.state.so2011).map((key, index) => this.state.so2011[key]),
									backgroundColor: Object.keys(this.state.so2011).map((key, index) => colors[Math.floor(Math.random() * colors.length)])
								},
								{
									data: Object.keys(this.state.so2012).map((key, index) => this.state.so2012[key]),
									backgroundColor: Object.keys(this.state.so2012).map((key, index) => colors[Math.floor(Math.random() * colors.length)])
								},
								{
									data: Object.keys(this.state.so2013).map((key, index) => this.state.so2013[key]),
									backgroundColor: Object.keys(this.state.so2013).map((key, index) => colors[Math.floor(Math.random() * colors.length)])
								},
								{
									data: Object.keys(this.state.so2014).map((key, index) => this.state.so2014[key]),
									backgroundColor: Object.keys(this.state.so2014).map((key, index) => colors[Math.floor(Math.random() * colors.length)])
								},
								{
									data: Object.keys(this.state.so2015).map((key, index) => this.state.so2015[key]),
									backgroundColor: Object.keys(this.state.so2015).map((key, index) => colors[Math.floor(Math.random() * colors.length)])
								},
								{
									data: Object.keys(this.state.so2016).map((key, index) => this.state.so2016[key]),
									backgroundColor: Object.keys(this.state.so2016).map((key, index) => colors[Math.floor(Math.random() * colors.length)])
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
