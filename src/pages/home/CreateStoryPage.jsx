import { useContext, useEffect, useState } from "react";
import { Flex } from "antd";
import { useNavigate } from "react-router-dom";
import StoryForm from "../../components/story/StoryForm";
import storyApi from "../../api/storyApi";
import collectionApi from "../../api/collectionApi";
import NotificationContext from "../../contexts/NotificationContext";

const CONTENT_STYLE = {
  margin: "auto",
  width: "50%",
  minWidth: "300px",
};

export default function CreateStoryPage() {
  const [collections, setCollections] = useState([]);
  const { notifySuccess, notifyError } = useContext(NotificationContext);
  const navigate = useNavigate();

  const fetchCollections = async () => {
    const response = await collectionApi.getCollections();
    setCollections(response.data);
  };

  const handleSubmitStoryForm = async (values) => {
    const response = await storyApi.createStory(values);
    if (response.isSuccess) {
      notifySuccess("Post story successfully");
      navigate("/");
    } else {
      notifyError("Post story failed");
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  return (
    <Flex vertical gap={20} className="content" style={CONTENT_STYLE}>
      <StoryForm
        type="create"
        onSubmit={handleSubmitStoryForm}
        collections={collections}
      />
    </Flex>
  );
}
