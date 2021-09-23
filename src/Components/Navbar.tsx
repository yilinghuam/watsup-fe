import React from "react";
import { Menu, Avatar, Row } from "antd";
import { MenuInfo } from "rc-menu/lib/interface";
import {
  AppstoreOutlined,
  MailOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useCookies } from "react-cookie";
import { Link, useHistory } from "react-router-dom";
const { SubMenu } = Menu;

export const Navbar = () => {
  const history = useHistory();
  const handleClick = (e: MenuInfo) => {
    console.log("click ", e);
  };
  const [cookies, setCookie, removeCookie] = useCookies(["UserAuth"]);
  const [userCookies, setUserCookie] = useCookies(["User"]);
  console.log(userCookies.User);
  const logout = () => {
    removeCookie("UserAuth", { path: "/" });
    history.push("/");
  };

  return (
    <Menu
      onClick={handleClick}
      style={{ width: "100%" }}
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
      mode="inline"
    >
      <Menu.Item
        style={{ textAlign: "center", height: "10%", paddingTop: "10%" }}
        key="sub1"
      >
        <Row justify="center" align="middle">
          <Avatar
            size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
            icon={<UserOutlined />}
          />
        </Row>
        <Row justify="center" align="middle" style={{ fontStyle: "italic" }}>
          {userCookies.User}
        </Row>
      </Menu.Item>

      <Menu.Item key="1" icon={<MailOutlined />}>
        <Link to="/groupbuy">Groupbuy</Link>
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
