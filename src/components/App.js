import React, { Component } from "react";

import "../styles/App.css";

import StackOverflow from "./StackOverflow";
import Historic from "./Historic";
import Endangered from "./Endangered";
import Extinct from "./Extinct";

const apiRoute = "https://language-diverge.herokuapp.com/";

class App extends Component {
	constructor(props) {
		super(props);

		this.getChartData = this.getChartData.bind(this);
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

	render() {
		return (
			<div className="App">
				<header className="App-header">
					<h1 className="App-title">Human vs. Computer Language Diversity</h1>
				</header>
				<div className="body-container">
					<StackOverflow getChartData={this.getChartData} />
					<Historic getChartData={this.getChartData} />
					<Endangered getChartData={this.getChartData} />
					<Extinct getChartData={this.getChartData} />
				</div>
			</div>
		);
	}
}

export default App;
