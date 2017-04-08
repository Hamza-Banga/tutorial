import React from 'react';
import { Menu, Icon } from 'antd';
import styles from './main.less';

const SubMenu = Menu.SubMenu;

function Header({ user, logout }) {
  function handleClickMenu(item) {
    if (item.key === 'logout') {
      logout();
    }
  }
  return (
    <div className={styles.header}>
      <Menu className="header-menu" mode="horizontal" onClick={handleClickMenu}>
        <SubMenu
          style={{
            float: 'right',
          }} title={< span > <Icon type="user" />{user.name}</span>}
        >
          <Menu.Item key="logout">
            <a>注销</a>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </div>
  );
}

Header.propTypes = {
};

export default Header;
