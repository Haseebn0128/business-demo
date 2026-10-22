"use client";

import { categories as seedCategories } from "@/data/config";
import { seedBookings } from "@/data/bookings";
import { seedInquiries, seedProducts } from "@/data/catalogue";
import type { Booking, BookingStatus, Category, Inquiry, InquiryStatus, Product } from "@/types";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

type DemoStore = {
  products: Product[];
  inquiries: Inquiry[];
  bookings: Booking[];
  categories: Category[];
  hydrated: boolean;
  saveProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  addCategory: (name: string) => boolean;
  renameCategory: (currentName: string, nextName: string) => boolean;
  deleteCategory: (name: string, replacement?: string) => boolean;
  addInquiry: (inquiry: Omit<Inquiry, "id" | "createdAt" | "status">) => void;
  setInquiryStatus: (id: string, status: InquiryStatus) => void;
  addBooking: (booking: Omit<Booking, "id" | "createdAt" | "status">) => void;
  setBookingStatus: (id: string, status: BookingStatus) => void;
  resetDemo: () => void;
};

const Context = createContext<DemoStore | undefined>(undefined);
const storageKey = "oak-form-demo-v1";
const defaultCategories = [...seedCategories];

type LegacyProduct = Omit<Product, "dimensions"> & { dimensions: Product["dimensions"] | string };

function normalizeProducts(items: unknown): Product[] {
  if (!Array.isArray(items)) return seedProducts;
  return items.flatMap((item) => {
    if (!item || typeof item !== "object") return [];
    const product = item as LegacyProduct;
    if (typeof product.dimensions === "string") {
      const values = product.dimensions.match(/\d+(?:\.\d+)?/g)?.map(Number) ?? [];
      return [{ ...product, dimensions: { width: values[0] ?? 180, depth: values[1] ?? 80, height: values[2] ?? 75, unit: "cm" } }];
    }
    return [product as Product];
  });
}

function normalizeCategories(items: unknown, products: Product[]): Category[] {
  const saved = Array.isArray(items) ? items.filter((item): item is string => typeof item === "string" && Boolean(item.trim())).map((item) => item.trim()) : defaultCategories;
  return [...new Set([...saved, ...products.map((product) => product.category)])];
}

export function DemoStoreProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(seedProducts);
  const [inquiries, setInquiries] = useState<Inquiry[]>(seedInquiries);
  const [bookings, setBookings] = useState<Booking[]>(seedBookings);
  const [categories, setCategories] = useState<Category[]>(defaultCategories);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const saved = window.localStorage.getItem(storageKey);
      if (saved) {
        try {
          const data = JSON.parse(saved) as { products?: unknown; inquiries?: Inquiry[]; bookings?: Booking[]; categories?: unknown };
          const storedProducts = data.products ? normalizeProducts(data.products) : seedProducts;
          setProducts(storedProducts);
          setCategories(normalizeCategories(data.categories, storedProducts));
          if (data.inquiries) setInquiries(data.inquiries);
          if (data.bookings) setBookings(data.bookings);
        } catch { window.localStorage.removeItem(storageKey); }
      }
      setHydrated(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem(storageKey, JSON.stringify({ products, inquiries, bookings, categories }));
  }, [products, inquiries, bookings, categories, hydrated]);

  const value = useMemo<DemoStore>(() => ({
    products, inquiries, bookings, categories, hydrated,
    saveProduct: (product) => setProducts((items) => items.some((item) => item.id === product.id) ? items.map((item) => item.id === product.id ? product : item) : [product, ...items]),
    deleteProduct: (id) => setProducts((items) => items.filter((item) => item.id !== id)),
    addCategory: (name) => {
      const next = name.trim();
      if (!next || categories.some((category) => category.toLocaleLowerCase() === next.toLocaleLowerCase())) return false;
      setCategories((items) => [...items, next]);
      return true;
    },
    renameCategory: (currentName, nextName) => {
      const next = nextName.trim();
      if (!next || (next.toLocaleLowerCase() !== currentName.toLocaleLowerCase() && categories.some((category) => category.toLocaleLowerCase() === next.toLocaleLowerCase()))) return false;
      setCategories((items) => items.map((category) => category === currentName ? next : category));
      setProducts((items) => items.map((product) => product.category === currentName ? { ...product, category: next } : product));
      return true;
    },
    deleteCategory: (name, replacement) => {
      const affected = products.filter((product) => product.category === name);
      if (affected.length && (!replacement || replacement === name || !categories.includes(replacement))) return false;
      setCategories((items) => items.filter((category) => category !== name));
      if (replacement) setProducts((items) => items.map((product) => product.category === name ? { ...product, category: replacement } : product));
      return true;
    },
    addInquiry: (inquiry) => setInquiries((items) => [{ ...inquiry, id: `i-${Date.now()}`, status: "New", createdAt: "Just now" }, ...items]),
    setInquiryStatus: (id, status) => setInquiries((items) => items.map((item) => item.id === id ? { ...item, status } : item)),
    addBooking: (booking) => setBookings((items) => [{ ...booking, id: `b-${Date.now()}`, status: "Requested", createdAt: "Just now" }, ...items]),
    setBookingStatus: (id, status) => setBookings((items) => items.map((item) => item.id === id ? { ...item, status } : item)),
    resetDemo: () => { setProducts(seedProducts); setInquiries(seedInquiries); setBookings(seedBookings); setCategories(defaultCategories); window.localStorage.removeItem(storageKey); },
  }), [products, inquiries, bookings, categories, hydrated]);
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useDemoStore() {
  const context = useContext(Context);
  if (!context) throw new Error("useDemoStore must be used inside DemoStoreProvider");
  return context;
}
