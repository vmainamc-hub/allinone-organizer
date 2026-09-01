import { Link, useRouterState } from "@tanstack/react-router";
import { useStream } from "@/lib/stream-context";
import { useDerivAccount } from "@/lib/deriv/account-context";
import { Wifi, WifiOff, Radio, Pause, Play, Wallet, Crosshair, Brain } from "lucide-react";
import { AlertSoundToggle } from "@/components/app/AlertSoundToggle";

const navItems = [
  { title: "Sentinel", url: "/app/apex", icon: Crosshair },
  { title: "Parity", url: "/app/precision-parity", icon: Brain },
] as const;

export function AppTopBar() {
  const s = useStream();
  const { account, balance, currency, status: derivStatus } = useDerivAccount();
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  return (
    <header className="min-h-14 border-b border-border/40 glass sticky top-0 z-20 flex flex-wrap items-center gap-3 px-4 py-2">
      <Link to="/app/apex" className="flex items-center gap-2 shrink-0 mr-1">
        <div className="w-8 h-8 rounded-md bg-gradient-to-br from-[var(--neon)] to-[var(--accent)] flex items-center justify-center">
          <Crosshair size={16} />
        </div>
        <div className="hidden sm:flex flex-col leading-tight">
          <span className="text-sm font-bold tracking-wide neon-text">PRECISION SENTINEL</span>
          <span className="text-[9px] uppercase tracking-[0.25em] text-muted-foreground">Sentinel · Parity</span>
        </div>
      </Link>

      <nav className="flex items-center gap-1 rounded-lg border border-border/50 bg-secondary/25 p-1" aria-label="Primary">
        {navItems.map((item) => {
          const active = pathname === item.url;
          const Icon = item.icon;
          return (
            <Link
              key={item.url}
              to={item.url}
              className={`h-9 px-3 sm:px-4 rounded-md flex items-center gap-2 text-xs font-semibold transition-colors ${
                active
                  ? "bg-[var(--neon)]/15 text-[var(--neon)] border border-[var(--neon)]/35"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/60 border border-transparent"
              }`}
              activeOptions={{ exact: true }}
            >
              <Icon size={14} />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>

      <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
        {s.status === "live" ? (
          <Wifi size={12} className="text-[var(--bull)] pulse-dot" />
        ) : s.status === "connecting" ? (
          <Radio size={12} className="text-[var(--accent)] pulse-dot" />
        ) : (
          <WifiOff size={12} className="text-[var(--bear)]" />
        )}
        <span className="hidden lg:inline">{s.status.toUpperCase()}</span>
      </div>

      <select
        value={s.symbol}
        onChange={(e) => {
          s.setSymbol(e.target.value);
          s.setRunning(true);
        }}
        className="h-8 px-2 rounded-md bg-secondary/40 border border-border/60 text-[11px] text-foreground focus:outline-none focus:border-[var(--neon)]"
      >
        {s.symbols.map((sym) => (
          <option key={sym.symbol} value={sym.symbol}>{sym.name}</option>
        ))}
      </select>

      <button
        onClick={() => s.setRunning(!s.running)}
        className="h-8 px-3 rounded-md bg-secondary hover:bg-secondary/70 border border-border/60 text-xs flex items-center gap-1.5"
      >
        {s.running ? <><Pause size={12} /> Pause</> : <><Play size={12} /> Resume</>}
      </button>

      <div className="ml-auto flex items-center gap-3">
        <AlertSoundToggle />
        {account ? (
          <Link
            to="/app/apex"
            className="hidden xl:flex items-center gap-2 h-8 px-3 rounded-md border border-border/60 bg-secondary/30 text-[11px] hover:border-[var(--neon)]/60"
          >
            <Wallet size={12} className={derivStatus === "open" ? "text-[var(--bull)]" : "text-muted-foreground"} />
            <span className="tabular text-foreground">{balance !== null ? balance.toFixed(2) : "—"} {currency ?? ""}</span>
            <span className="text-muted-foreground">· {account.loginid}</span>
            {account.is_virtual && <span className="text-[9px] text-[var(--accent)] uppercase tracking-widest">Demo</span>}
          </Link>
        ) : (
          <Link to="/app/apex" className="h-8 px-3 rounded-md bg-[var(--neon)]/15 border border-[var(--neon)]/40 text-[var(--neon)] text-[11px] flex items-center gap-1.5 hover:bg-[var(--neon)]/25">
            <Wallet size={12} /> Connect Deriv
          </Link>
        )}
        <div className="text-[10px] uppercase tracking-widest text-muted-foreground hidden md:block">{s.ticks.length} ticks</div>
      </div>
    </header>
  );
}
