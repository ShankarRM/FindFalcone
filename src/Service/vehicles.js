import { HttpGet } from "../Util/HttpRequest";
import { myConfig } from "../config";

export const VehicleApi = {
  get: function() {
    return HttpGet(myConfig.Vehicles).then(data => {
      return data;
    });
  }
};
