import { Flex } from "antd";
import StoryForm from "../../components/story/StoryForm";
import storyApi from "../../api/storyApi";

const CONTENT_STYLE = {
  margin: "auto",
  width: "50%",
  minWidth: "300px",
};

export default function CreateStoryPage() {
  const handleSubmitStoryForm = async (values) => {
    const response = await storyApi.createStory(values);
    console.log(response);
  };

  return (
    <Flex vertical gap={20} className="content" style={CONTENT_STYLE}>
      <StoryForm onSubmit={handleSubmitStoryForm} />
    </Flex>
  );
}
