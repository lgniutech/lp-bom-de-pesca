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
    setTimeLeft(calculateTimeLeft());

    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full max-w-5xl mx-auto rounded-[2.25rem] bg-[#111122] p-6 border border-[#f26419]/30 animate-pulse h-64"></div>
    );
  }

  const formatNumber = (num: number) => String(num).padStart(2, "0");

  return (
    <div className="relative w-full max-w-5xl mx-auto pt-10 sm:pt-14 pb-4 sm:pb-6 group">
      
      {/* 0. BRASÃO OFICIAL DESTACADO FORA E ACIMA DO CARD */}
      <div className="absolute -top-4 sm:-top-8 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
        <div className="relative w-32 sm:w-44 md:w-48 aspect-square flex items-center justify-center p-1 pointer-events-auto">
          <Image
            src="/images/brasao-4-torneio.png"
            alt="Brasão Oficial do 4º Torneio Bom de Pesca"
            width={210}
            height={210}
            priority
            className="object-contain max-h-full transition-transform duration-500 drop-shadow-[0_15px_35px_rgba(0,0,0,0.9)] group-hover:scale-105 group-hover:drop-shadow-[0_20px_45px_rgba(242,100,25,0.65)]"
          />
        </div>
      </div>

      {/* ONDAS DO SONAR DE PESCA */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 sm:w-[500px] sm:h-[500px] rounded-full border-2 border-[#f26419]/30 animate-sonar"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 sm:w-[500px] sm:h-[500px] rounded-full border-2 border-[#ffb703]/20 animate-sonar-delayed"
        aria-hidden="true"
      />

      {/* ENVOLTÓRIO DA MOLDURA EM GRADIENTE DE IMPACTO (DOUBLE-BEZEL) */}
      <div className="relative z-10 p-[2px] sm:p-[3px] rounded-[2rem] sm:rounded-[2.5rem] bg-gradient-to-r from-[#f26419] via-[#ffb703] to-[#f26419] animate-border-glow shadow-[0_20px_60px_rgba(242,100,25,0.35)]">
        
        {/* NÚCLEO EM VIDRO ESCURO COM FLUXO 100% LIMPO E DIRETO */}
        <div className="relative z-10 w-full bg-[#0e0f1d]/95 backdrop-blur-2xl rounded-[1.85rem] sm:rounded-[2.35rem] pt-16 sm:pt-20 pb-6 sm:pb-10 px-5 sm:px-8 md:px-12 border border-white/15 overflow-hidden shadow-[inset_0_2px_4px_rgba(255,255,255,0.2)]">
          
          {/* Efeito de Luz Radial */}
          <div
            className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-80 sm:w-96 h-36 bg-gradient-to-b from-[#f26419]/25 to-transparent blur-2xl"
            aria-hidden="true"
          />

          <div className="relative z-20 flex flex-col gap-6 sm:gap-8 items-center text-center">
            
            {/* 1. BADGE DO TORNEIO (LOGOMARCA DE PRÊMIOS) */}
            <div className="inline-flex items-center justify-center px-4 sm:px-6 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-[#17182c] via-[#242542] to-[#17182c] border border-[#ffb703]/50 shadow-[0_0_20px_rgba(255,183,3,0.2)] relative overflow-hidden max-w-full">
              <div className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-gold-shine pointer-events-none" />
              <span className="text-[10px] sm:text-xs md:text-sm font-black text-[#ffb703] uppercase tracking-wider sm:tracking-[0.15em] text-center leading-tight">
                4º TORNEIO BOM DE PESCA • MAIS DE R$ 70.000 EM PRÊMIOS
              </span>
            </div>

            {/* 2. CABEÇALHO E COPY OFICIAL */}
            <div className="max-w-3xl w-full flex flex-col items-center">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[#f26419] font-extrabold uppercase tracking-wider text-xs sm:text-sm">
                  Ficha de Inscrição Oficial
                </span>
              </div>
              
              {/* Linha Divisora Laranja */}
              <div className="w-16 h-1 bg-[#f26419] rounded-full mb-4"></div>

              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white leading-snug sm:leading-tight tracking-tight">
                As inscrições para o <span className="text-[#f26419] drop-shadow-[0_0_12px_rgba(242,100,25,0.6)]">4º Torneio Bom de Pesca</span> e a sua chance de concorrer a mais de <span className="text-[#ffb703] underline decoration-[#ffb703]/60 underline-offset-4">R$ 70.000 em prêmios</span> se encerram em:
              </h2>
            </div>

            {/* 3. PLACAR ELETRÔNICO 3D (DÍGITOS DO CRONÔMETRO DIRETAMENTE ABAIXO DA COPY) */}
            <div className="w-full max-w-3xl mx-auto my-1">
              <div
                className="grid grid-cols-4 gap-1.5 sm:gap-4 md:gap-6 p-2.5 sm:p-5 rounded-2xl sm:rounded-3xl bg-[#090912]/90 border border-white/15 shadow-[inset_0_4px_20px_rgba(0,0,0,0.8)]"
                aria-label="Contador Regressivo Oficial"
              >
                {/* Dias */}
                <div className="flex flex-col items-center justify-center p-2 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-b from-[#1c1d36] to-[#121324] border border-white/10 overflow-hidden">
                  <span className="text-2xl sm:text-5xl md:text-6xl font-black text-white font-mono tabular-nums tracking-wider drop-shadow-md">
                    {formatNumber(timeLeft.days)}
                  </span>
                  <span className="text-[9px] sm:text-xs font-bold text-gray-400 uppercase tracking-normal sm:tracking-[0.2em] mt-1 truncate w-full text-center">
                    Dias
                  </span>
                </div>

                {/* Horas */}
                <div className="flex flex-col items-center justify-center p-2 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-b from-[#1c1d36] to-[#121324] border border-[#f26419]/40 shadow-[0_0_15px_rgba(242,100,25,0.15)] overflow-hidden">
                  <span className="text-2xl sm:text-5xl md:text-6xl font-black text-[#f26419] font-mono tabular-nums tracking-wider drop-shadow-[0_0_12px_rgba(242,100,25,0.6)]">
                    {formatNumber(timeLeft.hours)}
                  </span>
                  <span className="text-[9px] sm:text-xs font-bold text-[#f26419] uppercase tracking-normal sm:tracking-[0.2em] mt-1 truncate w-full text-center">
                    Horas
                  </span>
                </div>

                {/* Minutos */}
                <div className="flex flex-col items-center justify-center p-2 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-b from-[#1c1d36] to-[#121324] border border-white/10 overflow-hidden">
                  <span className="text-2xl sm:text-5xl md:text-6xl font-black text-white font-mono tabular-nums tracking-wider drop-shadow-md">
                    {formatNumber(timeLeft.minutes)}
                  </span>
                  <span className="text-[9px] sm:text-xs font-bold text-gray-400 uppercase tracking-normal sm:tracking-[0.2em] mt-1 truncate w-full text-center">
                    <span className="hidden sm:inline">Minutos</span>
                    <span className="sm:hidden">Min</span>
                  </span>
                </div>

                {/* Segundos */}
                <div className="flex flex-col items-center justify-center p-2 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-b from-[#2e1710] to-[#1a0e0a] border border-[#f26419] shadow-[0_0_20px_rgba(242,100,25,0.4)] overflow-hidden">
                  <span className="text-2xl sm:text-5xl md:text-6xl font-black text-[#f26419] font-mono tabular-nums tracking-wider animate-pulse drop-shadow-[0_0_15px_rgba(242,100,25,0.8)]">
                    {formatNumber(timeLeft.seconds)}
                  </span>
                  <span className="text-[9px] sm:text-xs font-bold text-[#ffb703] uppercase tracking-normal sm:tracking-[0.2em] mt-1 truncate w-full text-center">
                    <span className="hidden sm:inline">Segundos</span>
                    <span className="sm:hidden">Seg</span>
                  </span>
                </div>
              </div>
            </div>

            {/* 4. BOTÃO CTA UNIFICADO */}
            <div className="flex flex-col items-center gap-3 w-full sm:w-auto mx-auto mt-1">
              <Link
                href={REGISTRATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group/cta relative inline-flex items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto px-6 sm:px-10 py-4 sm:py-5 rounded-full bg-gradient-to-r from-[#f26419] via-[#ff7d3b] to-[#f26419] text-white font-black text-sm sm:text-lg uppercase tracking-wider shadow-[0_12px_35px_rgba(242,100,25,0.5)] hover:shadow-[0_18px_45px_rgba(242,100,25,0.75)] hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 border border-white/20"
                aria-label="Acessar Ficha de Inscrição Oficial do 4º Torneio Bom de Pesca"
              >
                <span>Fazer Minha Inscrição Agora</span>
                <span className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-white/25 flex items-center justify-center group-hover/cta:translate-x-1.5 transition-transform duration-300 shadow flex-shrink-0">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-current text-white" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>

              <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 text-[11px] sm:text-xs text-gray-300 font-medium mt-1">
                <span className="flex items-center gap-1">
                  <span className="text-[#25D366]">✓</span> Inscrição Oficial
                </span>
                <span className="flex items-center gap-1">
                  <span className="text-[#25D366]">✓</span> Vagas Limitadas
                </span>
                <span className="flex items-center gap-1">
                  <span className="text-[#25D366]">✓</span> Regulamento Disponível
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
