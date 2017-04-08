import React, { PropTypes } from 'react';
import {
  Button,
  Row,
  Form,
  Input,
  Alert,
} from 'antd';
import { config } from '../../../utils';
import styles from './login.less';

const FormItem = Form.Item;

const login = ({
  loginButtonLoading,
  onOk,
  form: {
    getFieldDecorator,
    validateFieldsAndScroll,
  },
}) => {
  function handleOk() {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return;
      }
      onOk(values);
    });
  }

  return (
    <div className={styles.form}>
      <div className={styles.logo}>
        <img src={config.logoSrc} alt="" />
        <span>{config.name}</span>
      </div>
      <form>
        <FormItem>
          {getFieldDecorator('tenantId', {
            initialValue: '',
          })(<Input type={abp.multiTenancy.isEnabled ? 'input' : 'hidden'} size="large" placeholder="租户名称" />)}
        </FormItem>
        <FormItem hasFeedback>
          {getFieldDecorator('username', {
            rules: [
              {
                required: true,
                message: '请填写用户名',
              },
            ],
          })(<Input size="large" placeholder="用户名" />)}
        </FormItem>
        <FormItem hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: '请填写密码',
              },
            ],
          })(<Input size="large" type="password" placeholder="密码" />)}
        </FormItem>
        <Row>
          <Button type="primary" size="large" onClick={handleOk} loading={loginButtonLoading}>
            登录
          </Button>
        </Row>
      </form>
      <br />
      <Alert message="host账号: 用户名 admin 密码 123qw" type="success" />
      <Alert message="tenant账号：租户名称 Default 用户名 admin 密码 123qwe" type="success" />
    </div>

  );
};

login.propTypes = {
  form: PropTypes.object,
  loginButtonLoading: PropTypes.bool,
  onOk: PropTypes.func,
};

export default Form.create()(login);
