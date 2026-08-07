export interface PescadorData {
  nome: string;
  cidadeEstado: string;
  telefone: string;
  documento: string; // RG ou CPF
}

export interface RegistrationFormData {
  nomeEquipe: string;
  cidadeEstadoEquipe: string;
  capitao: PescadorData;
  segundoPescador: PescadorData;
  terceiroPescador?: PescadorData;
}

export const TARGET_WHATSAPP_NUMBER = "5516996201039";

export function formatWhatsAppMessage(data: RegistrationFormData): string {
  let message = `*INSCRIÇÃO - 4º TORNEIO BOM DE PESCA ITUMBIARA-GO*\n\n`;
  message += `*EQUIPE:* ${data.nomeEquipe.trim()}\n`;
  message += `*CIDADE/ESTADO:* ${data.cidadeEstadoEquipe.trim()}\n\n`;

  message += `*1º PESCADOR (CAPITÃO):*\n`;
  message += `- Nome: ${data.capitao.nome.trim()}\n`;
  message += `- Cidade/UF: ${data.capitao.cidadeEstado.trim()}\n`;
  message += `- Celular: ${data.capitao.telefone.trim()}\n`;
  message += `- RG/CPF: ${data.capitao.documento.trim()}\n\n`;

  message += `*2º PESCADOR:*\n`;
  message += `- Nome: ${data.segundoPescador.nome.trim()}\n`;
  message += `- Cidade/UF: ${data.segundoPescador.cidadeEstado.trim()}\n`;
  message += `- Celular: ${data.segundoPescador.telefone.trim()}\n`;
  message += `- RG/CPF: ${data.segundoPescador.documento.trim()}\n\n`;

  if (
    data.terceiroPescador &&
    data.terceiroPescador.nome.trim().length > 0
  ) {
    message += `*3º PESCADOR:*\n`;
    message += `- Nome: ${data.terceiroPescador.nome.trim()}\n`;
    message += `- Cidade/UF: ${data.terceiroPescador.cidadeEstado.trim()}\n`;
    message += `- Celular: ${data.terceiroPescador.telefone.trim()}\n`;
    message += `- RG/CPF: ${data.terceiroPescador.documento.trim()}\n\n`;
  }

  message += `*INFORMAÇÕES PARA PAGAMENTO (PIX):*\n`;
  message += `- Chave Pix (Celular): 64992968588\n`;
  message += `- Nome: Carla Araujo Pelissari ou Bom de Pesca\n\n`;

  message += `*ATENÇÃO:* A imagem oficial da minha Ficha de Inscrição em Alta Definição já está salva na minha galeria de fotos! Estou anexando ela aqui junto com o meu comprovante Pix.`;

  return message;
}

export function openWhatsAppRegistration(data: RegistrationFormData) {
  const text = formatWhatsAppMessage(data);
  const encodedText = encodeURIComponent(text);
  const url = `https://wa.me/${TARGET_WHATSAPP_NUMBER}?text=${encodedText}`;
  window.open(url, "_blank", "noopener,noreferrer");
}
