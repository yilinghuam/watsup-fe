import React from "react";
import { Menu } from "antd";
import { MenuInfo } from "rc-menu/lib/interface";
import {
  AppstoreOutlined,
  MailOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
const { SubMenu } = Menu;

export const Navbar = () => {
  const handleClick = (e: MenuInfo) => {
    console.log("click ", e);
  };
  const [cookies, setCookie, removeCookie] = useCookies(["UserAuth"]);
  const logout = () => {
    removeCookie("UserAuth");

    console.log(cookies);
  };

  return (
    <Menu
      onClick={handleClick}
      style={{ width: "100%" }}
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
      mode="inline"
    >
      <Menu.Item key="1" icon={<MailOutlined />}>
        <Link to="/groupbuy">Groupbuy</Link>
      </Menu.Item>
      <Menu.Item key="2" icon={<CalendarOutlined />}>
        <Link to="/calendar">Calendar</Link>
      </Menu.Item>
      <SubMenu key="sub1" icon={<AppstoreOutlined />} title="Dashboard">
        <Menu.Item key="3">
          <Link to="/dashboard-add">Add Groupbuy</Link>
        </Menu.Item>
        <Menu.Item key="4">
          <Link to="/dashboard-view">View Groupbuy</Link>
        </Menu.Item>
        <Menu.Item key="5">
          <a onClick={logout}>Logout</a>
        </Menu.Item>
      </SubMenu>
    </Menu>
  );
};
