import React, { Component } from "react";
import "../styles/Endangered.css";
import { withGoogleMap, GoogleMap } from "react-google-maps";

import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";

import Loading from "./Loading";
import EndangeredMarker from "./EndangeredMarker";

const MyMapComponent = withGoogleMap(props => {
	return (
		<GoogleMap
			mapTypeId="satellite"
			defaultOptions={{
				mapTypeControl: false,
				minZoom: 3
			}}
			defaultZoom={3}
			defaultCenter={{ lat: 0, lng: 0 }}>
			<MarkerClusterer averageCenter enableRetinaIcons gridSize={50} maxZoom={7}>
				{props.isMarkerShown &&
					props.markers.map(marker => {
						return <EndangeredMarker key={marker._id} marker={marker} className={"marker"} />;
					})}
			</MarkerClusterer>
		</GoogleMap>
	);
});

class Endangered extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: true
		};
	}

	componentDidMount() {
		if (!this.props.chartData) {
			this.props.getChartData("endangered").then(json => {
				this.setState({
					loading: false
				});
			});
		} else {
			this.setState({
				loading: false
			});
		}
	}

	render() {
		return (
			<div className="Endangered chart">
				<div className="chart-heading">Endangered Languages Across the Globe</div>
				{this.state.loading ? (
					<Loading />
				) : (
					<MyMapComponent
						markers={this.props.chartData}
						isMarkerShown
						containerElement={<div style={{ height: `500px` }} />}
						mapElement={<div style={{ height: `100%` }} />}
					/> // Map with a Marker
				)}
			</div>
		);
	}
}

export default Endangered;
