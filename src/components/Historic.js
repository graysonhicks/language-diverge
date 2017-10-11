import React, { Component } from "react";
import "../styles/Historic.css";

import { Bar } from "react-chartjs-2";

class Historic extends Component {
	constructor(props) {
		super(props);

		this.state = {
			uniqueYears: [],
			languages: []
		};
	}
	componentDidMount() {
		this.props.getChartData("historic").then(json => {
			this.setState({
				uniqueYears: json.data.uniqueYears,
				languages: json.data.languages
			});
		});
	}

	render() {
		return (
			<div className="Historic">
				<Bar
					data={{
						labels: this.state.uniqueYears,
						datasets: this.state.languages
					}}
					options={{
						animation: {
							duration: 0
						},

						hover: {
							animationDuration: 0 // duration of animations when hovering an item
						},
						tooltips: {
							callbacks: {
								label: (item, data) => {
									return data.datasets[item.datasetIndex].label;
								}
							}
						},
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
									barPercentage: 0.95,
									categoryPercentage: 0.95,
									stacked: true
								}
							]
						}
					}}
				/>
			</div>
		);
	}
}

export default Historic;
