import { RegistrationFormData } from "./whatsapp";

export async function generateRegistrationImage(data: RegistrationFormData): Promise<void> {
  return new Promise((resolve) => {
    // Canvas em Alta Resolução representando o Documento Oficial Completo Contínuo (estilo folha A4 alta resolução)
    const canvas = document.createElement("canvas");
    canvas.width = 1240; // Largura padrão A4 em 150 DPI
    
    // Preparar contextos e textos
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      resolve();
      return;
    }

    const padding = 100;
    const contentWidth = canvas.width - padding * 2;

    // Função auxiliar para quebrar texto em linhas
    const wrapText = (text: string, maxWidth: number, font: string): string[] => {
      ctx.font = font;
      const words = text.split(" ");
      const lines: string[] = [];
      let currentLine = words[0] || "";

      for (let i = 1; i < words.length; i++) {
        const word = words[i];
        const width = ctx.measureText(currentLine + " " + word).width;
        if (width < maxWidth) {
          currentLine += " " + word;
        } else {
          lines.push(currentLine);
          currentLine = word;
        }
      }
      lines.push(currentLine);
      return lines;
    };

    // 1. Montar todo o conteúdo do documento original com os dados preenchidos
    const p3 = data.terceiroPescador && data.terceiroPescador.nome.trim() ? data.terceiroPescador : null;

    const docSections: Array<{ type: "title" | "subtitle" | "field" | "bullet" | "paragraph" | "header" | "bold"; text: string }> = [
      { type: "title", text: "Ficha Inscrição 4º Torneio Bom de Pesca Itumbiara-GO" },
      { type: "paragraph", text: "" },
      { type: "field", text: "Data do Torneio: 12/09/2026 (Sábado)" },
      { type: "field", text: "Data da Premiação: 13/09/2026 (Domingo)" },
      { type: "field", text: "Local da Competição: Represa de Furnas Itumbiara-GO" },
      { type: "bold", text: `Nome da equipe: ${data.nomeEquipe.toUpperCase()}` },
      { type: "bold", text: `Cidade e Estado: ${data.cidadeEstadoEquipe.toUpperCase()}` },
      { type: "bold", text: "Obs.: Preencher informações abaixo conforme solicitado:" },
      { type: "paragraph", text: "" },

      { type: "bullet", text: `1º Nome completo do Capitão: ${data.capitao.nome}` },
      { type: "bullet", text: `Cidade e Estado: ${data.capitao.cidadeEstado}` },
      { type: "bullet", text: `Telefone Celular: ${data.capitao.telefone}` },
      { type: "bullet", text: `RG Ou CPF: ${data.capitao.documento}` },
      { type: "paragraph", text: "" },

      { type: "bullet", text: `Nome completo do 2º Pescador: ${data.segundoPescador.nome}` },
      { type: "bullet", text: `Cidade e Estado: ${data.segundoPescador.cidadeEstado}` },
      { type: "bullet", text: `Telefone Celular: ${data.segundoPescador.telefone}` },
      { type: "bullet", text: `RG Ou CPF: ${data.segundoPescador.documento}` },
      { type: "paragraph", text: "" },

      { type: "bullet", text: `Nome completo do 3º Pescador: ${p3 ? p3.nome : "(Não informado)"}` },
      { type: "bullet", text: `Cidade e Estado: ${p3 ? p3.cidadeEstado : "-"}` },
      { type: "bullet", text: `Telefone Celular: ${p3 ? p3.telefone : "-"}` },
      { type: "bullet", text: `RG Ou CPF: ${p3 ? p3.documento : "-"}` },
      { type: "paragraph", text: "" },

      { type: "bold", text: "- Valor da Inscrição por equipe até 05/09/2026 é R$ 550,00" },
      { type: "bold", text: "- Valor da Inscrição a partir do dia 06/09/2026 é R$ 600,00" },
      { type: "paragraph", text: "" },

      { type: "header", text: "INFORMAÇÕES PARA PAGAMENTO DA SUA INSCRIÇÃO DO 4º TORNEIO BOM DE PESCA" },
      { type: "bullet", text: "Dados para Pagamento:" },
      { type: "bullet", text: "Chave Pix Nº de Celular: 64992968588" },
      { type: "bullet", text: "Nome: Carla Araujo Pelissari ou Bom de Pesca" },
      { type: "paragraph", text: "" },

      { type: "title", text: "Informações adicionais:" },
      { type: "paragraph", text: "A competição ocorrerá no dia 12/09/2026 (Sábado), tendo como início às 07:00h e os vídeos das capturas devem serem enviados aos fiscais até às 20:00h do dia 12/09/2026 (Sábado), sendo que os vídeos devem ser feitos ainda com a iluminação natural sem a utilização de artifícios como lanternas e outros mecanismos de luz artificial;" },
      { type: "paragraph", text: "O torneio consiste em pesca embarcada, na modalidade de arremesso;" },
      { type: "paragraph", text: "A largada vai ocorrer às 07:00h, e será de forma livre, desta forma os competidores podem desembarcar em qualquer local do reservatório da Usina Hidrelétrica de Furnas de Itumbiara-GO, também teremos alguns pontos de apoio na região para desembarque os quais serão divulgados ao longo da programação da competição no grupo dos capitães;" },
      { type: "paragraph", text: "A comprovação do horário e também do local em que estiverem largando, deve ser realizada por todas as equipes competidoras, de forma que deverão fazer um vídeo 360º evidenciando o horário e a embarcação próxima ao barranco, neste momento evidenciar no vídeo todos integrantes da equipe e também filmar o viveiro da embarcação antes da partida, este vídeo deve ser encaminhado junto com os vídeos das medições dos 06 (seis) exemplares aos fiscais responsáveis por cada equipe competidora;" },
      { type: "paragraph", text: "O peixe alvo da competição é única e exclusivamente o Tucunaré (Cichla); onde será obrigatório o pesque e solte;" },
      { type: "paragraph", text: "A competição pode ser formada por até três (03) integrantes por equipe os quais poderão capturar quantos peixes forem possíveis durante toda a competição, porém somente serão validados e apresentados os seis (6) peixes/vídeos, os quais serão avaliados um a um pela comissão organizadora (FISCAIS DA COMPETIÇÃO QUE SERÃO DEFINIDOS DE FORMA ALEATORIA POR NUMERO DE EQUIPES) e assim realizar a média dessa medição apresentada pela equipe participante, cuja validação e divulgação se reserva apenas à comissão organizadora da competição, onde a decisão da equipe organizadora/fiscalizadora é inquestionável/inapelável;" },
      { type: "paragraph", text: "Os exemplares capturados devem ser filmados e medidos da forma correta pelos participantes, só é válido a medição dentro da embarcação, preferencialmente no local da captura, medidos em metro linear incluindo sua primeira casa decimal (cm), todos os exemplares/peixes capturados e apresentados devem obrigatoriamente filmados, evidenciando tanto o peixe bem posicionado na régua, em linha reta, na mesma posição da imagem destacada na régua oficial do evento e também conforme anexo deste regulamento, esta medição deve constar/aparecer a etiqueta com o número de identificação da equipe, em hipótese alguma será permitido fazer medição em outra régua que não seja a oficial do evento, e também será disponibilizado no grupo dos capitães o modelo correto de filmagem de medição e soltura do peixe." },
      { type: "paragraph", text: "Na régua tem a imagem do peixe e também qual a posição ele deverá ser colocado/posicionado para a validação, então caso o peixe for colocado ao contrário/oposto da imagem de exemplo na régua, o peixe será invalidado!" },
      { type: "paragraph", text: "Não haverá reposição em caso de perda da régua oficial do evento, é obrigação das equipes cuidar para que não a perca, uma vez que, EM HIPÓTESE ALGUMA SERÁ PERMITIDO FAZER MEDIÇÃO EM OUTRA RÉGUA QUE NÃO SEJA A OFICIAL DO EVENTO." },
      { type: "paragraph", text: "Acaso o peixe não for medido de forma correta, conforme no anexo deste regulamento, ou seja, quando o peixe estiver com a boca aberta e/ou fechada com o auxílio das mãos/dedos e/ou rabo torto ou fechado, fora das duas faixas centrais destacada na régua oficial desta competição e/ou os fiscais julgarem que o vídeo não foi realizado dentro da forma regulamentada neste item, SERÁ PENALIZADO COM O DESCONTO DE ATÉ 02 (DOIS) CENTÍMETROS, deste exemplar/peixe;" },
      { type: "paragraph", text: "Os participantes terão que enviar os seus vídeos até às 20:00h do dia 12/09/2026, sábado e no envio dos vídeos solicitar aos fiscais a confirmação do recebimento, por exemplo: ok recebido;" },
      { type: "paragraph", text: "Os vídeos apresentados fora do período vigente da competição, destacado no item 4.7 do regulamento, não serão considerados pelos fiscais do evento;" },
      { type: "paragraph", text: "As equipes devem fazer os seus vídeos das medições e solturas dos peixes por capturas, com a gravação dos mesmos no início da medição e terminando ao final da soltura, evidenciando de forma clara o tamanho do peixe com enquadramento completo do exemplar, o qual deverá ser solto em condições de vida, em uma só tomada, até o peixe/exemplar tenha submergido completamente de forma espontânea." },
      { type: "paragraph", text: "É imprescindível que a medição através dos vídeos mostre claramente o tamanho do exemplar e caso a medição não evidencie o tamanho peixe, o exemplar será desclassificado;" },
      { type: "paragraph", text: "Caso ocorra de alguma embarcação ter problemas na represa e ter seus vídeos para efetuar suas conferências, a mesma deverá, de qualquer forma, encaminhar estes vídeos dentro do horário limite das 20:00h;" },
      { type: "paragraph", text: "Cada equipe é responsável pelo encaminhamento e seleção dos vídeos enviados para comissão de arbitragem;" },
      { type: "paragraph", text: "A divulgação da planilha de classificação será de acesso restrito à comissão organizadora, a mesma será apresentada no término da apuração, com resultado do 1º ao 10º colocado, as demais posições serão apresentadas ao longo da semana do dia 13/09 ao 19/09/2026 para todos os participantes da competição;" },
      { type: "paragraph", text: "Caso o competidor não estiver de acordo com o resultado proferido pela arbitragem, este poderá fazer um pedido de revisão imediatamente após receber o resultado da sua média, solicitando que um outro fiscal analise o vídeo desejado, “Este outro fiscal será escolhido pela comissão de arbitragem” após a decisão final dos dois árbitros, não caberá mais mudanças no resultado apresentado;" },
      { type: "paragraph", text: "Proferido o resultado pela arbitragem, este é soberano, não passível de questionamentos futuros;" },
      { type: "paragraph", text: "Fica terminalmente proibido o uso de quaisquer tipos de iscas vivas/naturais, bem como utilizar de pesca no estilo corrico, somente arrastando as iscas artificiais, sem fazer arremessos, utilizando somente a impulsão do motor de popa ou elétrico;" },
      { type: "paragraph", text: "Poderão ser realizadas fiscalizações pela comissão organizadora antes, durante e também após a competição, em todos os compartimentos das embarcações, bem como assessórios, como: garrafas térmicas, caixas térmicas, etc. E se for negado à fiscalização/vistoria da embarcação, esta equipe poderá ser desclassificada da competição;" },
      { type: "paragraph", text: "É expressamente proibido a utilização de drone na competição, a utilização deste equipamento só será permitida para a equipe cinegrafista credenciada e com autorização da organização do Torneio;" },
      { type: "paragraph", text: "Se houver um atraso na partida por alguma equipe, por culpa da própria, não invalida a sua participação na competição, uma vez que o prejuízo será da própria equipe;" },
      { type: "paragraph", text: "É proibido abordar ou deixar ser abordado por qualquer outra embarcação que esteja ou não participando do evento, essa regra é válida apenas no momento da pescaria;" },
      { type: "paragraph", text: "Só poderá ser feita alguma abordagem as embarcações participantes pela comissão organizadora que fiscalizará a competição ou em caso de eventual prestação de socorro, sendo necessário a comprovação dos fatos através de registro de vídeos;" },
      { type: "paragraph", text: "Não terá espaço ou distância mínima entre equipes em nenhum perímetro de ação de pesca durante a competição, desta forma, o que vai prevalecer é o bom senso de cada equipe participante da competição, a falta de respeito ou qualquer desavença entre as equipes envolvidas não será em nenhum momento de responsabilidade da organização do 4º Torneio Bom de Pesca, isentando a organização sobre qualquer aspecto material, moral ou físico proveniente de discussões ou desavenças citadas neste parágrafo;" },
      { type: "paragraph", text: "Toda equipe participante do 4º Torneio Bom de Pesca tem a total liberdade para efetuar fiscalização em qualquer outra equipe participante da competição, e em caso de alguma irregularidade ou fraude ocorrida durante o evento, mediante as provas colhidas por fotos ou vídeos, estas devem ser enviadas a arbitragem para que se faça a verificação, onde se comprovada a fraude dessa equipe, a mesma será desclassificada da competição por atitude fraudulenta;" },
      { type: "paragraph", text: "Fica o evento (Organizador), e também os seus apoiadores (patrocinadores), isentos de eventuais danos ocorridos antes, durante e após a competição;" },
      { type: "paragraph", text: "Em caso de brusca mudança no tempo, o evento poderá/deverá ser transferido ou adiado, para garantir primeiramente a segurança de todos os envolvidos na competição;" },
      { type: "paragraph", text: "É obrigatório o uso de coletes salva vidas para cada competidor da competição conforme a legislação Pátria;" },
      { type: "paragraph", text: "É obrigatório a soltura com condições de vida de todos os exemplares capturados independente da espécie. Assim, a equipe flagrada com peixe na embarcação vivo ou morto será desclassificada, o peixe só poderá estar no viveiro da embarcação, vivo, para recuperação e ou em caso de cardume." },
      { type: "paragraph", text: "Os vídeos deverão ser gravados com resolução e nitidez que permitam avaliar o tamanho do peixe, com áudio e vídeo de boa qualidade, cabendo à Comissão Organizadora (Fiscais Responsáveis) a responsabilidade de validar o exemplar, com parecer inquestionável/inapelável;" },
      { type: "paragraph", text: "Caso o vídeo não esteja em condições aceitáveis pela Comissão Organizadora, o mesmo será descartado e invalidado;" },
      { type: "paragraph", text: "O peixe/exemplar deverá ser colocado na régua com a boca totalmente fechada, livre de apetrechos de contenção (Alicates/outros), com a barriga voltada para a lente filmadora. Sua cauda deverá ficar livre e reta de modo a buscar, naturalmente seu alcance de medida; anomalia caudal não será contada como tamanho do peixe ”Não tentem posicionar o rabo do peixe a fim de encontrar maior tamanho, deixe o rabo do peixe reto e espalmado, caso o peixe vire ou apresente sinais de que não vai nadar, o mesmo não será válido, exemplares que estiverem com a boca aberta, rabo torto, calda não espalmada, poderão descontados até 02cm (Dois centímetros) deste exemplar/peixe”;" },
      { type: "paragraph", text: "Realizar a filmagem mostrando o peixe por completo, movimentando a câmera lentamente e cuidadosamente, para não deixar dúvidas, evitando a desclassificação do vídeo, se possível enviar os vídeos em qualidade (HD);" },
      { type: "paragraph", text: "O vídeo deverá continuar mostrando a soltura do peixe até este submergir por completo; Os vídeos apresentados deverão estar em gravação única, isentos de cortes/edições;" },
      { type: "paragraph", text: "Toda equipe é responsável pela sua documentação pessoal e necessárias, da embarcação e integridade física, material de todos integrantes;" },
      { type: "bold", text: "Use Colete Salva Vidas" },
      { type: "paragraph", text: "A régua oficial do evento estará disponível para ser retirada a partir do dia 07/09/2026 aqui na loja Bom de Pesca e data limite a ser retirada é até o dia 11/09/2026, sexta-feira até às 18h e 30min. (A régua oficial estará disponível para ser retirada na loja Bom de Pesca na semana que antecede do 4º Torneio Bom de Pesca)." },
      { type: "paragraph", text: "É (01) uma régua por equipe e será obrigatório a devolução da mesma, o número da equipe vai estar anexado na régua no adesivo onde as equipes vão escrever a senha da competição, que será sorteada na live do dia 11/09, na sexta-feira que antecede a competição, será entregue uma folha junto com a régua de alguns números de telefones importantes como o número do Samu 192 do Corpo de Bombeiros 193, e também os números dos organizadores do evento (64) 99291-9324 – João Pelissari ou (64) 98122-4558 – Carla Pelissari." },
      { type: "paragraph", text: "A régua poderá ser retirada também por outra pessoa que não seja um dos integrantes da equipe inscrita, desde que tenha uma autorização via mensagem escrita pelo WhatsApp do próprio capitão dessa equipe." },
      { type: "paragraph", text: "A senha da competição será sorteada e transmitida através de uma Live no Instagram no dia 11/09/2026 entre às 20:00h e 21:00h, onde teremos também esse espaço de tempo para tirar possíveis dúvidas dos competidores. (A senha não precisa ser verbalizada/falada, mas é obrigatório que esteja escrita e apareça no vídeo de medição);" },
      { type: "paragraph", text: "No dia 13/09/2016 teremos a cerimônia de premiação do evento que se inicia às 11:00h com encerramento às 17:00h, no local – Sede Social da OAB (Ordem dos Advogados do Brasil), endereço: Rua Augusto Alino de Melo, Nº 177, Bairro: Nova Aurora, ao lado da CDL de Itumbiara-GO, onde será realizada a cerimônia de entrega dos troféus da 1ª a 10ª Equipe e também os troféus do maior Tucunaré Azul, o maior Tucunaré Amarelo e o maior Peixe Feminino, um dos integrantes de cada equipe deve trocar a régua oficial da competição pelo peixinho da sorte, no peixinho da sorte terá o número da sua equipe que será o número da sorte para concorrer por meio de sorteio todas as premiações, neste mesmo espaço teremos refeições para serem comercializadas." },
      { type: "paragraph", text: "" },
      { type: "title", text: "* TERMO DE DECLARAÇÃO *" },
      { type: "paragraph", text: "Declaramos ter tido conhecimento integral do Regulamento do 4º Torneio Bom de Pesca e com ele concordado;" },
      { type: "paragraph", text: "Declaramos estar ciente da obrigação de utilização dos coletes salva vidas e da obrigatoriedade de estar em ordem com a documentação pessoal para pratica da pesca esportiva e da embarcação;" },
      { type: "paragraph", text: "Declaramos estar cientes que por ser um Torneio de Pesca Esportiva, cujas atividades têm elementos de risco inclusive físico e material, os quais são pela equipe aceitos voluntariamente, onde a nossa equipe que está se inscrevendo assume todos os riscos envolvidos em consequências da participação da nossa equipe no torneio. A equipe ainda declara e isenta os organizadores do torneio de qualquer responsabilidade em decorrência da participação da equipe por livre e espontânea vontade no evento, e declara estar cientes que os Organizadores e Patrocinadores do evento não se responsabilizarão por eventuais despesas médicas e/ou hospitalares, bem como indenizações de qualquer natureza em caso de acidentes, isentando, portanto, a organização, colaboradores e patrocinadores de toda e qualquer responsabilidade por quaisquer danos materiais, morais ou físicos que por ventura sofra ou cause a quem quer que seja durante o torneio." },
      { type: "bold", text: "Ao fazer inscrição, com a efetivação do pagamento, a equipe está de acordo com regulamento e todas as declarações apresentadas nesta ficha de inscrição do 4º Torneio Bom de Pesca." }
    ];

    // 2. Calcular altura total necessária para renderizar todas as 8 páginas do documento em scroll contínuo
    let currentY = 120;
    const lineHeight = 32;

    docSections.forEach((sec) => {
      if (sec.type === "title") {
        currentY += 60;
      } else if (sec.type === "header") {
        currentY += 50;
      } else if (sec.type === "bold") {
        const lines = wrapText(sec.text, contentWidth, "bold 24px Arial, sans-serif");
        currentY += lines.length * 36 + 10;
      } else if (sec.type === "field" || sec.type === "bullet") {
        const textToWrap = sec.type === "bullet" ? `●  ${sec.text}` : sec.text;
        const lines = wrapText(textToWrap, contentWidth - 40, "24px Arial, sans-serif");
        currentY += lines.length * 34 + 6;
      } else if (sec.type === "paragraph") {
        if (sec.text === "") {
          currentY += 20;
        } else {
          const lines = wrapText(sec.text, contentWidth, "22px Arial, sans-serif");
          currentY += lines.length * 32 + 16;
        }
      }
    });

    // Definir altura total do canvas dinamicamente com folga
    canvas.height = Math.max(currentY + 140, 4800);

    // 3. Renderizar o Fundo Branco Estilo Papel A4 Impresso (#ffffff)
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Borda/Sombra suave estilo documento impresso
    ctx.strokeStyle = "#e5e7eb";
    ctx.lineWidth = 2;
    ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);

    // Renderizar o Texto com Formatação Fiel
    let y = 140;

    docSections.forEach((sec) => {
      ctx.fillStyle = "#000000";

      if (sec.type === "title") {
        ctx.font = "bold 32px Arial, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(sec.text, canvas.width / 2, y);
        ctx.textAlign = "left";
        y += 60;
      } else if (sec.type === "header") {
        ctx.font = "bold 22px Arial, sans-serif";
        const lines = wrapText(sec.text, contentWidth, "bold 22px Arial, sans-serif");
        lines.forEach((line) => {
          ctx.fillText(line, padding, y);
          y += 30;
        });
        y += 10;
      } else if (sec.type === "bold") {
        ctx.font = "bold 24px Arial, sans-serif";
        const lines = wrapText(sec.text, contentWidth, "bold 24px Arial, sans-serif");
        lines.forEach((line) => {
          ctx.fillText(line, padding, y);
          y += 34;
        });
        y += 8;
      } else if (sec.type === "field") {
        ctx.font = "24px Arial, sans-serif";
        const lines = wrapText(sec.text, contentWidth, "24px Arial, sans-serif");
        lines.forEach((line) => {
          ctx.fillText(line, padding, y);
          y += 34;
        });
        y += 4;
      } else if (sec.type === "bullet") {
        ctx.font = "24px Arial, sans-serif";
        const lines = wrapText(`●  ${sec.text}`, contentWidth - 30, "24px Arial, sans-serif");
        lines.forEach((line, index) => {
          ctx.fillText(index === 0 ? line : `    ${line}`, padding + 20, y);
          y += 34;
        });
        y += 4;
      } else if (sec.type === "paragraph") {
        if (sec.text === "") {
          y += 18;
        } else {
          ctx.font = "22px Arial, sans-serif";
          const lines = wrapText(sec.text, contentWidth, "22px Arial, sans-serif");
          lines.forEach((line) => {
            ctx.fillText(line, padding, y);
            y += 32;
          });
          y += 16;
        }
      }
    });

    // Rodapé de Envio
    ctx.fillStyle = "#16a34a";
    ctx.font = "bold 24px Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Envie no WhatsApp: 55 16 99620-1039", canvas.width / 2, canvas.height - 50);
    ctx.textAlign = "left";

    // 4. Exportação e Download Automático em PNG
    try {
      const imageURI = canvas.toDataURL("image/png", 1.0);
      const link = document.createElement("a");
      const cleanEquipeName = data.nomeEquipe.replace(/[^a-zA-Z0-9]/g, "_") || "equipe";
      link.download = `Ficha_Inscricao_Oficial_${cleanEquipeName}.png`;
      link.href = imageURI;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      console.error("Erro ao gerar imagem PNG da Ficha:", e);
    }

    resolve();
  });
}
