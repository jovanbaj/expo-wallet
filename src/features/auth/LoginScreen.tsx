import { Center, Text } from "native-base";

import { AuthForm } from "./AuthForm";

export const LoginScreen = () => {
  return (
    <Center safeArea flex={1}>
      <Text> Hello world</Text>
      <AuthForm />
    </Center>
  );
};
