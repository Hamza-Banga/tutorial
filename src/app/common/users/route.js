import React, { PropTypes } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import UserList from './components/list';
import UserSearch from './components/search';
import UserModal from './components/modal';

function Users({ location, dispatch, users }) {
  const {
    loading, list, pagination,
    currentItem, modalVisible, modalType,
    } = users;

  const { keyword } = location.query;

  const userModalProps = {
    item: modalType === 'create' ? {} : currentItem,
    type: modalType,
    visible: modalVisible,
    onOk(data) {
      dispatch({
        type: 'users/createOrUpdateUser',
        payload: data,
      });
    },
    onCancel() {
      dispatch({
        type: 'users/hideModal',
      });
    },
  };

  const userListProps = {
    dataSource: list,
    loading,
    pagination,
    onPageChange(page) {
      dispatch(routerRedux.push({
        pathname: '/users',
        query: {
          page: page.current,
          pageSize: page.pageSize,
        },
      }));
    },
    onDeleteItem(id) {
      dispatch({
        type: 'users/delete',
        payload: id,
      });
    },
    onEditItem(id) {
      dispatch({
        type: 'users/getUserForEdit',
        payload: {
          id,
        },
      });
    },
  };

  const userSearchProps = {
    keyword,
    onSearch(fieldsValue) {
      dispatch({
        type: 'users/query',
        payload: fieldsValue,
      });
    },
    onAdd() {
      dispatch({
        type: 'users/getUserForEdit',
        payload: {
          id: 0,
        },
      });
    },
  };

  const UserModalGen = () =>
    <UserModal {...userModalProps} />;

  return (
    <div>
      <UserSearch {...userSearchProps} />
      <UserList {...userListProps} />
      <UserModalGen />
    </div>
  );
}

Users.propTypes = {
  users: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps({ users }) {
  return { users };
}

export default connect(mapStateToProps)(Users);
