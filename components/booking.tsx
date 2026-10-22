"use client";

import { useDemoStore } from "@/components/demo-store";
import { Button, Input } from "@/components/ui";
import type { BookingIntent, Product } from "@/types";
import { CalendarDays, CheckCircle2, ShieldCheck, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const intents: BookingIntent[] = ["Showroom visit", "Hold if available", "Custom order consultation"];
const timeSlots = ["11:00 AM – 12:00 PM", "2:00 PM – 3:00 PM", "4:00 PM – 5:00 PM", "6:00 PM – 7:00 PM"];

export function ProductBooking({ product }: { product: Product }) {
  const { addBooking } = useDemoStore();
  const [open, setOpen] = useState(false);
  const [completed, setCompleted] = useState(false);
  const closeButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    window.setTimeout(() => closeButton.current?.focus(), 0);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  const submitBooking = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    addBooking({
      customerName: String(data.get("name")),
      phone: String(data.get("phone")),
      email: String(data.get("email")),
      productName: product.name,
      intent: String(data.get("intent")) as BookingIntent,
      preferredDate: String(data.get("date")),
      preferredTime: String(data.get("time")),
      notes: String(data.get("notes")),
    });
    setOpen(false);
    setCompleted(true);
  };

  return <section className="mt-8 rounded-2xl bg-sand p-5 sm:p-6">
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"><div><p className="text-sm font-bold">Interested in this piece?</p><p className="mt-1 max-w-lg text-sm leading-6 text-ink/60">Request a visit, ask the showroom to hold it if available, or arrange a custom-order consultation.</p></div><CalendarDays className="shrink-0 text-walnut" size={22}/></div>
    {completed ? <div role="status" className="mt-5 rounded-xl border border-moss/30 bg-paper/75 p-4"><div className="flex gap-3"><CheckCircle2 className="mt-0.5 shrink-0 text-moss" size={21}/><div><p className="text-sm font-bold">Your demo booking request is saved.</p><p className="mt-1 text-sm leading-6 text-ink/65">A real showroom would review availability before confirming anything. This request is visible only in this browser’s demo dashboard.</p></div></div></div> : <Button className="mt-5 w-full sm:w-auto" onClick={() => setOpen(true)}>Book interest in this piece</Button>}

    {open && <div className="fixed inset-0 z-[70] bg-ink/45 p-0 sm:grid sm:place-items-center sm:p-5" role="presentation"><button aria-label="Close booking dialog" className="absolute inset-0 cursor-default" onClick={() => setOpen(false)}/><form onSubmit={submitBooking} role="dialog" aria-modal="true" aria-labelledby="booking-dialog-title" className="relative z-10 flex max-h-[100dvh] w-full max-w-2xl flex-col overflow-hidden bg-paper shadow-2xl sm:max-h-[90dvh] sm:rounded-2xl"><header className="flex shrink-0 items-start justify-between border-b border-line px-5 py-5 sm:px-7 sm:py-6"><div><p className="eyebrow">Book a showroom conversation</p><h2 id="booking-dialog-title" className="mt-1 font-serif text-3xl">{product.name}</h2><p className="mt-2 text-sm text-ink/60">Choose the kind of help and a preferred time.</p></div><button ref={closeButton} type="button" onClick={() => setOpen(false)} aria-label="Close booking dialog" className="grid size-10 shrink-0 place-items-center rounded-xl border border-line transition hover:border-ink"><X size={18}/></button></header><div className="min-h-0 flex-1 overflow-y-auto px-5 py-6 sm:px-7"><div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold">Name<Input name="name" required className="mt-2" placeholder="Your name"/></label><label className="text-sm font-semibold">Phone<Input name="phone" required className="mt-2" placeholder="03xx xxx xxxx"/></label><label className="text-sm font-semibold">Booking type<select name="intent" className="mt-2 min-h-12 w-full rounded-xl border border-line bg-paper px-4 text-sm outline-none focus:border-walnut">{intents.map((intent) => <option key={intent}>{intent}</option>)}</select></label><label className="text-sm font-semibold">Preferred date<Input name="date" type="date" required className="mt-2"/></label><label className="text-sm font-semibold">Preferred time<select name="time" className="mt-2 min-h-12 w-full rounded-xl border border-line bg-paper px-4 text-sm outline-none focus:border-walnut">{timeSlots.map((slot) => <option key={slot}>{slot}</option>)}</select></label><label className="text-sm font-semibold">Email <span className="font-normal text-ink/45">(optional)</span><Input name="email" type="email" className="mt-2" placeholder="you@example.com"/></label><label className="text-sm font-semibold sm:col-span-2">Notes <span className="font-normal text-ink/45">(optional)</span><textarea name="notes" rows={4} className="mt-2 w-full rounded-xl border border-line bg-paper px-4 py-3 text-sm outline-none focus:border-walnut" placeholder="Colours, room dimensions, or anything the showroom should know."/></label></div><p className="mt-6 flex items-start gap-2 rounded-xl bg-sand p-3 text-xs leading-5 text-ink/60"><ShieldCheck className="mt-0.5 shrink-0 text-moss" size={16}/>Pending showroom confirmation — this is not a purchase or guaranteed reservation.</p></div><footer className="flex shrink-0 flex-col-reverse gap-3 border-t border-line bg-paper px-5 py-4 sm:flex-row sm:justify-end sm:px-7"><Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button><Button type="submit">Request booking</Button></footer></form></div>}
  </section>;
}
