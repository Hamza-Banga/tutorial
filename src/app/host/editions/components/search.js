import React, { PropTypes } from 'react';
import { Form, Button } from 'antd';

const search = ({
  onAdd,
}) => {
  return (
    <div style={{ display: 'flex', marginBottom: '20px' }}>
      <div style={{ flex: '1' }} />
      <Button type="ghost" style={{ width: '100px' }} onClick={onAdd}>添加</Button>
    </div>
  );
};

search.propTypes = {
  onAdd: PropTypes.func,
};

export default Form.create()(search);
