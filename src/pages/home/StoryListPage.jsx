import React, { useCallback, useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Flex, Layout } from "antd";

import StoryList from "../../components/story/StoryList";
import storyApi from "../../api/storyApi";
import { SearchStory } from "../../components/story/SearchStory";

const CONTENT_STYLE = {
  margin: "auto",
  width: "50%",
  minWidth: "300px",
};

export default function StoryListPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const keyword = searchParams.get("keyword") ?? "";
  const page = searchParams.get("page") ?? 1;
  const pageSize = searchParams.get("pageSize") ?? 15;

  const [storyData, setStoryData] = useState({
    stories: [],
    total: 0,
  });

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
    const responseData = await storyApi.getStories({
      keyword,
      page,
      pageSize,
      orderBy: "createdAt",
      orderDirection: "desc",
    });
    setStoryData(responseData.data);
  };

  useEffect(() => {
    fetchStories();
  }, [keyword, page, pageSize]);

  return (
    <Flex vertical gap={20} className="content" style={CONTENT_STYLE}>
      <SearchStory searchStories={searchStories} />

      <StoryList
        {...storyData}
        page={page}
        pageSize={pageSize}
        changePage={changePage}
      />
    </Flex>
  );
}
