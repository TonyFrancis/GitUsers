import 'whatwg-fetch'
export const GitUsersUrl = "https://api.github.com/search/users"
export const GitUserUrl = "https://api.github.com/user/"
function urlString( obj ) {
  return '?'+Object.keys(obj).map(k => k + '=' + encodeURIComponent(obj[k])).join('&')
}
function makeParameters(method){
  return {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }
}
export function getApi(url, query = {}, callback){
  url = Object.keys(query).length ? url + urlString(query) : url;
  fetch(url, makeParameters("get")).then(function(response) {
    return response.json()
  }).then(function(result) {
    callback(result);
  }).catch(function(ex) {
    callback({
      "error" : "Timeout",
      "message" : "No of records is high",
      "data" : {
        "errors" : "No of records is high"
      }
    })
  })

  // TODO return error on failure
}
