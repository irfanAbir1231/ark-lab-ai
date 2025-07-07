import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SessionProviderWrapper from "../components/SessionProviderWrapper";
import { StoreProvider } from "../store/provider";
import { Header } from "../components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ArkLab AI Agent Catalog",
  description:
    "Discover and explore advanced AI agents for your business needs. Browse our comprehensive catalog of intelligent automation solutions.",
  keywords:
    "AI agents, automation, artificial intelligence, business solutions, ArkLab",
  authors: [{ name: "ArkLab AI" }],
  openGraph: {
    title: "ArkLab AI Agent Catalog",
    description:
      "Discover and explore advanced AI agents for your business needs.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "ArkLab AI Agent Catalog",
    description:
      "Discover and explore advanced AI agents for your business needs.",
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  ),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-black`}>
        <SessionProviderWrapper>
          <StoreProvider>
            <div className="min-h-screen bg-gray-50">
              <Header />
              <main>{children}</main>
            </div>
          </StoreProvider>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
