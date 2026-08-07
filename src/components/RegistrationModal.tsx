"use client";

import { useState } from "react";
import { RegistrationFormData, openWhatsAppRegistration } from "@/utils/whatsapp";
import { generateRegistrationImage } from "@/utils/imageGenerator";
import FormCardPreview from "./FormCardPreview";

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RegistrationModal({ isOpen, onClose }: RegistrationModalProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  const [formData, setFormData] = useState<RegistrationFormData>({
    nomeEquipe: "",
    cidadeEstadoEquipe: "",
    capitao: {
      nome: "",
      cidadeEstado: "",
      telefone: "",
      documento: "",
    },
    segundoPescador: {
      nome: "",
      cidadeEstado: "",
      telefone: "",
      documento: "",
    },
    terceiroPescador: {
      nome: "",
      cidadeEstado: "",
      telefone: "",
      documento: "",
    },
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  if (!isOpen) return null;

  // Funções de atualização dos inputs
  const updateEquipeField = (field: "nomeEquipe" | "cidadeEstadoEquipe", value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const updateCapitaoField = (field: keyof RegistrationFormData["capitao"], value: string) => {
    setFormData((prev) => ({
      ...prev,
      capitao: { ...prev.capitao, [field]: value },
    }));
  };

  const updateSegundoField = (field: keyof RegistrationFormData["segundoPescador"], value: string) => {
    setFormData((prev) => ({
      ...prev,
      segundoPescador: { ...prev.segundoPescador, [field]: value },
    }));
  };

  const updateTerceiroField = (field: keyof RegistrationFormData["capitao"], value: string) => {
    setFormData((prev) => ({
      ...prev,
      terceiroPescador: {
        ...(prev.terceiroPescador || { nome: "", cidadeEstado: "", telefone: "", documento: "" }),
        [field]: value,
      },
    }));
  };

  // Validações por passo
  const validateStep = (currentStep: number): boolean => {
    setErrorMsg("");

    if (currentStep === 1) {
      if (!formData.nomeEquipe.trim()) {
        setErrorMsg("Por favor, informe o nome da sua equipe.");
        return false;
      }
      if (!formData.cidadeEstadoEquipe.trim()) {
        setErrorMsg("Por favor, informe a Cidade e Estado da equipe.");
        return false;
      }
      if (!formData.capitao.nome.trim()) {
        setErrorMsg("Por favor, informe o nome do Capitão.");
        return false;
      }
      if (!formData.capitao.cidadeEstado.trim()) {
        setErrorMsg("Por favor, informe a Cidade/UF do Capitão.");
        return false;
      }
      if (!formData.capitao.telefone.trim()) {
        setErrorMsg("Por favor, informe o celular do Capitão.");
        return false;
      }
      if (!formData.capitao.documento.trim()) {
        setErrorMsg("Por favor, informe o RG ou CPF do Capitão.");
        return false;
      }
    }

    if (currentStep === 2) {
      if (!formData.segundoPescador.nome.trim()) {
        setErrorMsg("Por favor, informe o nome completo do 2º Pescador.");
        return false;
      }
      if (!formData.segundoPescador.cidadeEstado.trim()) {
        setErrorMsg("Por favor, informe a Cidade/UF do 2º Pescador.");
        return false;
      }
      if (!formData.segundoPescador.telefone.trim()) {
        setErrorMsg("Por favor, informe o celular do 2º Pescador.");
        return false;
      }
      if (!formData.segundoPescador.documento.trim()) {
        setErrorMsg("Por favor, informe o RG ou CPF do 2º Pescador.");
        return false;
      }
    }

    return true;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      if (step < 4) setStep((prev) => (prev + 1) as 1 | 2 | 3 | 4);
    }
  };

  const handlePrev = () => {
    setErrorMsg("");
    if (step > 1) setStep((prev) => (prev - 1) as 1 | 2 | 3 | 4);
  };

  // Finalizar: Gerar Imagem HD (Galeria) + Abrir WhatsApp
  const handleSubmitAndSend = async () => {
    if (!validateStep(1) || !validateStep(2)) {
      alert("Por favor, preencha os campos obrigatórios da equipe e dos pescadores.");
      return;
    }

    setIsGenerating(true);

    try {
      // 1. Gerar e Salvar a Imagem HD na galeria/downloads do dispositivo
      await generateRegistrationImage(formData);

      // 2. Redirecionar para o WhatsApp preenchido
      openWhatsAppRegistration(formData);

      // 3. Fechar o modal
      onClose();
    } catch (e) {
      console.error(e);
      alert("Ocorreu um erro ao gerar a imagem da ficha. Tente novamente.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-fade-in">
      
      {/* CARD OCULTO FORA DA TELA UTILIZADO APENAS PARA CONVERSÃO EM IMAGEM HD */}
      <div className="absolute top-[-9999px] left-[-9999px] pointer-events-none">
        <FormCardPreview data={formData} />
      </div>

      <div className="relative w-full max-w-2xl bg-[#121324] border border-[#f26419]/40 rounded-3xl shadow-[0_0_50px_rgba(242,100,25,0.25)] overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Cabeçalho do Modal */}
        <div className="flex items-center justify-between px-6 py-5 bg-gradient-to-r from-[#17182c] via-[#222340] to-[#17182c] border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="text-2xl" aria-hidden="true">📝</span>
            <div>
              <h3 className="text-lg sm:text-xl font-black text-white leading-tight">
                Ficha de Inscrição Oficial
              </h3>
              <p className="text-xs text-[#ffb703] font-semibold">
                4º Torneio Bom de Pesca Itumbiara-GO
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white flex items-center justify-center transition-colors"
            aria-label="Fechar formulário"
          >
            ✕
          </button>
        </div>

        {/* Barra de Progresso em Passos */}
        <div className="flex items-center justify-between px-6 py-3 bg-[#0a0b14] border-b border-white/5 text-xs font-bold text-gray-400">
          <div className={`flex items-center gap-2 ${step >= 1 ? "text-[#f26419]" : ""}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${step >= 1 ? "bg-[#f26419] text-white" : "bg-white/10"}`}>1</span>
            <span className="hidden sm:inline">Capitão</span>
          </div>
          <div className="h-0.5 flex-1 bg-white/10 mx-2">
            <div className={`h-full bg-[#f26419] transition-all duration-300 ${step >= 2 ? "w-full" : "w-0"}`}></div>
          </div>

          <div className={`flex items-center gap-2 ${step >= 2 ? "text-[#f26419]" : ""}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${step >= 2 ? "bg-[#f26419] text-white" : "bg-white/10"}`}>2</span>
            <span className="hidden sm:inline">2º Pescador</span>
          </div>
          <div className="h-0.5 flex-1 bg-white/10 mx-2">
            <div className={`h-full bg-[#f26419] transition-all duration-300 ${step >= 3 ? "w-full" : "w-0"}`}></div>
          </div>

          <div className={`flex items-center gap-2 ${step >= 3 ? "text-[#f26419]" : ""}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${step >= 3 ? "bg-[#f26419] text-white" : "bg-white/10"}`}>3</span>
            <span className="hidden sm:inline">3º Pescador</span>
          </div>
          <div className="h-0.5 flex-1 bg-white/10 mx-2">
            <div className={`h-full bg-[#f26419] transition-all duration-300 ${step >= 4 ? "w-full" : "w-0"}`}></div>
          </div>

          <div className={`flex items-center gap-2 ${step === 4 ? "text-[#25D366]" : ""}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${step === 4 ? "bg-[#25D366] text-white" : "bg-white/10"}`}>4</span>
            <span className="hidden sm:inline">Finalizar</span>
          </div>
        </div>

        {/* Mensagem de Erro Inline */}
        {errorMsg && (
          <div className="mx-6 mt-4 p-3 rounded-xl bg-red-500/20 border border-red-500/50 text-red-200 text-xs font-semibold flex items-center gap-2">
            <span>⚠️</span>
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Corpo do Formulário */}
        <div className="p-6 overflow-y-auto space-y-5 text-left flex-1">
          
          {/* PASSO 1: DADOS DA EQUIPE & CAPITÃO */}
          {step === 1 && (
            <div className="space-y-4">
              <h4 className="text-sm font-black uppercase text-[#f26419] tracking-wider border-b border-white/10 pb-2">
                1. Informações da Equipe & Capitão (1º Pescador)
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">
                    Nome da Equipe *
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Os Feras do Tucunaré"
                    value={formData.nomeEquipe}
                    onChange={(e) => updateEquipeField("nomeEquipe", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-gray-500 focus:outline-none focus:border-[#f26419] text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">
                    Cidade / Estado da Equipe *
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Itumbiara - GO"
                    value={formData.cidadeEstadoEquipe}
                    onChange={(e) => updateEquipeField("cidadeEstadoEquipe", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-gray-500 focus:outline-none focus:border-[#f26419] text-sm"
                  />
                </div>
              </div>

              <div className="pt-2">
                <label className="block text-xs font-bold text-gray-300 mb-1">
                  Nome Completo do Capitão (1º Pescador) *
                </label>
                <input
                  type="text"
                  placeholder="Nome completo conforme documento"
                  value={formData.capitao.nome}
                  onChange={(e) => updateCapitaoField("nome", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-gray-500 focus:outline-none focus:border-[#f26419] text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">
                    Cidade / Estado *
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Itumbiara - GO"
                    value={formData.capitao.cidadeEstado}
                    onChange={(e) => updateCapitaoField("cidadeEstado", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-gray-500 focus:outline-none focus:border-[#f26419] text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">
                    Telefone Celular (com DDD) *
                  </label>
                  <input
                    type="text"
                    placeholder="(64) 99999-9999"
                    value={formData.capitao.telefone}
                    onChange={(e) => updateCapitaoField("telefone", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-gray-500 focus:outline-none focus:border-[#f26419] text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">
                    RG ou CPF *
                  </label>
                  <input
                    type="text"
                    placeholder="Número do documento"
                    value={formData.capitao.documento}
                    onChange={(e) => updateCapitaoField("documento", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-gray-500 focus:outline-none focus:border-[#f26419] text-sm"
                  />
                </div>
              </div>
            </div>
          )}

          {/* PASSO 2: DADOS DO 2º PESCADOR */}
          {step === 2 && (
            <div className="space-y-4">
              <h4 className="text-sm font-black uppercase text-[#f26419] tracking-wider border-b border-white/10 pb-2">
                2. Informações do 2º Pescador
              </h4>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">
                  Nome Completo do 2º Pescador *
                </label>
                <input
                  type="text"
                  placeholder="Nome completo conforme documento"
                  value={formData.segundoPescador.nome}
                  onChange={(e) => updateSegundoField("nome", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-gray-500 focus:outline-none focus:border-[#f26419] text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">
                    Cidade / Estado *
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Uberlândia - MG"
                    value={formData.segundoPescador.cidadeEstado}
                    onChange={(e) => updateSegundoField("cidadeEstado", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-gray-500 focus:outline-none focus:border-[#f26419] text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">
                    Telefone Celular (com DDD) *
                  </label>
                  <input
                    type="text"
                    placeholder="(34) 99999-9999"
                    value={formData.segundoPescador.telefone}
                    onChange={(e) => updateSegundoField("telefone", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-gray-500 focus:outline-none focus:border-[#f26419] text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">
                    RG ou CPF *
                  </label>
                  <input
                    type="text"
                    placeholder="Número do documento"
                    value={formData.segundoPescador.documento}
                    onChange={(e) => updateSegundoField("documento", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-gray-500 focus:outline-none focus:border-[#f26419] text-sm"
                  />
                </div>
              </div>
            </div>
          )}

          {/* PASSO 3: DADOS DO 3º PESCADOR (OPCIONAL) */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <h4 className="text-sm font-black uppercase text-[#f26419] tracking-wider">
                  3. Informações do 3º Pescador (Opcional)
                </h4>
                <span className="text-xs bg-white/10 text-gray-300 px-2.5 py-1 rounded-full font-semibold">
                  Opção até 3 pescadores por equipe
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">
                  Nome Completo do 3º Pescador
                </label>
                <input
                  type="text"
                  placeholder="Nome completo (deixe em branco se for dupla)"
                  value={formData.terceiroPescador?.nome || ""}
                  onChange={(e) => updateTerceiroField("nome", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-gray-500 focus:outline-none focus:border-[#f26419] text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">
                    Cidade / Estado
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Goiânia - GO"
                    value={formData.terceiroPescador?.cidadeEstado || ""}
                    onChange={(e) => updateTerceiroField("cidadeEstado", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-gray-500 focus:outline-none focus:border-[#f26419] text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">
                    Telefone Celular (com DDD)
                  </label>
                  <input
                    type="text"
                    placeholder="(62) 99999-9999"
                    value={formData.terceiroPescador?.telefone || ""}
                    onChange={(e) => updateTerceiroField("telefone", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-gray-500 focus:outline-none focus:border-[#f26419] text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">
                    RG ou CPF
                  </label>
                  <input
                    type="text"
                    placeholder="Número do documento"
                    value={formData.terceiroPescador?.documento || ""}
                    onChange={(e) => updateTerceiroField("documento", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-gray-500 focus:outline-none focus:border-[#f26419] text-sm"
                  />
                </div>
              </div>
            </div>
          )}

          {/* PASSO 4: RESUMO, TERMO & ENVIAR VIA WHATSAPP */}
          {step === 4 && (
            <div className="space-y-4">
              <h4 className="text-sm font-black uppercase text-[#25D366] tracking-wider border-b border-white/10 pb-2">
                4. Confirmação, Pagamento & Envio
              </h4>

              {/* Destaque Importante sobre o Anexo no WhatsApp sem Perda de Qualidade */}
              <div className="p-4 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/40 text-xs space-y-2 text-gray-200">
                <span className="font-bold text-[#25D366] text-sm block">
                  💡 Dica importante para a Ficha ficar em Alta Definição:
                </span>
                <p>
                  1. Ao clicar no botão abaixo, a sua <strong>Ficha de Inscrição Oficial será salva no seu celular/computador</strong>.
                </p>
                <p>
                  2. O <strong>WhatsApp abrirá automaticamente</strong> com a mensagem preenchida para a organização.
                </p>
                <p className="bg-[#25D366]/20 p-2.5 rounded-xl border border-[#25D366]/40 text-white font-medium">
                  ⭐ <strong>Para a ficha não ficar embaçada:</strong> No WhatsApp, toque no <strong>ícone de clipe 📎</strong>, escolha a opção <strong>"Documento"</strong> e selecione a ficha salva (`.png` ou `.pdf`). Assim ela é enviada na qualidade máxima sem o WhatsApp compactar!
                </p>
              </div>

              {/* Resumo da Inscrição */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs space-y-2">
                <p className="text-white font-bold text-sm">
                  Equipe: <span className="text-[#ffb703]">{formData.nomeEquipe}</span> ({formData.cidadeEstadoEquipe})
                </p>
                <div className="text-gray-300 space-y-1">
                  <p>• Capitão: {formData.capitao.nome} ({formData.capitao.telefone})</p>
                  <p>• 2º Pescador: {formData.segundoPescador.nome} ({formData.segundoPescador.telefone})</p>
                  {formData.terceiroPescador?.nome && (
                    <p>• 3º Pescador: {formData.terceiroPescador.nome} ({formData.terceiroPescador.telefone})</p>
                  )}
                </div>
              </div>

              {/* Instrução de Pagamento Pix */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-[#1b1c33] to-[#0f1020] border border-[#ffb703]/40 space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#ffb703] block">
                  💳 Chave Pix para Pagamento
                </span>
                <p className="text-xs text-gray-200">
                  <strong className="text-white">Chave Celular Pix:</strong> <span className="text-[#ffb703] font-mono text-sm font-bold">64992968588</span>
                </p>
                <p className="text-xs text-gray-300">
                  <strong>Favorecida:</strong> Carla Araujo Pelissari ou Bom de Pesca
                </p>
                <div className="text-[11px] text-gray-400 font-medium">
                  • Valor até 05/09/2026: <strong>R$ 550,00</strong> | A partir de 06/09/2026: <strong>R$ 600,00</strong>
                </div>
              </div>

              {/* Termo de Declaração */}
              <div className="p-3 rounded-xl bg-black/40 border border-white/10 text-[11px] text-gray-300 leading-relaxed max-h-28 overflow-y-auto">
                <strong className="text-white block mb-1">Termo de Declaração e Isenção de Responsabilidade:</strong>
                Declaramos ter tido conhecimento integral do Regulamento do 4º Torneio Bom de Pesca e com ele concordado. Declaramos estar cientes da obrigatoriedade do uso de coletes salva-vidas e de estarmos em ordem com a documentação pessoal e da embarcação. Assumimos todos os riscos envolvidos e isentamos organizadores e patrocinadores de qualquer responsabilidade.
              </div>
            </div>
          )}

        </div>

        {/* Rodapé do Modal com Botões de Navegação */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#0d0e19] border-t border-white/10 gap-3">
          {step > 1 ? (
            <button
              onClick={handlePrev}
              disabled={isGenerating}
              className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition-colors disabled:opacity-50"
            >
              ← Voltar
            </button>
          ) : (
            <div></div>
          )}

          {step < 4 ? (
            <button
              onClick={handleNext}
              className="px-7 py-3 rounded-full bg-[#f26419] hover:bg-[#ff7d3b] text-white font-black text-xs uppercase tracking-wider shadow-[0_4px_15px_rgba(242,100,25,0.4)] transition-all flex items-center gap-2"
            >
              <span>Próximo Passo</span>
              <span>→</span>
            </button>
          ) : (
            <button
              onClick={handleSubmitAndSend}
              disabled={isGenerating}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-[#25D366] to-[#1eb854] hover:from-[#29e36f] hover:to-[#22c75b] text-white font-black text-sm uppercase tracking-wider shadow-[0_6px_25px_rgba(37,211,102,0.45)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50 cursor-pointer"
            >
              <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19.05 4.91A9.816 9.816 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01zm-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.217 8.217 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.182 8.182 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.98-.15.17-.3.19-.55.07-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.15-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.15.17-.25.25-.42.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.45.06-.69.32-.24.25-.92.9-.92 2.2 0 1.3 1 2.56 1.14 2.75.14.19 1.97 3.01 4.78 4.22.67.29 1.19.46 1.6.59.67.21 1.28.18 1.76.11.54-.08 1.66-.68 1.89-1.34.23-.66.23-1.23.16-1.34-.07-.11-.23-.17-.48-.3z"/>
              </svg>
              <span>{isGenerating ? "Gerando Ficha HD..." : "Salvar Ficha na Galeria & Enviar no WhatsApp"}</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
