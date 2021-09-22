import React from "react";
import { Table } from "antd";
import { Formconfig } from "../Interfaces/Dashboard";
import moment from "moment";
import { AlignType } from "rc-table/lib/interface";

export const Review = (props: { formValues: Formconfig }) => {
  const columns = [
    {
      title: "Item",
      dataIndex: "item",
      key: "item",
      align: "center" as AlignType,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      align: "center" as AlignType,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      align: "center" as AlignType,
    },
  ];

  let data: any[] = [];

  if (props.formValues.Setup.length !== 0) {
    data = props.formValues.Setup;
  }
  const fixedColumns = [
    {
      title: "name",
      dataIndex: "name",
      fixed: true,
      width: 300,
    },
    {
      title: "description",
      dataIndex: "description",
    },
  ];

  let fixedData = [];
  if (Object.keys(props.formValues.Details).length !== 0) {
    let keys = Object.keys(props.formValues.Details);
    for (let i = 0; i < keys.length; i++) {
      let newdata: any = { ...props.formValues.Details };
      let currentkey = keys[i];
      let currentvalue = newdata[currentkey];
      let pushedValue = {
        key: i,
        name: currentkey,
        description: currentvalue,
      };
      if (currentvalue !== undefined) {
        if (currentkey === "order_date" || currentkey === "closing_date") {
          pushedValue.description = moment(currentvalue).format("DD-MM-YYYY");
        }
        if (typeof currentvalue === "boolean") {
          pushedValue.description = currentvalue.toString();
        }
        fixedData.push(pushedValue);
      }
    }
  }

  return (
    <>
      <Table
        showHeader={false}
        columns={fixedColumns}
        dataSource={fixedData}
        pagination={false}
      />

      <Table bordered columns={columns} dataSource={data} pagination={false} />
    </>
  );
};
