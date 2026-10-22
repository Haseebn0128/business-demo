import { ProductDetailRoute } from "@/components/storefront";
import { Suspense } from "react";

export const metadata = { title: "Product — Oak & Form" };

export default function ProductPage() {
  return <Suspense fallback={<main className="shell py-14"><p className="text-sm text-ink/55">Loading the selected piece…</p></main>}><ProductDetailRoute /></Suspense>;
}
