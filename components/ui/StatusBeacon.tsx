interface StatusBeaconProps {
  label?: string;
  isAvailable?: boolean;
}

export function StatusBeacon({
  label = "Available for work · Q4 2026",
  isAvailable = true,
}: StatusBeaconProps) {
  return (
    <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-950/20 backdrop-blur-md">
      <div className="relative flex h-2 w-2 items-center justify-center">
        {isAvailable && (
          <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 pulse-radar" />
        )}
        <span
          className={`relative inline-flex h-2 w-2 rounded-full ${
            isAvailable ? "bg-emerald-400" : "bg-amber-400"
          }`}
        />
      </div>
      <span className="font-mono text-xs tracking-tight text-emerald-300 font-medium">
        {label}
      </span>
    </div>
  );
}
