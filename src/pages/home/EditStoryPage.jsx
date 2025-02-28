import { useContext, useEffect, useState } from "react";
import { Flex } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import StoryForm from "../../components/story/StoryForm";
import storyApi from "../../api/storyApi";
import collectionApi from "../../api/collectionApi";
import NotificationContext from "../../contexts/NotificationContext";

const CONTENT_STYLE = {
  margin: "auto",
  width: "50%",
  minWidth: "300px",
};

export default function EditStoryPage() {
  const [story, setStory] = useState(null);
  const [collections, setCollections] = useState([]);
  const { notifySuccess, notifyError } = useContext(NotificationContext);
  const navigate = useNavigate();

  const { id } = useParams();

  const fetchStory = async () => {
    const response = await storyApi.getStory(id);
    setStory(response.data);
  };

  const fetchCollections = async () => {
    const response = await collectionApi.getCollections();
    setCollections(response.data);
  };

  const handleSubmitStoryForm = async (values) => {
    const response = await storyApi.updateStory(id, values);
    if (response.isSuccess) {
      notifySuccess("Update story successfully");
      navigate("/");
    } else {
      notifyError("Update story failed");
    }
  };

  useEffect(() => {
    fetchStory(id);
    fetchCollections();
  }, [id]);

  return (
    <Flex vertical gap={20} className="content" style={CONTENT_STYLE}>
      <StoryForm
        type="edit"
        story={story}
        collections={collections}
        onSubmit={handleSubmitStoryForm}
      />
    </Flex>
  );
}
