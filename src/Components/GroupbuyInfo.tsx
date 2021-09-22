import React from "react";
import { Row, Col } from "antd";

export const GroupbuyInfo = (props: { data: any }) => {
  return (
    <Row justify="space-between">
      <Col>
        <h1>{props.data.Name}</h1>
        <p>Host: {props.data.User_id}</p>

        {props.data.Description === "" ? (
          ""
        ) : (
          <p>Description: {props.data.Description}</p>
        )}

        {props.data.Delivery_options ? (
          <p>Delivery price: ${props.data.Delivery_price}</p>
        ) : (
          ""
        )}
      </Col>
      <Col>
        <h1 style={{ textTransform: "capitalize" }}>{props.data.Status}</h1>
        <p>Closing date: {props.data.Closing_date}</p>
        <p>Order date: {props.data.Order_date}</p>
      </Col>
    </Row>
  );
};
