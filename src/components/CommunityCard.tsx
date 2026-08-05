import Image from "next/image";
import Link from "next/link";

export default function CommunityCard() {
  return (
    <Link
      href="https://chat.whatsapp.com/HeihcsLgObR9WTyITnjjQx?s=sh&p=a&ilr=1"
      target="_blank"
      rel="noopener noreferrer"
      className="group relative w-full max-w-5xl mx-auto bg-[#1a1b2e] rounded-[2rem] overflow-hidden shadow-2xl flex flex-col md:flex-row items-center border border-white/5 transition-all hover:scale-[1.01] hover:border-[#25D366]/50 block"
      aria-label="Participar da Comunidade Bom de Pesca no WhatsApp"
    >
      <div className="relative z-10 flex flex-col md:flex-row w-full py-8 md:py-12 px-6 md:px-12 gap-8 items-center justify-between">
        
        {/* Lado do Texto */}
        <div className="max-w-lg w-full relative z-20">
          <div className="flex items-center gap-3 mb-4">
            <svg className="w-8 h-8 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M19.05 4.91A9.816 9.816 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01zm-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.217 8.217 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.182 8.182 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.98-.15.17-.3.19-.55.07-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.15-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.15.17-.25.25-.42.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.45.06-.69.32-.24.25-.92.9-.92 2.2 0 1.3 1 2.56 1.14 2.75.14.19 1.97 3.01 4.78 4.22.67.29 1.19.46 1.6.59.67.21 1.28.18 1.76.11.54-.08 1.66-.68 1.89-1.34.23-.66.23-1.23.16-1.34-.07-.11-.23-.17-.48-.3z"/>
            </svg>
            <span className="text-[#25D366] font-bold tracking-wider uppercase text-sm drop-shadow-md">Comunidade VIP</span>
          </div>
          <div className="w-16 h-1 bg-[#25D366] rounded-full mb-6"></div>
          <h2 className="text-2xl md:text-3xl font-bold leading-tight mb-4 text-white">
            Participe da nossa <span className="text-[#f26419] underline decoration-[#f26419]/50">Comunidade no WhatsApp</span> e tenha acesso a novidades e promoções
          </h2>
        </div>

        {/* Sub-Card: Interface Perfil WhatsApp */}
        <figure className="relative w-full max-w-[320px] flex-shrink-0 bg-[#0b141a] rounded-[2rem] p-5 shadow-2xl border border-white/5 flex flex-col items-center z-20 transition-transform group-hover:scale-105">
          
          <div className="relative w-full aspect-square max-w-[200px] rounded-[2rem] overflow-hidden mb-4 shadow-lg bg-black">
            <Image
              src="/images/carla-joao.webp"
              alt="Carla e João - Comunidade Bom de Pesca"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 200px"
            />
          </div>
          
          <figcaption className="text-center w-full">
            <div className="flex items-center justify-center gap-2 mb-1">
              <span aria-hidden="true" className="text-lg">🎣</span>
              <h3 className="text-white font-medium text-base md:text-lg leading-tight">
                Comunidade Bom de Pesca
              </h3>
              <span aria-hidden="true" className="text-gray-400 text-sm opacity-80 flex-shrink-0">✏️</span>
            </div>
            <p className="text-[#8696a0] text-xs md:text-sm mt-1">
              Comunidade · Grupos: 3
            </p>
          </figcaption>

        </figure>

      </div>
    </Link>
  );
}