import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Meet AI - Video Calls Made Easy",
  description:
    "Meet AI lets you connect, chat, and collaborate with high-quality video calls. Experience seamless meetings, screen sharing, and real-time chat—just like Google Meet.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

/**
 * Defines the root layout for the application, applying global styles, font configuration, and context providers.
 *
 * Wraps all page content with the Geist font, sets the language to English, and provides TRPC context and global toast notifications.
 *
 * @param children - The content to be rendered within the layout.
 */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body>
        <TRPCReactProvider>
          {children}
          <Toaster />
        </TRPCReactProvider>
      </body>
    </html>
  );
}
