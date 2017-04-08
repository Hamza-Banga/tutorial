import React, { PropTypes } from 'react';
import { Form, Input, Modal, Switch, Select } from 'antd';
import { consts } from '../../../../utils';

const Option = Select.Option;
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
  user = item.user ? item.user : {},
  canChangeUserName = user.userName !== consts.userManagement.defaultAdminUserName,
  setRandomPassword = user.id == null,
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
      const vals = { ...getFieldsValue(), id: user.id };// need set id
      const data = {
        user: vals,
        assignedRoleNames: vals.assignedRoleNames ? vals.assignedRoleNames : [],
        sendActivationEmail: vals.sendActivationEmail,
      };
      onOk(data);
    });
  }

  function onChangeSetRandomPassword(checked) {
    const divPassword = document.getElementById('div_password');
    if (checked) {
      divPassword.style.display = 'none';
    } else {
      divPassword.style.display = 'block';
    }
  }

  const modalOpts = {
    title: user.id ? '修改用户' : '添加用户',
    visible,
    onOk: handleOk,
    onCancel,
    wrapClassName: 'vertical-center-modal',
  };

  const children = [];
  const keys = [];
  if (item.roles) {
    for (let i = 0; i < item.roles.length; i++) {
      children.push(<Option key={item.roles[i].roleName}>{item.roles[i].roleDisplayName}</Option>);
      if (item.roles[i].isAssigned) keys.push(item.roles[i].roleName);
    }
  }
  return (
    <Modal {...modalOpts}>
      <Form horizontal>
        <FormItem label="姓：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('surname', {
            initialValue: user.surname,
            rules: [
              {
                required: true,
                message: '不能为空',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="名：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('name', {
            initialValue: user.name,
            rules: [
              {
                required: true,
                message: '不能为空',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="邮箱：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('emailAddress', {
            initialValue: user.emailAddress,
            rules: [
              {
                required: true,
                message: '不能为空',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="用户名：" hasFeedback {...formItemLayout} help={canChangeUserName ? '' : '管理用户，不能修改用户名'} validateStatus={canChangeUserName ? '' : 'warning'} >
          {getFieldDecorator('userName', {
            initialValue: user.userName,
            rules: [
              {
                required: true,
                message: '不能为空',
              },
            ],
          })(<Input disabled={!canChangeUserName} />)}
        </FormItem>
        <FormItem label="使用随机密码" {...formItemLayout}>
          {getFieldDecorator('setRandomPassword', {
            initialValue: setRandomPassword,
            valuePropName: 'checked',
          })(<Switch onChange={onChangeSetRandomPassword} />)}
        </FormItem>
        <div id="div_password" style={{ display: setRandomPassword ? 'none' : 'block' }} >
          <FormItem label="密码" {...formItemLayout}>
            {getFieldDecorator('password')(
              <Input placeholder="密码" />,
            )}
          </FormItem>
          <FormItem label="密码确认" {...formItemLayout}>
            {getFieldDecorator('passwordRepeat')(
              <Input placeholder="密码确认" />,
            )}
          </FormItem>
        </div>
        <FormItem label="下次登录修改密码" {...formItemLayout}>
          {getFieldDecorator('shouldChangePasswordOnNextLogin', {
            initialValue: user.shouldChangePasswordOnNextLogin ? user.shouldChangePasswordOnNextLogin : true,
            valuePropName: 'checked',
          })(<Switch />)}
        </FormItem>
        <FormItem label="发送激活邮件" {...formItemLayout}>
          {getFieldDecorator('sendActivationEmail', {
            initialValue: user.sendActivationEmail ? user.sendActivationEmail : true,
            valuePropName: 'checked',
          })(<Switch />)}
        </FormItem>
        <FormItem label="激活 " {...formItemLayout}>
          {getFieldDecorator('isActive', {
            initialValue: user.isActive ? user.isActive : true,
            valuePropName: 'checked',
          })(<Switch />)}
        </FormItem>
        <FormItem label="角色 " {...formItemLayout}>
          {getFieldDecorator('assignedRoleNames', {
            initialValue: keys,
          })(<Select
            multiple
            style={{ width: '100%' }}
            placeholder="请选择角色"
          >
            {children}
          </Select>)}
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
