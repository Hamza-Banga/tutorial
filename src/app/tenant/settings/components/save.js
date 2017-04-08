import React, { PropTypes } from 'react';
import { Form, Switch, Select, Button, Spin } from 'antd';

const Option = Select.Option;
const FormItem = Form.Item;

const frmSave = ({
    settings,
    onSave,
    onShowControls,
    form: {
        getFieldDecorator,
        getFieldsValue,
    },
}) => {
  function handleSubmit(e) {
    e.preventDefault();
    const vals = { ...getFieldsValue() };
    const data = {
      general: { timezone: vals.timezone },
      userManagement: {
        allowSelfRegistration: vals.allowSelfRegistration,
        isNewRegisteredUserActiveByDefault: vals.isNewRegisteredUserActiveByDefault,
        useCaptchaOnRegistration: vals.useCaptchaOnRegistration,
        isEmailConfirmationRequiredForLogin: vals.isEmailConfirmationRequiredForLogin,
      },
    };
    onSave(data);
  }
  const sts = settings.settings;
  const tzs = settings.timezones;
  const children = [];
  for (let i = 0; i < tzs.length; i++) {
    if (i !== 0) {
      children.push(<Option key={tzs[i].value}>{tzs[i].name}</Option>);
    }
  }
  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };

  return (
    <div>
      <Spin tip="jia" spinning={settings.loading} size="large">
        <Form horizontal onSubmit={handleSubmit}>
          <FormItem {...formItemLayout} label="时区">
            {getFieldDecorator('timezone', {
              initialValue: sts.general.timezone,
            })(<Select style={{ width: '40%' }}>
              {children}
            </Select>)}
          </FormItem>
          <FormItem {...formItemLayout} label="允许用户注册" help="如果此项被禁用，只能由管理员通过用户管理页面添加用户">
            {getFieldDecorator('allowSelfRegistration', {
              valuePropName: 'checked',
              initialValue: sts.userManagement.allowSelfRegistration,
            })(<Switch onChange={onShowControls} />)}
          </FormItem>
          <FormItem
            {...formItemLayout} label="注册用户默认激活" help="如果此项被选，新用户需要通过邮件激活后才能登录"
            style={{ display: settings.showControls ? '' : 'none' }}
          >
            {getFieldDecorator('isNewRegisteredUserActiveByDefault', {
              valuePropName: 'checked',
              initialValue: sts.userManagement.isNewRegisteredUserActiveByDefault,
            })(<Switch />)}
          </FormItem>
          <FormItem
            {...formItemLayout} label="用户注册时使用图片验证码"
            style={{ display: settings.showControls ? '' : 'none' }}
          >
            {getFieldDecorator('useCaptchaOnRegistration', {
              valuePropName: 'checked',
              initialValue: sts.userManagement.useCaptchaOnRegistration,
            })(<Switch />)}
          </FormItem>
          <FormItem {...formItemLayout} label="必须验证邮箱地址后才能登录">
            {getFieldDecorator('isEmailConfirmationRequiredForLogin', {
              valuePropName: 'checked',
              initialValue: sts.userManagement.isEmailConfirmationRequiredForLogin,
            })(<Switch />)}
          </FormItem >
          <FormItem wrapperCol={{ span: 12, offset: 6 }}>
            <Button type="primary" htmlType="submit" size="large" style={{ width: '100px' }}>保存</Button>
          </FormItem>
        </Form>
      </Spin>
    </div>
  );
};

frmSave.propTypes = {
  form: PropTypes.object,
  settings: PropTypes.object,
  onSave: PropTypes.func,
};

export default Form.create()(frmSave);
