import type { Metadata } from "next";
import { OptionsScreen } from "@/components/options-screen";

export const metadata: Metadata = { title: "Options" };

export default function Options() {
  return <OptionsScreen />;
}
