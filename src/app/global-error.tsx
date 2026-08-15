"use client";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body className="grid min-h-screen place-items-center bg-[#071b45] p-6 font-sans text-white">
        <main className="max-w-md rounded-3xl border border-white/15 bg-white/5 p-8 text-center shadow-2xl">
          <p className="text-xs font-bold tracking-[.16em] text-[#11c9bd]">FINNIKK</p>
          <h1 className="mt-3 text-2xl font-semibold">Something needs a refresh.</h1>
          <p className="mt-3 text-sm leading-6 text-white/75">Please try loading this page again. Your finance and HRM data has not been changed.</p>
          <button onClick={reset} className="mt-6 rounded-xl bg-white px-5 py-3 font-semibold text-[#071b45]">Try again</button>
        </main>
      </body>
    </html>
  );
}
