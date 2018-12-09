import React, { Component } from "react";
import Planet from "./Planet";
import Vehicle from "./Vehicle";
import { PlanetApi } from "./../Service/planets";
import { VehicleApi } from "./../Service/vehicles";
import { Alert } from "reactstrap";
import { FindFalcon, calculateTravelTime } from "./../Util/Util";
class LaunchPad extends Component {
  state = {
    Destinations: [
      {
        name: "Destinations 1",
        value: "destination1",
        isVehicleVisible: false
      },
      {
        name: "Destinations 2",
        value: "destination2",
        isVehicleVisible: false
      },
      {
        name: "Destinations 3",
        value: "destination3",
        isVehicleVisible: false
      },
      {
        name: "Destinations 4",
        value: "destination4",
        isVehicleVisible: false
      }
    ],

    Vehicles: [],
    Planets: [],
    selectedPlanet: "",
    selectedVehicle: "",
    travelTime: 0,
    visitedPlanet: [],
    visitedVehicle: [],
    Message: {},
    isOpen: false,
    isDisabled: true
  };

  componentDidMount() {
    this.setState({ Vehicles: [] });
    this.setState({ Planets: [] });

    VehicleApi.get().then(Vehicles => {
      this.setState({ Vehicles, isVehicleLoaded: true });
    });
    PlanetApi.get().then(Planets => {
      this.setState({ Planets, isPlanetLoaded: true });
    });
  }

  onPlanetChange = (destination, selectedPlanet) => {
    const Destinations = [...this.state.Destinations];
    if (selectedPlanet) {
      const index = Destinations.findIndex(i => i.value === destination);

      const indexofselectedPlanet = this.state.Planets.indexOf(selectedPlanet);

      if (indexofselectedPlanet !== -1) {
        const selectedPlanet = this.state.Planets[indexofselectedPlanet];

        Destinations[index].isVehicleVisible = true;
        this.setState({ Destinations, selectedPlanet });
      }
    }
  };

  onVehicleChange = (e, selectedVehicle) => {
    const Planets = [...this.state.Planets];
    const visitedPlanet = [...this.state.visitedPlanet];
    const visitedVehicle = [...this.state.visitedVehicle];
    const Vehicles = [...this.state.Vehicles];

    let travelTime = this.state.travelTime;

    const indexofselectedPlanet = Planets.findIndex(
      i => i.name === this.state.selectedPlanet.name
    );
    const indexofselectedVehicle = Vehicles.indexOf(selectedVehicle);

    if (this.state.selectedPlanet === "") {
      this.setState({
        Message: { Text: "Please select planet first" },
        isOpen: true
      });
      e.checked = false;
      return false;
    }

    Planets.splice(indexofselectedPlanet, 1);
    Vehicles[indexofselectedVehicle].total_no--;

    travelTime += calculateTravelTime(
      selectedVehicle,
      this.state.selectedPlanet
    );

    visitedPlanet.push(this.state.selectedPlanet.name);
    visitedVehicle.push(selectedVehicle.name);

    this.setState({
      visitedPlanet,
      visitedVehicle,
      selectedVehicle,
      Planets,
      selectedPlanet: "",
      travelTime,
      isDisabled: !(visitedPlanet.length === 4 && visitedVehicle.length === 4)
    });
  };

  onFindFalcon = () => {
    FindFalcon(this.state.visitedPlanet, this.state.visitedVehicle).then(
      Message => {
        this.setState({
          Message,
          isOpen: true
        });
        this.props.history.push({
          pathname: "/DisplayMessage",
          state: {
            Message,
            travelTime: this.state.travelTime
          }
        });
      }
    );
  };

  render() {
    return (
      <div>
        <div className="row">
          {this.state.Destinations.map(destination => (
            <div className="col-lg-3" key={destination.value}>
              <h5 className="card-header">{destination.name}</h5>
              <div className="card">
                <div className="card-body">
                  <div id={this.props.value}>
                    <div className="card-text">
                      <Planet
                        onChange={this.onPlanetChange}
                        value={this.state.Planets}
                        name={destination.value}
                      />
                      <div id={this.props.value}>
                        {destination.isVehicleVisible ? (
                          <Vehicle
                            onClick={this.onVehicleChange}
                            value={this.state.Vehicles}
                            id={this.state.value}
                            name={destination.value}
                            distance={0}
                          />
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="row mt-4">
          <div className="col-sm-12">
            <Alert
              color={this.state.Message.Color}
              isOpen={this.state.isOpen}
              toggle={this.onDismiss}
            >
              {this.state.Message.Text}
            </Alert>

            <Alert>
              <i className="far fa-clock mr-4" />
              {this.state.travelTime}
            </Alert>
          </div>
        </div>
        <div className="row justify-content-center">
          <button
            className="btn btn-primary"
            onClick={this.onFindFalcon}
            disabled={this.state.isDisabled}
          >
            <i className="fas fa-search mr-4" />
            Find Falcone!
          </button>
        </div>
      </div>
    );
  }
}

export default LaunchPad;
