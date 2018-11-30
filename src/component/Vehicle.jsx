import React, { Component } from "react";
class Vehicle extends Component {
  render() {
    return (
      <div>
        {this.props.value.map((vehicle, index) => (
          <div key={index}>
            <input
              type="radio"
              name={this.props.name}
              id={"rad" + this.props.name}
              value={vehicle.speed}
              disabled={
                this.props.distance > vehicle.max_distance ||
                vehicle.total_no <= 0
              }
              onChange={e => this.props.onClick(e.target, vehicle)}
            />
            <span>
              {vehicle.name} ({vehicle.total_no})
            </span>
          </div>
        ))}
      </div>
    );
  }
}

export default Vehicle;
