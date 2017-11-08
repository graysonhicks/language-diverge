import React, { Component } from "react";
import { Marker, InfoWindow } from "react-google-maps";

import dead from "../images/pirates.png";

const spreadMarkers = function(position) {
	return position * (Math.random() * (1.000001 - 0.98) + 0.98);
};

class ExtinctMarker extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isOpen: false
		};

		this.onToggleOpen = this.onToggleOpen.bind(this);
	}

	onToggleOpen() {
		this.setState({
			isOpen: !this.state.isOpen
		});
	}

	componentWillMount() {
		this.props.marker.latitude = spreadMarkers(this.props.marker.latitude);
		this.props.marker.longitude = spreadMarkers(this.props.marker.longitude);
	}

	render() {
		if (!this.props.marker.latitude) return "";
		console.log(this.props.marker);
		return (
			<Marker
				key={this.props.marker._id}
				onClick={this.onToggleOpen}
				position={{
					lat: this.props.marker.latitude,
					lng: this.props.marker.longitude
				}}
				id={this.props.marker._id}
				style={{ height: "5px", width: "5px", margin: "5px" }}
				className={"marker"}
				icon={{
					url: dead
				}}>
				{this.state.isOpen ? (
					<InfoWindow onCloseClick={this.onToggleOpen}>
						<div>
							Language: {this.props.marker.label} <br />Date of Extinction: {this.props.marker["year"] || "Unknown"}
						</div>
					</InfoWindow>
				) : (
					<div />
				)}
			</Marker>
		);
	}
}

export default ExtinctMarker;
