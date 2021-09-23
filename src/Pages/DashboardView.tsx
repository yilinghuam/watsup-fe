import React, { useEffect, useState } from "react";

import { NavLayout, DashboardList } from "../Components";
import { SingleContent } from "../Components";
import { pinkPineapple } from "../Assets";
import { Row } from "antd";
import { DashboardViewConfig } from "../Interfaces/Dashboard";
import { useCookies } from "react-cookie";
import axios from "axios";

export const DashboardView = () => {
  //get all groupbuy that are open
  const [cookies] = useCookies(["UserAuth"]);

  const [dashboard, setDashboard] = useState<DashboardViewConfig>({
    host: [],
    user: [],
  });
  useEffect(() => {
    // get user data first
    console.log(cookies.UserAuth);
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/auth/dashboard-view`, {
        headers: { Authorization: `Bearer ${cookies.UserAuth}` },
      })
      .then((response) => {
        console.log(response.data);
        setDashboard(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [0]);

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
