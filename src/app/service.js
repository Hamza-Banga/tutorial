import qs from 'qs';
import { config, fetch } from '../utils';

export async function login(params) {
  return fetch.post('/account/login', {
    body: qs.stringify(params),
  });
}

export async function token(params) {
  return fetch.request(`${config.urlToken}/oauth/token?tenantId=${params.tenantId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: qs.stringify({
      ...params,
      client_id: 'app',
      client_secret: 'app',
      grant_type: 'password',
    }),
  });
}

export async function userInfo(params) {
  return fetch.post('/session/GetCurrentLoginInformations', {
    body: qs.stringify(params),
  });
}

export async function auth() {
  return fetch.post('/session/auth', {
    body: '',
  });
}
