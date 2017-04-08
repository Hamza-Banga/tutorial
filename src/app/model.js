import { parse } from 'qs';
import { token, userInfo, auth } from './service';
import { feedback } from '../utils';

const cookie = require('js-cookie');


export default {
  namespace: 'app',
  state: {
    login: false,
    loading: false,
    user: {
      name: '',
    },
    menu: {},
    loginButtonLoading: false,
  },
  subscriptions: {
    setup({ dispatch }) {
      dispatch({ type: 'queryUser' });
    },
  },
  effects: {
    *login({ payload }, { call, put }) {
      yield put({ type: 'showLoginButtonLoading' });
      const { data } = yield call(token, parse(payload));
      if (!data.error) {
        cookie.set('access_token', data.access_token, { expires: data.expires_in / (3600 * 24) });
        cookie.set('refresh_token', data.refresh_token);
        feedback.message.success('登录成功');
        yield put({ type: 'queryUser' });
      } else {
        feedback.notification.error({
          message: data.error,
          description: data.error_description,
        });
        yield put({ type: 'loginFail',
          payload: {
            data,
          } });
      }
    },
    *queryUser({ payload }, { call, put }) {
      yield put({ type: 'showLoading' });
      const { data } = yield call(userInfo, parse(payload));
      if (data && data.success) {
        const user = data.result.user;
        const tenant = data.result.tenant;
        let name = '';
        if (tenant !== null) {
          name = `${tenant.name}\\${user.userName}`;
        } else {
          name = `.\\${user.userName}`;
        }
        const authJson = (yield call(auth, parse(payload))).data;
        yield put({
          type: 'loadMenu',
          payload: {
            menu: authJson.result.userMenu,
          },
        });
        yield put({
          type: 'loginSuccess',
          payload: {
            user: {
              name,
            },
          },
        });
      } else {
        yield put({ type: 'hideLoading' });
      }
    },
    *logout({ payload }, { put }) {
      cookie.remove('access_token');
      cookie.remove('refresh_token');
      yield put({
        type: 'logoutSuccess',
      });
      yield put({ type: 'hideLoading' });
    },
  },
  reducers: {
    loginSuccess(state, action) {
      return {
        ...state,
        ...action.payload,
        login: true,
        loginButtonLoading: false,
      };
    },
    logoutSuccess(state) {
      return {
        ...state,
        login: false,
        loginButtonLoading: false,
      };
    },
    loginFail(state) {
      return {
        ...state,
        login: false,
        loginButtonLoading: false,
      };
    },
    showLoginButtonLoading(state) {
      return {
        ...state,
        loginButtonLoading: true,
      };
    },
    showLoading(state) {
      return {
        ...state,
        loading: true,
      };
    },
    hideLoading(state) {
      return {
        ...state,
        loading: false,
      };
    },
    loadMenu(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};
