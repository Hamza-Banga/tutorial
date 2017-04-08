import { fetch } from '../../../utils';

export async function query(params) {
  return fetch.post('/tenant/GetTenants', {
    body: JSON.stringify(params),
  });
}

export async function getTenantForEdit(params) {
  return fetch.post('/tenant/GetTenantForEdit', {
    body: JSON.stringify(params),
  });
}

export async function update(params) {
  return fetch.post('/tenant/UpdateTenant', {
    body: JSON.stringify(params),
  });
}
export async function create(params) {
  return fetch.post('/tenant/CreateTenant', {
    body: JSON.stringify(params),
  });
}
export async function remove(params) {
  return fetch.post('/tenant/DeleteTenant', {
    body: JSON.stringify(params),
  });
}

