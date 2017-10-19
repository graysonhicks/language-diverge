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
					endangeredData: json.data
				},
				() => {
					this.setState({ loading: false });
				}
			);
		});
	}

	render() {
		return (
			<div className="Extinct chart">
				<div className="chart-heading">Extinct Languages Across the Globe</div>
				{this.state.loading ? (
					<Loading />
				) : (
					<MyMapComponent
						markers={this.state.endangeredData}
						isMarkerShown
						containerElement={<div style={{ height: `500px` }} />}
						mapElement={<div style={{ height: `100%` }} />}
					/> // Map with a Marker
				)}
			</div>
		);
	}
}

export default Extinct;
