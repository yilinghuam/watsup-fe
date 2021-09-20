import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Radio,
  DatePicker,
  InputNumber,
  RadioChangeEvent,
} from "antd";
import { Formconfig } from "../Interfaces/Dashboard";

export const FormDetails = (props: {
  formValues: Formconfig;
  setForm: React.Dispatch<React.SetStateAction<Formconfig>>;
  setStage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  //   to make price of delivery required if yes box is ticked.
  const [checkDelivery, setCheckDelivery] = useState(false);
  const onCheckDelivery = (e: RadioChangeEvent) => {
    setCheckDelivery(e.target.value);
  };

  const onFinish = (fieldsValue: any) => {
    const values = {
      ...fieldsValue,
    };
    console.log(values);

    props.setForm({
      ...props.formValues,
      Details: values,
    });
    props.setStage(1);
  };

  let initialValues = {};
  if (Object.keys(props.formValues.Details).length !== 0) {
    initialValues = { ...props.formValues.Details };
  } else {
    initialValues = {};
  }

  return (
    <>
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        onFinish={onFinish}
        initialValues={initialValues}
      >
        <Form.Item
          label="Groupbuy Name"
          name="name"
          required
          rules={[
            { required: true, message: "Please input name of group buy!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Description" name="description" initialValue="">
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          label="Groupbuy Date"
          name="order_date"
          required
          rules={[{ required: true, message: "Please select date!" }]}
        >
          <DatePicker format={"DD-MM-YYYY"} />
        </Form.Item>

        <Form.Item
          label="Order Closing Date"
          name="closing_date"
          required
          rules={[
            {
              required: true,
              message: "Please select closing date of groupbuy form!",
            },
          ]}
        >
          <DatePicker format={"DD-MM-YYYY"} />
        </Form.Item>

        <Form.Item
          label="Delivery Options"
          name="delivery_options"
          required
          rules={[
            {
              required: true,
              message: "Please select if delivery options are available!",
            },
          ]}
        >
          <Radio.Group onChange={onCheckDelivery}>
            <Radio.Button value={true}>Yes</Radio.Button>
            <Radio.Button value={false}>No</Radio.Button>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="Delivery Price"
          name="delivery_price"
          rules={[
            {
              required: checkDelivery,
              type: "number",
              min: 1,
              max: 99,
              message: "Please input a number from 1-99!",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          wrapperCol={{ span: 4 }}
          style={{ justifyContent: "flex-end" }}
        >
          <Button type="primary" htmlType="submit">
            Next
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
