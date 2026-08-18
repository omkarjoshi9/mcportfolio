import type { Metadata } from "next";
import { ContactScreen } from "@/components/contact-screen";

export const metadata: Metadata = { title: "Contact" };

export default function Contact() {
  return <ContactScreen />;
}
