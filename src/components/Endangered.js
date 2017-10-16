import React, { Component } from "react";
import "../styles/Endangered.css";
import { withGoogleMap, GoogleMap } from "react-google-maps";

import { Line } from "react-chartjs-2";
import Loading from "./Loading";
import CustomMarker from "./CustomMarker";

const MyMapComponent = withGoogleMap(props => (
	<GoogleMap defaultZoom={8} defaultCenter={{ lat: -34.397, lng: 150.644 }}>
		{props.isMarkerShown &&
			props.markers.map(marker => {
				return (
					<div key={marker._id}>
						<CustomMarker key={marker._id} marker={marker} className={"marker"} />
					</div>
				);
			})}
	</GoogleMap>
));

class Endangered extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: true
		};
	}

	componentDidMount() {
		this.props.getChartData("endangered").then(json => {
			this.setState(
				{
					endangeredData: json.data
				},
				() => {
					this.setState({ loading: false });
				}
			);
		});
	}

	onToggleOpen({ isOpen }) {
		isOpen: !isOpen;
	}

	render() {
		return (
			<div className="Endangered chart">
				<div>Endangered Language Data</div>
				{this.state.loading ? (
					<Loading />
				) : (
					<MyMapComponent
						markers={this.state.endangeredData}
						isMarkerShown
						containerElement={<div style={{ height: `400px` }} />}
						mapElement={<div style={{ height: `100%` }} />}
					/> // Map with a Marker
				)}
			</div>
		);
	}
}

export default Endangered;
