import React, { useEffect, useState } from "react";
import { NavLayout, DashboardList } from "../Components";
import { SingleContent } from "../Components";
import { pinkPineapple } from "../Assets";
import { Row } from "antd";
import { DashboardViewConfig } from "../Interfaces/Dashboard";
import axios from "axios";

export const DashboardView = () => {
  //get all groupbuy that are open
  const [dashboard, setDashboard] = useState<DashboardViewConfig>({
    host: [],
    user: [],
  });
  useEffect(() => {
    // get user data first
    axios
      .get("http://localhost:8000/dashboard-view", {
        headers: { user: "ling" },
      })
      .then((response) => {
        console.log(response.data);
        setDashboard(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [0]);

  //   const sampleData: DashboardViewConfig = {
  //     host: [
  //       {
  //         name: "pineapple waiting long long",
  //         order_date: "13-08-2021",
  //         status: "open",
  //       },
  //       {
  //         name: "mooncakes",
  //         order_date: "15-08-2021",
  //         status: "closed",
  //       },
  //       {
  //         name: "pineapple",
  //         order_date: "20-08-2021",
  //         status: "collected",
  //       },
  //       {
  //         name: "pineapple",
  //         order_date: "22-08-2021",
  //         status: "open",
  //       },
  //     ],
  //     user: [
  //       {
  //         name: "pineapple waiting long long",
  //         order_date: "13-08-2021",
  //         status: "awaiting payment",
  //       },
  //       {
  //         name: "mooncakes",
  //         order_date: "15-08-2021",
  //         status: "collected",
  //       },
  //       {
  //         name: "pineapple",
  //         order_date: "20-08-2021",
  //         status: "order successful",
  //       },
  //       {
  //         name: "pineapple",
  //         order_date: "22-08-2021",
  //         status: "payment failed",
  //       },
  //     ],
  //   };

  return (
    <NavLayout background={pinkPineapple}>
      <SingleContent>
        <Row justify="space-between">
          <DashboardList title="Hosted groupbuy" data={dashboard.host} />
          <DashboardList title="Ordered" data={dashboard.user} />
        </Row>
      </SingleContent>
    </NavLayout>
  );
};
