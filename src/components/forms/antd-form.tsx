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
} from 'antd';

const { Option } = Select;

const formItemLayout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

const handleInteraction = (formName: string, interactionType: string, action: () => void) => {
  performance.mark(`${formName}-${interactionType}-start`);
  action();
  setTimeout(() => {
    performance.mark(`${formName}-${interactionType}-end`);
    try {
        performance.measure(`${formName}-${interactionType}`, `${formName}-${interactionType}-start`, `${formName}-${interactionType}-end`);
    } catch(e) {
        // May fail if marks are cleared or not set, safe to ignore
    }
  }, 0);
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
        initialValues={{
            fullName: '',
            email: '',
            age: 18,
            bio: '',
        }}
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
          name="contactMethod"
          label="Preferred Contact Method"
          rules={[{ required: true, message: 'Please select a contact method' }]}
        >
          <Radio.Group>
            <Radio value="email">Email</Radio>
            <Radio value="phone">Phone</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          name="terms"
          valuePropName="checked"
          rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject('You must accept the terms!') }]}
        >
          <Checkbox>I accept the terms and conditions</Checkbox>
        </Form.Item>

        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
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
