import html2canvas from "html2canvas";
import { RegistrationFormData } from "./whatsapp";

export async function generateRegistrationImage(data: RegistrationFormData): Promise<void> {
  const element = document.getElementById("ficha-inscricao-card");
  if (!element) {
    console.error("Elemento ficha-inscricao-card não encontrado");
    return;
  }

  try {
    // Renderiza a imagem em Alta Definição (scale: 2 ou 3)
    const canvas = await html2canvas(element, {
      scale: 2, // Alta Resolução Full HD
      useCORS: true,
      backgroundColor: "#0c0d1a",
      logging: false,
    });

    const imageURI = canvas.toDataURL("image/png", 1.0);

    // Cria o link de download automático da imagem
    const link = document.createElement("a");
    const cleanEquipeName = data.nomeEquipe.replace(/[^a-zA-Z0-9]/g, "_") || "equipe";
    link.download = `Ficha_Inscricao_${cleanEquipeName}.png`;
    link.href = imageURI;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Erro ao gerar imagem da ficha:", error);
  }
}
