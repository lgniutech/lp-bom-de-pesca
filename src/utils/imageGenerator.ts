import { RegistrationFormData } from "./whatsapp";

export async function generateRegistrationImage(data: RegistrationFormData): Promise<void> {
  return new Promise((resolve) => {
    // 1. Criar um Canvas nativo em alta definição (Width: 1200px, Height: 1600px - Full HD)
    const canvas = document.createElement("canvas");
    canvas.width = 1200;
    canvas.height = 1600;

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      resolve();
      return;
    }

    // Fundo Escuro do Torneio (#0c0d1a)
    ctx.fillStyle = "#0c0d1a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Moldura Laranja (#f26419)
    ctx.lineWidth = 12;
    ctx.strokeStyle = "#f26419";
    ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

    // Cabeçalho - Faixa Gradiente / Laranja
    ctx.fillStyle = "#14152b";
    ctx.fillRect(40, 40, canvas.width - 80, 180);
    ctx.lineWidth = 4;
    ctx.strokeStyle = "rgba(242, 100, 25, 0.5)";
    ctx.strokeRect(40, 40, canvas.width - 80, 180);

    // Título Principal
    ctx.fillStyle = "#ffb703";
    ctx.font = "bold 24px sans-serif";
    ctx.fillText("DOCUMENTO OFICIAL DE INSCRIÇÃO", 70, 85);

    ctx.fillStyle = "#ffffff";
    ctx.font = "black 38px sans-serif";
    ctx.fillText("4º TORNEIO BOM DE PESCA ITUMBIARA-GO", 70, 135);

    ctx.fillStyle = "#d1d5db";
    ctx.font = "20px sans-serif";
    ctx.fillText("Data: 12/09/2026 (Sábado) • Represa de Furnas Itumbiara-GO", 70, 175);

    // Seção 1: Dados da Equipe
    ctx.fillStyle = "#14152b";
    ctx.fillRect(40, 250, canvas.width - 80, 520);
    ctx.strokeStyle = "rgba(242, 100, 25, 0.4)";
    ctx.strokeRect(40, 250, canvas.width - 80, 520);

    ctx.fillStyle = "#f26419";
    ctx.font = "bold 28px sans-serif";
    ctx.fillText(`EQUIPE: ${data.nomeEquipe.toUpperCase() || "NÃO INFORMADO"}`, 70, 305);

    ctx.fillStyle = "#ffb703";
    ctx.font = "bold 22px sans-serif";
    ctx.fillText(`CIDADE/ESTADO: ${data.cidadeEstadoEquipe.toUpperCase() || "ITUMBIARA-GO"}`, 680, 305);

    // Linha divisória
    ctx.beginPath();
    ctx.moveTo(70, 330);
    ctx.lineTo(canvas.width - 70, 330);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
    ctx.stroke();

    // 1º Pescador
    ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
    ctx.fillRect(70, 350, canvas.width - 140, 110);
    ctx.fillStyle = "#ffb703";
    ctx.font = "bold 22px sans-serif";
    ctx.fillText(`1º PESCADOR (CAPITÃO): ${data.capitao.nome}`, 90, 390);
    ctx.fillStyle = "#ffffff";
    ctx.fillText(`Doc: ${data.capitao.documento}`, 780, 390);
    ctx.fillStyle = "#9ca3af";
    ctx.font = "20px sans-serif";
    ctx.fillText(`Cidade/UF: ${data.capitao.cidadeEstado}   |   Tel Celular: ${data.capitao.telefone}`, 90, 430);

    // 2º Pescador
    ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
    ctx.fillRect(70, 480, canvas.width - 140, 110);
    ctx.fillStyle = "#ffb703";
    ctx.font = "bold 22px sans-serif";
    ctx.fillText(`2º PESCADOR: ${data.segundoPescador.nome}`, 90, 520);
    ctx.fillStyle = "#ffffff";
    ctx.fillText(`Doc: ${data.segundoPescador.documento}`, 780, 520);
    ctx.fillStyle = "#9ca3af";
    ctx.font = "20px sans-serif";
    ctx.fillText(`Cidade/UF: ${data.segundoPescador.cidadeEstado}   |   Tel Celular: ${data.segundoPescador.telefone}`, 90, 560);

    // 3º Pescador
    const p3 = data.terceiroPescador && data.terceiroPescador.nome.trim() ? data.terceiroPescador : null;
    ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
    ctx.fillRect(70, 610, canvas.width - 140, 110);
    ctx.fillStyle = "#ffb703";
    ctx.font = "bold 22px sans-serif";
    ctx.fillText(`3º PESCADOR: ${p3 ? p3.nome : "(Não informado)"}`, 90, 650);
    ctx.fillStyle = "#ffffff";
    ctx.fillText(`Doc: ${p3 ? p3.documento : "-"}`, 780, 650);
    ctx.fillStyle = "#9ca3af";
    ctx.font = "20px sans-serif";
    ctx.fillText(`Cidade/UF: ${p3 ? p3.cidadeEstado : "-"}   |   Tel Celular: ${p3 ? p3.telefone : "-"}`, 90, 690);

    // Seção 2: Dados Pix
    ctx.fillStyle = "#171933";
    ctx.fillRect(40, 800, canvas.width - 80, 160);
    ctx.strokeStyle = "#ffb703";
    ctx.lineWidth = 3;
    ctx.strokeRect(40, 800, canvas.width - 80, 160);

    ctx.fillStyle = "#ffb703";
    ctx.font = "bold 24px sans-serif";
    ctx.fillText("DADOS PARA PAGAMENTO DA INSCRIÇÃO (PIX):", 70, 845);

    ctx.fillStyle = "#ffffff";
    ctx.font = "22px sans-serif";
    ctx.fillText("Chave Pix Celular: ", 70, 890);
    ctx.fillStyle = "#ffb703";
    ctx.font = "bold 26px monospace";
    ctx.fillText("64992968588", 260, 890);

    ctx.fillStyle = "#d1d5db";
    ctx.font = "20px sans-serif";
    ctx.fillText("Favorecida: Carla Araujo Pelissari ou Bom de Pesca", 70, 930);

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 22px sans-serif";
    ctx.fillText("Valor: R$ 550,00 (até 05/09) | R$ 600,00 (a partir de 06/09)", 620, 890);

    // Seção 3: Regras e Termo
    ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
    ctx.fillRect(40, 990, canvas.width - 80, 480);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
    ctx.strokeRect(40, 990, canvas.width - 80, 480);

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 24px sans-serif";
    ctx.fillText("TERMO DE DECLARAÇÃO & REGRAS DA COMPETIÇÃO:", 70, 1035);

    ctx.fillStyle = "#d1d5db";
    ctx.font = "18px sans-serif";
    const regrasText = [
      "• Largada livre às 07:00h do dia 12/09/2026. Envio dos vídeos das capturas até às 20:00h aos fiscais.",
      "• Peixe alvo exclusivo: Tucunaré (Cichla). Modalidade arremesso, embarcada. Pesque e solte obrigatório.",
      "• Comprovação de partida: Vídeo 360º evidenciando horário, embarcação no barranco e viveiro.",
      "• Medição oficial feita exclusivamente na régua oficial do evento fornecida pela organização.",
      "• Uso de coletes salva-vidas obrigatório por todos os integrantes durante todo o evento.",
      "• Declaramos ter conhecimento integral do Regulamento oficial e isentamos os organizadores e apoiadores",
      "  de quaisquer responsabilidades por danos materiais, morais ou físicos durante o torneio.",
    ];

    let lineY = 1085;
    regrasText.forEach((linha) => {
      ctx.fillText(linha, 70, lineY);
      lineY += 42;
    });

    // Rodapé
    ctx.fillStyle = "#25D366";
    ctx.font = "bold 22px sans-serif";
    ctx.fillText("Envie no WhatsApp da Organização: (16) 99620-1039", 70, 1540);

    ctx.fillStyle = "#9ca3af";
    ctx.font = "20px sans-serif";
    ctx.fillText("Contatos: (64) 99291-9324 / (64) 98122-4558", 720, 1540);

    // Exportação em PNG
    try {
      const imageURI = canvas.toDataURL("image/png", 1.0);
      const link = document.createElement("a");
      const cleanEquipeName = data.nomeEquipe.replace(/[^a-zA-Z0-9]/g, "_") || "equipe";
      link.download = `Ficha_Inscricao_${cleanEquipeName}.png`;
      link.href = imageURI;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      console.error("Erro na exportação do DataURL:", e);
    }

    resolve();
  });
}
