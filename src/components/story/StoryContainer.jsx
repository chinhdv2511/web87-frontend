import { Flex, Typography, Button, Space } from "antd";
import React from "react";

const { Link, Text } = Typography;

const STORY_CONTAINER_STYLE = {
  border: "1px solid #ccc",
  borderRadius: "10px",
  padding: "30px",
};

const STORY_HEADER = { marginBottom: "20px" };
const STORY_FOOTER = { marginTop: "20px" };

const STORY_SUMMARY_STYLE = {
  width: "100%",
};

export default function StoryContainer(props) {
  return (
    <div className="story-container" style={STORY_CONTAINER_STYLE}>
      <Flex gap={20} className="story-header" style={STORY_HEADER}>
        <image
          className="story-image"
          style={{ width: "40px", height: "40px" }}
          src={props.images[0]}
        />
        <div className="story-summary" style={STORY_SUMMARY_STYLE}>
          <Text strong>{props.title}</Text>
          <br />
          <Text italic>{props.collectionId}</Text>
        </div>
        <div className="story-actions">
          <Button primary>Save to favorite</Button>
        </div>
      </Flex>

      <div className="story-content">
        <Text>{props.content}</Text>
      </div>

      <Link>
        <Text strong>Read more</Text>
      </Link>

      <Flex
        justify="space-between"
        className="story-footer"
        style={STORY_FOOTER}
      >
        <Text>View: {props.viewCount}</Text>
        <Text>
          By {props.userId} at {props.createdAt}
        </Text>
      </Flex>
    </div>
  );
}
