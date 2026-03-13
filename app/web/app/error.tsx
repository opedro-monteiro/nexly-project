"use client";

import { useEffect, useRef } from "react";

interface ErrorProps {
  readonly error: Error & { digest?: string };
  readonly reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const cols = Math.floor(canvas.width / 14);
    const drops: number[] = new Array(cols).fill(1);
    const chars = "01アイウエオカキクケコ∑∆Ω∞≠≤≥".split("");

    let animId: number;

    const draw = () => {
      ctx.fillStyle = "rgba(9, 9, 11, 0.06)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "rgba(245, 158, 11, 0.15)";
      ctx.font = "12px 'Courier New', monospace";

      drops.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * 14, y * 14);
        if (y * 14 > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  const isConnectionError =
    error.message?.toLowerCase().includes("connection") ||
    error.message?.toLowerCase().includes("fetch") ||
    error.message?.toLowerCase().includes("network") ||
    error.message?.toLowerCase().includes("apierror") ||
    error.message?.toLowerCase().includes("refused");

  return (
    <div className="relative min-h-screen bg-[#09090b] overflow-hidden flex items-center justify-center">
      {/* Matrix rain background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-60"
      />

      {/* Radial glow */}
      <div className="absolute inset-0 bg-radial-[circle_at_50%_50%] from-amber-950/30 via-transparent to-transparent" />

      {/* Scanlines overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-lg mx-auto px-6">
        {/* Terminal window */}
        <div className="border border-amber-500/20 bg-zinc-950/80 backdrop-blur-sm rounded-lg overflow-hidden shadow-[0_0_80px_rgba(245,158,11,0.08)]">
          {/* Title bar */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-amber-500/10 bg-zinc-900/60">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-zinc-700" />
              <span className="w-3 h-3 rounded-full bg-zinc-700" />
              <span className="w-3 h-3 rounded-full bg-zinc-700" />
            </div>
            <span
              className="ml-2 text-xs text-zinc-500 font-mono tracking-widest uppercase"
              style={{ fontFamily: "'Courier New', monospace" }}
            >
              nexly — sistema
            </span>
            <div className="ml-auto flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span
                className="text-xs text-red-400/80 font-mono"
                style={{ fontFamily: "'Courier New', monospace" }}
              >
                OFFLINE
              </span>
            </div>
          </div>

          {/* Body */}
          <div className="p-8">
            {/* Error code */}
            <div className="mb-6">
              <div
                className="text-[80px] font-bold leading-none text-amber-500/10 select-none"
                style={{ fontFamily: "'Courier New', monospace" }}
              >
                ERR
              </div>
              <div className="mt-[-24px] relative">
                <span
                  className="text-sm font-mono text-amber-400/60 tracking-[0.3em] uppercase"
                  style={{ fontFamily: "'Courier New', monospace" }}
                >
                  {isConnectionError
                    ? "conexão recusada"
                    : "exceção inesperada"}
                </span>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-amber-500/30 via-amber-500/10 to-transparent mb-6" />

            {/* Message */}
            <div className="space-y-1 mb-6">
              <p className="text-zinc-200 text-base font-medium leading-relaxed">
                {isConnectionError
                  ? "Não foi possível conectar ao servidor."
                  : "Ocorreu um erro inesperado na aplicação."}
              </p>
              <p className="text-zinc-500 text-sm leading-relaxed">
                {isConnectionError
                  ? "O backend não está respondendo. Verifique se o servidor está em execução e tente novamente."
                  : "Algo deu errado ao carregar esta página. Tente recarregar ou volte mais tarde."}
              </p>
            </div>

            {/* Error detail */}
            {error.message && (
              <div
                className="mb-6 rounded border border-zinc-800 bg-zinc-900/60 px-4 py-3"
                style={{ fontFamily: "'Courier New', monospace" }}
              >
                <p className="text-xs text-zinc-600 uppercase tracking-widest mb-1.5">
                  Detalhe
                </p>
                <p className="text-xs text-amber-400/70 leading-relaxed break-all">
                  {error.message.length > 120
                    ? error.message.slice(0, 120) + "…"
                    : error.message}
                </p>
                {error.digest && (
                  <p className="text-xs text-zinc-600 mt-1.5">
                    digest: {error.digest}
                  </p>
                )}
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3">
              <a
                href="/dashboard"
                className="flex-1 group relative overflow-hidden rounded border border-amber-500/30 bg-amber-500/5 px-4 py-2.5 text-sm font-medium text-amber-400 transition-all duration-200 hover:bg-amber-500/10 hover:border-amber-500/50 hover:text-amber-300 active:scale-[0.98]"
                style={{ fontFamily: "'Courier New', monospace" }}
              >
                <span className="relative z-10 tracking-wide">
                  ↺ Tentar novamente
                </span>
              </a>
              <button
                onClick={() => (globalThis.location.href = "/")}
                className="rounded border border-zinc-700/50 bg-zinc-800/40 px-4 py-2.5 text-sm font-medium text-zinc-400 transition-all duration-200 hover:bg-zinc-800/70 hover:text-zinc-300 active:scale-[0.98]"
                style={{ fontFamily: "'Courier New', monospace" }}
              >
                Início
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="px-8 py-3 border-t border-zinc-800/60 bg-zinc-900/30 flex justify-between items-center">
            <span
              className="text-xs text-zinc-700 font-mono"
              style={{ fontFamily: "'Courier New', monospace" }}
            >
              nexly © {new Date().getFullYear()}
            </span>
            <span
              className="text-xs text-zinc-700 font-mono animate-pulse"
              style={{ fontFamily: "'Courier New', monospace" }}
            >
              aguardando conexão_
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
