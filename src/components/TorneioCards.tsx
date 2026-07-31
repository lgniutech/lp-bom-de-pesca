import Image from "next/image";
import Link from "next/link";
import AnimateOnScroll from "./AnimateOnScroll";

export default function TorneioCards() {
  return (
    <div className="w-full flex flex-col gap-8">
      {/* 1. Regulamento do 4º Torneio */}
      <AnimateOnScroll direction="left">
        <Link
          href="https://drive.google.com/file/d/1w4ZlcUhT6yrDm0QsTHVdseq9hyFVhffY/view?usp=sharing"
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

      {/* 2. Inscrição do 4º Torneio */}
      <AnimateOnScroll direction="right">
        <Link
          href="https://drive.google.com/file/d/1HCPKGtcL_QngMOCyJ80D8-nDztn15Y6p/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative w-full max-w-5xl mx-auto bg-[#1a1b2e] rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 transition-all hover:scale-[1.01] hover:border-[#f26419]/50 block"
          aria-label="Acessar Ficha de Inscrição do 4º Torneio Bom de Pesca"
        >
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between py-8 md:py-10 px-6 md:px-12 gap-8">
            <div className="max-w-xl w-full">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl" aria-hidden="true">📝</span>
                <span className="text-[#f26419] font-bold uppercase tracking-wider text-xs md:text-sm">
                  Ficha de Inscrição Oficial
                </span>
              </div>
              <div className="w-16 h-1 bg-[#f26419] rounded-full mb-6"></div>
              <h2 className="text-2xl md:text-3xl font-bold leading-snug text-white">
                Clique aqui e faça sua <span className="text-[#f26419] underline decoration-[#f26419]/50">inscrição</span> para o nosso <span className="text-[#f26419]">4º Torneio Bom de Pesca</span>
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
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </div>
            </div>
          </div>
        </Link>
      </AnimateOnScroll>
    </div>
  );
}
