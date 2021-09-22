import React, { useEffect, useState } from "react";
import { Table, Tag, Space } from "antd";
import { useParams } from "react-router";
import { useCookies } from "react-cookie";
import axios from "axios";

export const ViewOrderTable = (props: { data: any }) => {
  const [cookies, setCookies] = useCookies(["UserAuth"]);
  let { id } = useParams<Record<string, string | undefined>>();
  const [columnData, setColumnData] = useState<Array<string>>([]);
  const [info, setInfo] = useState<Array<any>>([]);

  useEffect(() => {
    let newData = props.data.map((elem: any, index: number) => {
      return [elem.Item, `${elem.Item}_Price`];
    });
    newData = newData.flat();
    console.log(newData);
    setColumnData(newData);
    axios
      .get(`http://localhost:8000/auth/groupbuy/${id}/view`, {
        headers: { Authorization: `Bearer ${cookies.UserAuth}` },
      })
      .then((response) => {
        console.log(response.data);
        let data = response.data;

        // // combine according to order_id
        console.log(data);
        let insertInfo = [];
        let insert_id = 0;
        let insertObject: any = {};
        let insertPrice = 0;
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
        }
        console.log(insertInfo);
        setInfo(insertInfo);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
    title: "Action",
    key: "action",
    render: (text: any, record: any) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  });

  return <Table columns={columns} dataSource={info} />;
};
