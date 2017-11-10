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
		console.log(e.target);
		this.setState({
			chart: e.target.getAttribute("data-chart")
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
			case "extincttimeline":
				return <ExtinctTimeline getChartData={this.getChartData} />;
				break;
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
					<div className="nav">
						<div className="nav-items" onClick={this.chooseChart} data-chart="stackoverflow">
							StackOverflow
						</div>
						<div className="nav-items" onClick={this.chooseChart} data-chart="historic">
							Historic Computer Languages
						</div>
						<div className="nav-items" onClick={this.chooseChart} data-chart="endangered">
							Endangered Human Languages
						</div>
						<div className="nav-items" onClick={this.chooseChart} data-chart="extinctmap">
							Extinct Human Languages Map
						</div>
						<div className="nav-items" onClick={this.chooseChart} data-chart="extincttimeline">
							Extinct Human Languages Timeline
						</div>
					</div>

					{this.state ? this.chartSwitch() : null}
				</div>
			</div>
		);
	}
}

export default App;
