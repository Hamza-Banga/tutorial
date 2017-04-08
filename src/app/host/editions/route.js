import React, { PropTypes } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import List from './components/list';
import Search from './components/search';
import Modal from './components/modal';

function Editions({ dispatch, editions }) {
  const {
    loading, list, pagination,
    currentItem, modalVisible, modalType,
  } = editions;


  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    type: modalType,
    visible: modalVisible,
    onOk(data) {
      dispatch({
        type: 'editions/createOrUpdateEdition',
        payload: data,
      });
    },
    onCancel() {
      dispatch({
        type: 'editions/hideModal',
      });
    },
  };

  const listProps = {
    dataSource: list,
    loading,
    pagination,
    onPageChange(page) {
      dispatch(routerRedux.push({
        pathname: '/editions',
        query: {
          page: page.current,
          pageSize: page.pageSize,
        },
      }));
    },
    onDeleteItem(id) {
      dispatch({
        type: 'editions/delete',
        payload: id,
      });
    },
    onEditItem(id) {
      dispatch({
        type: 'editions/getEditionForEdit',
        payload: {
          id,
        },
      });
    },

  };

  const searchProps = {
    onAdd() {
      dispatch({
        type: 'editions/showModal',
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

Editions.propTypes = {
  editions: PropTypes.object,
  dispatch: PropTypes.func,
};


function mapStateToProps({ editions }) {
  return { editions };
}

export default connect(mapStateToProps)(Editions);
