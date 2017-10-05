import React, { Component } from "react";
import logo from "../logo.svg";
import "../styles/App.css";

import StackOverflow from "./StackOverflow";

const apiRoute = "https://language-diverge.herokuapp.com/";

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			computers: []
		};

		this.getChartData = this.getChartData.bind(this);
		this.setChartData = this.setChartData.bind(this);
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

	setChartData(category, data) {
		var newState = {};
		newState[category] = data;
		this.setState(newState, function() {
			console.log(this.state);
		});
	}

	componentDidMount() {}

	render() {
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h1 className="App-title">Welcome to React</h1>
				</header>
				<p className="App-intro">
					To get started, edit <code>src/App.js</code> and save to reload.
				</p>
				<StackOverflow getChartData={this.getChartData} setChartData={this.setChartData} />
			</div>
		);
	}
}

export default App;
