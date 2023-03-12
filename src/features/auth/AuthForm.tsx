import { useState } from "react";
import {
  FormControl,
  Input,
  VStack,
  WarningOutlineIcon,
  Pressable,
  Icon,
  Button,
  useToast,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

import { saveItem } from "../../lib/expo-secure-store";
import { ToastAlert } from "../../ui/ToastAlert";
import { useAuth } from "../../providers/AuthProvider";

const errorToastId = "error-saving-key";

export const AuthForm = () => {
  const { addUser } = useAuth();
  const [show, setShow] = useState(false);
  const [password, setPassword] = useState("");
  const [formValid, setFormValid] = useState(true);

  const toast = useToast();

  const validatePassword = (password: string) => {
    // FIXME add real validation
    if (password.length < 6) {
      return false;
    }
    return true;
  };

  const submitPassword = async () => {
    setFormValid(validatePassword(password));
    if (validatePassword(password)) {
      console.log("submitting password");
      const result = await saveItem("current-user", "testing-values");
      if (result === "success") {
        addUser("testing-values");
      } else {
        if (!toast.isActive(errorToastId)) {
          toast.show({
            id: errorToastId,
            render: ({ id }) => {
              return (
                <ToastAlert
                  title="Could not save your key"
                  variant="subtle"
                  status="error"
                  description="Please try again"
                  isClosable={true}
                  onClose={() => toast.close(id)}
                />
              );
            },
          });
        }
      }
    }
  };

  return (
    <FormControl isInvalid={!formValid} isRequired px={"6"}>
      <VStack space={"10"}>
        <VStack>
          <FormControl.Label>Password</FormControl.Label>
          <Input
            type="password"
            placeholder="Your 12 word mnemonic"
            secureTextEntry={show}
            value={password}
            onBlur={() => setFormValid(validatePassword(password))}
            onSubmitEditing={() => {
              submitPassword();
            }}
            onChangeText={(value) => setPassword(value)}
            InputRightElement={
              <Pressable onPress={() => setShow(!show)}>
                <Icon
                  as={
                    <MaterialIcons
                      name={show ? "visibility" : "visibility-off"}
                    />
                  }
                  size={5}
                  mr="2"
                  color="muted.400"
                />
              </Pressable>
            }
          />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            Atleast 6 characters are required.
          </FormControl.ErrorMessage>
        </VStack>
        <Button
          opacity={password.trim() === "" ? 0.7 : 1}
          disabled={password.trim() === ""}
          onPress={() => submitPassword()}
        >
          Get your key
        </Button>
      </VStack>
    </FormControl>
  );
};
