import { parse } from 'qs';
import { remove, query, getUserForEdit, createOrUpdateUser } from './service';

import { feedback, urls } from '../../../utils';

export default {

  namespace: 'users',

  state: {
    list: [],
    loading: false,
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    pagination: {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      total: null,
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === urls.common.users) {
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
      const { data } = yield call(query, parse(payload));
      if (data.success) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.result.items,
            pagination: {
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: total => `共 ${total} 条`,
              current: 0,
              total: data.result.totalCount,
            },
          },
        });
      }
    },
    *getUserForEdit({ payload }, { call, put }) {
      const { data } = yield call(getUserForEdit, parse(payload));
      if (data.success) {
        yield put({
          type: 'showModal',
          payload: {
            modalType: 'update',
            currentItem: data.result,
          },
        });
      }
    },
    *createOrUpdateUser({ payload }, { call, put }) {
      const { data } = yield call(createOrUpdateUser, parse(payload));
      if (data.success) {
        feedback.message.success('保存成功');
        yield put({ type: 'hideModal' });
        yield put({ type: 'query' });
      } else {
        feedback.message.error('保存失败');
      }
    },
    *delete({ payload }, { call, put }) {
      const { data } = yield call(remove, { id: payload });
      if (data && data.success) {
        feedback.message.success('删除成功');
        yield put({ type: 'query' });
      } else {
        feedback.message.error('删除失败');
      }
    },
  },

  reducers: {
    showLoading(state) {
      return { ...state, loading: true };
    },
    querySuccess(state, action) {
      return { ...state, ...action.payload, loading: false };
    },
    showModal(state, action) {
      return { ...state, ...action.payload, modalVisible: true, loading: false };
    },
    hideModal(state) {
      return { ...state, modalVisible: false };
    },
  },
};
