import React, { PropTypes } from 'react';
import { Table, Popconfirm } from 'antd';
import moment from 'moment';
import { consts } from './../../../../utils';

function list({
  loading,
  dataSource,
  pagination,
  onPageChange,
  onDeleteItem,
  onEditItem,
}) {
  const columns = [
    {
      title: '角色名称',
      dataIndex: 'displayName',
      key: 'displayName',
    }, {
      title: '系统',
      dataIndex: 'isStatic',
      key: 'isStatic',
      render: text => <span style={{ color: text ? '#35a504' : '' }}> {text ? '是' : '否'}</span>,
    }, {
      title: '默认',
      dataIndex: 'isDefault',
      key: 'isDefault',
      render: text => <span style={{ color: text ? '#35a504' : '' }}> {text ? '是' : '否'}</span>,
    }, {
      title: '创建时间',
      dataIndex: 'creationTime',
      key: 'creationTime',
      render: text => <span>
        {moment(text).format('YYYY-MM-DD HH:mm')}
      </span>,
    }, {
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => (
        <p>
          <a onClick={() => onEditItem(record.id)} style={{ marginRight: 4, display: record.name === consts.userManagement.defaultAdminRoleName ? 'none' : '' }}>编辑</a>
          <Popconfirm title="确定要删除吗？" onConfirm={() => onDeleteItem(record.id)}>
            <a style={{ display: record.name === consts.userManagement.defaultAdminRoleName || record.isStatic ? 'none' : '' }}>删除</a>
          </Popconfirm>
        </p>
      ),
    },
  ];

  return (
    <div>
      <Table
        size="small"
        bordered
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        onChange={onPageChange}
        pagination={pagination}
        rowKey={record => record.id}
      />
    </div>
  );
}

list.propTypes = {
  onPageChange: PropTypes.func,
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  dataSource: PropTypes.array,
  loading: PropTypes.any,
  pagination: PropTypes.any,
};

export default list;
