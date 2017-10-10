import React, { Component } from "react";
import "../styles/Historic.css";
import _ from "underscore";

import { Bar } from "react-chartjs-2";

class Historic extends Component {
	constructor(props) {
		super(props);

		this.state = {
			historicData: {
				data: []
			}
		};
	}
	componentDidMount() {
		this.props.getChartData("historic").then(json => this.setState({ historicData: json }));
	}

	render() {
		var uniqueYears = [];
		uniqueYears = _.uniq(_.pluck(this.state.historicData.data, "year"));
		var languages = [];
		languages = this.state.historicData.data.map(item => {
			var years = [];
			for (var i = 0; i < uniqueYears.length; i++) {
				if (item.year == uniqueYears[i]) {
					years.push(1);
				} else {
					years.push(0);
				}
			}
			return {
				label: item.language,
				backgroundColor: "#" + Math.floor(Math.random() * 16777215).toString(16),
				data: years
			};
		});
		console.log(languages);
		return (
			<div className="Historic">
				<Bar
					data={{
						labels: uniqueYears,
						datasets: languages
					}}
					options={{
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
