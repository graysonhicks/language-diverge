import React, { Component } from "react";

import "../styles/App.css";

import StackOverflow from "./StackOverflow";
import Historic from "./Historic";
import Endangered from "./Endangered";
import ExtinctMap from "./ExtinctMap";
import ExtinctTimeline from "./ExtinctTimeline";

const apiRoute = "https://language-diverge.herokuapp.com/";

class App extends Component {
	constructor(props) {
		super(props);

		this.getChartData = this.getChartData.bind(this);
		this.chooseChart = this.chooseChart.bind(this);
	}

	checkStatus(response) {
		if (response.status >= 200 && response.status < 300) {
			return response;
		}

		const error = new Error(`HTTP Error ${response.statusText}`);
		error.status = response.statusText;
		error.response = response;
		throw error;
	}

	getChartData(route) {
		return fetch(apiRoute + route)
			.then(res => this.checkStatus(res))
			.then(goodRes => goodRes.json())
			.then(json => json);
	}

	chooseChart(e) {
		this.setState({
			chart: e.target.value
		});
	}

	chartSwitch() {
		switch (this.state.chart) {
			case "stackoverflow":
				return <StackOverflow getChartData={this.getChartData} />;
				break;
			case "historic":
				return <Historic getChartData={this.getChartData} />;
				break;
			case "endangered":
				return <Endangered getChartData={this.getChartData} />;
				break;
			case "extinctmap":
				return <ExtinctMap getChartData={this.getChartData} />;
				break;
			// case "extincttimeline":
			// 	return <ExtinctTimeline getChartData={this.getChartData} />;
			// 	break;
			default:
				return <StackOverflow getChartData={this.getChartData} />;
				break;
		}
	}

	render() {
		console.log(this.state);
		return (
			<div className="App">
				<header className="App-header">
					<h1 className="App-title">Human vs. Computer Language Diversity</h1>
				</header>
				<div className="body-container">
					<select onChange={this.chooseChart}>
						<option value="stackoverflow">StackOverflow</option>
						<option value="historic">Historic Computer Languages</option>
						<option value="endangered">Endangered Human Languages</option>
						<option value="extinctmap">Extinct Human Languages Map</option>
						{/*<option value="extincttimeline">Extinct Human Languages Timeline</option>*/}
					</select>
					{this.state ? this.chartSwitch() : null}
				</div>
			</div>
		);
	}
}

export default App;
