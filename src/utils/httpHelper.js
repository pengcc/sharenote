const getSettings = (host, data) => {
  let location = window.location;
  let remotehost = host;
  let pathname = data ? '/save' : location.pathname
  let url = remotehost + pathname + location.search;
  let configs = {
    method: data ? 'POST' : 'GET',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    }
  };
  if (data) {
    configs.body = JSON.stringify(data);
  }
  return { url, configs };
}


export const fetchReadJson = (host, callback) => {
  let settings = getSettings(host);
  fetch(settings.url, settings.configs)
    .then( (res) => res.json() )
    .then( (data) => {
      callback(data);
    });
};

/**
* @param data {JSON}
*/
export const fetchSaveJson = (host, data={}) => {
  let settings = getSettings(host, data);
  // post data to server
  fetch(settings.url, settings.configs);
}
