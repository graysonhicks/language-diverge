import React, { Component } from "react";
import logo from "../logo.svg";
import "../styles/App.css";

import StackOverflow from "./StackOverflow";
import Historic from "./Historic";

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
					<img src={logo} className="App-logo" alt="logo" />
					<h1 className="App-title">Language Diverge</h1>
				</header>
				<div className="testblock">Test space</div>
				<StackOverflow getChartData={this.getChartData} />
				<Historic getChartData={this.getChartData} />
			</div>
		);
	}
}

export default App;
