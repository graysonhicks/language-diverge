import React, { Component } from "react";
import "../styles/Extinct.css";

import ExtinctMap from "./ExtinctMap";
import ExtinctTimeline from "./ExtinctTimeline";

class Extinct extends Component {
	constructor(props) {
		super(props);

		this.state = {
			extinctData: []
		};
	}

	componentDidMount() {
		this.props.getChartData("extinct").then(json => {
			console.log(json);
			this.setState({
				extinctData: json.data.languages
			});
		});
	}

	render() {
		console.log(this.state);
		return (
			<div className="Extinct container">
				<ExtinctMap extinctData={this.state.extinctData} />
				<ExtinctTimeline extinctData={this.state.extinctData} />
			</div>
		);
	}
}

export default Extinct;
