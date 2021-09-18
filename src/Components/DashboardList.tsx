import React from "react";
import { List, Col, Tag, Space, Typography } from "antd";
import { ViewConfig } from "../Interfaces/Dashboard";
const { Title } = Typography;

export const DashboardList = (props: {
  title: string;
  data: Array<ViewConfig>;
}) => {
  const tagColor: Array<string> = ["success", "processing", "error", "default"];

  interface groupbuyStatusConfig {
    [status: string]: string;
  }
  const groupbuyStatus: groupbuyStatusConfig = {
    "awaiting payment": tagColor[1],
    "order successful": tagColor[0],
    "payment failed": tagColor[2],
    collected: tagColor[4],
  };

  const hostStatus: groupbuyStatusConfig = {
    open: tagColor[0],
    closed: tagColor[1],
    collected: tagColor[4],
  };

  return (
    <Col span={11}>
      <Title style={{ fontSize: "150%" }}>{props.title}</Title>

      <List
        itemLayout="horizontal"
        dataSource={props.data}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<div>[{item["order_date"]}]</div>}
              title={<a href="https://ant.design">{item.name}</a>}
            />
            <Space>
              <div style={{ width: "6vw" }}>
                <Tag
                  style={{
                    width: "100%",
                    fontSize: "50%",
                    textAlign: "center",
                  }}
                  color={
                    props.title === "Ordered"
                      ? groupbuyStatus[item.status]
                      : hostStatus[item.status]
                  }
                >
                  {item.status}
                </Tag>
              </div>
            </Space>
          </List.Item>
        )}
      />
    </Col>
  );
};
