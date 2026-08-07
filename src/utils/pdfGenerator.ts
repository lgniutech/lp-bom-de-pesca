import { jsPDF } from "jspdf";
import { RegistrationFormData } from "./whatsapp";

export function generateRegistrationPDF(data: RegistrationFormData): void {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 12;
  const contentWidth = pageWidth - margin * 2;
  let y = 14;

  // Função auxiliar para verificar espaço na página
  const checkPageBreak = (neededHeight: number) => {
    if (y + neededHeight > pageHeight - margin) {
      doc.addPage();
      y = 14;
    }
  };

  // Cabeçalho Principal
  doc.setFillColor(242, 100, 25); // #f26419 (Laranja Bom de Pesca)
  doc.rect(margin, y, contentWidth, 16, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("FICHA DE INSCRIÇÃO - 4º TORNEIO BOM DE PESCA ITUMBIARA-GO", pageWidth / 2, y + 7, {
    align: "center",
  });

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text(
    "Data: 12/09/2026 (Sábado) | Premiação: 13/09/2026 (Domingo) | Local: Represa de Furnas Itumbiara-GO",
    pageWidth / 2,
    y + 12,
    { align: "center" }
  );

  y += 20;

  // Seção 1: Dados da Equipe & Integrantes
  doc.setDrawColor(242, 100, 25);
  doc.setLineWidth(0.6);
  doc.setFillColor(248, 249, 250);
  doc.rect(margin, y, contentWidth, 54, "FD");

  doc.setTextColor(20, 20, 20);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("DADOS DA EQUIPE INCRITA", margin + 4, y + 6);

  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.text(`Nome da Equipe:`, margin + 4, y + 12);
  doc.setFont("helvetica", "normal");
  doc.text(data.nomeEquipe.toUpperCase(), margin + 35, y + 12);

  doc.setFont("helvetica", "bold");
  doc.text(`Cidade/Estado:`, margin + 110, y + 12);
  doc.setFont("helvetica", "normal");
  doc.text(data.cidadeEstadoEquipe.toUpperCase(), margin + 138, y + 12);

  doc.line(margin + 4, y + 15, margin + contentWidth - 4, y + 15);

  // 1º Pescador (Capitão)
  doc.setFont("helvetica", "bold");
  doc.setTextColor(242, 100, 25);
  doc.text("1º Pescador (Capitão):", margin + 4, y + 21);
  doc.setTextColor(20, 20, 20);
  doc.setFont("helvetica", "normal");
  doc.text(data.capitao.nome, margin + 42, y + 21);

  doc.text(`Cidade/UF: ${data.capitao.cidadeEstado}`, margin + 4, y + 26);
  doc.text(`Tel Celular: ${data.capitao.telefone}`, margin + 80, y + 26);
  doc.text(`RG/CPF: ${data.capitao.documento}`, margin + 135, y + 26);

  // 2º Pescador
  doc.setFont("helvetica", "bold");
  doc.setTextColor(242, 100, 25);
  doc.text("2º Pescador:", margin + 4, y + 32);
  doc.setTextColor(20, 20, 20);
  doc.setFont("helvetica", "normal");
  doc.text(data.segundoPescador.nome, margin + 42, y + 32);

  doc.text(`Cidade/UF: ${data.segundoPescador.cidadeEstado}`, margin + 4, y + 37);
  doc.text(`Tel Celular: ${data.segundoPescador.telefone}`, margin + 80, y + 37);
  doc.text(`RG/CPF: ${data.segundoPescador.documento}`, margin + 135, y + 37);

  // 3º Pescador
  const p3 = data.terceiroPescador && data.terceiroPescador.nome.trim() ? data.terceiroPescador : null;
  doc.setFont("helvetica", "bold");
  doc.setTextColor(242, 100, 25);
  doc.text("3º Pescador:", margin + 4, y + 43);
  doc.setTextColor(20, 20, 20);
  doc.setFont("helvetica", "normal");
  doc.text(p3 ? p3.nome : "(Não informado)", margin + 42, y + 43);

  doc.text(`Cidade/UF: ${p3 ? p3.cidadeEstado : "-"}`, margin + 4, y + 48);
  doc.text(`Tel Celular: ${p3 ? p3.telefone : "-"}`, margin + 80, y + 48);
  doc.text(`RG/CPF: ${p3 ? p3.documento : "-"}`, margin + 135, y + 48);

  y += 58;

  // Valoração & Dados Pix
  doc.setFillColor(255, 248, 240);
  doc.setDrawColor(255, 183, 3); // #ffb703
  doc.rect(margin, y, contentWidth, 18, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(180, 80, 0);
  doc.text("VALORES DE INSCRIÇÃO & PAGAMENTO PIX:", margin + 4, y + 5);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(30, 30, 30);
  doc.text("• Valor até 05/09/2026: R$ 550,00 | A partir de 06/09/2026: R$ 600,00 por equipe", margin + 4, y + 10);
  doc.text("• Chave Pix (Celular): 64992968588 | Nome: Carla Araujo Pelissari ou Bom de Pesca", margin + 4, y + 14);

  y += 22;

  // Seção 2: Informações Adicionais e Regulamento resumido
  checkPageBreak(50);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.setTextColor(242, 100, 25);
  doc.text("INFORMAÇÕES ADICIONAIS & NORMAS PRINCIPAIS:", margin, y);
  y += 4;

  const regras = [
    "• Início da competição às 07:00h do dia 12/09/2026 (Sábado). Vídeos das capturas enviados aos fiscais até às 20:00h do mesmo dia.",
    "• Modalidade: Pesca embarcada, de arremesso, alvo exclusivo Tucunaré (Cichla). Obrigatório o Pesque e Solte.",
    "• Comprovação de partida: Vídeo 360º evidenciando horário, embarcação no barranco, integrantes e viveiro da embarcação.",
    "• Medição oficial: Somente na régua oficial do evento com peixe bem posicionado em linha reta, boca totalmente fechada.",
    "• Régua oficial: Retirada de 07/09 a 11/09/2026 às 18:30h na Loja Bom de Pesca. Obrigatória a devolução na premiação.",
    "• Senha da competição: Sorteada em Live no Instagram em 11/09/2026 (20:00h às 21:00h). Deve ser escrita na régua.",
    "• Premiação: 13/09/2026 na Sede Social da OAB de Itumbiara-GO (11:00h às 17:00h). Troféus do 1º ao 10º lugar e maiores peixes.",
    "• Proibido uso de iscas vivas/naturais ou estilo corrico. Obrigatório o uso de coletes salva-vidas por todos os integrantes.",
  ];

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(40, 40, 40);

  regras.forEach((regra) => {
    const lines = doc.splitTextToSize(regra, contentWidth);
    checkPageBreak(lines.length * 3.5);
    doc.text(lines, margin, y);
    y += lines.length * 3.5;
  });

  y += 2;

  // Seção 3: Termo de Declaração de Risco
  checkPageBreak(40);
  doc.setFillColor(245, 245, 247);
  doc.rect(margin, y, contentWidth, 34, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(20, 20, 20);
  doc.text("* TERMO DE DECLARAÇÃO E ISENÇÃO DE RESPONSABILIDADE *", margin + 4, y + 5);

  const termoText =
    "Declaramos ter tido conhecimento integral do Regulamento do 4º Torneio Bom de Pesca e com ele concordado. Declaramos estar cientes da obrigatoriedade do uso de coletes salva-vidas e de estar em ordem com a documentação pessoal e da embarcação. Assumimos todos os riscos envolvidos na participação e isentamos os organizadores, colaboradores e patrocinadores de qualquer responsabilidade por danos materiais, morais ou físicos. Ao efetuar o pagamento da inscrição, a equipe ratifica concordância integral.";

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(60, 60, 60);
  const termoLines = doc.splitTextToSize(termoText, contentWidth - 8);
  doc.text(termoLines, margin + 4, y + 10);

  y += 38;

  // Rodapé com Telefone do WhatsApp de envio
  checkPageBreak(12);
  doc.setDrawColor(200, 200, 200);
  doc.line(margin, y, margin + contentWidth, y);
  y += 4;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(242, 100, 25);
  doc.text("Envie esta ficha preenchida e o comprovante Pix no WhatsApp: (16) 99620-1039", pageWidth / 2, y, {
    align: "center",
  });

  // Salvar PDF no dispositivo do usuário
  const cleanEquipeName = data.nomeEquipe.replace(/[^a-zA-Z0-9]/g, "_") || "equipe";
  doc.save(`Ficha_Inscricao_4_Torneio_Bom_de_Pesca_${cleanEquipeName}.pdf`);
}
