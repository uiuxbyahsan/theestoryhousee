"use client";

import { useEffect } from "react";
import { BuilderChrome, StepHead } from "@/components/BuilderChrome";
import { useBuilder } from "@/lib/store";
import { templateById } from "@/lib/data";
import { EMIRATES } from "@/lib/order";

export default function PersonalizeStep() {
  const s = useBuilder();
  const template = s.templateId ? templateById(s.templateId) : null;

  // Pre-fill the title with the chosen cover name (still editable).
  useEffect(() => {
    if (!s.bookTitle && template) s.setField("bookTitle", template.name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const canContinue = s.customerName.trim() !== "" && s.deliveryArea.trim() !== "";

  return (
    <BuilderChrome step={3} backHref="/build/scent" nextDisabled={!canContinue}>
      <StepHead
        step={3}
        before="Personalize your"
        accent="story"
        sub="Make this copy your own."
      />

      <div className="space-y-5">
        <Field label="Book title" hint="Shown on the cover">
          <input
            value={s.bookTitle}
            onChange={(e) => s.setField("bookTitle", e.target.value)}
            placeholder={template?.name ?? "Our Story"}
            className={inputCls}
          />
        </Field>

        <Field label="Dedication / subtitle" hint="Optional">
          <input
            value={s.dedication}
            onChange={(e) => s.setField("dedication", e.target.value)}
            placeholder="for the summer we don't want to forget"
            className={inputCls}
          />
        </Field>

        <Field label="Your name" required>
          <input
            value={s.customerName}
            onChange={(e) => s.setField("customerName", e.target.value)}
            placeholder="Full name"
            className={inputCls}
          />
        </Field>

        <Field label="Delivery area" required>
          <select
            value={s.deliveryArea}
            onChange={(e) => s.setField("deliveryArea", e.target.value)}
            className={`${inputCls} ${s.deliveryArea ? "" : "text-text-muted"}`}
          >
            <option value="">Select your emirate…</option>
            {EMIRATES.map((e) => (
              <option key={e} value={e} className="text-black">
                {e}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Anything else you'd like us to know?" hint="Optional. Special requests, arrangement notes, gift details">
          <textarea
            value={s.extraNote}
            onChange={(e) => s.setField("extraNote", e.target.value)}
            rows={3}
            placeholder="Tell us anything that would help us make this perfect."
            className={`${inputCls} resize-none`}
          />
        </Field>
      </div>

      {!canContinue && (
        <p className="mt-4 text-[13px] text-text-muted">
          Add your name and delivery area to continue.
        </p>
      )}
    </BuilderChrome>
  );
}

const inputCls =
  "w-full rounded-button border border-divider bg-white px-4 py-3 text-[14px] outline-none focus:border-black";

function Field({
  label,
  hint,
  required,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center gap-2 text-[14px] font-medium">
        {label}
        {required && <span className="text-[12px] text-text-muted">Required</span>}
        {hint && !required && <span className="text-[12px] font-normal text-text-muted">{hint}</span>}
      </span>
      {children}
    </label>
  );
}
