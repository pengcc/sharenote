const isObject = (o) => {
  return o && o !== null && typeof o === 'object';
}

const getRequestMethod = (type) => {
  const methodMap = {
    'view': 'GET',
    'create': 'POST',
    'save': 'POST'
  };
  return methodMap[type];
}

const getReqeustUrl = (host, type) => {
  let location = window.location;
  let url = `${host}/${type}${location.search}`;
  return url;
}

const getConfigs = (type, data) => {
  let method = getRequestMethod(type);
  let configs = {
    method: method,
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    }
  };
  if (method === 'POST' && isObject(data)) {
    configs.body = JSON.stringify(data);
  }
  return configs;
}

const getFetchSettings = (host, type, data) => {
  let url = getReqeustUrl(host, type);
  let configs = getConfigs(type, data);
  return { url, configs };
}

const fetchSaveJson = (host, type, data={}, callback) => {
  let settings = getFetchSettings(host, type, data);
  // post data to server
  fetch(settings.url, settings.configs)
    .then( (res) => res.json() )
    .then( (data) => {
      if (typeof callback === 'function') {
        callback(data);
      }
    });
};

const fetchCreateJson = (host, type, data={}, callback) => {
  return fetchSaveJson(host, type, data, callback);
};

/**
* @param data {JSON}
*/
const fetchReadJson = (host, callback) => {
  if (window.location.pathname.indexOf('view') < 0) {
    return;
  }
  let type = 'view';
  let settings = getFetchSettings(host, type);
  fetch(settings.url, settings.configs)
    .then( (res) => res.json() )
    .then( (data) => {
      if (typeof callback === 'function') {
        callback(data);
      }
    });
};

export { fetchReadJson, fetchCreateJson, fetchSaveJson }
