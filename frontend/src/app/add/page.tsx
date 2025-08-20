"use client";
import { useState } from "react";
import { useAddBook } from "@/hooks/useBooks";

export default function AddBookPage() {
  const [isbn, setIsbn] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const addBook = useAddBook();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    try {
      await addBook.mutateAsync(isbn);
      setSuccess("Book added successfully!");
      setIsbn("");
    } catch (err) {
      if (typeof err === "object" && err && "response" in err) {
        setError((err as { response?: { data?: { detail?: string } } })?.response?.data?.detail || "Failed to add book.");
      } else {
        setError("Failed to add book.");
      }
    }
  };

  return (
    <section className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6">Add a Book</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label htmlFor="isbn" className="text-left font-medium">ISBN</label>
        <input
          id="isbn"
          type="text"
          value={isbn}
          onChange={e => setIsbn(e.target.value)}
          className="px-4 py-2 rounded border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-400"
          placeholder="Enter ISBN"
          required
          aria-label="ISBN"
        />
        <button
          type="submit"
          className="px-4 py-2 rounded bg-neutral-900 text-white font-semibold hover:bg-neutral-700 transition"
          disabled={addBook.isPending}
        >
          {addBook.isPending ? "Adding..." : "Add Book"}
        </button>
        {success && <div className="text-green-600">{success}</div>}
        {error && <div className="text-red-600">{error}</div>}
      </form>
    </section>
  );
}
