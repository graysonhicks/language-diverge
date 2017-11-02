import React, { Component } from "react";
import "../styles/Extinct.css";

import ExtinctMap from "./ExtinctMap";
import ExtinctTimeline from "./ExtinctTimeline";

class Extinct extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: true
		};
	}

	componentDidMount() {
		this.props.getChartData("extinct").then(json => {
			this.setState(
				{
					extinctData: json.data.languages
				},
				() => {
					this.setState({
						loading: false
					});
				}
			);
		});
	}

	render() {
		return (
			<div className="Extinct container">
				<ExtinctMap extinctData={this.state.extinctData} loading={this.state.loading} />
				<ExtinctTimeline extinctData={this.state.extinctData} />
			</div>
		);
	}
}

export default Extinct;
