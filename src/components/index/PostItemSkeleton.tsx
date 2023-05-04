import { Box, Skeleton } from "@mantine/core";

function PostItemSkeleton() {
  return (
    <Box pl={10} pr={10}>
      <Skeleton height={30} mt={20} width="70%" />
      <Skeleton height={12} mt={15} />
      <Skeleton height={12} mt={6} />
      <Skeleton height={12} mt={6} />
      <Skeleton height={12} mt={6} />
    </Box>
  );
}

export default PostItemSkeleton;
