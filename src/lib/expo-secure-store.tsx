import * as SecureStore from "expo-secure-store";

export const saveItem = async (
  key: string,
  value: string,
  options?: SecureStore.SecureStoreOptions
) => {
  try {
    // throw new Error("Not implemented");
    await SecureStore.setItemAsync(key, value, options);
    return "success";
  } catch (_error) {
    console.log("Error saving a key");
    return "failure";
  }
};

export const getItem = async (key: string): Promise<string | null> => {
  try {
    let result = await SecureStore.getItemAsync(key);
    if (result != null) {
      return result;
    }
    return null;
  } catch (_error) {
    console.log("Error getting a key");
    return null;
  }
};

export const deleteItem = async (key: string) => {
  try {
    // throw new Error("Not implemented");
    await SecureStore.deleteItemAsync(key);
    return "success";
  } catch (_error) {
    console.log("Error deleting a key");
    return "failure";
  }
};
