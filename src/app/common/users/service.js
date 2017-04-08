import { fetch } from '../../../utils';

export async function query(params) {
  return fetch.post('/user/GetUsers', {
    body: JSON.stringify(params),
  });
}

export async function getUserForEdit(params) {
  return fetch.post('/user/GetUserForEdit', {
    body: JSON.stringify(params),
  });
}

export async function createOrUpdateUser(params) {
  return fetch.post('/user/createOrUpdateUser', {
    body: JSON.stringify(params),
  });
}

export async function remove(params) {
  return fetch.post('/user/deleteuser', {
    body: JSON.stringify(params),
  });
}
