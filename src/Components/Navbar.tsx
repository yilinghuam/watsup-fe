import React from 'react'
import { Menu } from 'antd';
import { MenuInfo} from 'rc-menu/lib/interface'
import { AppstoreOutlined, MailOutlined, CalendarOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;

export const Navbar = () => {
    const handleClick = (e: MenuInfo) => {
        console.log('click ', e);
    };

    return(
        <Menu
        onClick={handleClick}
        style={{ width: "100%" }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
      >
        <Menu.Item key="1" icon={<MailOutlined />}>
          Groupbuy
        </Menu.Item>
        <Menu.Item key="2" icon={<CalendarOutlined />}>
          Calendar
        </Menu.Item>
        <SubMenu key="sub1" icon={<AppstoreOutlined />} title="Dashboard">
          <Menu.Item key="3">Add Groupbuy</Menu.Item>
          <Menu.Item key="4">View Groupbuy</Menu.Item>
          <Menu.Item key="5">Profile</Menu.Item>
        </SubMenu>
      </Menu>
    )
}