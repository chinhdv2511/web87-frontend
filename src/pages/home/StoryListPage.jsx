import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button, Flex, Layout } from "antd";

import storyApi from "../../api/storyApi";
import AuthContext from "../../contexts/AuthContext";
import StoryList from "../../components/story/StoryList";
import { SearchStory } from "../../components/story/SearchStory";

const CONTENT_STYLE = {
  margin: "auto",
  width: "50%",
  minWidth: "300px",
};

export default function StoryListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useContext(AuthContext);

  const keyword = searchParams.get("keyword") ?? "";
  const page = searchParams.get("page") ?? 1;
  const pageSize = searchParams.get("pageSize") ?? 15;

  const [storyData, setStoryData] = useState({
    stories: [],
    total: 0,
  });

  const navigate = useNavigate();

  const changePage = (page, pageSize) => {
    setSearchParams({
      keyword,
      page,
      pageSize,
    });
  };

  const searchStories = ({ keyword }) => {
    setSearchParams({
      keyword: keyword,
    });
  };

  const fetchStories = async () => {
    const response = await storyApi.getStories({
      keyword,
      page,
      pageSize,
      orderBy: "createdAt",
      orderDirection: "desc",
    });

    const newStoryData = {
      stories: response.data.stories.map((story) => ({
        ...story,
        editable: story.userId == user?.id,
      })),
      total: response.data.total,
    };

    setStoryData(newStoryData);
  };

  useEffect(() => {
    fetchStories();
  }, [keyword, page, pageSize]);

  return (
    <Flex vertical gap={20} className="content" style={CONTENT_STYLE}>
      <Flex align="center" justify="space-between">
        <SearchStory searchStories={searchStories} />
        <div>
          <Button
            type="primary"
            size="large"
            onClick={() => navigate("/story/create")}
          >
            Post new Story
          </Button>
        </div>
      </Flex>

      <StoryList
        {...storyData}
        page={page}
        pageSize={pageSize}
        changePage={changePage}
      />
    </Flex>
  );
}
