"use client";

import { useState } from "react";
import Header from "@/components/Header";
import CommunityCard from "@/components/CommunityCard";
import ContactCard from "@/components/ContactCard";
import TorneioCards from "@/components/TorneioCards";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import StickyTopBanner from "@/components/StickyTopBanner";
import SwimmingFishLayer from "@/components/SwimmingFishLayer";
import RegistrationModal from "@/components/RegistrationModal";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* Camada Interativa de Peixes Nadando no Fundo */}
      <SwimmingFishLayer />

      {/* Barra Fixa no Topo (100% Visível no Scroll) */}
      <StickyTopBanner onOpenRegistrationModal={() => setIsModalOpen(true)} />

      {/* Modal de Inscrição Oficial */}
      <RegistrationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* JSON-LD mantido estrito para SEO */}
      <script
        type="application/ld+json" 
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Bom de Pesca",
            "description": "A maior e mais completa loja de Pesca e Pet de Itumbiara!",
            "url": "https://www.bomdepesca.com.br",
            "telephone": "+5564992968588",
            "image": "https://www.bomdepesca.com.br/images/logo.webp",
          }),
        }}
      />
      <main className="flex flex-col items-center min-h-screen px-4 pb-20 overflow-x-hidden">
        <div className="w-full max-w-6xl mx-auto flex flex-col gap-10 relative z-10">
          <Header />

          <TorneioCards />

          <AnimateOnScroll direction="left">
            <CommunityCard />
          </AnimateOnScroll>

          <AnimateOnScroll direction="right">
            <ContactCard />
          </AnimateOnScroll>
        </div>
      </main>
    </>
  );
}
