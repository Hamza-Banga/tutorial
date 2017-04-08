import React, { PropTypes } from 'react';
import { Form, Button } from 'antd';
import styles from './search.less';

const search = ({
  onAdd,
}) => {
  return (
    <div className={styles.normal}>
      <div className={styles.search}>
        <Form inline>
          <Form.Item />
        </Form>
      </div>
      <div className={styles.create}>
        <Button type="ghost" style={{ width: '100px' }} onClick={onAdd}>添加</Button>
      </div>
    </div>
  );
};

search.propTypes = {
  onAdd: PropTypes.func,
};

export default Form.create()(search);
