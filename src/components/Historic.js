import React, { Component } from "react";
import "../styles/Historic.css";

import { Chart, Bar } from "react-chartjs-2";
import LazyLoad from "react-lazyload";
import Loading from "./Loading";

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

	options = {
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
	};

	render() {
		return (
			<div className="Historic chart">
				<div>Programming Languages Creation by Year</div>
				<LazyLoad height={475} placeholder={<Loading />} once={true}>
					<Bar
						data={{
							labels: this.state.uniqueYears,
							datasets: this.state.languages
						}}
						options={this.options}
					/>
				</LazyLoad>
			</div>
		);
	}
}

export default Historic;
