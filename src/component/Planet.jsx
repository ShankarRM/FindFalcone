import React, { Component } from "react";
import Autosuggest from "react-autosuggest";
const getSuggestionValue = suggestion => suggestion.name;

class Planet extends Component {
  renderSuggestion = suggestion => (
    <div id={this.props.name}>
      <i className="fas fa-globe mr-2" />
      {suggestion.name}
    </div>
  );
  state = {
    isLoaded: false,
    selectedItem: {},
    suggestions: [],
    value: ""
  };

  componentDidMount() {
    this.setState({ isLoaded: true });
  }
  getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    return inputLength === 0
      ? []
      : this.props.value.filter(
          planet =>
            planet.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
        );
  };
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };
  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
    const index = this.props.value.findIndex(p => p.name === newValue);

    var currentDestination = event.target.id.match(/[a-z]+[0-9]/gi);

    const destination =
      currentDestination !== null ? currentDestination[0] : "";
    this.props.onChange(destination, this.props.value[index]);
  };
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };
  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Planet..",
      value,
      onChange: this.onChange
    };
    if (!this.state.isLoaded) {
      return <div>Loading...</div>;
    } else if (this.state.isLoaded) {
      return (
        <div id={this.props.name}>
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={this.renderSuggestion}
            inputProps={inputProps}
            id={this.props.name}
          />
        </div>
      );
    }
  }
}

export default Planet;
