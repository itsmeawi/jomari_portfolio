"use client";

import { useEffect, useState } from "react";

export function SystemClock() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format time in Manila / UTC+8
      const formatted = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Manila",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(now);
      setTime(`${formatted} UTC+8`);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center gap-2 font-mono text-[11px] tracking-wider text-zinc-400">
      <span className="text-zinc-600">SYS_TIME:</span>
      <span className="text-zinc-300 tabular-nums">{time || "--:--:-- UTC+8"}</span>
    </div>
  );
}
