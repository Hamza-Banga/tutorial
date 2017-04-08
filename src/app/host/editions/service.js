import { fetch } from '../../../utils';

export async function query() {
  return fetch.post('/edition/GetEditions', {
  });
}

export async function getEditionForEdit(params) {
  return fetch.post('/edition/GetEditionForEdit', {
    body: JSON.stringify(params),
  });
}

export async function createOrUpdateEdition(params) {
  return fetch.post('/edition/CreateOrUpdateEdition', {
    body: JSON.stringify(params),
  });
}

export async function remove(params) {
  return fetch.post('/edition/DeleteEdition', {
    body: JSON.stringify(params),
  });
}

