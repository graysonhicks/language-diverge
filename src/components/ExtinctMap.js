import React, { Component } from "react";
import "../styles/Extinct.css";
import { withGoogleMap, GoogleMap } from "react-google-maps";

import Loading from "./Loading";
import ExtinctMarker from "./ExtinctMarker";

const MyMapComponent = withGoogleMap(props => (
	<GoogleMap
		mapTypeId="satellite"
		defaultOptions={{
			mapTypeControl: false,
			minZoom: 3
		}}
		defaultZoom={3}
		defaultCenter={{ lat: 0, lng: 0 }}
	>
		{props.isMarkerShown &&
			props.markers.map(marker => {
				return <ExtinctMarker key={marker._id} marker={marker} className={"marker"} />;
			})}
	</GoogleMap>
));

class ExtinctMap extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: true,
			extinctData: []
		};
	}

	componentWillReceiveProps(nextProps) {
		console.log(nextProps);
		if (nextProps.extinctData) {
			this.setState({
				loading: false,
				extinctData: nextProps.extinctData
			});
		}
	}

	render() {
		console.log(this.state);
		return (
			<div className="Extinct map">
				<div className="chart-heading">Extinct Languages Across the Globe</div>
				{this.state.loading ? (
					<Loading />
				) : (
					<MyMapComponent
						markers={this.state.extinctData}
						isMarkerShown
						containerElement={<div style={{ height: `500px` }} />}
						mapElement={<div style={{ height: `100%` }} />}
					/> // Map with a Marker
				)}
			</div>
		);
	}
}

export default ExtinctMap;
