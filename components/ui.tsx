"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from "react";

export function Button({ children, className = "", variant = "dark", ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "dark" | "light" | "outline"; }) {
  const styles = { dark: "bg-ink text-paper hover:bg-walnut", light: "bg-paper text-ink hover:bg-sand", outline: "border border-line text-ink hover:border-ink" };
  return <button className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-walnut focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${styles[variant]} ${className}`} {...props}>{children}</button>;
}

export function Input({ className = "", ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={`min-h-12 w-full rounded-xl border border-line bg-paper px-4 text-sm outline-none transition placeholder:text-ink/40 focus:border-walnut focus:ring-2 focus:ring-walnut/15 ${className}`} {...props} />;
}

export function SectionHeading({ eyebrow, title, copy, action }: { eyebrow?: string; title: string; copy?: string; action?: ReactNode }) {
  return <div className="mb-8 flex flex-col gap-3 sm:mb-10 sm:flex-row sm:items-end sm:justify-between"><div><p className="eyebrow">{eyebrow}</p><h2 className="mt-2 font-serif text-4xl leading-none text-ink sm:text-5xl">{title}</h2>{copy && <p className="mt-3 max-w-xl text-base leading-7 text-ink/65">{copy}</p>}</div>{action}</div>;
}

export function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 14 }} whileInView={reduced ? {} : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.45, ease: "easeOut" }}>{children}</motion.div>;
}

export function EmptyState({ title, detail }: { title: string; detail: string }) {
  return <div className="rounded-2xl border border-dashed border-line bg-paper px-6 py-14 text-center"><p className="font-serif text-2xl">{title}</p><p className="mx-auto mt-2 max-w-md text-sm leading-6 text-ink/60">{detail}</p></div>;
}
