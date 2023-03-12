import { Button, Center, HStack, useToast, VStack } from "native-base";
import { deleteItem } from "../../lib/expo-secure-store";
import { useAuth } from "../../providers/AuthProvider";
import { ToastAlert } from "../../ui/ToastAlert";

const errorToastId = "error-deleting-key";

export const HomeScreen = () => {
  const { removeUser } = useAuth();
  const toast = useToast();

  const handleLogout = async () => {
    const result = await deleteItem("current-user");
    if (result === "success") {
      removeUser();
    } else {
      if (!toast.isActive(errorToastId)) {
        toast.show({
          id: errorToastId,
          render: ({ id }) => {
            return (
              <ToastAlert
                title="Could not log out"
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
    console.log("logging out");
  };

  return (
    <VStack safeArea padding={"4"} space={"20"}>
      <HStack justifyContent={"flex-end"}>
        <Button
          colorScheme={"secondary"}
          variant="subtle"
          onPress={() => handleLogout()}
        >
          Log out
        </Button>
      </HStack>
      <VStack>
        <Center> Hello world</Center>
      </VStack>
    </VStack>
  );
};
