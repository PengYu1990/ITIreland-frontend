import { Alert, Box, Center, Loader, createStyles, rem } from "@mantine/core";
import { useUpdateEffect } from "react-use";
import React from "react";
import PostItem from "../shared/PostItem";
import PostItemSkeleton from "../index/PostItemSkeleton";
import useFollowingPosts from "../../hooks/useFollowingPosts";
import { PostQuery } from "../../hooks/usePosts";
import { IconAlertCircle } from "@tabler/icons-react";

const useStyles = createStyles(() => ({
  postList: {
    marginBottom: rem(10),
    marginTop: rem(3),
  },
  page: {
    padding: rem(10),
    float: "right",
  },
}));

interface Props {
  postQuery: PostQuery;
}

const FollowingPostList = ({ postQuery }: Props) => {
  const { classes } = useStyles();
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useFollowingPosts(postQuery);
  const skeleton = [1, 2, 3, 4, 5];

  useUpdateEffect(() => {
    // Add to the bottom event listener
    function handleScroll() {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;

      // Fetch next page
      if (scrollTop + clientHeight >= scrollHeight && hasNextPage) {
        fetchNextPage();
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <Box>
      <Box className={classes.postList}>
        {isLoading && skeleton.map((key) => <PostItemSkeleton key={key} />)}
        {data?.pages?.map((page, key) => (
          <React.Fragment key={key}>
            {page?.data?.map((post, key) => (
              <PostItem post={post} key={key} postQuery={postQuery} />
            ))}
          </React.Fragment>
        ))}

        {data?.pages[0].data.length === 0 && (
          <Alert
            icon={<IconAlertCircle size="1rem" />}
            title="Bummer!"
            variant="outline"
          >
            You have not followed any users yet. Follow some users to see their
            posts here.
          </Alert>
        )}
      </Box>
      <Center>{isFetchingNextPage && <Loader size={20} />}</Center>
    </Box>
  );
};

export default FollowingPostList;
