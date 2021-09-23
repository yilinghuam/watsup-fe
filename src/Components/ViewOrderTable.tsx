import React, { useEffect, useState } from "react";
import { Table, Dropdown, Button, Space, Menu } from "antd";
import { useParams } from "react-router";
import { useCookies } from "react-cookie";
import { DownOutlined } from "@ant-design/icons";

import axios from "axios";

export const ViewOrderTable = (props: { data: any; owner: string }) => {
  const [cookies, setCookies] = useCookies(["UserAuth"]);
  const [userCookies, setUserCookies] = useCookies(["User"]);

  let { id } = useParams<Record<string, string | undefined>>();
  const [columnData, setColumnData] = useState<Array<string>>([]);
  const [info, setInfo] = useState<Array<any>>([]);
  const [refresh, setRefresh] = useState<number>(0);
  const [orderId, setOrderId] = useState<number>(0);

  useEffect(() => {
    let newData = props.data.map((elem: any, index: number) => {
      return [elem.Item, `${elem.Item}_Price`];
    });
    newData = newData.flat();
    console.log(newData);
    setColumnData(newData);
    let insertInfo: Array<any> = [];
    let insert_id = 0;
    let insertObject: any = {};
    let insertPrice = 0;
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/auth/groupbuy/${id}/view`, {
        headers: { Authorization: `Bearer ${cookies.UserAuth}` },
      })
      .then((response) => {
        console.log(response.data);
        let data = response.data;

        // // combine according to order_id
        console.log(data);

        for (let i = 0; i < data.length; i++) {
          if (data[i].Order_id !== insert_id) {
            if (i !== 0) {
              insertObject["Total Price"] = insertPrice;
              insertPrice = 0;
              insertInfo.push(insertObject);
              insertObject = {};
            }
            insert_id = data[i].Order_id;
            insertPrice += data[i].Price;
            insertObject = {
              key: i,
              Order_id: data[i].Order_id,
              User_id: data[i].User_id,
              [`${data[i].Item}`]: data[i].Quantity,
              [`${data[i].Item}_Price`]: data[i].Price,
            };
            if (data.length === 1) {
              insertObject["Total Price"] = insertPrice;
              insertPrice = 0;
              insertInfo.push(insertObject);
            }
            if (i === data.length - 1) {
              insertObject["Total Price"] = insertPrice;
              insertPrice = 0;
              insertInfo.push(insertObject);
            }
          } else {
            insertPrice += data[i].Price;
            insertObject[`${data[i].Item}`] = data[i].Quantity;
            insertObject[`${data[i].Item}_Price`] = data[i].Price;
            if (i === data.length - 1) {
              insertObject["Total Price"] = insertPrice;
              insertPrice = 0;
              insertInfo.push(insertObject);
            }
          }
          console.log(insertInfo);
        }
        axios
          .get(
            `${process.env.REACT_APP_BACKEND_URL}/auth/groupbuy/${id}/orderstatus`,
            {
              headers: { Authorization: `Bearer ${cookies.UserAuth}` },
            }
          )
          .then((response) => {
            console.log(insertInfo);

            console.log(response.data);
            let orderstatus = response.data;
            orderstatus.forEach((elem: string, index: number) => {
              console.log(insertInfo[1]);
              insertInfo[index]["Status"] = elem;
            });
            console.log(insertInfo);
            setInfo(insertInfo);
          })
          .catch((err) => {
            console.log(err);
          });
        console.log(insertInfo);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refresh]);
  function handleMenuClick(e: any) {
    console.log(orderId);

    axios
      .patch(
        `${process.env.REACT_APP_BACKEND_URL}/auth/groupbuy/${orderId}/editorderstatus`,
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
  function handleDeleteClick(order_id: number) {
    console.log(order_id);
    axios
      .delete(
        `${process.env.REACT_APP_BACKEND_URL}/auth/groupbuy/${order_id}/deleteorder`,
        {
          headers: { Authorization: `Bearer ${cookies.UserAuth}` },
        }
      )
      .then((response) => {
        console.log(response.data);
        setRefresh(refresh + 1);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="awaiting payment">awaiting payment</Menu.Item>
      <Menu.Item key="order successful">order successful</Menu.Item>
      <Menu.Item key="payment failed">payment failed</Menu.Item>
      <Menu.Item key="payment failed">collected</Menu.Item>
    </Menu>
  );
  let columns: any = [
    {
      title: "Order_id",
      dataIndex: "Order_id",
      key: "Order_id",
    },
    {
      title: "User",
      dataIndex: "User_id",
      key: "User_id",
    },
  ];

  columnData.forEach((elem, index) => {
    if (index % 2 === 0) {
      columns.push({
        title: elem,
        dataIndex: elem,
        key: elem,
      });
    } else {
      columns.push({
        title: "Price",
        dataIndex: elem,
        key: elem,
      });
    }
  });
  columns.push({
    title: "Total Price",
    dataIndex: "Total Price",
    key: "Total Price",
  });
  columns.push({
    title: "Status",
    dataIndex: "Status",
    key: "Status",
  });
  if (props.owner === userCookies.User) {
    columns.push({
      title: "Action",
      key: "action",
      render: (text: any, record: any) => (
        <Space size="middle">
          <Dropdown overlay={menu}>
            <Button
              type="primary"
              onClick={(e) => {
                console.log(record.Order_id);
                setOrderId(record.Order_id);
              }}
            >
              status <DownOutlined />
            </Button>
          </Dropdown>
          <a onClick={(e) => handleDeleteClick(record.Order_id)}>Delete</a>
        </Space>
      ),
    });
  }

  return <Table className="orderTable" columns={columns} dataSource={info} />;
};
