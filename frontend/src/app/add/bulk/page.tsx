"use client";
import { useState } from "react";
import { useAddBooksBulk, useDeleteBooksBulk } from "@/hooks/useBooksBulk";

export default function BulkBookOpsPage() {
  const [isbns, setIsbns] = useState("");
  const [result, setResult] = useState("");
  const addBulk = useAddBooksBulk();
  const deleteBulk = useDeleteBooksBulk();

  const handleBulk = async (type: "add" | "delete") => {
    setResult("");
    const isbnArr = isbns
      .split(/[\s,;]+/)
      .map(s => s.trim())
      .filter(Boolean);
    if (!isbnArr.length) {
      setResult("Please enter at least one ISBN.");
      return;
    }
    try {
      if (type === "add") {
        const res = await addBulk.mutateAsync(isbnArr);
        if (Array.isArray(res)) {
          setResult(`${res.length} books added!`);
        } else if (res.added && res.already_exists) {
          setResult(`${res.added.length} books added. Already existing: ${res.already_exists.join(", ")}`);
        } else {
          setResult("Operation completed.");
        }
      } else {
        const res = await deleteBulk.mutateAsync(isbnArr);
        setResult(res.message || "Books deleted!");
      }
      setIsbns("");
    } catch (err) {
      if (typeof err === "object" && err && "response" in err) {
        setResult((err as { response?: { data?: { detail?: string } } })?.response?.data?.detail || "Operation failed.");
      } else {
        setResult("Operation failed.");
      }
    }
  };

  return (
    <section className="max-w-lg mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Bulk Add/Delete Books</h1>
      <textarea
        className="w-full p-2 border rounded mb-2 min-h-[80px]"
        placeholder="Enter multiple ISBNs, one per line or separated by comma"
        value={isbns}
        onChange={e => setIsbns(e.target.value)}
        aria-label="ISBN list"
      />
      <div className="flex gap-2 mb-2">
        <button
          className="px-4 py-2 rounded bg-neutral-900 text-white font-semibold hover:bg-neutral-700 transition"
          onClick={() => handleBulk("add")}
          disabled={addBulk.isPending}
        >
          {addBulk.isPending ? "Adding..." : "Bulk Add"}
        </button>
        <button
          className="px-4 py-2 rounded bg-red-600 text-white font-semibold hover:bg-red-700 transition"
          onClick={() => handleBulk("delete")}
          disabled={deleteBulk.isPending}
        >
          {deleteBulk.isPending ? "Deleting..." : "Bulk Delete"}
        </button>
      </div>
      {result && <div className="mt-2 text-center text-sm text-blue-700 dark:text-blue-300">{result}</div>}
    </section>
  );
}
