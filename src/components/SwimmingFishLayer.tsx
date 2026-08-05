"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function SwimmingFishLayer() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
    >
      {/* 1. TUCUNARÉ REALISTA 1 (Boca para a esquerda) — Nadando para a ESQUERDA (Frente) */}
      <div className="absolute top-[20%] -right-40 w-56 sm:w-80 opacity-60 blur-[0.3px] mix-blend-screen animate-swim-left">
        <Image
          src="/images/peixe-tucunare-1.jpg"
          alt=""
          width={320}
          height={320}
          className="w-full h-auto object-contain filter drop-shadow-[0_15px_25px_rgba(242,100,25,0.4)]"
          priority
        />
      </div>

      {/* 2. TUCUNARÉ REALISTA 2 (Boca para a direita) — Nadando para a DIREITA (Frente) */}
      <div className="absolute top-[52%] -left-40 w-48 sm:w-72 opacity-65 blur-[0.2px] mix-blend-screen animate-swim-right">
        <Image
          src="/images/peixe-tucunare-2.jpg"
          alt=""
          width={300}
          height={300}
          className="w-full h-auto object-contain filter drop-shadow-[0_15px_25px_rgba(255,183,3,0.5)]"
        />
      </div>

      {/* 3. TUCUNARÉ REALISTA EM PROFUNDIDADE (Boca para a esquerda) — Nadando para a ESQUERDA com blur */}
      <div className="absolute top-[78%] -right-48 w-64 sm:w-96 opacity-35 blur-[2px] mix-blend-screen animate-swim-left-slow">
        <Image
          src="/images/peixe-tucunare-1.jpg"
          alt=""
          width={380}
          height={380}
          className="w-full h-auto object-contain filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)]"
        />
      </div>

      {/* 4. BOLHAS SUBAQUÁTICAS FLUTUANTES (MICRO-INTERAÇÕES) */}
      <div className="absolute left-[15%] bottom-0 w-3 h-3 rounded-full bg-white/30 blur-[0.5px] animate-bubble-1" />
      <div className="absolute left-[45%] bottom-0 w-4.5 h-4.5 rounded-full bg-[#ffb703]/35 blur-[0.5px] animate-bubble-2" />
      <div className="absolute left-[80%] bottom-0 w-3 h-3 rounded-full bg-[#f26419]/40 blur-[0.5px] animate-bubble-3" />
    </div>
  );
}
