import { Flex, Pagination, Space } from "antd";
import StoryContainer from "./StoryContainer";

export default function StoryList(props) {
  const stories = props.stories ?? [];
  const totalPage = props.totalPages ?? 0;
  const total = props.total;
  const page = props.page;
  const pageSize = props.pageSize;
  const changePage = props.changePage;

  return (
    <div className="story-list">
      <Flex vertical gap={20}>
        {stories.map((story) => (
          <StoryContainer key={story._id} {...story} />
        ))}
      </Flex>
      <br />
      <br />
      <Pagination
        align="center"
        total={total}
        pageSize={pageSize}
        current={page}
        onChange={changePage}
      />
    </div>
  );
}
