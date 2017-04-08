import React, { PropTypes } from 'react';
import { Form, Input, Modal } from 'antd';

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
  item,
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
      const vals = { ...getFieldsValue(), id: item.edition && item.edition.id };
      const data = {
        edition: vals,
        featureValues: [],
      };
      onOk(data);
    });
  }
  const modalOpts = {
    title: '编辑版本',
    visible,
    onOk: handleOk,
    onCancel,
    wrapClassName: 'vertical-center-modal',
  };
  return (
    <Modal {...modalOpts}>
      <Form horizontal>
        <FormItem label="版本名称：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('displayName', {
            initialValue: item.edition && item.edition.displayName,
            rules: [
              {
                required: true,
                message: '不能为空',
              },
            ],
          })(<Input />)}
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
