"use client";

import { useRef, useState } from "react";
import { BuilderChrome, StepHead } from "@/components/BuilderChrome";
import { useBuilder } from "@/lib/store";
import { MIN_PHOTOS } from "@/lib/data";

export default function PhotosStep() {
  const { photos, addPhotos, removePhoto } = useBuilder();
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  // TEMP (testing): 45-photo minimum relaxed — any 1 photo unlocks Continue.
  // Restore `count >= MIN_PHOTOS` before launch.
  const TEST_MIN = 1;
  const count = photos.length;
  const enough = count >= TEST_MIN;

  function handleFiles(files: FileList | null) {
    if (!files) return;
    const next = Array.from(files)
      .filter((f) => f.type.startsWith("image/"))
      .map((f) => ({
        id: `${f.name}-${f.size}-${Math.random().toString(36).slice(2)}`,
        name: f.name,
        url: URL.createObjectURL(f),
      }));
    addPhotos(next);
  }

  return (
    <BuilderChrome step={1} backHref={null} nextDisabled={!enough}>
      <StepHead
        step={1}
        before="Upload your"
        accent="photos"
        sub={`Choose at least ${MIN_PHOTOS} HD photos to bring your book to life.`}
      />

      {/* Drop zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          handleFiles(e.dataTransfer.files);
        }}
        onClick={() => inputRef.current?.click()}
        className={`flex cursor-pointer flex-col items-center justify-center border-2 border-dashed px-6 py-14 text-center transition-colors ${
          dragging ? "border-black bg-bg-alt" : "border-divider hover:border-black"
        }`}
      >
        <span className="text-4xl" style={{ color: "var(--color-tan-text)" }}>
          ⌾
        </span>
        <p className="mt-3 text-[16px] font-medium">Drag & drop your photos here</p>
        <p className="mt-1 text-[13px] text-text-muted">or click to browse. JPG, PNG or HEIC</p>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          hidden
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {/* Import shortcuts */}
      <div className="mt-4 flex flex-wrap gap-2">
        <span className="self-center text-[13px] text-text-muted">Bring photos from:</span>
        {["Google Photos", "Instagram", "WhatsApp"].map((s) => (
          <button
            key={s}
            onClick={() => inputRef.current?.click()}
            className="rounded-button border border-divider px-3 py-1.5 text-[13px] transition-colors hover:border-black"
          >
            {s}
          </button>
        ))}
      </div>

      {/* Live counter */}
      <div className="mt-6 flex items-center justify-between">
        <span
          className={`inline-flex items-center gap-2 rounded-button px-4 py-2 text-[14px] font-medium ${
            enough ? "bg-tan text-tan-text" : "bg-bg-alt text-black"
          }`}
        >
          {count}/{MIN_PHOTOS} photos uploaded
        </span>
        <span className="text-[14px] text-text-muted">
          {enough ? "You're ready to continue 🎉" : "Add at least 1 photo to continue"}
        </span>
      </div>

      {/* Progress bar */}
      <div className="mt-3 h-1.5 w-full overflow-hidden bg-bg-alt">
        <div
          className="h-full bg-black transition-all"
          style={{ width: `${Math.min(100, (count / MIN_PHOTOS) * 100)}%` }}
        />
      </div>

      {/* Thumbnail grid */}
      {count > 0 && (
        <div className="mt-6 grid grid-cols-3 gap-2 sm:grid-cols-5">
          {photos.map((p) => (
            <div key={p.id} className="group relative aspect-square overflow-hidden border border-divider bg-bg-alt">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.url} alt={p.name} className="h-full w-full object-cover" />
              <button
                onClick={() => removePhoto(p.id)}
                className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center bg-black/70 text-[14px] leading-none text-white opacity-0 transition-opacity group-hover:opacity-100"
                aria-label="Remove photo"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </BuilderChrome>
  );
}
