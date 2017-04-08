import fetch from 'dva/fetch';
import config from './config';

const cookie = require('js-cookie');

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
function request(url, options) {
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => ({ data }))
    .catch(err => ({ err }));
}

function get(url, options) {
  const head = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${cookie.get('access_token')}`,
    },
  };
  return request(config.urlApi + url, { ...head, ...options });
}

function post(url, options) {
  const head = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${cookie.get('access_token')}`,
    },
  };
  return request(config.urlApi + url, { ...head, ...options });
}

module.exports = {
  request,
  post,
  get,
};
