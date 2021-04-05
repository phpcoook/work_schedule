import React from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { useDispatch } from "react-redux";
import { login } from "../../actions/auth";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 8 },
};

const LoginForm = () => {
  const dispatch = useDispatch();

  const onFinish = (values: {
    username: string;
    password: string;
    remember: boolean;
  }) => {
    if (
      values.username === "demo_user@example.com" &&
      values.password === "CalendarDemo157"
    ) {
      dispatch(login(1));
    }
  };

  const onFinishFailed = (errorInfo: {
    errorFields: any[];
    outOfDate: boolean;
    values: {
      username: string;
      password: string;
      remember: boolean;
    };
  }) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      className="LoginForm"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input className="LoginForm__username-input" />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password className="LoginForm__password-input" />
      </Form.Item>

      <Form.Item {...tailLayout} name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button
          type="primary"
          htmlType="submit"
          className="LoginForm__submit-btn"
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export { LoginForm as default };
