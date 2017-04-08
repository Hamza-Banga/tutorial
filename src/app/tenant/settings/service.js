import { fetch } from '../../../utils';

export async function query(params) {
  return fetch.post('/tenantSettings/GetAllSettings', {
    body: JSON.stringify(params),
  });
}
export async function queryTimeZones(params) {
  return fetch.post('/timing/GetTimezones', {
    body: JSON.stringify(params),
  });
}
export async function updateAllSettings(params) {
  return fetch.post('/tenantSettings/UpdateAllSettings', {
    body: JSON.stringify(params),
  });
}

