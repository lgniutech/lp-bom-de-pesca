import Image from "next/image";

export default function SwimmingFishLayer() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
    >
      {/* 1. TUCUNARÉ REALISTA 1 (Topo Absoluto - Logo / Header) — Visível no segundo zero */}
      <div className="absolute top-[6%] sm:top-[8%] -right-40 w-52 sm:w-80 opacity-90 blur-[0.1px] animate-swim-left">
        <Image
          src="/images/peixe-tucunare-1.png"
          alt=""
          width={320}
          height={320}
          className="w-full h-auto object-contain filter drop-shadow-[0_15px_30px_rgba(242,100,25,0.5)]"
          priority
        />
      </div>

      {/* 2. TUCUNARÉ REALISTA 2 (Meio-Topo do Hero) — Visível logo abaixo do cabeçalho */}
      <div className="absolute top-[28%] sm:top-[30%] -left-40 w-48 sm:w-72 opacity-90 blur-[0.1px] animate-swim-right">
        <Image
          src="/images/peixe-tucunare-2.png"
          alt=""
          width={300}
          height={300}
          className="w-full h-auto object-contain filter drop-shadow-[0_15px_30px_rgba(255,183,3,0.5)]"
        />
      </div>

      {/* 3. TUCUNARÉ REALISTA EM PROFUNDIDADE (Centro do Site) — Nadando para a esquerda */}
      <div className="absolute top-[58%] sm:top-[60%] -right-48 w-64 sm:w-96 opacity-50 blur-[1.5px] animate-swim-left-slow">
        <Image
          src="/images/peixe-tucunare-1.png"
          alt=""
          width={380}
          height={380}
          className="w-full h-auto object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.8)]"
        />
      </div>

      {/* 4. BOLHAS SUBAQUÁTICAS FLUTUANTES */}
      <div className="absolute left-[15%] bottom-0 w-3 h-3 rounded-full bg-white/30 blur-[0.5px] animate-bubble-1" />
      <div className="absolute left-[45%] bottom-0 w-4.5 h-4.5 rounded-full bg-[#ffb703]/35 blur-[0.5px] animate-bubble-2" />
      <div className="absolute left-[80%] bottom-0 w-3 h-3 rounded-full bg-[#f26419]/40 blur-[0.5px] animate-bubble-3" />
    </div>
  );
}
