import React, { useCallback, useContext, useEffect, useState } from "react";
import AuthContext from "../contexts/AuthContext";
import StoryList from "../components/story/StoryList";
import storyApi from "../api/storyApi";
import { useSearchParams } from "react-router-dom";

const CONTENT_STYLE = {
  margin: "auto",
  width: "50%",
  minWidth: "300px",
};

export default function HomePage() {
  const { user } = useContext(AuthContext);

  const [searchParams, setSearchParams] = useSearchParams();

  const page = searchParams.get("page") ?? 1;
  const pageSize = searchParams.get("pageSize") ?? 15;

  console.log(page, pageSize);

  const [storyData, setStoryData] = useState({
    stories: [],
    total: 0,
  });

  const changePage = (page, pageSize) => {
    setSearchParams({
      page,
      pageSize,
    });
  };

  const fetchStories = useCallback(async () => {
    const responseData = await storyApi.getStories({
      keyword: "",
      page,
      pageSize,
      orderBy: "createdAt",
      orderDirection: "desc",
    });
    setStoryData(responseData.data);
  }, [page, pageSize]);

  useEffect(() => {
    fetchStories();
  }, [page, pageSize]);

  return (
    <div className="home-page">
      <div className="content" style={CONTENT_STYLE}>
        <StoryList
          {...storyData}
          page={page}
          pageSize={pageSize}
          changePage={changePage}
        />
      </div>
    </div>
  );
}
