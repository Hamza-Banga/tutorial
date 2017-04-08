import React, { PropTypes } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import RoleList from './components/list';
import RoleSearch from './components/search';
import RoleModal from './components/modal';

function Roles({ dispatch, roles }) {
  const {
    loading, list, pagination,
    currentItem, modalVisible, modalType,
  } = roles;


  const roleModalProps = {
    item: modalType === 'create' ? {} : currentItem,
    type: modalType,
    visible: modalVisible,
    onOk(data) {
      dispatch({
        type: 'roles/createOrUpdateRole',
        payload: data,
      });
    },
    onCancel() {
      dispatch({
        type: 'roles/hideModal',
      });
    },
  };


  const roleListProps = {
    dataSource: list,
    loading,
    pagination,
    onPageChange(page) {
      dispatch(routerRedux.push({
        pathname: '/roles',
        query: {
          page: page.current,
          pageSize: page.pageSize,
        },
      }));
    },
    onDeleteItem(id) {
      dispatch({
        type: 'roles/delete',
        payload: id,
      });
    },
    onEditItem(id) {
      dispatch({
        type: 'roles/getRoleForEdit',
        payload: {
          id,
        },
      });
    },

  };


  const roleSearchProps = {
    onAdd() {
      dispatch({
        type: 'roles/showModal',
        payload: {
          modalType: 'create',
        },
      });
    },
  };

  const RoleModalGen = () =>
    <RoleModal {...roleModalProps} />;

  return (
    <div>
      <RoleSearch {...roleSearchProps} />
      <RoleList {...roleListProps} />
      <RoleModalGen />
    </div>
  );
}
Roles.propTypes = {
  roles: PropTypes.object,
  dispatch: PropTypes.func,
};


function mapStateToProps({ roles }) {
  return { roles };
}

export default connect(mapStateToProps)(Roles);
