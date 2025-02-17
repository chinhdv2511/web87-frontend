import React from "react";
import { Button, Form, Input } from "antd";

const KEYWORD_RULES = [
  {
    required: true,
    message: "Enter your keyword to search",
    whitespace: true,
  },
];

export function SearchStory(props) {
  const [searchForm] = Form.useForm();

  const searchStories =
    props.searchStories ?? ((values) => console.log(values));

  const resetForm = () => {
    searchStories({ keyword: "" });
  };

  return (
    <div className="search-story">
      <Form layout="inline" form={searchForm} onFinish={searchStories}>
        <Form.Item name="keyword" rules={KEYWORD_RULES}>
          <Input size="large" placeholder="Enter keyword to search story" />
        </Form.Item>

        <Button type="primary" size="large" htmlType="submit">
          Search
        </Button>

        <Button type="danger" size="large" htmlType="reset" onClick={resetForm}>
          Clear
        </Button>
      </Form>
    </div>
  );
}
