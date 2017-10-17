import React, { Component } from "react";
import { Marker, InfoWindow } from "react-google-maps";

class CustomMarker extends Component {
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

	render() {
		console.log(this.props.marker);
		return (
			<Marker
				key={this.props.marker.id}
				onClick={this.onToggleOpen}
				position={{ lat: this.props.marker.latitude, lng: this.props.marker.longitude }}
				id={this.props.marker._id}
				style={{ height: "5xpx", width: "5px" }}
				className={"marker"}
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

export default CustomMarker;
