import React, { useState, useEffect } from "react";
import {
  GroupbuyFullCalendar,
  NavLayout,
  SingleContent,
  GroupbuyList,
} from "../Components";
import { greenPineapple } from "../Assets";
import { Row, Select, Col } from "antd";
import axios from "axios";
const { Option } = Select;

export const Groupbuy = () => {
  const [openGroupbuys, setOpenGroupbuys] = useState<any>([]);
  const [selected, setSelected] = useState([]);
  const [options, setOptions] = useState<Array<string>>([]);

  useEffect(() => {
    axios
      .get(`${process.env.BACKEND_URL}/groupbuy`)
      .then((response) => {
        console.log(response.data);
        setOpenGroupbuys(response.data);
        setSelected(response.data);
        setOptions(response.data.map((ele: any) => ele.User_id));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const onChange = (value: any) => {
    let filteredData = openGroupbuys.filter(
      (elem: any) => elem.User_id === value
    );

    setSelected(filteredData);
  };

  return (
    <NavLayout background={greenPineapple}>
      <SingleContent>
        <Row justify="space-between">
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Select a Groupbuy"
            optionFilterProp="children"
            onChange={onChange}
          >
            {console.log(options)}
            {options.map((elem) => (
              <Option key={elem} value={elem}>
                {elem}
              </Option>
            ))}
          </Select>
          ,
        </Row>
        <Row justify="space-between">
          <Col span={14} style={{ backgroundColor: "white" }}>
            <GroupbuyFullCalendar data={selected} />
          </Col>
          <GroupbuyList data={selected} />
        </Row>
      </SingleContent>
    </NavLayout>
  );
};
