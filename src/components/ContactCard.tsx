import Link from "next/link";

export default function ContactCard() {
  return (
    <Link 
      href="https://wa.me/5564992968588?text=Olá,%20gostaria%20de%20fazer%20um%20pedido" 
      target="_blank" 
      rel="noopener noreferrer"
      className="group relative w-full max-w-5xl mx-auto bg-[#1a1b2e] backdrop-blur-md rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 transition-all hover:scale-[1.01] hover:border-[#25D366]/50 block"
      aria-label="Falar com a equipe direto pelo WhatsApp"
    >
      <article className="relative z-10 flex flex-col md:flex-row items-center justify-between py-8 md:py-10 px-6 md:px-12 gap-8">
        <div className="max-w-xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl" aria-hidden="true">📱</span>
            <span className="text-[#25D366] font-bold uppercase tracking-wider text-xs md:text-sm">
              Atendimento WhatsApp
            </span>
          </div>
          <div className="w-16 h-1 bg-[#25D366] rounded-full mb-6"></div>
          <h2 className="text-2xl md:text-3xl font-bold leading-snug text-white mb-4">
            Clique aqui para falar com a gente direto pelo <span className="text-[#25D366] underline decoration-[#25D366]/50">WhatsApp</span>!
          </h2>
          <p className="text-gray-300 text-sm md:text-base leading-relaxed">
            Por lá conseguimos te atender da melhor maneira possível e tirar todas as suas dúvidas em tempo real.
          </p>
        </div>

        <div className="relative w-36 h-36 md:w-48 md:h-48 flex-shrink-0 drop-shadow-[0_0_25px_rgba(37,211,102,0.4)] flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="#25D366" className="w-full h-full transition-transform group-hover:scale-105" aria-hidden="true">
            <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-2.1-3.6 2.1-3.2 7.6-14 2.7-5.4 1.4-10-1.4-15.5-2.8-5.6-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
          </svg>
        </div>
      </article>
    </Link>
  );
}