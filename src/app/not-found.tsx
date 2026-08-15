import Link from "next/link";

export default function NotFound() {
  return <main className="grid min-h-screen place-items-center bg-[#071b45] p-6 text-white"><section className="max-w-md text-center"><p className="text-xs font-bold tracking-[.16em] text-[#11c9bd]">FINNIKK</p><h1 className="mt-3 text-4xl font-semibold">Page not found</h1><p className="mt-4 leading-7 text-white/75">The requested page is not available. You can return to the FinniKK home page or open the Finance product.</p><div className="mt-7 flex justify-center gap-3"><Link href="/" className="rounded-xl bg-white px-5 py-3 font-semibold text-[#071b45]">Home</Link><Link href="/finance" className="rounded-xl border border-white/20 px-5 py-3 font-semibold">Finance</Link></div></section></main>;
}
