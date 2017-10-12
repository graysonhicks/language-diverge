import React, { Component } from "react";
import "../styles/Endangered.css";

import { Line } from "react-chartjs-2";
import Loading from "./Loading";

class Endangered extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: true
		};
	}

	componentDidMount() {
		this.props.getChartData("endangered").then(json => {
			this.setState(
				{
					endangeredData: json.data
				},
				() => {
					this.setState({ loading: false });
				}
			);
		});
	}

	render() {
		console.log(this.state);
		return (
			<div className="Endangered chart">
				<div>Endangered Language Data</div>
				{this.state.loading ? (
					<Loading />
				) : (
					<Line
						data={{
							labels: [2011, 2012, 2013, 2014, 2015, 2016],
							datasets: [
								{
									data: [20, 30, 40, 10, 18, 45]
								}
							]
						}}
					/>
				)}
			</div>
		);
	}
}

export default Endangered;
