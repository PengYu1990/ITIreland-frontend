import { Box, Stack, createStyles, rem } from "@mantine/core";
import CommentItem from "./CommentItem";
import { Comment } from "../../hooks/useComments";

const useStyles = createStyles(() => ({
  detail: {
    paddingLeft: rem(20),
    paddingRight: rem(20),
    paddingTop: rem(10),
    paddingBottom: rem(10),
    backgroundColor: "white",
    marginBottom: rem(10),
  },
}));
interface Props {
  comments: Comment[] | undefined;
  setComments: (comments: Comment[]) => void;
}
const CommentList = ({ comments, setComments }: Props) => {
  const { classes } = useStyles();
  return (
    <Stack>
      {comments && comments.length != 0 && (
        <Box className={classes.detail}>
          {comments?.map((comment, key) => (
            <CommentItem
              comment={comment}
              delComment={() =>
                setComments([...comments.filter((c) => comment.id != c.id)])
              }
              key={key}
            />
          ))}
        </Box>
      )}
    </Stack>
  );
};

export default CommentList;
