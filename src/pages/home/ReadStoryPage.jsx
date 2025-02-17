import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import storyApi from "../../api/storyApi";

export default function ReadStoryPage() {
  const { id } = useParams();
  const [story, setStory] = useState({});

  const fetchStory = useCallback(async () => {
    const response = await storyApi.getStory(id);
    setStory(response.data);
  }, [id]);

  useEffect(() => {
    fetchStory();
  }, [id]);

  return (
    <div className="read-story-page">
      <div>{story.title}</div>
      <div>{story.content}</div>
    </div>
  );
}
