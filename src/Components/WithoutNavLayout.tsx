import React from "react";
import { Layout } from "antd";
const { Content, Footer } = Layout;

export const WithoutNavLayout = (props: {
  children: React.ReactNode;
  background: string;
}) => {
  let background = props.background;

  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <Content
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "stretch",
            backgroundImage: `url(${background})`,
            backgroundSize: "cover",
          }}
        >
          {props.children}
          <Footer
            style={{
              textAlign: "center",
              background: "none",
              color: "white",
              padding: "1%",
            }}
          >
            Watsup ©2021 Created by Wat Holdings
          </Footer>
        </Content>
      </Layout>
    </>
  );
};
