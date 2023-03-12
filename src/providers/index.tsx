import { NativeBaseProvider } from "native-base";

import { AuthProvider } from "./AuthProvider";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <NativeBaseProvider>
      <AuthProvider>{children}</AuthProvider>
    </NativeBaseProvider>
  );
};
