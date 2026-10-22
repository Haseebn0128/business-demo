import { Footer, PublicHeader } from "@/components/storefront";

/** Public-facing frame only. The admin route owns its separate application layout. */
export default function StorefrontLayout({ children }: { children: React.ReactNode }) {
  return <><PublicHeader />{children}<Footer /></>;
}
