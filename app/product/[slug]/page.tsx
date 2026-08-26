import { notFound } from "next/navigation";
import { BUNDLES, bundleById } from "@/lib/data";
import { ProductView } from "@/components/ProductView";

export function generateStaticParams() {
  return BUNDLES.map((b) => ({ slug: b.id }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const bundle = bundleById(params.slug);
  return { title: `${bundle?.name ?? "Product"} | The Story House` };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const bundle = bundleById(params.slug);
  if (!bundle) notFound();
  return <ProductView slug={params.slug} />;
}
