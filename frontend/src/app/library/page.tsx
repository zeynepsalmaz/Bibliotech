"use client";
import { useBooks, useDeleteBook } from "@/hooks/useBooks";
import BookCard from "@/components/BookCard";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export interface Book {
  title: string;
  author: string;
  isbn: string;
}

export default function LibraryPage() {
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { data: books, isLoading, isError } = useBooks(searchQuery);
  const deleteBook = useDeleteBook();
  const [selectedIsbn, setSelectedIsbn] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleDelete = (isbn: string) => {
    setSelectedIsbn(isbn);
    setModalOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedIsbn) {
      await deleteBook.mutateAsync(selectedIsbn);
      setModalOpen(false);
      setSelectedIsbn(null);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchQuery(search);
  };

  if (isLoading) return <div>Loading books...</div>;
  if (isError) return <div>Failed to load books.</div>;

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Library</h1>
        <form onSubmit={handleSearchSubmit} className="max-w-xs w-full">
          <Input
            placeholder="Search by ISBN or title..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            aria-label="Search books"
          />
        </form>
      </div>
      {books?.length === 0 ? (
        <p className="text-neutral-500">No books found. Add your first book!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {books.map((book: Book) => (
            <BookCard
              key={book.isbn}
              title={book.title}
              author={book.author}
              isbn={book.isbn}
              onDelete={() => handleDelete(book.isbn)}
            />
          ))}
        </div>
      )}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} ariaLabel="Delete book confirmation">
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-xl font-semibold">Delete Book</h2>
          <p>Are you sure you want to delete this book?</p>
          <div className="flex gap-2 mt-2">
            <button className="px-4 py-2 rounded bg-neutral-200 dark:bg-neutral-800" onClick={() => setModalOpen(false)}>
              Cancel
            </button>
            <button className="px-4 py-2 rounded bg-red-600 text-white" onClick={confirmDelete}>
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </section>
  );
}
