export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background">
      <div className="w-[min(78vw,360px)] text-center">
        <div className="finnikk-loader-word" aria-label="FinniKK loading">finni<span>kk</span></div>
        <p className="mt-3 text-[10px] font-medium uppercase tracking-[.34em] text-muted-foreground sm:text-xs">Scaling Possibilities</p>
        <div className="finnikk-loader-track mt-7"><div className="finnikk-loader-bar" /></div>
      </div>
    </div>
  );
}
