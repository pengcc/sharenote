const securedPathname = ['/shared', '/save', '/create'];

let isSecuredPath = () => securedPathname.indexOf(window.location.pathname) > -1;

const getSettings = (host, data) => {
  let isPostRequest = (data) => {
    return data && data !== null && typeof data === 'object';
  }
  let location = window.location;
  let remotehost = host;
  let pathname = isPostRequest(data) ? '/save' : location.pathname
  let url = remotehost + pathname + location.search;
  let configs = {
    method: isPostRequest(data) ? 'POST' : 'GET',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    }
  };
  if (isPostRequest(data)) {
    configs.body = JSON.stringify(data);
  }
  return { url, configs };
}


export const fetchReadJson = (host, callback) => {
  if (!isSecuredPath()) { return; }
  let settings = getSettings(host);
  fetch(settings.url, settings.configs)
    .then( (res) => res.json() )
    .then( (data) => {
      if (typeof callback === 'function') {
        callback(data);
      }
    });
};

/**
* @param data {JSON}
*/
export const fetchSaveJson = (host, data={}, callback) => {
  let settings = getSettings(host, data);
  // post data to server
  fetch(settings.url, settings.configs)
    .then( (res) => res.json() )
    .then( (data) => {
      if (typeof callback === 'function') {
        callback(data);
      }
    });
}
