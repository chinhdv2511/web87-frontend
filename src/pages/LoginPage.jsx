import React, { useCallback } from "react";
import { Button, Flex, Form, Input, notification, Typography } from "antd";
import authApi from "../api/authApi";

const { Title, Link, Text } = Typography;

const MARGIN_BOTTOM = { marginBottom: "18px" };
const FLEX_STYLE = { marginTop: "50px" };
const LOGIN_FORM_STYLE = {
  border: "1px solid #ccc",
  borderRadius: "10px",
  padding: "0px 30px 30px 30px",
  minWidth: "350px",
  width: "30%",
};

const EMAIL_RULES = [{ required: true, message: "Email is required" }];
const PASSWORD_RULES = [{ required: true, message: "Password is required" }];

export default function LoginPage() {
  const [api, contextHolder] = notification.useNotification();

  const [loginForm] = Form.useForm();

  const handleLogin = useCallback(async (values) => {
    const loginResult = await authApi.login(values);

    if (!loginResult.isSuccess) {
      api.error({ message: "Login failed", description: loginResult.message });
    } else {
      api.success({
        message: "Login successfully",
        description: "You'll be redirected to homepage",
      });
    }
  }, []);

  return (
    <div className="login-page">
      {contextHolder}
      <Flex justify="center" style={FLEX_STYLE}>
        <Form
          form={loginForm}
          className="login-form"
          layout="vertical"
          style={LOGIN_FORM_STYLE}
          onFinish={handleLogin}
        >
          <Flex justify="center">
            <Title level={2}>Login</Title>
          </Flex>

          <Form.Item
            name="email"
            label={<Text strong>Email </Text>}
            rules={EMAIL_RULES}
          >
            <Input
              size="large"
              placeholder="Enter your email"
              maxLength={255}
            />
          </Form.Item>

          <Form.Item
            name="password"
            label={<Text strong>Password</Text>}
            rules={PASSWORD_RULES}
          >
            <Input.Password
              size="large"
              placeholder="Enter your password"
              maxLength={255}
            />
          </Form.Item>

          <Flex justify="flex-end" style={MARGIN_BOTTOM}>
            <Text strong>
              <Link href="#">Forgot password?</Link>
            </Text>
          </Flex>

          <Button
            htmlType="submit"
            type="primary"
            size="large"
            block
            style={MARGIN_BOTTOM}
          >
            Login
          </Button>

          <Flex justify="center">
            <Text strong>
              Not have an account? <Link href="#">Register</Link>
            </Text>
          </Flex>
        </Form>
      </Flex>
    </div>
  );
}
