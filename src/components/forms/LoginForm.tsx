import { Group, Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { User } from "../../services/user-service";

interface Props {
  login: (values: User) => void;
}

const LoginForm = ({ login }: Props) => {
  const form = useForm({
    initialValues: {
      username: "",
      password: "",
    },

    validate: {
      username: (value) =>
        value.length < 6 ? "Username must have at least 6 letters" : null,
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => login(values as User))}>
      <TextInput
        withAsterisk
        label="Username"
        placeholder=""
        {...form.getInputProps("username")}
      />
      <TextInput
        withAsterisk
        label="Password"
        placeholder=""
        type="password"
        {...form.getInputProps("password")}
      />
      <Group position="left" mt="md">
        <Button type="submit">Log In</Button>
      </Group>
    </form>
  );
};

export default LoginForm;
