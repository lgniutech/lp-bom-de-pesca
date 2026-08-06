"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

interface CountdownTimerProps {
  /** Data no formato ISO. Padrão: 11/09/2025 às 18:30 (-03:00) */
  targetDate?: string;
  /** Link da ficha de inscrição */
  registrationUrl?: string;
}

const DEFAULT_TARGET = "2025-09-11T18:30:00-03:00";
const DEFAULT_REGISTRATION_URL =
  "https://drive.google.com/file/d/11OXo6eztHuum3PrByyAuLLkHUhLh1nDQ/view?usp=sharing";

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

export default function CountdownTimer({
  targetDate = DEFAULT_TARGET,
  registrationUrl = DEFAULT_REGISTRATION_URL,
}: CountdownTimerProps) {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTimeLeft(calculateTimeLeft(targetDate));

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    const handleScroll = () => {
      // Exibe a sticky bar quando o usuário rolar mais de 350px
      if (window.scrollY > 350) {
        setShowSticky(true);
      } else {
        setShowSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearInterval(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [targetDate]);

  if (!mounted) {
    // Esqueleto inicial neutro para evitar trepidação de hidratação (SSR)
    return (
      <div className="w-full max-w-5xl mx-auto bg-[#1a1b2e] rounded-[2rem] p-8 border border-white/10 shadow-2xl animate-pulse">
        <div className="h-8 bg-white/10 rounded w-3/4 mx-auto mb-6"></div>
        <div className="grid grid-cols-4 gap-3 max-w-md mx-auto h-20 bg-white/5 rounded-2xl"></div>
      </div>
    );
  }

  const formatNumber = (num: number) => String(num).padStart(2, "0");

  return (
    <>
      {/* 1. CARD PRINCIPAL (HERO COUNTDOWN) */}
      <div className="relative w-full max-w-5xl mx-auto rounded-[2.25rem] bg-gradient-to-b from-[#f26419]/20 via-[#1a1b2e] to-[#151528] p-1 shadow-[0_20px_50px_rgba(242,100,25,0.15)] ring-1 ring-white/10 group">
        <div className="relative z-10 w-full bg-[#1a1b2e]/90 backdrop-blur-xl rounded-[2rem] p-6 sm:p-8 md:p-10 border border-white/10 overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">
          {/* Efeitos de fundo (Aura luminosa) */}
          <div
            className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 bg-[#f26419]/20 rounded-full blur-3xl group-hover:bg-[#f26419]/30 transition-all duration-700"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-24 -left-24 w-72 h-72 bg-[#151528]/80 rounded-full blur-3xl"
            aria-hidden="true"
          />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Esquerda: Copy + Badge */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f26419]/15 border border-[#f26419]/30 text-[#f26419] font-semibold text-xs uppercase tracking-widest mb-4 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f26419] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#f26419]"></span>
                </span>
                Inscrições Limitadas
              </div>

              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white leading-snug sm:leading-relaxed tracking-tight">
                As inscrições para o <span className="text-[#f26419]">4º Torneio Bom de Pesca</span> e a sua chance de concorrer a mais de <span className="text-[#f26419] underline decoration-[#f26419]/50">R$ 70.000 em prêmios</span> se encerram em:
              </h2>
            </div>

            {/* Direita: Mostrador do Cronômetro + CTA */}
            <div className="flex flex-col items-center gap-6 w-full lg:w-auto">
              {/* Bloco dos Dígitos */}
              <div
                className="grid grid-cols-4 gap-2 sm:gap-3 p-3 sm:p-4 rounded-2xl bg-[#111122]/90 border border-white/10 shadow-inner w-full max-w-sm sm:max-w-md"
                aria-label="Tempo restante para encerramento das inscrições"
              >
                {/* Dias */}
                <div className="flex flex-col items-center justify-center p-2 sm:p-3 rounded-xl bg-gradient-to-b from-white/5 to-white/[0.02] border border-white/5 shadow-md">
                  <span className="text-2xl sm:text-4xl font-black text-white font-mono tabular-nums tracking-wider drop-shadow-md">
                    {formatNumber(timeLeft.days)}
                  </span>
                  <span className="text-[10px] sm:text-xs font-medium text-gray-400 uppercase tracking-widest mt-1">
                    Dias
                  </span>
                </div>

                {/* Horas */}
                <div className="flex flex-col items-center justify-center p-2 sm:p-3 rounded-xl bg-gradient-to-b from-white/5 to-white/[0.02] border border-white/5 shadow-md">
                  <span className="text-2xl sm:text-4xl font-black text-[#f26419] font-mono tabular-nums tracking-wider drop-shadow-md">
                    {formatNumber(timeLeft.hours)}
                  </span>
                  <span className="text-[10px] sm:text-xs font-medium text-gray-400 uppercase tracking-widest mt-1">
                    Horas
                  </span>
                </div>

                {/* Minutos */}
                <div className="flex flex-col items-center justify-center p-2 sm:p-3 rounded-xl bg-gradient-to-b from-white/5 to-white/[0.02] border border-white/5 shadow-md">
                  <span className="text-2xl sm:text-4xl font-black text-white font-mono tabular-nums tracking-wider drop-shadow-md">
                    {formatNumber(timeLeft.minutes)}
                  </span>
                  <span className="text-[10px] sm:text-xs font-medium text-gray-400 uppercase tracking-widest mt-1">
                    Min
                  </span>
                </div>

                {/* Segundos */}
                <div className="flex flex-col items-center justify-center p-2 sm:p-3 rounded-xl bg-gradient-to-b from-[#f26419]/20 to-[#f26419]/5 border border-[#f26419]/30 shadow-md">
                  <span className="text-2xl sm:text-4xl font-black text-[#f26419] font-mono tabular-nums tracking-wider animate-pulse drop-shadow-[0_0_8px_rgba(242,100,25,0.5)]">
                    {formatNumber(timeLeft.seconds)}
                  </span>
                  <span className="text-[10px] sm:text-xs font-semibold text-[#f26419] uppercase tracking-widest mt-1">
                    Seg
                  </span>
                </div>
              </div>

              {/* Botão de Ação Direto */}
              <Link
                href={registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-[#f26419] to-[#ff7d3b] text-white font-bold text-base shadow-[0_10px_25px_rgba(242,100,25,0.4)] hover:shadow-[0_15px_35px_rgba(242,100,25,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
              >
                <span>Garantir Minha Vaga Agora</span>
                <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center group-hover/btn:translate-x-1 transition-transform">
                  <svg
                    className="w-4 h-4 fill-current text-white"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 2. BARRA FLUTUANTE STICKY (Acompanha o Scroll) */}
      <div
        className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-4xl transition-all duration-500 transform ${
          showSticky
            ? "translate-y-0 opacity-100 scale-100"
            : "translate-y-12 opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <div className="bg-[#151528]/90 backdrop-blur-2xl border border-[#f26419]/40 rounded-full px-4 sm:px-6 py-3 shadow-[0_10px_35px_rgba(0,0,0,0.8),0_0_20px_rgba(242,100,25,0.25)] flex items-center justify-between gap-3 sm:gap-6">
          {/* Esquerda: Tag & Título Compacto */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="hidden sm:flex items-center justify-center w-9 h-9 rounded-full bg-[#f26419]/20 border border-[#f26419]/40 text-[#f26419] flex-shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="truncate">
              <span className="hidden md:inline text-xs font-semibold text-gray-300">Inscrições se encerram em:</span>
              <span className="md:hidden text-xs font-bold text-[#f26419]">Encerra em:</span>
            </div>
          </div>

          {/* Centro: Cronômetro Mini */}
          <div className="flex items-center gap-1.5 sm:gap-2 font-mono tabular-nums text-sm sm:text-base font-bold text-white bg-[#111122]/90 px-3 py-1.5 rounded-full border border-white/10 shadow-inner">
            <span className="text-white">{formatNumber(timeLeft.days)}d</span>
            <span className="text-gray-500">:</span>
            <span className="text-[#f26419]">{formatNumber(timeLeft.hours)}h</span>
            <span className="text-gray-500">:</span>
            <span className="text-white">{formatNumber(timeLeft.minutes)}m</span>
            <span className="text-gray-500">:</span>
            <span className="text-[#f26419] animate-pulse">{formatNumber(timeLeft.seconds)}s</span>
          </div>

          {/* Direita: CTA Compacto */}
          <Link
            href={registrationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 px-4 sm:px-6 py-2 rounded-full bg-[#f26419] hover:bg-[#ff7d3b] text-white font-bold text-xs sm:text-sm shadow-md hover:scale-105 active:scale-95 transition-all"
          >
            Inscreva-se
          </Link>
        </div>
      </div>
    </>
  );
}
