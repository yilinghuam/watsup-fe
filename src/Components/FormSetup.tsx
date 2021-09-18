import React from "react";
import { Form, Input, Button, Space, InputNumber } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Formconfig } from "../Interfaces/Dashboard";

export const FormSetup = (props: {
  formValues: Formconfig;
  setForm: React.Dispatch<React.SetStateAction<Formconfig>>;
  setStage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const onFinish = (values: any) => {
    console.log("Received values of form:", values);
    props.setForm({ ...props.formValues, Setup: values.formsetup });
    props.setStage(2);
  };

  let initialValues = {};

  if (Object.keys(props.formValues.Setup).length !== 0) {
    initialValues = { formsetup: [...props.formValues.Setup] };
    console.log({ ...props.formValues.Setup });
  } else {
    initialValues = { formsetup: [{ item: "", price: "", quantity: "" }] };
  }

  return (
    <Form
      id="set-up-form"
      name="dynamic_form_nest_item"
      onFinish={onFinish}
      autoComplete="off"
      initialValues={initialValues}
    >
      <Form.List name="formsetup">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, fieldKey, ...restField }) => (
              <Space
                key={key}
                style={{ display: "flex", marginBottom: 8 }}
                align="baseline"
              >
                <Form.Item
                  {...restField}
                  name={[name, "item"]}
                  fieldKey={[fieldKey, "item"]}
                  rules={[{ required: true, message: "Missing item name" }]}
                >
                  <Input placeholder="item name" />
                </Form.Item>

                <Form.Item
                  {...restField}
                  name={[name, "price"]}
                  fieldKey={[fieldKey, "price"]}
                  rules={[
                    {
                      required: true,
                      type: "number",
                      min: 0,
                      max: 999,
                      message: "Missing item price",
                    },
                  ]}
                >
                  <InputNumber placeholder="price" />
                </Form.Item>

                <Form.Item
                  {...restField}
                  name={[name, "quantity"]}
                  fieldKey={[fieldKey, "quantity"]}
                  style={{ flex: 1 }}
                  rules={[
                    {
                      required: true,
                      type: "number",
                      min: 0,
                      max: 999,
                      message: "Missing maximum quantity",
                    },
                  ]}
                >
                  <InputNumber placeholder="max quantity" />
                </Form.Item>

                {fields.length > 1 ? (
                  <MinusCircleOutlined
                    className="minusbutton"
                    style={{ flex: 0 }}
                    width={2}
                    onClick={() => remove(name)}
                  />
                ) : (
                  ""
                )}
              </Space>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Add field
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item style={{ justifyContent: "flex-end" }}>
        <Button type="primary" htmlType="submit">
          Next
        </Button>
      </Form.Item>
    </Form>
  );
};
