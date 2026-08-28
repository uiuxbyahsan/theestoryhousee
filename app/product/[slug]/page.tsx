import { notFound } from "next/navigation";
import { BUNDLES, SCENTS, bundleById, scentById } from "@/lib/data";
import { ProductView } from "@/components/ProductView";

export function generateStaticParams() {
  const bundleParams = BUNDLES.map((b) => ({ slug: b.id }));
  const scentParams = SCENTS.map((s) => ({ slug: s.id }));
  return [...bundleParams, ...scentParams];
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const scent = scentById(params.slug);
  if (scent) {
    return { title: `${scent.name} — 80ml Eau de Parfum & Photobook | The Story House` };
  }
  const bundle = bundleById(params.slug);
  return { title: `${bundle?.name ?? "Product"} | The Story House` };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const scent = scentById(params.slug);
  const bundle = bundleById(params.slug);
  if (!bundle && !scent) notFound();
  return <ProductView slug={params.slug} />;
}

