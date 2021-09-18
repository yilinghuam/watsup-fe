import React from "react";
import { NavLayout } from "../Components";
import { SingleContent } from "../Components";
import { greenPineapple } from "../Assets";
import { Row } from "antd";

export const Groupbuy = () => {
  return (
    <NavLayout background={greenPineapple}>
      <SingleContent>
        <Row justify="space-between"></Row>
        hihi
      </SingleContent>
    </NavLayout>
  );
};
