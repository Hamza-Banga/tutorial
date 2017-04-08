import React, { PropTypes } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import List from './components/list';
import Search from './components/search';
import Modal from './components/modal';

function Tenants({ dispatch, tenants }) {
  const {
    loading, list, pagination,
    currentItem, modalVisible, modalType, editions,
  } = tenants;

  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    editions,
    type: modalType,
    visible: modalVisible,
    onOk(data) {
      dispatch({
        type: `tenants/${modalType}`,
        payload: data,
      });
    },
    onCancel() {
      dispatch({
        type: 'tenants/hideModal',
      });
    },
  };

  const listProps = {
    dataSource: list,
    loading,
    pagination,
    onPageChange(page) {
      dispatch(routerRedux.push({
        pathname: '/tenants',
        query: {
          page: page.current,
          pageSize: page.pageSize,
        },
      }));
    },
    onDeleteItem(id) {
      dispatch({
        type: 'tenants/delete',
        payload: id,
      });
    },
    onEditItem(id) {
      dispatch({
        type: 'tenants/getTenantForEdit',
        payload: {
          id,
        },
      });
    },

  };

  const searchProps = {
    onAdd() {
      dispatch({
        type: 'tenants/showModal',
        payload: {
          modalType: 'create',
        },
      });
    },
  };

  const ModalGen = () =>
    <Modal {...modalProps} />;

  return (
    <div>
      <Search {...searchProps} />
      <List {...listProps} />
      <ModalGen />
    </div>
  );
}

Tenants.propTypes = {
  tenants: PropTypes.object,
  dispatch: PropTypes.func,
};


function mapStateToProps({ tenants }) {
  return { tenants };
}

export default connect(mapStateToProps)(Tenants);
