import React, { useEffect, useState } from "react";

import {
  NavLayout,
  OrderForm,
  SingleContent,
  GroupbuyInfo,
  ViewOrderTable,
} from "../Components";
import { greenPineapple } from "../Assets";
import { DownOutlined } from "@ant-design/icons";
import { Row, Col, Button, Space, Dropdown, Menu } from "antd";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useParams, useHistory } from "react-router";

export const GroupbuyView = () => {
  const history = useHistory();
  const [cookies] = useCookies(["UserAuth"]);
  const [userCookies] = useCookies(["User"]);
  const [refresh, setRefresh] = useState<number>(0);
  let { id } = useParams<Record<string, string | undefined>>();

  const [viewStatus, setViewStatus] = useState<string>("View orders");
  const changeViewStatusHandler = () => {
    if (viewStatus === "Add orders") {
      setViewStatus("View orders");
    } else {
      setViewStatus("Add orders");
    }
  };

  const [data, setData] = useState<any>({});
  useEffect(() => {
    // get user data first
    console.log(cookies.UserAuth);
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/groupbuy/${id}`, {
        headers: { Authorization: `Bearer ${cookies.UserAuth}` },
      })
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refresh]);

  const deleteGroupbuyHandler = () => {
    axios
      .delete(
        `${process.env.REACT_APP_BACKEND_URL}/auth/groupbuy/${id}/delete`,
        {
          headers: { Authorization: `Bearer ${cookies.UserAuth}` },
        }
      )
      .then((response) => {
        console.log(response.data);
        history.push("/groupbuy");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function handleMenuClick(e: any) {
    console.log("click", e);
    console.log(e.key);
    axios
      .patch(
        `${process.env.REACT_APP_BACKEND_URL}/auth/groupbuy/${id}/editstatus`,
        { Status: e.key },
        {
          headers: { Authorization: `Bearer ${cookies.UserAuth}` },
        }
      )
      .then((response) => {
        console.log("groupbuy!");
        setRefresh(refresh + 1);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="open">open</Menu.Item>
      <Menu.Item key="close">close</Menu.Item>
      <Menu.Item key="collected">collected</Menu.Item>
    </Menu>
  );

  return (
    <NavLayout background={greenPineapple}>
      <SingleContent>
        <Row justify="end" align="middle" style={{ marginBottom: "2%" }}>
          <Space>
            <Col>
              <Button onClick={changeViewStatusHandler} type="primary">
                {viewStatus}
              </Button>
            </Col>
            {Object.keys(data).length === 0 ? (
              ""
            ) : userCookies.User !== data.GroupbuyInfo.User_id ? (
              ""
            ) : (
              <>
                <Col>
                  <Button onClick={deleteGroupbuyHandler} type="primary">
                    Delete groupbuy
                  </Button>
                </Col>
                <Col>
                  <Dropdown overlay={menu}>
                    <Button type="primary">
                      Change groupbuy status <DownOutlined />
                    </Button>
                  </Dropdown>
                </Col>
              </>
            )}
          </Space>
        </Row>
        {Object.keys(data).length === 0 ? (
          ""
        ) : (
          <>
            <GroupbuyInfo data={data.GroupbuyInfo} />
            <Row
              justify="start"
              style={{ maxWidth: "100%", overflow: "scroll" }}
            >
              {viewStatus === "Add orders" ? (
                <ViewOrderTable
                  data={data.HostItemInfo}
                  owner={data.GroupbuyInfo.User_id}
                />
              ) : (
                <Col
                  span={16}
                  style={{
                    background: "white",
                    padding: "2%",
                    borderRadius: "5%",
                    width: "100%",
                  }}
                >
                  <OrderForm
                    delivery={data.GroupbuyInfo.Delivery_options}
                    data={data.HostItemInfo}
                  />
                </Col>
              )}
            </Row>
          </>
        )}
      </SingleContent>
    </NavLayout>
  );
};
