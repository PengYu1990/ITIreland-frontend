import { Button, Flex, Group, Text, createStyles, rem } from "@mantine/core";
import {
  IconCategory,
  IconClover,
  IconEye,
  IconTags,
  IconThumbDown,
  IconThumbUp,
} from "@tabler/icons-react";
import { Post } from "../../services/post-service";

const useStyles = createStyles((theme) => ({
  meta: {
    marginTop: rem(20),
    color: theme.colors.gray[6],
    fontSize: rem(14),
  },
  upvote: {
    color: theme.colors.dark[6],
    fontSize: rem(14),
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: rem(20),
    borderTopLeftRadius: rem(20),
    padding: rem(2),
    paddingLeft: rem(10),
    paddingRight: rem(10),
    borderTop: `${rem(2)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
    borderBottom: `${rem(2)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
    borderRight: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
    borderLeft: `${rem(2)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
    marginRight: 0,
  },

  downvote: {
    color: theme.colors.dark[6],
    fontSize: rem(14),
    borderTopRightRadius: rem(20),
    borderBottomRightRadius: rem(20),
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    padding: rem(2),
    paddingLeft: rem(10),
    paddingRight: rem(10),
    borderTop: `${rem(2)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
    borderBottom: `${rem(2)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
    borderRight: `${rem(2)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
    borderLeft: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
    marginLeft: 0,
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
      <Group spacing="-1" position="left">
        <Button
          className={classes.upvote}
          variant="light"
          color="gray"
          leftIcon={<IconThumbUp size={20} />}
        >
          Upvote · <Text ml={3}>{post.views}</Text>
        </Button>
        <Button
          className={classes.downvote}
          variant="light"
          color="gray"
          leftIcon={<IconThumbDown size={20} />}
        ></Button>
      </Group>
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
