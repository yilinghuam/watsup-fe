import React, { useState } from 'react';
import {
  Form,
  Input,
  Button,
  Radio,
  DatePicker,
  InputNumber,
  RadioChangeEvent,
} from 'antd';

interface formconfig {
    details:{},
    setup:[]
}

export const FormDetails = (props:{formValues:formconfig,setForm:React.Dispatch<React.SetStateAction<formconfig>>,setStage:React.Dispatch<React.SetStateAction<number>>}) => {
    
    //   to make price of delivery required if yes box is ticked.
    const [checkDelivery,setCheckDelivery] = useState(false)
    const onCheckDelivery = (e: RadioChangeEvent) => {
        setCheckDelivery(e.target.value)
    }

    const onFinish = (fieldsValue: any) => {
        const values = {
            ...fieldsValue,
            // 'order-date': fieldsValue['order-date'].format('YYYY-MM-DD'),
            // 'closing-date': fieldsValue['closing-date'].format('YYYY-MM-DD'),
          };
        console.log(values);

        props.setForm({
            ...props.formValues,
            details:values
        })
        props.setStage(1)

    };

    let initialValues = {}
    if (Object.keys(props.formValues.details).length!== 0){
        initialValues = {...props.formValues.details}
    }else{
        initialValues = {}
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

            <Form.Item label="Groupbuy Name" name="name" required rules={[{ required: true, message: 'Please input name of group buy!' }]}>
            <Input />
            </Form.Item>

            <Form.Item label="Description" name="description">
            <Input.TextArea />
            </Form.Item>

            <Form.Item label="Groupbuy Date" name="order-date" required rules={[{ required: true, message: 'Please select date!' }]}>
            <DatePicker />
            </Form.Item> 

            <Form.Item label="Order Closing Date" name="closing-date" required rules={[{ required: true, message: 'Please select closing date of groupbuy form!' }]}>
            <DatePicker />
            </Form.Item> 

            <Form.Item label="Delivery Options" name="delivery-options"  required rules={[{ required: true, message: 'Please select if delivery options are available!' }]}>
            <Radio.Group onChange={onCheckDelivery}>
                <Radio.Button value={true}>Yes</Radio.Button>
                <Radio.Button value={false}>No</Radio.Button>
            </Radio.Group>
            </Form.Item>
            
            <Form.Item label="Delivery Price" name="delivery-price" rules={[{ required:checkDelivery,type: 'number', min: 1, max: 99,message: 'Please input a number from 1-99!' }]}>
            <InputNumber />
            </Form.Item>
            
            <Form.Item wrapperCol={{span:4}} style={{justifyContent:'flex-end'}}>
            <Button type="primary" htmlType="submit">Next</Button>
            </Form.Item>
        </Form>
        </>
    )
}
