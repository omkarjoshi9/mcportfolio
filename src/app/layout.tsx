import type { Metadata } from "next";
import localFont from "next/font/local";
import { Panorama } from "@/components/panorama";
import { SettingsHydrator } from "@/components/settings-hydrator";
import {
  BOOT_SESSION_KEY,
  FOV_CONSTANT,
  FOV_DEFAULT,
  STORAGE_KEY,
  bootstrapSettings,
} from "@/lib/settings";
import { SITE } from "@/lib/site";
import "./globals.css";

const monocraft = localFont({
  src: "../../public/fonts/Monocraft.woff2",
  variable: "--font-monocraft",
  display: "swap",
  weight: "400",
});

export const metadata: Metadata = {
  title: {
    default: `${SITE.fullName} — ${SITE.tagline}`,
    template: `%s — ${SITE.fullName}`,
  },
  description: SITE.description,
  openGraph: {
    type: "website",
    siteName: SITE.fullName,
    title: `${SITE.fullName} — ${SITE.tagline}`,
    description: SITE.description,
  },
  twitter: { card: "summary_large_image" },
};

/**
 * Decides before first paint whether the boot screen should run, and applies
 * stored GUI scale / theme / motion / sound so nothing flashes. Shipped via
 * Function.prototype.toString so the storage keys stay a single source of truth.
 */
const BOOTSTRAP = `(${bootstrapSettings})(${JSON.stringify(STORAGE_KEY)},${JSON.stringify(
  BOOT_SESSION_KEY,
)},${FOV_DEFAULT},${FOV_CONSTANT})`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${monocraft.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOTSTRAP }} />
        {/* The boot screen is server-rendered and dismissed by JS; without JS it
            would cover the site forever. */}
        <noscript>
          <style>{`.loading-screen{display:none}`}</style>
        </noscript>
      </head>
      <body className="min-h-full flex flex-col">
        <SettingsHydrator />
        <Panorama />
        {children}
      </body>
    </html>
  );
}
