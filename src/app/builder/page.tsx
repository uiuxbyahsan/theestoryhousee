"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function BuilderRedirectContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const theme = searchParams.get("theme") || "travel";
    const template = searchParams.get("template") || "tpl-1";
    router.replace(`/build/photos?theme=${theme}&template=${template}`);
  }, [router, searchParams]);

  return (
    <div className="min-h-screen bg-[#FAF6F0] flex items-center justify-center font-serif text-lg text-[#3D1117]">
      <div className="text-center space-y-3">
        <div className="w-8 h-8 border-2 border-[#3D1117] border-t-transparent rounded-full animate-spin mx-auto" />
        <p>Loading Design Order Atelier...</p>
      </div>
    </div>
  );
}

export default function BuilderPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAF6F0] flex items-center justify-center font-serif text-lg text-[#3D1117]">
          Loading...
        </div>
      }
    >
      <BuilderRedirectContent />
    </Suspense>
  );
}
