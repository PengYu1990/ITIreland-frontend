import { Paper, Image, Text, Anchor, Center, rem } from "@mantine/core";

interface Props {
  src: string;
  link: string;
  top?: string;
}
const Ad = ({ src, link, top = "4rem" }: Props) => {
  return (
    <Anchor
      href={link}
      target="_blank"
      style={{ position: "sticky", top: top }}
    >
      <Paper shadow="s" p={rem(5)}>
        <Image src={src} />
        <Center style={{ marginTop: rem(3) }}>
          <Text size="sm">Advertisement</Text>
        </Center>
      </Paper>
    </Anchor>
  );
};

export default Ad;
