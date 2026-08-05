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

const REGISTRATION_URL =
  "https://drive.google.com/file/d/1gd-JxgU0-hwIeDjnHAlJTXbOTsecAu-Y/view?usp=sharing";

/**
  Retorna o timestamp da data alvo do torneio no fuso horário de Itumbiara-GO (UTC-3 / Horário de Brasília).
  Encerramento: 11 de Setembro às 18h30.
*/
function getItumbiaraTargetTimestamp(): number {
  const now = new Date();
  let year = now.getFullYear();

  let target = new Date(`${year}-09-11T18:30:00-03:00`).getTime();

  if (target < now.getTime()) {
    year += 1;
    target = new Date(`${year}-09-11T18:30:00-03:00`).getTime();
  }

  return target;
}

function calculateTimeLeft(): TimeLeft {
  const targetTime = getItumbiaraTargetTimestamp();
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

export default function StickyTopBanner() {
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
    setTimeLeft(calculateTimeLeft());

    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  const formatNumber = (num: number) => String(num).padStart(2, "0");

  return (
    <div className="sticky top-0 z-50 w-full bg-[#0d0d1a]/95 backdrop-blur-xl border-b border-[#f26419]/40 shadow-[0_8px_25px_rgba(0,0,0,0.85)]">
      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 py-2 flex items-center justify-between gap-2 text-white">
        
        {/* Esquerda: Alerta Pulsante */}
        <div className="flex items-center gap-2 min-w-0">
          <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f26419] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#f26419]"></span>
          </span>
          
          <p className="text-[11px] sm:text-sm font-semibold tracking-tight whitespace-nowrap">
            <span className="text-[#f26419] uppercase font-bold">4º Torneio:</span>{" "}
            <span className="hidden md:inline text-gray-200">
              Inscrições e a chance de concorrer a mais de R$ 70.000 em prêmios se encerram em:
            </span>
            <span className="md:hidden text-gray-200">Encerra em:</span>
          </p>
        </div>

        {/* Direita: Cronômetro Mini + Botão Direto sem Quebra no Mobile */}
        <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
          {/* Cronômetro Compacto */}
          <div className="flex items-center gap-1 font-mono tabular-nums text-[11px] sm:text-sm font-bold bg-[#17172c] px-2 sm:px-3 py-1 rounded-full border border-white/10 shadow-inner">
            <span className="text-white">{formatNumber(timeLeft.days)}<span className="text-[9px] sm:text-[10px] text-gray-400 font-normal">d</span></span>
            <span className="text-gray-500">:</span>
            <span className="text-[#f26419]">{formatNumber(timeLeft.hours)}<span className="text-[9px] sm:text-[10px] text-[#f26419]/70 font-normal">h</span></span>
            <span className="text-gray-500">:</span>
            <span className="text-white">{formatNumber(timeLeft.minutes)}<span className="text-[9px] sm:text-[10px] text-gray-400 font-normal">m</span></span>
            <span className="text-gray-500">:</span>
            <span className="text-[#f26419] animate-pulse">{formatNumber(timeLeft.seconds)}<span className="text-[9px] sm:text-[10px] text-[#f26419]/70 font-normal">s</span></span>
          </div>

          {/* CTA Botão Direto */}
          <Link
            href={REGISTRATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 sm:px-5 py-1.5 rounded-full bg-gradient-to-r from-[#f26419] to-[#ff7d3b] hover:from-[#ff7d3b] hover:to-[#f26419] text-white font-extrabold text-[11px] sm:text-sm shadow-[0_0_12px_rgba(242,100,25,0.5)] hover:scale-105 active:scale-95 transition-all duration-300 flex-shrink-0 whitespace-nowrap"
          >
            <span>Inscreva-se</span>
            <span className="hidden sm:inline-block">🏆</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
