import { Button, Form, Input, Select, Typography } from "antd";
import TextEditor from "../utils/TextEditor";

const { Link, Text, Title } = Typography;

const collectionOptions = [
  { value: "1", label: "Collection 1" },
  { value: "2", label: "Collection 2" },
  { value: "3", label: "Collection 3" },
];

const TITLE_RULES = [
  { required: true, message: "Title is required", whitespace: true },
];

const CONTENT_RULES = [
  { required: true, message: "Content is required", whitespace: true },
];

export default function StoryForm({ onSubmit }) {
  const [storyForm] = Form.useForm();

  return (
    <Form form={storyForm} layout="vertical" onFinish={onSubmit}>
      <Title level={2}>Post story</Title>

      <Form.Item name="title" label="Title" rules={TITLE_RULES}>
        <Input
          size="large"
          maxLength={255}
          placeholder="Enter your story title"
        />
      </Form.Item>

      <Form.Item name="collectionId" label="Collection">
        <Select
          size="large"
          options={collectionOptions}
          placeholder="Select a collection (optional)"
        />
      </Form.Item>

      <Form.Item name="content" label="Content" rules={CONTENT_RULES}>
        <Input.TextArea size="large" placeholder="Enter your story content" />
      </Form.Item>

      <Button type="primary" htmlType="submit" block size="large">
        Create
      </Button>
    </Form>
  );
}
