import Header from "@/components/Header";
import CommunityCard from "@/components/ComunityCard";
import ContactCard from "@/components/ContactCard";
import TorneioCards from "@/components/TorneioCards";
import AnimateOnScroll from "@/components/AnimateOnScroll";

export default function Home() {
  return (
    <>
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
