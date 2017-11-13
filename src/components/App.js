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

		this.state = {
			chart: "stackoverflow",
			computer: null,
			historic: null,
			endangered: null,
			extinct: null
		};

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
			.then(json => {
				this.setState({
					[route]: json.data
				});
			});
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
				return <StackOverflow getChartData={this.getChartData} chartData={this.state.computer} />;
				break;
			case "historic":
				return <Historic getChartData={this.getChartData} chartData={this.state.historic} />;
				break;
			case "endangered":
				return <Endangered getChartData={this.getChartData} chartData={this.state.endangered} />;
				break;
			case "extinctmap":
				return <ExtinctMap getChartData={this.getChartData} chartData={this.state.extinct} />;
				break;
			case "extincttimeline":
				return <ExtinctTimeline getChartData={this.getChartData} chartData={this.state.extinct} />;
				break;
			default:
				return <StackOverflow getChartData={this.getChartData} />;
				break;
		}
	}

	render() {
		return (
			<div className="App">
				<header className="App-header">
					<h1 className="App-title">Human vs. Programming Languages</h1>
				</header>
				<div className="body-container">
					<div className="nav">
						<div
							className={this.state.chart == "stackoverflow" ? "nav-items active" : "nav-items"}
							onClick={this.chooseChart}
							data-chart="stackoverflow">
							StackOverflow
						</div>
						<div className={this.state.chart == "historic" ? "nav-items active" : "nav-items"} onClick={this.chooseChart} data-chart="historic">
							Historic Computer Languages
						</div>
						<div className={this.state.chart == "endangered" ? "nav-items active" : "nav-items"} onClick={this.chooseChart} data-chart="endangered">
							Endangered Human Languages
						</div>
						<div className={this.state.chart == "extinctmap" ? "nav-items active" : "nav-items"} onClick={this.chooseChart} data-chart="extinctmap">
							Extinct Human Languages Map
						</div>
						<div
							className={this.state.chart == "extincttimeline" ? "nav-items active" : "nav-items"}
							onClick={this.chooseChart}
							data-chart="extincttimeline">
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
