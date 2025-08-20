
import Link from "next/link";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-8">
      <h1 className="text-5xl font-bold tracking-tight mb-2">Welcome to <span className="text-neutral-900 dark:text-white">Bibliotech</span></h1>
      <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-xl mx-auto mb-6">
        Your personal library, organized. Add, view, and manage your book collection with ease.
      </p>
      <Link href="/library" className="inline-block px-6 py-3 rounded bg-neutral-900 text-white text-lg font-semibold shadow hover:bg-neutral-700 transition" aria-label="Go to Library">
        Go to Library
      </Link>
    </section>
  );
}
