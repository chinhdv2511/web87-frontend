import React from "react";
import { Button, Flex, Form, Input, Typography } from "antd";

const { Title, Link, Text } = Typography;

const MARGIN_BOTTOM = { marginBottom: "18px" };
const FLEX_STYLE = { marginTop: "50px" };
const REGISTER_FORM_STYLE = {
  border: "1px solid #ccc",
  borderRadius: "10px",
  padding: "0px 30px 30px 30px",
  minWidth: "350px",
  width: "30%",
};

export default function RegisterPage() {
  return (
    <div className="register-page">
      <Flex justify="center" style={FLEX_STYLE}>
        <Form
          className="register-form"
          layout="vertical"
          style={REGISTER_FORM_STYLE}
        >
          <Flex justify="center">
            <Title level={2}>Register</Title>
          </Flex>

          <Form.Item label={<Text strong>Full name</Text>} required>
            <Input size="large" placeholder="Enter your full name" />
          </Form.Item>

          <Form.Item label={<Text strong>Email</Text>} required>
            <Input size="large" placeholder="Enter your email" />
          </Form.Item>

          <Form.Item label={<Text strong>Password</Text>} required>
            <Input.Password size="large" placeholder="Enter your password" />
          </Form.Item>

          <Form.Item label={<Text strong>Confirm password</Text>} required>
            <Input.Password size="large" placeholder="Confirm your password" />
          </Form.Item>

          <Button type="primary" size="large" block style={MARGIN_BOTTOM}>
            Register
          </Button>

          <Flex justify="center">
            <Text strong>
              Already have an account? <Link href="#">Login</Link>
            </Text>
          </Flex>
        </Form>
      </Flex>
    </div>
  );
}
