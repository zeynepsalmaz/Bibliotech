import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="mb-6 text-neutral-600 dark:text-neutral-300">Sorry, the page you are looking for does not exist.</p>
      <Link href="/" className="px-4 py-2 rounded bg-neutral-900 text-white hover:bg-neutral-700 transition">Go Home</Link>
    </main>
  );
}
