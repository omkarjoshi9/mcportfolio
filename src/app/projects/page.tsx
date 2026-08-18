import type { Metadata } from "next";
import { ServerList } from "@/components/server-list";

export const metadata: Metadata = { title: "Projects" };

export default function Projects() {
  return <ServerList />;
}
