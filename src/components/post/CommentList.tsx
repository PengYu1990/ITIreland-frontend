import { Box } from "@mantine/core";
import CommentItem from "./CommentItem";
import { Comment } from "../../services/comment-service";

interface Props {
  comments: Comment[] | undefined;
}
const CommentList = ({ comments }: Props) => {
  return (
    <Box>
      {comments?.map((comment, key) => (
        <CommentItem comment={comment} key={key} />
      ))}
    </Box>
  );
};

export default CommentList;
