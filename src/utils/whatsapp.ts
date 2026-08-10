export interface PescadorData {
  nome: string;
  cidade: string;
  estado: string;
  cidadeEstado?: string;
  telefone: string;
  documento: string; // RG ou CPF
}

export interface RegistrationFormData {
  nomeEquipe: string;
  cidadeEquipe: string;
  estadoEquipe: string;
  cidadeEstadoEquipe?: string;
  capitao: PescadorData;
  segundoPescador: PescadorData;
  terceiroPescador?: PescadorData;
}

export const TARGET_WHATSAPP_NUMBER = "5564992968588";

export function formatWhatsAppMessage(data: RegistrationFormData): string {
  const eqCidade = data.cidadeEquipe?.trim() || data.cidadeEstadoEquipe?.trim() || "";
  const eqEstado = data.estadoEquipe?.trim() || "";

  const capCidade = data.capitao.cidade?.trim() || data.capitao.cidadeEstado?.trim() || "";
  const capEstado = data.capitao.estado?.trim() || "";

  let message = `*INSCRIÇÃO - 4º TORNEIO BOM DE PESCA ITUMBIARA-GO*\n\n`;
  message += `*EQUIPE:* ${data.nomeEquipe.trim()}\n`;
  message += `*CIDADE:* ${eqCidade || "-"}\n`;
  message += `*ESTADO:* ${eqEstado || "-"}\n\n`;

  message += `*1º PESCADOR (CAPITÃO):*\n`;
  message += `- Nome: ${data.capitao.nome.trim()}\n`;
  message += `- Cidade: ${capCidade || "-"}\n`;
  message += `- Estado: ${capEstado || "-"}\n`;
  message += `- Celular: ${data.capitao.telefone.trim()}\n`;
  message += `- RG/CPF: ${data.capitao.documento.trim()}\n\n`;

  // 2º Pescador (se informado)
  if (data.segundoPescador && data.segundoPescador.nome && data.segundoPescador.nome.trim().length > 0) {
    const p2Cidade = data.segundoPescador.cidade?.trim() || data.segundoPescador.cidadeEstado?.trim() || "";
    const p2Estado = data.segundoPescador.estado?.trim() || "";
    message += `*2º PESCADOR:*\n`;
    message += `- Nome: ${data.segundoPescador.nome.trim()}\n`;
    message += `- Cidade: ${p2Cidade || "-"}\n`;
    message += `- Estado: ${p2Estado || "-"}\n`;
    message += `- Celular: ${data.segundoPescador.telefone.trim() || "-"}\n`;
    message += `- RG/CPF: ${data.segundoPescador.documento.trim() || "-"}\n\n`;
  } else {
    message += `*2º PESCADOR:* (Não informado)\n\n`;
  }

  // 3º Pescador (se informado)
  if (data.terceiroPescador && data.terceiroPescador.nome && data.terceiroPescador.nome.trim().length > 0) {
    const p3Cidade = data.terceiroPescador.cidade?.trim() || data.terceiroPescador.cidadeEstado?.trim() || "";
    const p3Estado = data.terceiroPescador.estado?.trim() || "";
    message += `*3º PESCADOR:*\n`;
    message += `- Nome: ${data.terceiroPescador.nome.trim()}\n`;
    message += `- Cidade: ${p3Cidade || "-"}\n`;
    message += `- Estado: ${p3Estado || "-"}\n`;
    message += `- Celular: ${data.terceiroPescador.telefone.trim() || "-"}\n`;
    message += `- RG/CPF: ${data.terceiroPescador.documento.trim() || "-"}\n\n`;
  } else {
    message += `*3º PESCADOR:* (Não informado)\n\n`;
  }

  message += `*INFORMAÇÕES PARA PAGAMENTO (PIX):*\n`;
  message += `- Chave Pix (Celular): 64992968588\n`;
  message += `- Nome: Carla Araujo Pelissari ou Bom de Pesca\n\n`;

  message += `*ATENÇÃO:* A Ficha de Inscrição Oficial já foi salva no meu dispositivo! Estou anexando ela aqui junto com o meu comprovante Pix para confirmação da inscrição.`;

  return message;
}

export function openWhatsAppRegistration(data: RegistrationFormData) {
  const text = formatWhatsAppMessage(data);
  const encodedText = encodeURIComponent(text);
  const url = `https://wa.me/${TARGET_WHATSAPP_NUMBER}?text=${encodedText}`;
  window.open(url, "_blank", "noopener,noreferrer");
}
