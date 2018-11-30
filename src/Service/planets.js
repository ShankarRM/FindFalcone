import { HttpGet } from "../Util/HttpRequest";
import { myConfig } from "../config";
export const PlanetApi = {
  get: function() {
    return HttpGet(myConfig.Planets);
  }
};
