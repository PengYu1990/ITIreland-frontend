import { Group, Button, TextInput, PasswordInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { User } from "../../services/user-service";
import { useAuth } from "../context/AuthContext";

const RegisterForm = () => {
  const form = useForm({
    initialValues: {
      email: "",
      username: "",
      password: "",
      password2: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      username: (value) =>
        value.length < 6 ? "Username must have at least 6 letters" : null,
      password: (value) => (value.length < 1 ? "Password can't be null" : null),
      password2: (value, values) =>
        value !== values.password ? "Passwords did not match" : null,
    },
  });

  const { signup } = useAuth();

  return (
    <form onSubmit={form.onSubmit((values) => signup(values as User))}>
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

      <PasswordInput
        placeholder="Password"
        label="Password"
        {...form.getInputProps("password")}
        withAsterisk
      />
      <PasswordInput
        placeholder="Password"
        label="Password"
        {...form.getInputProps("password2")}
        withAsterisk
      />
      <TextInput
        withAsterisk
        label="Email"
        placeholder="your@email.com"
        type="email"
        {...form.getInputProps("email")}
      />

      {/* <Checkbox
        mt="md"
        label="I agree to sell my privacy"
        {...form.getInputProps("termsOfService", { type: "checkbox" })}
      /> */}

      <Group position="left" mt="md">
        <Button type="submit">Sign Up</Button>
      </Group>
    </form>
  );
};

export default RegisterForm;
