import type { Metadata } from "next";
import { AboutScreen } from "@/components/about-screen";

export const metadata: Metadata = { title: "Spawn" };

export default function About() {
  return (
    <>
      <noscript>
        <p style={{ padding: "2rem", color: "#ccc" }}>
          A campfire. A well. A painting that does not want to be a painting. Enable JavaScript
          or you are only looking at the dirt.
        </p>
      </noscript>
      <AboutScreen />
    </>
  );
}
