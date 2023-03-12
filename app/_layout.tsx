import { Providers } from "../src/providers";
import { Slot } from "expo-router";

export default function Root() {
  return (
    <Providers>
      <Slot />
    </Providers>
  );
}
