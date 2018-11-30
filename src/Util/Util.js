import { HttpPost } from "./HttpRequest";
let Message = {};
export const FindFalcon = (planet_names, vehicle_names) => {
  return new Promise((resolve, reject) => {
    HttpPost("/token")
      .then(data => data.json())
      .then(response => {
        HttpPost(
          "/find",
          JSON.stringify({
            token: response.token,
            planet_names: planet_names,
            vehicle_names: vehicle_names
          })
        )
          .then(data => data.json())
          .then(response => {
            Message = {
              status: response.status ? response.status : "",
              error: response.error ? response.error : "",
              planet_name: response.planet_name
            };

            resolve(Message);
          });
      });
  });
};
export const calculateTravelTime = (selectedVehicle, selectedPlanet) => {
  var distance = selectedPlanet.distance;

  var speed = selectedVehicle.speed;
  return distance / speed;
};
