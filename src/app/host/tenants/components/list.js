import React, { PropTypes } from 'react';
import { Table, Popconfirm, Badge } from 'antd';
import moment from 'moment';

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
      title: '租户编码',
      dataIndex: 'tenancyName',
      key: 'tenancyName',
    }, {
      title: '名字',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '版本',
      dataIndex: 'editionDisplayName',
      key: 'editionDisplayName',
    }, {
      title: '激活',
      dataIndex: 'isActive',
      key: 'isActive',
      render: text => <Badge status={text ? 'success' : 'default'} />,
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
          <a
            onClick={() => onEditItem(record.id)} style={{
              marginRight: 4,
            }}
          >编辑</a>
          <Popconfirm title="确定要删除吗？" onConfirm={() => onDeleteItem(record.id)}>
            <a>删除</a>
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
