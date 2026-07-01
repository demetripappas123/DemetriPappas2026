export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 px-6 py-8 sm:px-8 dark:border-zinc-800">
      <div className="mx-auto w-full max-w-5xl">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          © {new Date().getFullYear()} Demetri Pappas. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
