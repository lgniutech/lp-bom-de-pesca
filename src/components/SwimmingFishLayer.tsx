"use client";

import { useEffect, useState } from "react";

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
      {/* 1. PEIXE TUCUNARÉ MAIOR - NAVEGANDO DA DIREITA PARA A ESQUERDA NO TOPO */}
      <div className="absolute top-[18%] -right-32 w-48 sm:w-64 opacity-35 blur-[0.5px] animate-swim-left">
        <svg
          viewBox="0 0 200 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto filter drop-shadow-[0_10px_15px_rgba(242,100,25,0.4)]"
        >
          {/* Corpo do Peixe Esportivo (Tucunaré) */}
          <path
            d="M170 40C140 15 90 10 50 25C30 32 15 40 0 40C15 40 30 48 50 55C90 70 140 65 170 40Z"
            fill="url(#fishGrad1)"
          />
          {/* Nadadeira Dorsal */}
          <path
            d="M110 16C90 0 60 5 45 22C70 18 95 16 110 16Z"
            fill="#f26419"
            opacity="0.8"
          />
          {/* Nadadeira Caudal */}
          <path
            d="M165 40L195 15C190 32 190 48 195 65L165 40Z"
            fill="#ffb703"
            opacity="0.9"
          />
          {/* Listras de Tucunaré */}
          <path d="M70 24L65 56M95 18L90 62M120 20L115 60" stroke="#151528" strokeWidth="4" strokeLinecap="round" opacity="0.4" />
          {/* Olho do Peixe */}
          <circle cx="35" cy="35" r="4" fill="#ffb703" />
          <circle cx="34" cy="34" r="1.5" fill="#000" />
          
          <defs>
            <linearGradient id="fishGrad1" x1="0" y1="40" x2="200" y2="40" gradientUnits="userSpaceOnUse">
              <stop stopColor="#ffb703" />
              <stop offset="0.5" stopColor="#f26419" />
              <stop offset="1" stopColor="#151528" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* 2. PEIXE DOURADO MÉDIO - NAVEGANDO DA ESQUERDA PARA A DIREITA NO MEIO */}
      <div className="absolute top-[48%] -left-32 w-36 sm:w-48 opacity-40 blur-[0.3px] animate-swim-right">
        <svg
          viewBox="0 0 200 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto filter drop-shadow-[0_8px_12px_rgba(255,183,3,0.5)]"
        >
          <path
            d="M170 40C140 18 90 12 50 25C30 32 15 40 0 40C15 40 30 48 50 55C90 68 140 62 170 40Z"
            fill="url(#fishGrad2)"
          />
          <path
            d="M120 15C100 2 70 8 55 24C80 18 105 16 120 15Z"
            fill="#ffb703"
          />
          <path
            d="M165 40L195 18C190 32 190 48 195 62L165 40Z"
            fill="#f26419"
          />
          <circle cx="32" cy="34" r="3.5" fill="#fff" />
          <circle cx="31" cy="33" r="1.5" fill="#000" />

          <defs>
            <linearGradient id="fishGrad2" x1="0" y1="40" x2="200" y2="40" gradientUnits="userSpaceOnUse">
              <stop stopColor="#f26419" />
              <stop offset="0.6" stopColor="#ffb703" />
              <stop offset="1" stopColor="#f26419" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* 3. CARDUME PEQUENO SUBMERSO (PROFUNDIDADE COM BLUR) DA DIREITA PARA ESQUERDA NO INFERIOR */}
      <div className="absolute top-[75%] -right-40 w-52 sm:w-72 opacity-25 blur-[1.5px] animate-swim-left-slow">
        <svg viewBox="0 0 240 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          {/* Peixe 1 */}
          <path d="M120 30C100 15 65 10 35 20C20 25 10 30 0 30C10 30 20 35 35 40C65 50 100 45 120 30Z" fill="#f26419" />
          <path d="M115 30L140 15C135 25 135 35 140 45L115 30Z" fill="#ffb703" />
          
          {/* Peixe 2 (deslocado) */}
          <path d="M200 60C180 48 150 44 125 52C112 56 104 60 95 60C104 60 112 64 125 68C150 76 180 72 200 60Z" fill="#ffb703" opacity="0.8" />
          <path d="M195 60L218 48C214 56 214 64 218 72L195 60Z" fill="#f26419" opacity="0.8" />
        </svg>
      </div>

      {/* 4. BOLHAS SUBAQUÁTICAS FLUTUANTES (MICRO-INTERAÇÕES) */}
      <div className="absolute left-[15%] bottom-0 w-3 h-3 rounded-full bg-white/20 blur-[0.5px] animate-bubble-1" />
      <div className="absolute left-[45%] bottom-0 w-4 h-4 rounded-full bg-[#ffb703]/25 blur-[0.5px] animate-bubble-2" />
      <div className="absolute left-[80%] bottom-0 w-2.5 h-2.5 rounded-full bg-[#f26419]/30 blur-[0.5px] animate-bubble-3" />
    </div>
  );
}
