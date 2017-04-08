import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { Spin } from 'antd';
import Login from './common/login/route';
import Header from './components/shared/header';
import Bread from './components/shared/bread';
import Footer from './components/shared/footer';
import Sider from './components/shared/sider';
import styles from './components/shared/main.less';

import './components/shared/common.less';


function App({ children, location, dispatch, app }) {
  const { login, loading, loginButtonLoading, user, menu } = app;
  const loginProps = {
    loading,
    loginButtonLoading,
    onOk(data) {
      dispatch({ type: 'app/login', payload: data });
    },
  };

  const headerProps = {
    user,
    location,
    logout() {
      dispatch({ type: 'app/logout' });
    },
  };

  const siderProps = {
    menu,
    location,
  };

  return (
    <div>{login
        ? <div className={styles.layout}>
          <aside className={styles.sider}>
            <Sider {...siderProps} />
          </aside>
          <div className={styles.main}>
            <Header {...headerProps} />
            <Bread {...siderProps} />
            <div className={styles.container}>
              <div className={styles.content}>
                {children}
              </div>
            </div>
            <Footer />
          </div>
        </div> : <div className={styles.spin}>
          <Spin tip="加载用户信息..." spinning={loading} size="large"><Login {...loginProps} /></Spin>
        </div>}</div>
  );
}

App.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps({ app }) {
  return { app };
}

export default connect(mapStateToProps)(App);
