import React, { Component } from "react";

class DisplayMessage extends Component {
  state = {};
  constructor(props) {
    super();
    debugger;
  }
  render() {
    var Message =
      this.props.location.state.Message.status === "success" ? (
        <div className="row justify-content-center">
          <div className="col-md-8 pl-5 pr-5">
            <div className="card border-success mb-3">
              <div className="card-body">
                <h5 className="card-title">Result</h5>
                <p className="card-text">
                  <i class="far fa-grin fa-9x green align-middle" />
                  <span className="pl-4 text-justify">
                    Success! Congratulations on finding Falcone King Shan is
                    mighty pleased.
                  </span>
                </p>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <span className="row">
                    <span className="col-sm-4 text-left">
                      <i className="far fa-clock mr-3" />

                      {this.props.location.state.travelTime}
                    </span>
                  </span>
                </li>
                <li className="list-group-item">
                  <span className="row">
                    <span className="col-sm-4 text-left">
                      <i className="fas fa-globe mr-3" />
                      {this.props.location.state.Message.planet_name}
                    </span>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className="row">
          <span className="col-md-12">
            <h1>Not Found !</h1>
            <i class="far fa-frown fa-3x" />
          </span>
        </div>
      );

    if (this.props.location.state.Message.error !== "") {
      Message = <div>{this.props.location.state.Message.error}</div>;
    }
    return (
      <div className="jumbotron jumbotron-fluid">
        <div className="container" style={{ textAlign: "center" }}>
          <div>{Message}</div>
          <button
            className="button btn-primary mt-4"
            onClick={() => {
              this.props.history.push("/");
            }}
          >
            Start Again
          </button>
        </div>
      </div>
    );
  }
}

export default DisplayMessage;
