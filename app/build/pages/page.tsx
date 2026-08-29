"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PagesStep() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/build/personalize");
  }, [router]);

  return null;
}
