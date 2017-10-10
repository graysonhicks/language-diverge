import React, {Component} from "react";
import "../styles/Historic.css";
import _ from "underscore";

import {Bar} from "react-chartjs-2";

class Historic extends Component {
  constructor(props) {
    super(props);

    this.state = {
      historicData: {
        data: []
      }
    };
  }
  componentDidMount() {
    this.props.getChartData("historic").then(json => this.setState({historicData: json}));
  }

  render() {
    console.log(this.state);
    return (
      <div className="Historic">
        <Bar data={{
          datasets: [
            {
              data: this.state.historicData.data.map((item, i) => {
								var o = {
									x: new Date(item.year),
									y: i++
								}
								return o;
							})
            },
						{
							data: this.state.historicData.data.map((item)=> item.language)
						}
          ]
        }} options={{
        scales: {
            xAxes: [{

                labels: _.pluck(this.state.historicData.data, "year"),
            }]
        }
    }}/>
      </div>
    );
  }
}

export default Historic;
