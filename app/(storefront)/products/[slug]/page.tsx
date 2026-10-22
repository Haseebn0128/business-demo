import { LegacyProductDetailRoute } from "@/components/storefront";
import { seedProducts } from "@/data/catalogue";
import { Suspense } from "react";
export function generateStaticParams() { return seedProducts.map((product) => ({ slug: product.slug })); }
export default function ProductPage() { return <Suspense fallback={<main className="shell py-14"><p className="text-sm text-ink/55">Loading the selected piece…</p></main>}><LegacyProductDetailRoute /></Suspense>; }
