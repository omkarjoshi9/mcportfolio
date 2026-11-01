import type { Metadata } from "next";
import { AboutScreen } from "@/components/about-screen";

export const metadata: Metadata = { title: "About" };

export default function About() {
  return <AboutScreen />;
}
