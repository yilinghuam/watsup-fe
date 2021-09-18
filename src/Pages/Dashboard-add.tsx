import React, { useState } from "react";
import {
  NavLayout,
  ProgressSteps,
  FormDetails,
  FormSetup,
  Review,
} from "../Components";
import { SingleContent } from "../Components";
import { pineappleImg } from "../Assets";
import { Formconfig } from "../Interfaces/Dashboard";
import { Button, Row } from "antd";
import moment from "moment";
import axios from "axios";

export const DashboardAdd = () => {
  type stageread = (name: number) => void;

  const [stageNumber, setStageNumber] = useState(0);
  const [form, setForm] = useState<Formconfig>({ Details: {}, Setup: [] });

  let steps = {
    first: "Details",
    second: "Form Set-up",
    third: "Review",
  };

  const onStageChange: stageread = (value: number) => {
    setStageNumber(value);
    console.log(value);
  };

  const confirmedData = () => {
    let confirmedData: any = { ...form };
    console.log(confirmedData);
    confirmedData.Details["order_date"] = moment(
      confirmedData.Details["order_date"]
    ).format("DD-MM-YYYY");
    confirmedData.Details["closing_date"] = moment(
      confirmedData.Details["closing_date"]
    ).format("DD-MM-YYYY");

    if (confirmedData.Details["description"] === "") {
      confirmedData.Details["description"] = "null";
    }

    // post data to backend here
    console.log(confirmedData);
    axios
      .post("http://localhost:8000/dashboard-add", confirmedData, {
        headers: {
          user: "ling",
        },
      })
      .then((response) => {
        console.log("item updated!");
      })
      .catch((err) => {
        console.log(err);
      });
    setForm({ Details: {}, Setup: [] });
  };

  return (
    <NavLayout background={pineappleImg}>
      <SingleContent>
        <ProgressSteps
          steps={steps}
          stage={onStageChange}
          stageNumber={stageNumber}
        />
        {stageNumber === 0 ? (
          <FormDetails
            setStage={setStageNumber}
            formValues={form}
            setForm={setForm}
          />
        ) : (
          ""
        )}
        {stageNumber === 1 ? (
          <FormSetup
            setStage={setStageNumber}
            formValues={form}
            setForm={setForm}
          />
        ) : (
          ""
        )}
        {stageNumber === 2 ? (
          <>
            <Review formValues={form} />
            <Row style={{ margin: "3%" }} justify="end">
              <Button type="primary" onClick={confirmedData}>
                Submit
              </Button>
            </Row>
          </>
        ) : (
          ""
        )}
        {console.log(form)}
      </SingleContent>
    </NavLayout>
  );
};
