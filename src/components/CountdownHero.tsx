"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

const TARGET_DATE = "2025-09-11T18:30:00-03:00";
const REGISTRATION_URL =
  "https://drive.google.com/file/d/1gd-JxgU0-hwIeDjnHAlJTXbOTsecAu-Y/view?usp=sharing";

function calculateTimeLeft(targetIso: string): TimeLeft {
  const targetTime = new Date(targetIso).getTime();
  const now = new Date().getTime();
  const difference = targetTime - now;

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
    isExpired: false,
  };
}

export default function CountdownHero() {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });

  useEffect(() => {
    setMounted(true);
    setTimeLeft(calculateTimeLeft(TARGET_DATE));

    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft(TARGET_DATE));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full max-w-5xl mx-auto rounded-[2.5rem] bg-[#111122] p-8 border border-[#f26419]/30 animate-pulse h-64"></div>
    );
  }

  const formatNumber = (num: number) => String(num).padStart(2, "0");

  return (
    <div className="relative w-full max-w-5xl mx-auto my-6">
      {/* ONDAS DO SONAR DE PESCA (Efeito Radar Radiante no Fundo) */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 sm:w-[500px] sm:h-[500px] rounded-full border-2 border-[#f26419]/30 animate-sonar"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 sm:w-[500px] sm:h-[500px] rounded-full border-2 border-[#ffb703]/20 animate-sonar-delayed"
        aria-hidden="true"
      />

      {/* ENVOLTÓRIO DA MOLDURA EM GRADIENTE DE VANTAGEM (DOUBLE-BEZEL ILUMINADO) */}
      <div className="relative z-10 p-[3px] rounded-[2.5rem] bg-gradient-to-r from-[#f26419] via-[#ffb703] to-[#f26419] animate-border-glow shadow-[0_20px_60px_rgba(242,100,25,0.35)]">
        
        {/* NÚCLEO EM VIDRO ESCURO COM MATERIAIS DE ALTO NÍVEL */}
        <div className="relative z-10 w-full bg-[#0e0f1d]/95 backdrop-blur-2xl rounded-[2.35rem] p-6 sm:p-10 border border-white/15 overflow-hidden shadow-[inset_0_2px_4px_rgba(255,255,255,0.2)]">
          
          {/* Efeitos de Luz Radial Internos */}
          <div
            className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-96 h-40 bg-gradient-to-b from-[#f26419]/25 to-transparent blur-2xl"
            aria-hidden="true"
          />

          <div className="relative z-20 flex flex-col items-center text-center gap-8">
            
            {/* 1. SELO METALIZADO DO TORNEIO (BADGE DE OURO & TROFÉU) */}
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-gradient-to-r from-[#17182c] via-[#242542] to-[#17182c] border border-[#ffb703]/50 shadow-[0_0_20px_rgba(255,183,3,0.2)] relative overflow-hidden group">
              <div className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-gold-shine pointer-events-none" />
              <span className="text-xl sm:text-2xl">🏆</span>
              <span className="text-xs sm:text-sm font-black text-[#ffb703] uppercase tracking-[0.2em] drop-shadow">
                4º TORNEIO BOM DE PESCA • MAIS DE R$ 70.000 EM PRÊMIOS
              </span>
            </div>

            {/* 2. COPY OFICIAL DE IMPACTO */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight max-w-4xl tracking-tight">
              As inscrições para o <span className="text-[#f26419] drop-shadow-[0_0_12px_rgba(242,100,25,0.6)]">4º Torneio Bom de Pesca</span> e a sua chance de concorrer a mais de <span className="text-[#ffb703] underline decoration-[#ffb703]/60 underline-offset-4">R$ 70.000 em prêmios</span> se encerram em:
            </h2>

            {/* 3. PLACAR ELETRÔNICO 3D (PLACAR DE TORNEIO PROFISSIONAL) */}
            <div className="w-full max-w-3xl my-2">
              <div
                className="grid grid-cols-4 gap-2 sm:gap-4 md:gap-6 p-4 sm:p-6 rounded-3xl bg-[#090912]/90 border border-white/15 shadow-[inset_0_4px_20px_rgba(0,0,0,0.8),0_10px_30px_rgba(0,0,0,0.5)]"
                aria-label="Contador Regressivo Oficial"
              >
                {/* Dias */}
                <div className="flex flex-col items-center justify-center p-3 sm:p-5 rounded-2xl bg-gradient-to-b from-[#1c1d36] to-[#121324] border border-white/10 shadow-[0_8px_16px_rgba(0,0,0,0.4)] relative group/tile">
                  <span className="text-3xl sm:text-5xl md:text-6xl font-black text-white font-mono tabular-nums tracking-wider drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
                    {formatNumber(timeLeft.days)}
                  </span>
                  <span className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mt-2">
                    Dias
                  </span>
                </div>

                {/* Horas */}
                <div className="flex flex-col items-center justify-center p-3 sm:p-5 rounded-2xl bg-gradient-to-b from-[#1c1d36] to-[#121324] border border-[#f26419]/40 shadow-[0_8px_16px_rgba(0,0,0,0.4),0_0_15px_rgba(242,100,25,0.15)] relative group/tile">
                  <span className="text-3xl sm:text-5xl md:text-6xl font-black text-[#f26419] font-mono tabular-nums tracking-wider drop-shadow-[0_0_12px_rgba(242,100,25,0.6)]">
                    {formatNumber(timeLeft.hours)}
                  </span>
                  <span className="text-[10px] sm:text-xs font-bold text-[#f26419] uppercase tracking-[0.2em] mt-2">
                    Horas
                  </span>
                </div>

                {/* Minutos */}
                <div className="flex flex-col items-center justify-center p-3 sm:p-5 rounded-2xl bg-gradient-to-b from-[#1c1d36] to-[#121324] border border-white/10 shadow-[0_8px_16px_rgba(0,0,0,0.4)] relative group/tile">
                  <span className="text-3xl sm:text-5xl md:text-6xl font-black text-white font-mono tabular-nums tracking-wider drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
                    {formatNumber(timeLeft.minutes)}
                  </span>
                  <span className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mt-2">
                    Minutos
                  </span>
                </div>

                {/* Segundos */}
                <div className="flex flex-col items-center justify-center p-3 sm:p-5 rounded-2xl bg-gradient-to-b from-[#2e1710] to-[#1a0e0a] border border-[#f26419] shadow-[0_0_25px_rgba(242,100,25,0.4)] relative group/tile">
                  <span className="text-3xl sm:text-5xl md:text-6xl font-black text-[#f26419] font-mono tabular-nums tracking-wider animate-pulse drop-shadow-[0_0_15px_rgba(242,100,25,0.8)]">
                    {formatNumber(timeLeft.seconds)}
                  </span>
                  <span className="text-[10px] sm:text-xs font-bold text-[#ffb703] uppercase tracking-[0.2em] mt-2">
                    Segundos
                  </span>
                </div>
              </div>
            </div>

            {/* 4. BOTÃO CTA DE ALTÍSSIMA CONVERSÃO (BUTTON-IN-BUTTON) */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mt-2">
              <Link
                href={REGISTRATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group/cta relative inline-flex items-center justify-center gap-4 w-full sm:w-auto px-8 py-4 sm:py-5 rounded-full bg-gradient-to-r from-[#f26419] via-[#ff7d3b] to-[#f26419] text-white font-black text-base sm:text-lg uppercase tracking-wider shadow-[0_15px_40px_rgba(242,100,25,0.5)] hover:shadow-[0_20px_50px_rgba(242,100,25,0.75)] hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 border border-white/20"
              >
                <span>Fazer Minha Inscrição Agora</span>
                <span className="w-9 h-9 rounded-full bg-white/25 flex items-center justify-center group-hover/cta:translate-x-1.5 transition-transform duration-300 shadow">
                  <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
            </div>

            <div className="flex items-center gap-6 text-xs text-gray-400 font-medium">
              <span className="flex items-center gap-1.5">
                <span className="text-[#25D366]">✓</span> Inscrição Oficial
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-[#25D366]">✓</span> Vagas Limitadas
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-[#25D366]">✓</span> Regulamento Disponível
              </span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
