import { PROFILE } from "@/lib/content/profile";

/** Single source of truth for the copy that appears in more than one place. */
export const SITE = {
  firstName: "OMKAR",
  lastName: "JOSHI",
  fullName: PROFILE.fullName,
  tagline: "Agentic AI · Developer",
  description:
    "Portfolio of Omkar Joshi — agentic AI systems and Gen AI projects, built as a blocky sandbox interface.",
  email: PROFILE.email,
  github: PROFILE.github,
  linkedin: PROFILE.linkedin,
  location: PROFILE.location,
  version: "v1.0.0",
  framework: "Next.js 16",
  /**
   * Wording required by Mojang's usage guidelines for anything that borrows the
   * look of the game. See docs/01-licensing.md.
   */
  disclaimer:
    "NOT AN OFFICIAL MINECRAFT PRODUCT. NOT APPROVED BY OR ASSOCIATED WITH MOJANG OR MICROSOFT.",
} as const;
