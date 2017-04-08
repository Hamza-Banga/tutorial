import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'dva/router';
import styles from './main.less';
import { config } from '../../../utils';

function getMenus(menuArray) {
  return menuArray.map((item) => {
    if (!!item.items && item.items.length > 0) {
      return (
        <Menu.SubMenu key={item.name} title={<span>{item.icon ? <Icon type={item.icon} /> : ''} {item.displayName}</span>}>
          {getMenus(item.items)}
        </Menu.SubMenu>
      );
    } else {
      return (
        <Menu.Item key={item.name}>
          <Link to={item.url}>
            {item.icon ? <Icon type={item.icon} /> : ''}
            {item.displayName}
          </Link>
        </Menu.Item>
      );
    }
  });
}

function Sider({ menu }) {
  return (
    <div>
      <div className={styles.logo}>
        <img src={config.logoSrc} alt="" />
        <span>{config.logoText}</span>
      </div>
      <Menu mode="inline" theme="dark" defaultSelectedKeys={['Dashboard.Tenant']}>
        {getMenus(menu.items)}
      </Menu>
    </div>
  );
}

Sider.propTypes = {
};

export default Sider;
