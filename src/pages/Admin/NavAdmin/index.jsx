import React from 'react'
import history from '../../../utils/history'

// import { Layout, Menu } from 'antd';
import { ShoppingCartOutlined, UserOutlined, ShopOutlined, HomeOutlined, SettingOutlined, } from '@ant-design/icons';

import * as Style from './style';



function NavAdmin({ location }) {

  const SIDEBAR_ITEMS = [
    {
      path: '/admin/dashboard',
      title: 'Dashboard',
      icon: <HomeOutlined />
    },
    {
      path: '/admin/products',
      title: 'Product manage',
      icon: <ShopOutlined />
    },
    {
      path: '/admin/categories',
      title: "Category manage",
      icon: <ShopOutlined />
    },
    {
      path: '/admin/publishers',
      title: 'Publishers manage ',
      icon: <ShopOutlined />
    },
    {
      path: '/admin/users',
      title: 'Users manage ',
      icon: <UserOutlined />
    },
    {
      path: '/admin/oders',
      title: 'Oders manage',
      icon: <ShoppingCartOutlined />
    },
    {
      path: '/admin/setting',
      title: 'Setting',
      icon: <SettingOutlined />
    }
  ];
  function renderSidebarItems() {
    return SIDEBAR_ITEMS.map((sidebarItem, sidebarIndex) => {
      return (
        <Style.SidebarItem
          key={sidebarIndex}
          onClick={() => history.push(sidebarItem.path)}
          active={sidebarItem.path === location.pathname}
        >
          <div style={{ margin: " 0 5px" }}>
            {sidebarItem.icon}
          </div>
          {sidebarItem.title}

        </Style.SidebarItem>
      )
    })
  }

  return (
    <Style.SidebarContainer>
      {renderSidebarItems()}
    </Style.SidebarContainer>
  );
}

export default NavAdmin;




