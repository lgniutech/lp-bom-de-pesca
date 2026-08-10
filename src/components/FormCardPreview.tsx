"use client";

import { RegistrationFormData } from "./whatsapp";

interface FormCardPreviewProps {
  data: RegistrationFormData;
}

export default function FormCardPreview({ data }: FormCardPreviewProps) {
  const p3 = data.terceiroPescador && data.terceiroPescador.nome.trim() ? data.terceiroPescador : null;

  return (
    <div
      id="ficha-inscricao-card"
      className="w-[800px] bg-[#0c0d1a] text-white font-sans p-8 border-4 border-[#f26419] rounded-[2.5rem] shadow-2xl relative overflow-hidden flex flex-col gap-6"
      style={{ boxSizing: "border-box" }}
    >
      {/* Luz Radial de Fundo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-40 bg-gradient-to-b from-[#f26419]/20 to-transparent blur-3xl pointer-events-none" />

      {/* CABEÇALHO COM BRASÃO E TÍTULO */}
      <div className="flex items-center justify-between border-b-2 border-white/15 pb-6 relative z-10">
        <div className="flex items-center gap-5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/brasao-4-torneio.png"
            alt="Brasão Torneio Bom de Pesca"
            className="w-24 h-24 object-contain drop-shadow-[0_10px_20px_rgba(242,100,25,0.4)]"
          />
          <div>
            <span className="text-[#ffb703] font-black uppercase text-xs tracking-[0.2em]">
              Documento Oficial de Inscrição
            </span>
            <h1 className="text-2xl font-black leading-tight text-white mt-1">
              4º TORNEIO BOM DE PESCA ITUMBIARA-GO
            </h1>
            <p className="text-xs text-gray-300 font-semibold mt-1">
              Data: 12/09/2026 (Sábado) • Represa de Furnas - Itumbiara-GO
            </p>
          </div>
        </div>

        <div className="text-right bg-white/5 border border-white/10 px-4 py-2.5 rounded-2xl">
          <span className="text-[10px] text-gray-400 font-bold uppercase block">Status</span>
          <span className="text-xs font-black text-[#25D366] uppercase tracking-wider">
            ✓ Ficha Preenchida
          </span>
        </div>
      </div>

      {/* SEÇÃO 1: DADOS DA EQUIPE E INTEGRANTES */}
      <div className="bg-[#14152b] border-2 border-[#f26419]/40 rounded-3xl p-6 space-y-5 relative z-10">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <h2 className="text-lg font-black uppercase text-[#f26419] tracking-wider flex items-center gap-2">
            <span>🏆</span> EQUIPE: <span className="text-white">{data.nomeEquipe.toUpperCase() || "NÃO INFORMADO"}</span>
          </h2>
          <span className="text-xs bg-[#f26419]/20 text-[#ffb703] font-bold px-3 py-1 rounded-full border border-[#f26419]/30">
            📍 {(data.cidadeEquipe ? `${data.cidadeEquipe}${data.estadoEquipe ? ` - ${data.estadoEquipe}` : ""}` : (data.cidadeEstadoEquipe || "ITUMBIARA-GO")).toUpperCase()}
          </span>
        </div>

        {/* INTEGRANTES */}
        <div className="grid grid-cols-1 gap-3 text-xs">
          
          {/* 1º Pescador (Capitão) */}
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="flex justify-between font-bold text-[#ffb703] mb-1">
              <span>👤 1º PESCADOR (CAPITÃO): {data.capitao.nome}</span>
              <span>Doc: {data.capitao.documento}</span>
            </div>
            <div className="flex justify-between text-gray-300 text-[11px]">
              <span>Cidade/UF: {data.capitao.cidade ? `${data.capitao.cidade}${data.capitao.estado ? ` - ${data.capitao.estado}` : ""}` : (data.capitao.cidadeEstado || "-")}</span>
              <span>Tel: {data.capitao.telefone}</span>
            </div>
          </div>

          {/* 2º Pescador */}
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="flex justify-between font-bold text-[#ffb703] mb-1">
              <span>👤 2º PESCADOR: {data.segundoPescador.nome}</span>
              <span>Doc: {data.segundoPescador.documento}</span>
            </div>
            <div className="flex justify-between text-gray-300 text-[11px]">
              <span>Cidade/UF: {data.segundoPescador.cidade ? `${data.segundoPescador.cidade}${data.segundoPescador.estado ? ` - ${data.segundoPescador.estado}` : ""}` : (data.segundoPescador.cidadeEstado || "-")}</span>
              <span>Tel: {data.segundoPescador.telefone}</span>
            </div>
          </div>

          {/* 3º Pescador */}
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="flex justify-between font-bold text-[#ffb703] mb-1">
              <span>👤 3º PESCADOR: {p3 ? p3.nome : "(Não informado)"}</span>
              <span>Doc: {p3 ? p3.documento : "-"}</span>
            </div>
            <div className="flex justify-between text-gray-300 text-[11px]">
              <span>Cidade/UF: {p3 ? (p3.cidade ? `${p3.cidade}${p3.estado ? ` - ${p3.estado}` : ""}` : (p3.cidadeEstado || "-")) : "-"}</span>
              <span>Tel: {p3 ? p3.telefone : "-"}</span>
            </div>
          </div>

        </div>
      </div>

      {/* SEÇÃO 2: DADOS DE PAGAMENTO PIX */}
      <div className="bg-gradient-to-r from-[#171933] to-[#0f1024] border-2 border-[#ffb703]/50 rounded-3xl p-5 flex items-center justify-between relative z-10">
        <div>
          <span className="text-[11px] font-black uppercase text-[#ffb703] tracking-wider block">
            💳 Dados para Pagamento da Inscrição (PIX)
          </span>
          <p className="text-xs text-gray-200 mt-1">
            <strong>Chave Pix Celular:</strong> <span className="font-mono text-sm font-black text-[#ffb703]">64992968588</span>
          </p>
          <p className="text-[11px] text-gray-300">
            <strong>Nome Favorecida:</strong> Carla Araujo Pelissari ou Bom de Pesca
          </p>
        </div>
        <div className="text-right">
          <span className="text-[10px] text-gray-400 font-bold uppercase block">Valor Por Equipe</span>
          <span className="text-sm font-black text-white">R$ 550 <span className="text-[10px] font-normal text-gray-400">(até 05/09)</span></span>
          <span className="text-[10px] text-gray-400 block">R$ 600 (a partir de 06/09)</span>
        </div>
      </div>

      {/* SEÇÃO 3: REGRAS E TERMO DE DECLARAÇÃO */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-[10px] text-gray-300 space-y-2 relative z-10">
        <strong className="text-white text-xs block font-black border-b border-white/10 pb-1">
          📌 TERMO DE DECLARAÇÃO & REGRAS PRINCIPAIS:
        </strong>
        <p>
          • Largada: 07:00h do dia 12/09/2026. Vídeos de medição enviados até às 20:00h aos fiscais da competição.
        </p>
        <p>
          • Peixe alvo exclusivo: Tucunaré (Cichla). Modalidade de arremesso, embarcada. Pesque e Solte obrigatório.
        </p>
        <p>
          • Uso de coletes salva-vidas obrigatório por todos os integrantes durante todo o percurso e período de pesca.
        </p>
        <p>
          • Declaramos ter conhecimento integral do Regulamento oficial e isentamos os organizadores e apoiadores de quaisquer responsabilidades por danos materiais, morais ou físicos durante o torneio.
        </p>
      </div>

      {/* RODAPÉ DO CARD */}
      <div className="flex items-center justify-between border-t border-white/10 pt-4 text-[11px] text-gray-400 relative z-10">
        <span>Organização: (64) 99291-9324 / (64) 98122-4558</span>
        <span className="text-[#25D366] font-bold">Enviar para WhatsApp: (16) 99620-1039</span>
      </div>
    </div>
  );
}
