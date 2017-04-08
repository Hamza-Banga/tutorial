import React, { PropTypes } from 'react';
import { Table, Popconfirm, Badge } from 'antd';
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
      title: '用户名',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: '名',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '姓',
      dataIndex: 'surname',
      key: 'surname',
    }, {
      title: '邮箱',
      dataIndex: 'emailAddress',
      key: 'emailAddress',
    }, {
      title: '邮箱地址验证',
      dataIndex: 'isEmailConfirmed',
      key: 'isEmailConfirmed',
      render: text => <span style={{ color: text ? '#35a504' : '' }}>{text ? '是' : '否'}</span>,
    }, {
      title: '激活',
      dataIndex: 'isActive',
      key: 'isActive',
      render: text => <Badge status={text ? 'success' : 'default'} />,
    }, {
      title: '上次登录时间',
      dataIndex: 'lastLoginTime',
      key: 'lastLoginTime',
      render: text => <span>
        { text ? moment(text).format('YYYY-MM-DD HH:mm') : '-'}
      </span>,
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
          <a onClick={() => onEditItem(record.id)} style={{ marginRight: 4 }}>编辑</a>
          <Popconfirm title="确定要删除吗？" onConfirm={() => onDeleteItem(record.id)}>
            <a style={{ display: record.name === consts.userManagement.defaultAdminUserName ? 'none' : '' }}>删除</a>
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
