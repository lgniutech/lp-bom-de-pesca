import Image from "next/image";
import Link from "next/link";
import AnimateOnScroll from "./AnimateOnScroll";
import CountdownHero from "./CountdownHero";

export default function TorneioCards() {
  return (
    <div className="w-full flex flex-col gap-8">
      {/* 0. Cronômetro Hero & Ficha de Inscrição Oficial com Brasão */}
      <AnimateOnScroll direction="left">
        <CountdownHero />
      </AnimateOnScroll>

      {/* 2. Regulamento do 4º Torneio */}
      <AnimateOnScroll direction="right">
        <Link
          href="https://drive.google.com/file/d/1bo8RLtve-CJpYI3uPcXHck4Oh3_WCDZM/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative w-full max-w-5xl mx-auto bg-[#1a1b2e] rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 transition-all hover:scale-[1.01] hover:border-[#f26419]/50 block"
          aria-label="Acessar Regulamento do 4º Torneio Bom de Pesca"
        >
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between py-8 md:py-10 px-6 md:px-12 gap-8">
            <div className="max-w-xl w-full">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl" aria-hidden="true">📄</span>
                <span className="text-[#f26419] font-bold uppercase tracking-wider text-xs md:text-sm">
                  Regulamento Oficial
                </span>
              </div>
              <div className="w-16 h-1 bg-[#f26419] rounded-full mb-6"></div>
              <h2 className="text-2xl md:text-3xl font-bold leading-snug text-white">
                Clique aqui e acesse o <span className="text-[#f26419] underline decoration-[#f26419]/50">regulamento</span> do nosso <span className="text-[#f26419]">4º Torneio Bom de Pesca</span>
              </h2>
            </div>

            <div className="relative w-48 md:w-60 aspect-square flex-shrink-0 flex items-center justify-center p-2">
              <Image
                src="/images/brasao-4-torneio.png"
                alt="Brasão 4º Torneio Bom de Pesca"
                width={240}
                height={240}
                className="object-contain max-h-full transition-all duration-300 drop-shadow-[0_10px_25px_rgba(0,0,0,0.65)] group-hover:scale-105 group-hover:drop-shadow-[0_15px_30px_rgba(242,100,25,0.4)]"
              />
            </div>
          </div>
        </Link>
      </AnimateOnScroll>

      {/* 3. Grupo de Avisos do 4º Torneio */}
      <AnimateOnScroll direction="left">
        <Link
          href="https://chat.whatsapp.com/JAQx9aTRyc43uxnGaG3AGJ"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative w-full max-w-5xl mx-auto bg-[#1a1b2e] rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 transition-all hover:scale-[1.01] hover:border-[#25D366]/50 block"
          aria-label="Participar do Grupo de Avisos do 4º Torneio Bom de Pesca no WhatsApp"
        >
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between py-8 md:py-10 px-6 md:px-12 gap-8">
            <div className="max-w-xl w-full">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl" aria-hidden="true">📢</span>
                <span className="text-[#25D366] font-bold uppercase tracking-wider text-xs md:text-sm">
                  Grupo de Avisos Oficial
                </span>
              </div>
              <div className="w-16 h-1 bg-[#f26419] rounded-full mb-6"></div>
              <h2 className="text-2xl md:text-3xl font-bold leading-snug text-white">
                Clique aqui e participe do <span className="text-[#25D366] underline decoration-[#25D366]/50">grupo de avisos</span> do nosso <span className="text-[#f26419]">4º Torneio Bom de Pesca</span>
              </h2>
            </div>

            <div className="relative w-48 md:w-60 aspect-square flex-shrink-0 flex items-center justify-center p-2">
              <Image
                src="/images/brasao-4-torneio.png"
                alt="Brasão 4º Torneio Bom de Pesca"
                width={240}
                height={240}
                className="object-contain max-h-full transition-all duration-300 drop-shadow-[0_10px_25px_rgba(0,0,0,0.65)] group-hover:scale-105 group-hover:drop-shadow-[0_15px_30px_rgba(37,211,102,0.4)]"
              />
              <div className="absolute bottom-2 right-2 bg-[#25D366] rounded-full p-2.5 shadow-lg border-2 border-[#1a1b2e]">
                <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19.05 4.91A9.816 9.816 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01zm-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.217 8.217 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.182 8.182 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.98-.15.17-.3.19-.55.07-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.15-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.15.17-.25.25-.42.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.45.06-.69.32-.24.25-.92.9-.92 2.2 0 1.3 1 2.56 1.14 2.75.14.19 1.97 3.01 4.78 4.22.67.29 1.19.46 1.6.59.67.21 1.28.18 1.76.11.54-.08 1.66-.68 1.89-1.34.23-.66.23-1.23.16-1.34-.07-.11-.23-.17-.48-.3z"/>
                </svg>
              </div>
            </div>
          </div>
        </Link>
      </AnimateOnScroll>
    </div>
  );
}
