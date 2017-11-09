import React, { Component } from "react";
import "../styles/Extinct.css";
import { withGoogleMap, GoogleMap } from "react-google-maps";

import Loading from "./Loading";
import ExtinctMarker from "./ExtinctMarker";

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
			{props.isMarkerShown &&
				props.markers.map((marker, index) => {
					return <ExtinctMarker key={index} marker={marker} className={"marker"} />;
				})}
		</GoogleMap>
	);
});

class ExtinctMap extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: true,
			extinctData: []
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
			<div className="Extinct map">
				<div className="chart-heading">Extinct Languages Across the Globe</div>
				{this.props.loading ? (
					<Loading />
				) : (
					<MyMapComponent
						markers={this.state.extinctData}
						isMarkerShown
						containerElement={<div style={{ height: `500px` }} />}
						mapElement={<div style={{ height: `100%` }} />}
					/>
				)}
			</div>
		);
	}
}

export default ExtinctMap;
