'use client';

import React, { useEffect, useCallback } from 'react';
import {
  Form,
  Input,
  Button,
  Select,
  Checkbox,
  Radio,
  InputNumber,
  Space,
  ConfigProvider,
  DatePicker,
  Slider,
  Switch,
} from 'antd';

const { Option } = Select;

const formItemLayout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

export function AntdForm() {
  const [form] = Form.useForm();
  
  useEffect(() => {
    performance.mark('antd-mount-start');
    setTimeout(() => {
      performance.mark('antd-mount-end');
      performance.measure('antd-mount', 'antd-mount-start', 'antd-mount-end');
    }, 0);
  }, []);

  const onValuesChange = useCallback(() => {
    performance.mark('antd-update-start');
    setTimeout(() => {
        performance.mark('antd-update-end');
        try {
            performance.measure('antd-update', 'antd-update-start', 'antd-update-end');
        } catch(e) {
            // Can fail if previous update cycle hasn't finished.
        }
    }, 0)
  }, []);
  
  const onReset = () => {
    form.resetFields();
  };

  const measureSubmit = () => {
    setTimeout(() => {
      performance.mark('antd-submit-end');
      try {
        performance.measure('antd-submit', 'antd-submit-start', 'antd-submit-end');
      } catch (e) {
        // May fail if marks are cleared or not set, safe to ignore
      }
    }, 0);
  };

  const handleSubmit = () => {
    performance.mark('antd-submit-start');
  };

  const initialValues: {[key: string]: any} = {
    fullName: '',
    email: '',
    age: 18,
    bio: '',
    satisfaction: 50,
    newsletter: false,
    terms: false,
  };

  for (let i = 1; i <= 30; i++) {
    initialValues[`field${i}`] = '';
  }


  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#5DADE2',
          colorSuccess: '#A3E4D7',
          colorBgContainer: '#FFFFFF',
          borderRadius: 6,
        },
      }}
    >
      <Form
        {...formItemLayout}
        form={form}
        layout="vertical"
        name="antd_form"
        onValuesChange={onValuesChange}
        onFinish={measureSubmit}
        onFinishFailed={measureSubmit}
        initialValues={initialValues}
      >
        <Form.Item
          name="fullName"
          label="Full Name"
          rules={[{ required: true, message: 'Please input your full name!', min: 2 }]}
        >
          <Input placeholder="John Doe" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, type: 'email', message: 'The input is not valid E-mail!' }]}
        >
          <Input placeholder="you@example.com" />
        </Form.Item>
        
        <Form.Item
          name="age"
          label="Age"
          rules={[{ required: true, type: 'number', min: 18, max: 99, message: 'Age must be between 18 and 99' }]}
        >
          <InputNumber min={18} max={99} className="w-full" />
        </Form.Item>

        <Form.Item
          name="department"
          label="Department"
          rules={[{ required: true, message: 'Please select your department!' }]}
        >
          <Select placeholder="Select a department">
            <Option value="engineering">Engineering</Option>
            <Option value="design">Design</Option>
            <Option value="product">Product</Option>
            <Option value="marketing">Marketing</Option>
          </Select>
        </Form.Item>

        <Form.Item name="bio" label="Bio">
          <Input.TextArea rows={4} placeholder="Tell us a little about yourself" maxLength={200} />
        </Form.Item>

        <Form.Item
          name="dateOfBirth"
          label="Date of Birth"
          rules={[{ required: true, message: 'Please select your date of birth!' }]}
        >
          <DatePicker className="w-full" />
        </Form.Item>

        <Form.Item
          name="satisfaction"
          label="Satisfaction"
        >
          <Slider />
        </Form.Item>

        <Form.Item name="newsletter" label="Subscribe to Newsletter" valuePropName="checked">
          <Switch />
        </Form.Item>
        
        <Form.Item
          name="contactMethod"
          label="Preferred Contact Method"
          rules={[{ required: true, message: 'Please select a contact method' }]}
        >
          <Radio.Group>
            <Radio value="email">Email</Radio>
            <Radio value="phone">Phone</Radio>
          </Radio.Group>
        </Form.Item>

        {Array.from({ length: 30 }, (_, i) => i + 1).map((i) => (
          <Form.Item
            key={`field${i}`}
            name={`field${i}`}
            label={`Field ${i}`}
            rules={[{ required: true, message: 'This field is required.' }]}
          >
            <Input placeholder={`Value for field ${i}`} />
          </Form.Item>
        ))}

        <Form.Item
          name="terms"
          valuePropName="checked"
          rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject('You must accept the terms!') }]}
        >
          <Checkbox>I accept the terms and conditions</Checkbox>
        </Form.Item>

        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit" onClick={handleSubmit}>
              Submit
            </Button>
            <Button htmlType="button" onClick={onReset}>
              Reset
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </ConfigProvider>
  );
}
