import { Flex, Group, Text, createStyles, rem } from "@mantine/core";
import { IconCategory, IconEye, IconTags } from "@tabler/icons-react";
import { Post } from "../../services/post-service";

const useStyles = createStyles((theme) => ({
  meta: {
    marginTop: rem(20),
    color: theme.colors.gray[6],
    fontSize: rem(14),
  },
}));

interface Props {
  post: Post;
}

const PostMeta = ({ post }: Props) => {
  const { classes } = useStyles();
  return (
    <Flex
      className={classes.meta}
      gap={25}
      justify="flex-start"
      direction="row"
    >
      {/* <Group spacing="xs">
        <Link to={`/user/${post.user.id}`}>
          <Avatar
            src={
              post.user.headShotUrl &&
              `${AppConfig.config.api}${post.user.headShotUrl}`
            }
            color="cyan"
            radius="xl"
            size={23}
          >
            {post.user.username.substring(0, 2).toUpperCase()}
          </Avatar>
        </Link>
        <Link to={`/user/${post.user.id}`}>
          <Text>{post.user.username}</Text>
        </Link>
      </Group>

      <Group spacing="xs" position="left">
        <IconCalendarTime size={20} />
        <Text>{dayjs(post.ctime).fromNow()}</Text>
      </Group> */}
      {/* <MediaQuery smallerThan="md" styles={{ display: "none" }}> */}
      <Group spacing="xs" position="left">
        <IconEye size={20} />
        <Text>{post.views}</Text>
      </Group>
      {/* </MediaQuery> */}

      {/* <MediaQuery smallerThan="xs" styles={{ display: "none" }}> */}
      <Group spacing="xs" position="left">
        <IconCategory size={20} />
        <Text>{post.category}</Text>
      </Group>
      {/* </MediaQuery> */}

      {post.tags.length > 0 && (
        // <MediaQuery smallerThan="md" styles={{ display: "none" }}>
        <Group spacing="xs" position="left">
          <IconTags size={25} />
          <Flex gap={10} justify="flex-start" direction="row">
            {post.tags.map((tag, key) => (
              <Text key={key}>{tag.tag}</Text>
            ))}
          </Flex>
        </Group>
        // </MediaQuery>
      )}
    </Flex>
  );
};

export default PostMeta;
