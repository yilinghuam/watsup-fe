import React from "react";
import { Form, Button, Space, InputNumber, Input } from "antd";
import { useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useHistory } from "react-router-dom";
const { TextArea } = Input;

export const OrderForm = (props: { data: any; delivery: any }) =>
  //props: {
  //   formValues: Formconfig;
  //   setForm: React.Dispatch<React.SetStateAction<Formconfig>>;}
  {
    const [orderValues, setOrderValues] = useState<any>(false);
    const [form] = Form.useForm();
    const [cookies, setCookies] = useCookies(["UserAuth"]);
    const history = useHistory();

    const onFinish = (values: any) => {
      let toFormat = [...values.order_form];
      console.log(toFormat);
      let formattedValues = toFormat.map((elem: any) => {
        return {
          Item: elem.Item,
          Price: elem.quantity * elem.Price,
          Quantity: elem.quantity,
          Groupbuy_id: elem.Groupbuy_id,
        };
      });
      let finalValue;
      if (Object.keys(values).includes("address")) {
        finalValue = {
          Address: values.address,
          Order: formattedValues,
        };
      } else {
        finalValue = {
          Address: "null",
          Order: formattedValues,
        };
      }
      console.log(finalValue);
      axios
        .post(
          `${process.env.REACT_APP_BACKEND_URL}/auth/groupbuy/orders`,
          finalValue,
          {
            headers: { Authorization: `Bearer ${cookies.UserAuth}` },
          }
        )
        .then((response) => {
          console.log(response.data);
          history.push("/dashboard-view");
        })
        .catch((err) => {
          console.log(err);
        });
      //   props.setForm({ ...props.formValues, Setup: values.formsetup });
    };

    let initialValues = [...props.data];
    const onQuantityChange = (value: number, allValues: any) => {
      console.log(value);
      console.log(allValues);
      setOrderValues(allValues);
    };
    const handleChange = (e: any) => {
      if (e.target.name === "address") {
        form.setFieldsValue({ address: e.target.value });
      } else {
        console.log(e);
      }
      console.log(form.getFieldsValue());
    };
    return (
      <Form
        form={form}
        id="order-form"
        name="dynamic_form_nest_item"
        onFinish={onFinish}
        autoComplete="off"
        initialValues={{ order_form: initialValues }}
        onValuesChange={onQuantityChange}
      >
        {props.delivery ? (
          <Form.Item
            name="address"
            label="address"
            rules={[{ required: true, message: "Missing address" }]}
          >
            <TextArea
              style={{ width: "87%" }}
              maxLength={100}
              onChange={(e) => handleChange(e)}
            />
          </Form.Item>
        ) : (
          ""
        )}
        <Form.List name="order_form">
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
                    label={initialValues[key].Item}
                    fieldKey={[fieldKey, "item"]}
                  ></Form.Item>

                  <Form.Item
                    {...restField}
                    name={[name, "quantity"]}
                    fieldKey={[fieldKey, "quantity"]}
                    rules={[
                      {
                        type: "number",
                        min: 0,
                        max: 999,
                      },
                    ]}
                  >
                    <InputNumber
                      //   onChange={onQuantityChange}
                      placeholder="quantity"
                    />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    name={[name, "Price"]}
                    fieldKey={[fieldKey, "Price"]}
                    style={{ flex: 1, border: "none" }}
                    rules={[
                      {
                        type: "number",
                        min: 0,
                        max: 999,
                      },
                    ]}
                  >
                    {`$ `}
                    <InputNumber
                      disabled
                      placeholder={initialValues[key].Price.toString()}
                      onChange={(e) => handleChange(e)}
                      value={
                        orderValues
                          ? orderValues.order_form[key].quantity *
                            initialValues[key].Price
                          : initialValues[key].Price
                      }
                    />
                  </Form.Item>
                </Space>
              ))}
            </>
          )}
        </Form.List>
        <Form.Item style={{ justifyContent: "flex-end" }}>
          <Button type="primary" htmlType="submit">
            submit order
          </Button>
        </Form.Item>
      </Form>
    );
  };
