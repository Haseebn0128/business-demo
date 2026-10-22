import type { Metadata } from "next";
import "./globals.css";
import { DemoStoreProvider } from "@/components/demo-store";
export const metadata: Metadata = { title: "Oak & Form — Digital Showroom Demo", description: "A fictional premium furniture showroom demonstration for Oak & Form." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body><DemoStoreProvider>{children}</DemoStoreProvider></body></html>; }
