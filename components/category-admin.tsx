"use client";

import { ConfirmDialog } from "@/components/confirm-dialog";
import { useDemoStore } from "@/components/demo-store";
import { Button, Input } from "@/components/ui";
import { Box, Pencil, Plus, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";

type EditorState = { type: "create" } | { type: "rename"; category: string } | null;

export function CategoryAdmin() {
  const { categories, products, addCategory, renameCategory, deleteCategory } = useDemoStore();
  const [editor, setEditor] = useState<EditorState>(null);
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);
  const [replacement, setReplacement] = useState("");

  const openDelete = (category: string) => {
    setReplacement(categories.find((item) => item !== category) ?? "");
    setCategoryToDelete(category);
  };
  const affectedProducts = products.filter((product) => product.category === categoryToDelete);
  const replacementOptions = categories.filter((category) => category !== categoryToDelete);
  const needsReplacement = affectedProducts.length > 0;

  return <div className="max-w-6xl"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="eyebrow">Catalogue structure</p><h1 className="mt-2 font-serif text-4xl">Categories</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-ink/60">Create, rename and organise the collections shown in the product editor and public catalogue filters.</p></div><Button onClick={() => setEditor({ type: "create" })}><Plus size={16}/> Add category</Button></div><div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{categories.map((category) => { const count = products.filter((product) => product.category === category).length; return <article className="rounded-2xl border border-line bg-paper p-5" key={category}><div className="flex items-center justify-between"><Box size={19} className="text-walnut"/><span className="text-xs text-ink/45">{count} {count === 1 ? "piece" : "pieces"}</span></div><h2 className="mt-7 font-serif text-2xl">{category}</h2><p className="mt-2 text-sm leading-6 text-ink/60">Shown in the public category navigation and product filters.</p><div className="mt-6 flex gap-2"><button onClick={() => setEditor({ type: "rename", category })} className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-line px-3 text-xs font-bold transition hover:border-ink"><Pencil size={14}/> Rename</button><button onClick={() => openDelete(category)} className="inline-flex min-h-10 items-center gap-2 rounded-lg px-3 text-xs font-bold text-red-700 transition hover:bg-red-50"><Trash2 size={14}/> Delete</button></div></article>; })}</div>{!categories.length && <div className="mt-8 rounded-2xl border border-dashed border-line bg-paper px-6 py-14 text-center"><p className="font-serif text-2xl">No categories yet</p><p className="mt-2 text-sm text-ink/60">Create a category before adding products to the catalogue.</p><Button className="mt-5" onClick={() => setEditor({ type: "create" })}><Plus size={16}/> Add category</Button></div>}
    <CategoryEditorDialog editor={editor} onClose={() => setEditor(null)} onSave={(name) => editor?.type === "create" ? addCategory(name) : editor ? renameCategory(editor.category, name) : false}/>
    <ConfirmDialog open={Boolean(categoryToDelete)} title="Delete category?" description={needsReplacement ? <>Deleting <strong className="text-ink">{categoryToDelete}</strong> will move its assigned pieces to another category.</> : <>Delete <strong className="text-ink">{categoryToDelete}</strong> from this browser-local demo? It has no assigned pieces.</>} confirmLabel="Delete category" confirmDisabled={needsReplacement && !replacement} onCancel={() => setCategoryToDelete(null)} onConfirm={() => { if (categoryToDelete && deleteCategory(categoryToDelete, replacement)) setCategoryToDelete(null); }}>{needsReplacement && (replacementOptions.length ? <label className="block text-sm font-semibold">Move {affectedProducts.length} {affectedProducts.length === 1 ? "piece" : "pieces"} to<select value={replacement} onChange={(event) => setReplacement(event.target.value)} className="mt-2 min-h-12 w-full rounded-xl border border-line bg-paper px-4 text-sm outline-none focus:border-walnut">{replacementOptions.map((category) => <option key={category}>{category}</option>)}</select></label> : <p className="rounded-xl bg-sand p-3 text-sm leading-6 text-ink/65">Create another category before deleting this one, so its {affectedProducts.length === 1 ? "piece" : "pieces"} can be reassigned safely.</p>)}</ConfirmDialog>
  </div>;
}

function CategoryEditorDialog({ editor, onClose, onSave }: { editor: EditorState; onClose: () => void; onSave: (name: string) => boolean }) {
  if (!editor) return null;
  return <CategoryEditorForm key={editor.type === "rename" ? editor.category : "create"} editor={editor} onClose={onClose} onSave={onSave}/>;
}

function CategoryEditorForm({ editor, onClose, onSave }: { editor: Exclude<EditorState, null>; onClose: () => void; onSave: (name: string) => boolean }) {
  const [name, setName] = useState(editor.type === "rename" ? editor.category : "");
  const [error, setError] = useState("");

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener("keydown", closeOnEscape); };
  }, [editor, onClose]);

  const isCreate = editor.type === "create";
  return <div className="fixed inset-0 z-[70] bg-ink/45 p-0 sm:grid sm:place-items-center sm:p-5" role="presentation"><button aria-label="Close category editor" className="absolute inset-0 cursor-default" onClick={onClose}/><form onSubmit={(event) => { event.preventDefault(); if (onSave(name)) onClose(); else setError("Enter a unique category name."); }} role="dialog" aria-modal="true" aria-labelledby="category-editor-title" className="relative z-10 flex max-h-[100dvh] w-full max-w-lg flex-col overflow-hidden bg-paper shadow-2xl sm:max-h-[90dvh] sm:rounded-2xl"><header className="flex shrink-0 items-start justify-between border-b border-line px-5 py-5 sm:px-7 sm:py-6"><div><p className="eyebrow">Catalogue structure</p><h2 id="category-editor-title" className="mt-1 font-serif text-3xl">{isCreate ? "Add a category" : "Rename category"}</h2></div><button type="button" onClick={onClose} aria-label="Close category editor" className="grid size-10 shrink-0 place-items-center rounded-xl border border-line transition hover:border-ink"><X size={18}/></button></header><div className="min-h-0 flex-1 overflow-y-auto px-5 py-6 sm:px-7"><label className="block text-sm font-semibold">Category name<Input value={name} onChange={(event) => setName(event.target.value)} autoFocus required className="mt-2" placeholder="e.g. Console Tables"/></label>{error && <p role="alert" className="mt-4 text-sm font-semibold text-red-700">{error}</p>}</div><footer className="flex shrink-0 flex-col-reverse gap-3 border-t border-line bg-paper px-5 py-4 sm:flex-row sm:justify-end sm:px-7"><Button type="button" variant="outline" onClick={onClose}>Cancel</Button><Button type="submit">{isCreate ? "Add category" : "Save name"}</Button></footer></form></div>;
}
