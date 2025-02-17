import { Flex, Typography, Button, Space } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

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
          <Text italic>{props.collectionTitle}</Text>
        </div>
        <div className="story-actions">
          <Button primary>Save to favorite</Button>
        </div>
      </Flex>

      <div className="story-content">
        <Text>{props.content}</Text>
      </div>

      <Text strong>
        <Link onClick={() => navigate("/story/" + props._id + "/read")}>
          Read more
        </Link>
      </Text>

      <Flex
        justify="space-between"
        className="story-footer"
        style={STORY_FOOTER}
      >
        <Text>View: {props.viewCount}</Text>
        <Text>
          By {props.userFullName} at {props.createdAt}
        </Text>
      </Flex>
    </div>
  );
}
