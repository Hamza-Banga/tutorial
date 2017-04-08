import React, { PropTypes } from 'react';
import { Form, Input, Button } from 'antd';
import styles from './search.less';

const search = ({
  keyword,
  onSearch,
  onAdd,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
}) => {
  function handleSubmit(e) {
    e.preventDefault();
    validateFields((errors) => {
      if (errors) {
        return;
      }
      onSearch(getFieldsValue());
    });
  }

  return (
    <div className={styles.normal}>
      <div className={styles.search}>
        <Form inline onSubmit={handleSubmit}>
          <Form.Item hasFeedback>
            {getFieldDecorator('filter', {
              initialValue: keyword || '',
            })(<Input />)}
          </Form.Item>
          <Button type="primary" style={{ width: '80px' }} htmlType="submit">搜索</Button>
        </Form>
      </div>
      <div className={styles.create}>
        <Button type="ghost" style={{ width: '100px' }} onClick={onAdd}>添加</Button>
      </div>
    </div>
  );
};

search.propTypes = {
  form: PropTypes.object.isRequired,
  onSearch: PropTypes.func,
  onAdd: PropTypes.func,
  keyword: PropTypes.string,
};

export default Form.create()(search);
