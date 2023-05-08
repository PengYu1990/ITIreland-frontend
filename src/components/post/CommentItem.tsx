import {
  Avatar,
  Box,
  Button,
  Flex,
  Group,
  Menu,
  Text,
  createStyles,
  rem,
} from "@mantine/core";
import { Comment } from "../../hooks/useComments";
import dayjs from "dayjs";
import { BiCommentDetail } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { getSessionUser } from "../../services/session-service";
import { useContext } from "react";
import { AuthContext } from "../../App";
import create from "../../services/http-service";
import { notifications } from "@mantine/notifications";
import { IconTrash } from "@tabler/icons-react";

interface Props {
  comment: Comment;
  delComment: () => void;
}

const useStyles = createStyles((theme) => ({
  citem: {
    marginTop: rem(20),
    fontSize: rem(14),
    paddingBottom: rem(10),
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },
  content: {
    color: theme.colors.dark[6],
    marginTop: rem(10),
  },
  time: {
    marginTop: rem(15),
    color: theme.colors.gray[6],
  },
}));

const CommentItem = ({ comment, delComment }: Props) => {
  const { classes } = useStyles();
  const user = getSessionUser();
  const loginState = useContext(AuthContext);

  const del = () => {
    console.log(comment.id);
    create(`/api/comments/`)
      .delete(comment)
      .then(() => {
        delComment();
      })
      .catch((error) => {
        notifications.show({
          title: "Notification",
          message: error.response.data.message,
          color: "red",
        });
      });
  };

  return (
    <Flex
      className={classes.citem}
      gap={10}
      justify="flex-start"
      direction="row"
    >
      <Avatar color="cyan" radius="xl" size={30}>
        {comment.user.username.substring(0, 2).toUpperCase()}
      </Avatar>
      <Box w="100%">
        <Text>{comment.user.username}</Text>
        <Text className={classes.content}>{comment.content}</Text>
        <Flex
          className={classes.time}
          gap={10}
          align="center"
          justify="space-between"
          direction="row"
        >
          <Text>{dayjs(comment.utime).fromNow()}</Text>
          <Group>
            {loginState === "yes" && user && (
              <Flex gap={2} justify="flex-start" direction="row" align="center">
                <Button
                  variant="subtle"
                  p={0}
                  ml={0}
                  leftIcon={<BiCommentDetail size={16} />}
                  styles={() => ({
                    leftIcon: {
                      marginRight: 0,
                    },
                  })}
                >
                  Reply
                </Button>
              </Flex>
            )}
            {loginState === "yes" && user && user.id === comment.user.id && (
              <Flex gap={2} justify="flex-start" direction="row" align="center">
                <Menu shadow="md">
                  <Menu.Target>
                    <Button
                      variant="subtle"
                      p={0}
                      ml={0}
                      leftIcon={<AiOutlineDelete size={18} />}
                      styles={() => ({
                        root: {
                          color: "red",
                          fontWeight: "normal",
                        },
                        leftIcon: {
                          marginRight: 0,
                        },
                      })}
                    >
                      Delete
                    </Button>
                  </Menu.Target>

                  <Menu.Dropdown>
                    <Menu.Item
                      color="red"
                      icon={<IconTrash size={14} />}
                      onClick={del}
                    >
                      Delete?
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Flex>
            )}
          </Group>
        </Flex>
      </Box>
    </Flex>
  );
};

export default CommentItem;
