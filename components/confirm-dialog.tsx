"use client";

import { Button } from "@/components/ui";
import { AlertTriangle, X } from "lucide-react";
import { useEffect, type ReactNode } from "react";

type ConfirmDialogProps = {
  open: boolean;
  title: string;
  description: ReactNode;
  children?: ReactNode;
  confirmLabel?: string;
  confirmDisabled?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmDialog({ open, title, description, children, confirmLabel = "Delete", confirmDisabled = false, onConfirm, onCancel }: ConfirmDialogProps) {
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") onCancel(); };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open, onCancel]);

  if (!open) return null;

  return <div className="fixed inset-0 z-[80] bg-ink/45 p-0 sm:grid sm:place-items-center sm:p-5" role="presentation"><button aria-label="Close confirmation dialog" className="absolute inset-0 cursor-default" onClick={onCancel}/><section role="dialog" aria-modal="true" aria-labelledby="confirm-dialog-title" className="relative z-10 flex max-h-[100dvh] w-full max-w-lg flex-col overflow-hidden bg-paper shadow-2xl sm:max-h-[90dvh] sm:rounded-2xl"><header className="flex shrink-0 items-start justify-between border-b border-line px-5 py-5 sm:px-7 sm:py-6"><div className="flex gap-3"><span className="grid size-10 shrink-0 place-items-center rounded-xl bg-red-50 text-red-700"><AlertTriangle size={19}/></span><div><p className="eyebrow text-red-700">Destructive action</p><h2 id="confirm-dialog-title" className="mt-1 font-serif text-3xl">{title}</h2></div></div><button type="button" onClick={onCancel} aria-label="Close confirmation dialog" className="grid size-10 shrink-0 place-items-center rounded-xl border border-line transition hover:border-ink"><X size={18}/></button></header><div className="min-h-0 flex-1 overflow-y-auto px-5 py-6 sm:px-7"><div className="text-sm leading-6 text-ink/65">{description}</div>{children && <div className="mt-5">{children}</div>}</div><footer className="flex shrink-0 flex-col-reverse gap-3 border-t border-line bg-paper px-5 py-4 sm:flex-row sm:justify-end sm:px-7"><Button type="button" variant="outline" onClick={onCancel}>Cancel</Button><Button type="button" onClick={onConfirm} disabled={confirmDisabled} className="bg-red-700 text-paper hover:bg-red-800 focus:ring-red-700">{confirmLabel}</Button></footer></section></div>;
}
