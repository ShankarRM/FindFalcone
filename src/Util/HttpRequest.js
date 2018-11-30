import { myConfig } from "./../config";
export const HttpGet = resource => {
  var url = `${myConfig.baseUrl}${resource}`;
  return fetch(url, {
    method: "GET",
    headers: {}
  }).then(response => {
    return response.json();
  });
};
export const HttpPost = (resource, body) => {
  var url = `${myConfig.baseUrl}${resource}`;
  return fetch(url, {
    method: "POST",
    mode: "cors",
    body: body,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  });
};
