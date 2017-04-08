import { parse } from 'qs';
import { remove, query, getEditionForEdit, createOrUpdateEdition } from './service';
import { feedback, urls } from '../../../utils';

export default {

  namespace: 'editions',
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
        if (location.pathname === urls.host.editions) {
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
              total: data.result.totalCount,
              current: 0,
            },
          },
        });
      }
    },
    *getEditionForEdit({ payload }, { call, put }) {
      const { data } = yield call(getEditionForEdit, parse(payload));
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
    *createOrUpdateEdition({ payload }, { call, put }) {
      const { data } = yield call(createOrUpdateEdition, parse(payload));
      if (data.success) {
        feedback.message.success('保存成功');
        yield put({ type: 'hideModal' });
        yield put({ type: 'query' });
      } else {
        feedback.message.error('保存失败');
      }
    },
    *delete({ payload }, { call, put }) {
      yield put({ type: 'showLoading' });
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
