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
    setTimeLeft(calculateTimeLeft(TARGET_DATE));

    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft(TARGET_DATE));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  const formatNumber = (num: number) => String(num).padStart(2, "0");

  return (
    <div className="sticky top-0 z-50 w-full bg-[#0d0d1a]/95 backdrop-blur-xl border-b border-[#f26419]/40 shadow-[0_10px_30px_rgba(0,0,0,0.85)]">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex flex-wrap lg:flex-nowrap items-center justify-between gap-3 text-white">
        
        {/* Esquerda: Badge Pulsante + Texto de Alerta */}
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="relative flex h-3 w-3 flex-shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f26419] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#f26419]"></span>
          </span>
          
          <p className="text-xs sm:text-sm font-semibold truncate tracking-tight">
            <span className="text-[#f26419] uppercase font-bold">4º Torneio Bom de Pesca:</span>{" "}
            <span className="hidden md:inline text-gray-200">
              Inscrições e a chance de concorrer a mais de R$ 70.000 em prêmios se encerram em:
            </span>
            <span className="md:hidden text-gray-200">Encerra em:</span>
          </p>
        </div>

        {/* Centro/Direita: Dígitos Numéricos e CTA */}
        <div className="flex items-center justify-between w-full lg:w-auto gap-3 sm:gap-4 flex-shrink-0">
          {/* Cronômetro Compacto */}
          <div className="flex items-center gap-1 sm:gap-1.5 font-mono tabular-nums text-xs sm:text-sm font-bold bg-[#17172c] px-3 py-1.5 rounded-full border border-white/10 shadow-inner">
            <span className="text-white">{formatNumber(timeLeft.days)}<span className="text-[10px] text-gray-400 font-normal">d</span></span>
            <span className="text-gray-500">:</span>
            <span className="text-[#f26419]">{formatNumber(timeLeft.hours)}<span className="text-[10px] text-[#f26419]/70 font-normal">h</span></span>
            <span className="text-gray-500">:</span>
            <span className="text-white">{formatNumber(timeLeft.minutes)}<span className="text-[10px] text-gray-400 font-normal">m</span></span>
            <span className="text-gray-500">:</span>
            <span className="text-[#f26419] animate-pulse">{formatNumber(timeLeft.seconds)}<span className="text-[10px] text-[#f26419]/70 font-normal">s</span></span>
          </div>

          {/* CTA Botão Direto */}
          <Link
            href={REGISTRATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-[#f26419] to-[#ff7d3b] hover:from-[#ff7d3b] hover:to-[#f26419] text-white font-extrabold text-xs sm:text-sm shadow-[0_0_15px_rgba(242,100,25,0.5)] hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <span>Inscreva-se Já</span>
            <span className="hidden sm:inline-block">🏆</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
