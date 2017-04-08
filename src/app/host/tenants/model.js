import { parse } from 'qs';
import { remove, query, getTenantForEdit, create, update } from './service';
import { query as getEditions } from '../editions/service';
import { feedback, urls } from '../../../utils';

export default {

  namespace: 'tenants',
  state: {
    list: [],
    loading: false,
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    editions: [],
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
        if (location.pathname === urls.host.tenants) {
          dispatch({ type: 'query' });
        }
      });
    },
  },

  effects: {
    *query({ payload }, { call, put }) {
      yield put({ type: 'showLoading' });
      const editions = yield call(getEditions);
      const { data } = yield call(query, parse({
        filter: '',
        sorting: 'name',
        maxResultCount: 50,
        skipCount: 0,
      }));

      if (data.success && editions.data.success) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.result.items,
            editions: editions.data.result.items,
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
    *getTenantForEdit({ payload }, { call, put }) {
      const { data } = yield call(getTenantForEdit, parse(payload));
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

    *delete({ payload }, { call, put }) {
      const { data } = yield call(remove, { id: payload });
      if (data && data.success) {
        feedback.message.success('删除成功');
        yield put({
          type: 'query',
          payload: {
            filter: '',
            sorting: 'tenancyName',
            maxResultCount: 50,
            skipCount: 0,
          },
        });
      } else {
        feedback.message.error('删除失败');
      }
    },
    *create({ payload }, { call, put }) {
      const { data } = yield call(create, {
        ...payload,
        adminEmailAddress: 'luoo@yheng56.com',
        adminPassword: '',
        shouldChangePasswordOnNextLogin: false,
        sendActivationEmail: false,
      });
      if (data && data.success) {
        feedback.message.success('保存成功');
        yield put({ type: 'hideModal' });
        yield put({ type: 'query' });
      } else {
        feedback.message.error('保存失败');
      }
    },
    *update({ payload }, { select, call, put }) {
      const id = yield select(({ tenants }) => tenants.currentItem.id);
      const newTenant = { ...payload, id };
      const { data } = yield call(update, newTenant);
      if (data && data.success) {
        feedback.message.success('保存成功');
        yield put({ type: 'hideModal' });
        yield put({ type: 'query' });
      } else {
        feedback.message.error('保存失败');
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
