import React from "react";
import { List, Col, Tag, Space, Typography } from "antd";
import { Link } from "react-router-dom";
const { Title } = Typography;

export const GroupbuyList = (props: { data: any }) => {
  return (
    <Col span={8}>
      <Title style={{ fontSize: "150%" }}>Open Groupbuys</Title>

      <List
        itemLayout="horizontal"
        dataSource={props.data}
        renderItem={(item: any) => (
          <List.Item style={{ fontSize: "90%" }}>
            <List.Item.Meta
              avatar={<div>[{item.Order_date}]</div>}
              title={
                <Link to={`/groupbuy/${item.Groupbuy_id}`}>{item.Name}</Link>
              }
            />
            <Space>
              <div style={{ width: "6vw" }}>
                <Tag
                  style={{
                    width: "100%",
                    fontSize: "50%",
                    textAlign: "center",
                  }}
                  color={"default"}
                >
                  {item.User_id}
                </Tag>
              </div>
            </Space>
          </List.Item>
        )}
      />
    </Col>
  );
};
