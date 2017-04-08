import React, { PropTypes } from 'react';
import { Form, Input, Modal, Switch, Select } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
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
  item,
  editions,
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
      const vals = { ...getFieldsValue(), id: item.editionId };
      onOk(vals);
    });
  }
  const modalOpts = {
    title: item.id ? '修改租户' : '添加租户',
    visible,
    onOk: handleOk,
    onCancel,
    wrapClassName: 'vertical-center-modal',
  };
  const children = [];
  for (let i = 0; i < editions.length; i++) {
    children.push(<Option key={editions[i].id}>{editions[i].displayName}</Option>);
  }
  return (
    <Modal {...modalOpts}>
      <Form horizontal>
        <FormItem label="租户编码：" hasFeedback {...formItemLayout} >
          {getFieldDecorator('tenancyName', {
            initialValue: item.tenancyName,
            rules: [
              {
                required: true,
                message: '不能为空',
              },
            ],
          })(<Input disabled={item.id > 0} />)}
        </FormItem>
        <FormItem label="名字：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('name', {
            initialValue: item.name,
            rules: [
              {
                required: true,
                message: '不能为空',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="版本：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('editionId', {
            initialValue: item.editionId ? item.editionId.toString() : undefined,
          })(<Select style={{ width: '40%' }} placeholder="请选择版本">
            {children}
          </Select>)}
        </FormItem>
        <FormItem label="激活 " {...formItemLayout}>
          {getFieldDecorator('isActive', {
            initialValue: item.isActive || false,
            valuePropName: 'checked',
          })(<Switch />)}
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
