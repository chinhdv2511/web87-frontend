import { Button, Form, Input, Select, Typography } from "antd";
import TextEditor from "../utils/TextEditor";
import { useEffect } from "react";

const { Link, Text, Title } = Typography;

const TITLE_RULES = [
  { required: true, message: "Title is required", whitespace: true },
];

const CONTENT_RULES = [
  { required: true, message: "Content is required", whitespace: true },
];

export default function StoryForm({ onSubmit, collections, type, story }) {
  const [storyForm] = Form.useForm();

  useEffect(() => {
    if (!story) return;

    storyForm.setFieldsValue({
      title: story.title,
      collectionId: story.collectionId,
      content: story.content,
    });
  }, [story]);

  const collectionOptions = collections.map((item) => ({
    value: item.id,
    label: item.title,
  }));

  const formTitle = type == "create" ? "Post story" : "Edit story";
  const buttonLabel = type == "create" ? "Create" : "Update";

  return (
    <Form form={storyForm} layout="vertical" onFinish={onSubmit}>
      <Title level={2}>{formTitle}</Title>

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
        {buttonLabel}
      </Button>
    </Form>
  );
}
