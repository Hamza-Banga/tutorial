import { parse } from 'qs';
import { query, queryTimeZones, updateAllSettings } from './service';
import { feedback, urls } from '../../../utils';

export default {
  namespace: 'settings',
  state: {
    settings: {
      general: { timezone: '' },
      userManagement: {
        allowSelfRegistration: true,
        isNewRegisteredUserActiveByDefault: false,
        useCaptchaOnRegistration: false,
        isEmailConfirmationRequiredForLogin: false,
      },
    },
    timezones: [],
    showControls: true,
    loading: false,
  },


  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === urls.tenant.settings) {
          dispatch({
            type: 'query',
            payload: location.query,
          });
        }
      });
    },
  },
  effects: {
    *query({ payload }, { call, put }) {
      yield put({ type: 'showLoading' });
      const sts = yield call(query, parse(payload));
      const tzs = yield call(queryTimeZones, parse({ defaultTimezoneScope: 1 }));
      if (sts.data && sts.data.success && tzs.data && tzs.data.success) {
        yield put({
          type: 'querySuccess',
          payload: {
            settings: sts.data.result,
            timezones: tzs.data.result.items,
          },
        });
        yield put({ type: 'showControls', payload: sts.data.result.userManagement.allowSelfRegistration });
      }
    },
    *updateAllSettings({ payload }, { call, put }) {
      const { data } = yield call(updateAllSettings, parse(payload));
      if (data.success) {
        feedback.message.success('保存成功');
        yield put({ type: 'query' });
      } else {
        feedback.message.error('保存失败');
      }
    },
  },

  reducers: {
    querySuccess(state, action) {
      return { ...state, ...action.payload, loading: false };
    },
    showControls(state, action) {
      return { ...state, showControls: action.payload };
    },
    showLoading(state) {
      return { ...state, loading: true };
    },
  },
};
