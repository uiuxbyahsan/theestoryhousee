"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function BuildIndexRedirect() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const theme = searchParams.get("theme");
    const template = searchParams.get("template");
    const query = new URLSearchParams();
    if (theme) query.set("theme", theme);
    if (template) query.set("template", template);
    const queryString = query.toString() ? `?${query.toString()}` : "";
    router.replace(`/build/photos${queryString}`);
  }, [router, searchParams]);

  return (
    <div className="flex items-center justify-center py-20 font-serif text-lg text-[#3D1117]">
      <div className="text-center space-y-3">
        <div className="w-8 h-8 border-2 border-[#3D1117] border-t-transparent rounded-full animate-spin mx-auto" />
        <p>Loading Photo Curation Studio...</p>
      </div>
    </div>
  );
}

export default function BuildPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-20 font-serif text-lg text-[#3D1117]">
          Loading...
        </div>
      }
    >
      <BuildIndexRedirect />
    </Suspense>
  );
}
