import React, { PropTypes } from 'react';
import { Form, Input, Modal, Checkbox } from 'antd';

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};


const modal = ({
  visible,
  item = {},
  role = item.role ? item.role : {
    displayName: '',
    isDefault: false,
  },
  onOk,
  onCancel,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
}) => {
  function handleOk() {
    validateFields((errors) => {
      if (errors) {
        return;
      }
      const vals = { ...getFieldsValue(), id: role.id };// need set id
      const data = {
        role: vals,
        grantedPermissionNames: [],
      };
      onOk(data);
    });
  }
  const modalOpts = {
    title: '修改角色',
    visible,
    onOk: handleOk,
    onCancel,
    wrapClassName: 'vertical-center-modal',
  };

  return (
    <Modal {...modalOpts}>
      <Form horizontal>
        <FormItem label="角色名称：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('displayName', {
            initialValue: role.displayName,
            rules: [
              {
                required: true,
                message: '不能为空',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="默认" {...formItemLayout}>
          {getFieldDecorator('isDefault', {
            valuePropName: 'checked',
            initialValue: role.isDefault,
          })(<Checkbox />)}
        </FormItem>
      </Form>
    </Modal>
  );
};

modal.propTypes = {
  visible: PropTypes.any,
  form: PropTypes.object,
  item: PropTypes.object,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
};

export default Form.create()(modal);
