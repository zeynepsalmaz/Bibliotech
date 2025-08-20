"use client";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState, useRef } from "react";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (pathname === "/library") {
      const params = new URLSearchParams(searchParams.toString());
      if (search) {
        params.set("query", search);
      } else {
        params.delete("query");
      }
      router.push(`/library?${params.toString()}`);
    } else {
      router.push(`/library?query=${encodeURIComponent(search)}`);
    }
    // Focus input after navigation
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  return (
    <nav className="w-full flex items-center justify-between py-4 px-6 bg-white dark:bg-neutral-900 shadow-sm sticky top-0 z-50">
      <div className="flex items-center gap-8">
        <Link href="/" className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">Bibliotech</Link>
      </div>
      <div className="flex items-center gap-8">
        <form onSubmit={handleSearch} className="">
          <Input
            ref={inputRef}
            type="text"
            placeholder="Search books..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-48"
            aria-label="Search books"
          />
        </form>
        <Link href="/library" className="hover:underline underline-offset-4">Library</Link>
        <Link href="/add" className="hover:underline underline-offset-4">Add Book</Link>
        <Link href="/add/bulk" className="hover:underline underline-offset-4">Bulk Add/Delete</Link>
      </div>
    </nav>
  );
}
