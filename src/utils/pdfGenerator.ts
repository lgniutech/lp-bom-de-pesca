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
  const margin = 18;
  const contentWidth = pageWidth - margin * 2;
  let y = 20;

  const checkPageBreak = (neededHeight: number) => {
    if (y + neededHeight > pageHeight - margin) {
      doc.addPage();
      y = 20;
    }
  };

  // TÍTULO DO DOCUMENTO
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.text("Ficha Inscrição 4º Torneio Bom de Pesca Itumbiara-GO", pageWidth / 2, y, { align: "center" });
  y += 15;

  // DADOS GERAIS
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Data do Torneio: 12/09/2026 (Sábado)", margin, y); y += 6;
  doc.text("Data da Premiação: 13/09/2026 (Domingo)", margin, y); y += 6;
  doc.text("Local da Competição: Represa de Furnas Itumbiara-GO", margin, y); y += 8;

  doc.setFont("helvetica", "bold");
  doc.text(`Nome da equipe: ${data.nomeEquipe.toUpperCase()}`, margin, y); y += 6;
  const eqCid = (data.cidadeEquipe || data.cidadeEstadoEquipe || "").toUpperCase();
  const eqEst = (data.estadoEquipe || "").toUpperCase();
  doc.text(`Cidade: ${eqCid || "-"}`, margin, y); y += 6;
  doc.text(`Estado: ${eqEst || "-"}`, margin, y); y += 8;
  doc.text("Obs.: Preencher informações abaixo conforme solicitado:", margin, y); y += 10;

  // CAPITÃO
  doc.setFont("helvetica", "normal");
  doc.text(`-  1º Nome completo do Capitão: ${data.capitao.nome}`, margin + 4, y); y += 6;
  const capCid = data.capitao.cidade || data.capitao.cidadeEstado || "";
  const capEst = data.capitao.estado || "";
  doc.text(`-  Cidade: ${capCid || "-"}`, margin + 4, y); y += 6;
  doc.text(`-  Estado: ${capEst || "-"}`, margin + 4, y); y += 6;
  doc.text(`-  Telefone Celular: ${data.capitao.telefone}`, margin + 4, y); y += 6;
  doc.text(`-  RG Ou CPF: ${data.capitao.documento}`, margin + 4, y); y += 10;

  // 2º PESCADOR
  const p2 = data.segundoPescador && data.segundoPescador.nome && data.segundoPescador.nome.trim() ? data.segundoPescador : null;
  const p2Cid = p2 ? (p2.cidade || p2.cidadeEstado || "-") : "-";
  const p2Est = p2 ? (p2.estado || "-") : "-";
  doc.text(`-  Nome completo do 2º Pescador: ${p2 ? p2.nome : "(Não informado)"}`, margin + 4, y); y += 6;
  doc.text(`-  Cidade: ${p2Cid}`, margin + 4, y); y += 6;
  doc.text(`-  Estado: ${p2Est}`, margin + 4, y); y += 6;
  doc.text(`-  Telefone Celular: ${p2 ? p2.telefone : "-"}`, margin + 4, y); y += 6;
  doc.text(`-  RG Ou CPF: ${p2 ? p2.documento : "-"}`, margin + 4, y); y += 10;

  // 3º PESCADOR
  const p3 = data.terceiroPescador && data.terceiroPescador.nome && data.terceiroPescador.nome.trim() ? data.terceiroPescador : null;
  const p3Cid = p3 ? (p3.cidade || p3.cidadeEstado || "-") : "-";
  const p3Est = p3 ? (p3.estado || "-") : "-";
  doc.text(`-  Nome completo do 3º Pescador: ${p3 ? p3.nome : "(Não informado)"}`, margin + 4, y); y += 6;
  doc.text(`-  Cidade: ${p3Cid}`, margin + 4, y); y += 6;
  doc.text(`-  Estado: ${p3Est}`, margin + 4, y); y += 6;
  doc.text(`-  Telefone Celular: ${p3 ? p3.telefone : "-"}`, margin + 4, y); y += 6;
  doc.text(`-  RG Ou CPF: ${p3 ? p3.documento : "-"}`, margin + 4, y); y += 12;

  // VALORES
  doc.setFont("helvetica", "bold");
  doc.text("- Valor da Inscrição por equipe até 05/09/2026 é R$ 550,00", margin, y); y += 6;
  doc.text("- Valor da Inscrição a partir do dia 06/09/2026 é R$ 600,00", margin, y); y += 12;

  // PIX
  doc.setFont("helvetica", "bold");
  doc.text("INFORMAÇÕES PARA PAGAMENTO DA SUA INSCRIÇÃO DO 4º TORNEIO BOM DE PESCA", margin, y); y += 6;
  doc.setFont("helvetica", "normal");
  doc.text("•  Dados para Pagamento:", margin + 4, y); y += 6;
  doc.text("•  Chave Pix Nº de Celular: 64992968588", margin + 4, y); y += 6;
  doc.text("•  Nome: Carla Araujo Pelissari ou Bom de Pesca", margin + 4, y); y += 14;

  // INFORMAÇÕES ADICIONAIS
  checkPageBreak(20);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("Informações adicionais:", margin, y); y += 8;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);

  const regras = [
    "A competição ocorrerá no dia 12/09/2026 (Sábado), tendo como início às 07:00h e os vídeos das capturas devem serem enviados aos fiscais até às 20:00h do dia 12/09/2026 (Sábado), sendo que os vídeos devem ser feitos ainda com a iluminação natural sem a utilização de artifícios como lanternas e outros mecanismos de luz artificial;",
    "O torneio consiste em pesca embarcada, na modalidade de arremesso;",
    "A largada vai ocorrer às 07:00h, e será de forma livre, desta forma os competidores podem desembarcar em qualquer local do reservatório da Usina Hidrelétrica de Furnas de Itumbiara-GO, também teremos alguns pontos de apoio na região para desembarque os quais serão divulgados ao longo da programação da competição no grupo dos capitães;",
    "A comprovação do horário e também do local em que estiverem largando, deve ser realizada por todas as equipes competidoras, de forma que deverão fazer um vídeo 360º evidenciando o horário e a embarcação próxima ao barranco, neste momento evidenciar no vídeo todos integrantes da equipe e também filmar o viveiro da embarcação antes da partida, este vídeo deve ser encaminhado junto com os vídeos das medições dos 06 (seis) exemplares aos fiscais responsáveis por cada equipe competidora;",
    "O peixe alvo da competição é única e exclusivamente o Tucunaré (Cichla); onde será obrigatório o pesque e solte;",
    "A competição pode ser formada por até três (03) integrantes por equipe os quais poderão capturar quantos peixes forem possíveis durante toda a competição, porém somente serão validados e apresentados os seis (6) peixes/vídeos, os quais serão avaliados um a um pela comissão organizadora (FISCAIS DA COMPETIÇÃO QUE SERÃO DEFINIDOS DE FORMA ALEATORIA POR NUMERO DE EQUIPES) e assim realizar a média dessa medição apresentada pela equipe participante, cuja validação e divulgação se reserva apenas à comissão organizadora da competição, onde a decisão da equipe organizadora/fiscalizadora é inquestionável/inapelável,",
    "Os exemplares capturados devem ser filmados e medidos da forma correta pelos participantes, só é válido a medição dentro da embarcação, preferencialmente no local da captura, medidos em metro linear incluindo sua primeira casa decimal (cm), todos os exemplares/peixes capturados e apresentados devem obrigatoriamente filmados, evidenciando tanto o peixe bem posicionado na régua, em linha reta, na mesma posição da imagem destacada na régua oficial do evento e também conforme anexo deste regulamento, esta medição deve constar/aparecer a etiqueta com o número de identificação da equipe, em hipótese alguma será permitido fazer medição em outra régua que não seja a oficial do evento, e também será disponibilizado no grupo dos capitães o modelo correto de filmagem de medição e soltura do peixe.",
    "Na régua tem a imagem do peixe e também qual a posição ele deverá ser colocado/posicionado para a validação, então caso o peixe for colocado ao contrário/oposto da imagem de exemplo na régua, o peixe será invalidado!",
    "Não haverá reposição em caso de perda da régua oficial do evento, é obrigação das equipes cuidar para que não a perca, uma vez que, EM HIPÓTESE ALGUMA SERÁ PERMITIDO FAZER MEDIÇÃO EM OUTRA RÉGUA QUE NÃO SEJA A OFICIAL DO EVENTO.",
    "Acaso o peixe não for medido de forma correta, conforme no anexo deste regulamento, ou seja, quando o peixe estiver com a boca aberta e/ou fechada com o auxílio das mãos/dedos e/ou rabo torto ou fechado, fora das duas faixas centrais destacada na régua oficial desta competição e/ou os fiscais julgarem que o vídeo não foi realizado dentro da forma regulamentada neste item, SERÁ PENALIZADO COM O DESCONTO DE ATÉ 02 (DOIS) CENTÍMETROS, deste exemplar/peixe;",
    "Os participantes terão que enviar os seus vídeos até às 20:00h do dia 12/09/2026, sábado e no envio dos vídeos solicitar aos fiscais a confirmação do recebimento, por exemplo: ok recebido;",
    "Os vídeos apresentados fora do período vigente da competição, destacado no item 4.7 do regulamento, não serão considerados pelos fiscais do evento;",
    "As equipes devem fazer os seus vídeos das medições e solturas dos peixes por capturas, com a gravação dos mesmos no início da medição e terminando ao final da soltura, evidenciando de forma clara o tamanho do peixe com enquadramento completo do exemplar, o qual deverá ser solto em condições de vida, em uma só tomada, até o peixe/exemplar tenha submergido completamente de forma espontânea.",
    "É imprescindível que a medição através dos vídeos mostre claramente o tamanho do exemplar e caso a medição não evidencie o tamanho peixe, o exemplar será desclassificado;",
    "Caso ocorra de alguma embarcação ter problemas na represa e ter seus vídeos para efetuar suas conferências, a mesma deverá, de qualquer forma, encaminhar estes vídeos dentro do horário limite das 20:00h,",
    "Cada equipe é responsável pelo encaminhamento e seleção dos vídeos enviados para comissão de arbitragem;",
    "A divulgação da planilha de classificação será de acesso restrito à comissão organizadora, a mesma será apresentada no término da apuração, com resultado do 1º ao 10º colocado, as demais posições serão apresentadas ao longo da semana do dia 13/09 ao 19/09/2026 para todos os participantes da competição;",
    "Caso o competidor não estiver de acordo com o resultado proferido pela arbitragem, este poderá fazer um pedido de revisão imediatamente após receber o resultado da sua média, solicitando que um outro fiscal analise o vídeo desejado, “Este outro fiscal será escolhido pela comissão de arbitragem” após a decisão final dos dois árbitros, não caberá mais mudanças no resultado apresentado;",
    "Proferido o resultado pela arbitragem, este é soberano, não passível de questionamentos futuros;",
    "Fica terminalmente proibido o uso de quaisquer tipos de iscas vivas/naturais, bem como utilizar de pesca no estilo corrico, somente arrastando as iscas artificiais, sem fazer arremessos, utilizando somente a impulsão do motor de popa ou elétrico;",
    "Poderão ser realizadas fiscalizações pela comissão organizadora antes, durante e também após a competição, em todos os compartimentos das embarcações, bem como assessórios, como: garrafas térmicas, caixas térmicas, etc. E se for negado à fiscalização/vistoria da embarcação, esta equipe poderá ser desclassificada da competição;",
    "É expressamente proibido a utilização de drone na competição, a utilização deste equipamento só será permitida para a equipe cinegrafista credenciada e com autorização da organização do Torneio;",
    "Se houver um atraso na partida por alguma equipe, por culpa da própria, não invalida a sua participação na competição, uma vez que o prejuízo será da própria equipe;",
    "É proibido abordar ou deixar ser abordado por qualquer outra embarcação que esteja ou não participando do evento, essa regra é válida apenas no momento da pescaria;",
    "Só poderá ser feita alguma abordagem as embarcações participantes pela comissão organizadora que fiscalizará a competição ou em caso de eventual prestação de socorro, sendo necessário a comprovação dos fatos através de registro de vídeos;",
    "Não terá espaço ou distância mínima entre equipes em nenhum perímetro de ação de pesca durante a competição, desta forma, o que vai prevalecer é o bom senso de cada equipe participante da competição, a falta de respeito ou qualquer desavença entre as equipes envolvidas não será em nenhum momento de responsabilidade da organização do 4º Torneio Bom de Pesca, isentando a organização sobre qualquer aspecto material, moral ou físico proveniente de discussões ou desavenças citadas neste parágrafo;",
    "Toda equipe participante do 4º Torneio Bom de Pesca tem a total liberdade para efetuar fiscalização em qualquer outra equipe participante da competição, e em caso de alguma irregularidade ou fraude ocorrida durante o evento, mediante as provas colhidas por fotos ou vídeos, estas devem ser enviadas a arbitragem para que se faça a verificação, onde se comprovada a fraude dessa equipe, a mesma será desclassificada da competição por atitude fraudulenta;",
    "Fica o evento (Organizador), e também os seus apoiadores (patrocinadores), isentos de eventuais danos ocorridos antes, durante e após a competição;",
    "Em caso de brusca mudança no tempo, o evento poderá/deverá ser transferido ou adiado, para garantir primeiramente a segurança de todos os envolvidos na competição;",
    "É obrigatório o uso de coletes salva vidas para cada competidor da competição conforme a legislação Pátria;",
    "É obrigatório a soltura com condições de vida de todos os exemplares capturados independente da espécie. Assim, a equipe flagrada com peixe na embarcação vivo ou morto será desclassificada, o peixe só poderá estar no viveiro da embarcação, vivo, para recuperação e ou em caso de cardume.",
    "Os vídeos deverão ser gravados com resolução e nitidez que permitam avaliar o tamanho do peixe, com áudio e vídeo de boa qualidade, cabendo à Comissão Organizadora (Fiscais Responsáveis) a responsabilidade de validar o exemplar, com parecer inquestionável/inapelável;",
    "Caso o vídeo não esteja em condições aceitáveis pela Comissão Organizadora, o mesmo será descartado e invalidado;",
    "O peixe/exemplar deverá ser colocado na régua com a boca totalmente fechada, livre de apetrechos de contenção (Alicates/outros), com a barriga voltada para a lente filmadora. Sua cauda deverá ficar livre e reta de modo a buscar, naturally seu alcance de medida; anomalia caudal não será contada como tamanho do peixe ”Não tentem posicionar o rabo do peixe a fim de encontrar maior tamanho, deixe o rabo do peixe reto e espalmado, caso o peixe vire ou apresente sinais de que não vai nadar, o mesmo não será válido, exemplares que estiverem com a boca aberta, rabo torto, calda não espalmada, poderão descontados até 02cm (Dois centímetros) deste exemplar/peixe”;",
    "Realizar a filmagem mostrando o peixe por completo, movimentando a câmera lentamente e cuidadosamente, para não deixar dúvidas, evitando a desclassificação do vídeo, se possível enviar os vídeos em qualidade (HD);",
    "O vídeo deverá continuar mostrando a soltura do peixe até este submergir por completo; Os vídeos apresentados deverão estar em gravação única, isentos de cortes/edições;",
    "Toda equipe é responsável pela sua documentação pessoal e necessárias, da embarcação e integridade física, material de todos integrantes;",
    "Use Colete Salva Vidas",
    "A régua oficial do evento estará disponível para ser retirada a partir do dia 07/09/2026 aqui na loja Bom de Pesca e data limite a ser retirada é até o dia 11/09/2026, sexta-feira até às 18h e 30min. (A régua oficial estará disponível para ser retirada na loja Bom de Pesca na semana que antecede do 4º Torneio Bom de Pesca).",
    "É (01) uma régua por equipe e será obrigatório a devolução da mesma, o número da equipe vai estar anexado na régua no adesivo onde as equipes vão escrever a senha da competição, que será sorteada na live do dia 11/09, na sexta-feira que antecede a competição, será entregue uma folha junto com a régua de alguns números de telefones importantes como o número do Samu 192 do Corpo de Bombeiros 193, e também os números dos organizadores do evento (64) 99291-9324 – João Pelissari ou (64) 98122-4558 – Carla Pelissari.",
    "A régua poderá ser retirada também por outra pessoa que não seja um dos integrantes da equipe inscrita, desde que tenha uma autorização via mensagem escrita pelo WhatsApp do próprio capitão dessa equipe.",
    "A senha da competição será sorteada e transmitida através de uma Live no Instagram no dia 11/09/2026 entre às 20:00h e 21:00h, onde teremos também esse espaço de tempo para tirar possíveis dúvidas dos competidores. (A senha não precisa ser verbalizada/falada, mas é obrigatório que esteja escrita e apareça no vídeo de medição);",
    "No dia 13/09/2016 teremos a cerimônia de premiação do evento que se inicia às 11:00h com encerramento às 17:00h, no local – Sede Social da OAB (Ordem dos Advogados do Brasil), endereço: Rua Augusto Alino de Melo, Nº 177, Bairro: Nova Aurora, ao lado da CDL de Itumbiara-GO, onde será realizada a cerimônia de entrega dos troféus da 1ª a 10ª Equipe e também os troféus do maior Tucunaré Azul, o maior Tucunaré Amarelo e o maior Peixe Feminino, um dos integrantes de cada equipe deve trocar a régua oficial da competição pelo peixinho da sorte, no peixinho da sorte terá o número da sua equipe que será o número da sorte para concorrer por meio de sorteio todas as premiações, neste mesmo espaço teremos refeições para serem comercializadas."
  ];

  regras.forEach((p) => {
    const lines = doc.splitTextToSize(p, contentWidth);
    checkPageBreak(lines.length * 5 + 4);
    doc.text(lines, margin, y);
    y += lines.length * 5 + 4;
  });

  // TERMO DE DECLARAÇÃO
  checkPageBreak(40);
  y += 6;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("* TERMO DE DECLARAÇÃO *", pageWidth / 2, y, { align: "center" });
  y += 8;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);

  const termos = [
    "Declaramos ter tido conhecimento integral do Regulamento do 4º Torneio Bom de Pesca e com ele concordado;",
    "Declaramos estar ciente da obrigação de utilização dos coletes salva vidas e da obrigatoriedade de estar em ordem com a documentação pessoal para pratica da pesca esportiva e da embarcação;",
    "Declaramos estar cientes que por ser um Torneio de Pesca Esportiva, cujas atividades têm elementos de risco inclusive físico e material, os quais são pela equipe aceitos voluntariamente, onde a nossa equipe que está se inscrevendo assume todos os riscos envolvidos em consequências da participação da nossa equipe no torneio. A equipe ainda declara e isenta os organizadores do torneio de qualquer responsabilidade em decorrência da participação da equipe por livre e espontânea vontade no evento, e declara estar cientes que os Organizadores e Patrocinadores do evento não se responsabilizarão por eventuais despesas médicas e/ou hospitalares, bem como indenizações de qualquer natureza em caso de acidentes, isentando, portanto, a organização, colaboradores e patrocinadores de toda e qualquer responsabilidade por quaisquer danos materiais, morais ou físicos que por ventura sofra ou cause a quem quer que seja durante o torneio.",
    "Ao fazer inscrição, com a efetivação do pagamento, a equipe está de acordo com regulamento e todas as declarações apresentadas nesta ficha de inscrição do 4º Torneio Bom de Pesca."
  ];

  termos.forEach((t) => {
    const lines = doc.splitTextToSize(t, contentWidth);
    checkPageBreak(lines.length * 4.5 + 4);
    doc.text(lines, margin, y);
    y += lines.length * 4.5 + 4;
  });

  // RODAPÉ COM TELEFONE OFICIAL
  checkPageBreak(12);
  doc.setDrawColor(200, 200, 200);
  doc.line(margin, y, margin + contentWidth, y);
  y += 6;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(242, 100, 25);
  doc.text("Envie esta ficha preenchida e o comprovante Pix no WhatsApp oficial: (64) 99296-8588", pageWidth / 2, y, { align: "center" });

  const cleanEquipeName = data.nomeEquipe.replace(/[^a-zA-Z0-9]/g, "_") || "equipe";
  doc.save(`Ficha_Inscricao_Oficial_${cleanEquipeName}.pdf`);
}
