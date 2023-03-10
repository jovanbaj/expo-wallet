import { NativeBaseProvider } from "native-base";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return <NativeBaseProvider>{children}</NativeBaseProvider>;
};
