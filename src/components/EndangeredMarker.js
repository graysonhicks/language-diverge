import React, { Component } from "react";
import { Marker, InfoWindow } from "react-google-maps";
import critical from "../images/symbol_blank_critically.png";
import severe from "../images/symbol_blank_severely.png";
import definite from "../images/symbol_blank_definitely.png";
import vulnerable from "../images/symbol_blank_vulnerable.png";

const spreadMarkers = function(position) {
	return position * (Math.random() * (1.000001 - 0.9) + 0.9);
};

class EndangeredMarker extends Component {
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

	chooseMarkerIcon(status) {
		var icon = "";
		switch (status) {
			case "Critically endangered":
				icon = critical;
				break;
			case "Definitely endangered":
				icon = definite;
				break;
			case "Severely endangered":
				icon = severe;
				break;
			case "Vulnerable":
				icon = vulnerable;
				break;
			default:
				icon = vulnerable;
		}

		return icon;
	}

	componentWillMount() {
		this.props.marker.latitude = spreadMarkers(this.props.marker.latitude);
		this.props.marker.longitude = spreadMarkers(this.props.marker.longitude);
	}

	render() {
		var icon = this.chooseMarkerIcon(this.props.marker["Degree of endangerment"]);
		if (!this.props.marker.latitude) return "";
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
				options={{
					icon: {
						url: icon
					}
				}}
			>
				{this.state.isOpen ? (
					<InfoWindow onCloseClick={this.onToggleOpen}>
						<div>
							Language: {this.props.marker.language} <br />Status: {this.props.marker["Degree of endangerment"]}
						</div>
					</InfoWindow>
				) : (
					<div />
				)}
			</Marker>
		);
	}
}

export default EndangeredMarker;
