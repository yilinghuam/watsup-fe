import React, { useEffect, useState } from "react";
import {
  NavLayout,
  OrderForm,
  SingleContent,
  GroupbuyInfo,
} from "../Components";
import { greenPineapple } from "../Assets";
import { Row, Col, Button, Space } from "antd";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useParams, useHistory } from "react-router";
import { ViewOrderTable } from "../Components/ViewOrderTable";

export const GroupbuyView = () => {
  const history = useHistory();
  const [cookies] = useCookies(["UserAuth"]);
  const [userCookies] = useCookies(["User"]);
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
      .get(`http://localhost:8000/groupbuy/${id}`, {
        headers: { Authorization: `Bearer ${cookies.UserAuth}` },
      })
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const deleteGroupbuyHandler = () => {
    axios
      .delete(`http://localhost:8000/auth/groupbuy/${id}/delete`, {
        headers: { Authorization: `Bearer ${cookies.UserAuth}` },
      })
      .then((response) => {
        console.log(response.data);
        history.push("/groupbuy");
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
                  <Button type="primary">Change groupbuy status</Button>
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
            <Row justify="start">
              {viewStatus === "Add orders" ? (
                <ViewOrderTable data={data.HostItemInfo} />
              ) : (
                <Col
                  span={16}
                  style={{
                    background: "white",
                    padding: "2%",
                    borderRadius: "5%",
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
