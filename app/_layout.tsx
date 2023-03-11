import { Providers } from "../src/providers";
import { Stack } from "expo-router";

export default function Root() {
  return (
    <Providers>
      <Stack />
    </Providers>
  );
}
