export const truthOrDare = (client) => {
    client.onMessage(async (message) => {
      const ask = [
        "Qual a razão mais ridícula pela qual você terminou com alguém?",
        "Qual é a mania mais nojenta que você tem?",
        "Qual site no seu histórico de navegação te deixaria constrangido se alguém visse?",
        "De qual pessoa não famosa você tem inveja?",
        "O que você faria se tivesse uma dor de barriga em um banheiro público, mas acabasse o papel higiênico?",
        "Qual a coisa mais embaraçosa que você já fez bêbado?",
        "O que você adora, mas tem vergonha de admitir?",
        "Qual foi a coisa mais embaraçosa que já fez?",
        "Qual foi a pessoa mais aleatória que já stalkeou nas redes sociais?",
        "Qual foi a última coisa que pesquisou no seu telefone?",
        "Qual foi o pior presente que já deu para alguém?",
        "Quando foi a última vez que chorou e por quê?",
        "Quantos dias já passou sem tomar banho?",
        "Já fez xixi nas calças depois de adulto?",
        "Já traiu algum namorado ou namorada?",
        "Conte uma coisa que você espera que seus pais nunca descubram.,",
        "Qual é o apelido mais vergonhoso que alguém já lhe deu?",
        "Quando foi a última vez que fez xixi na cama?",
        "Qual foi o sonho mais assustador que já teve?",
        "Quem é a pessoa mais bonita da roda?",
        "Se tivesse que beijar um dos jogadores, quem seria?",
        "Conte algo infantil que você ainda faz.,",
        "Qual é o seu medo mais sombrio?",
        "Com que pessoa se arrepende de já ter se envolvido?",
        "Qual é a coisa mais estranha ou vergonhosa que já fez por dinheiro?",
        "Você já fez cocô nas calças em público?",
        "Se você pudesse mudar de vida com uma celebridade por um dia, quem seria?",
        "Qual é a maior mentira que já contou para alguém da sua família?",
        "O que a maioria das pessoas pensa que é verdade sobre você, mas não é?",
        "Qual foi a maior conquista que já teve?",
        "O que você faria se fosse do sexo oposto por uma semana?",
        "Qual foi o momento mais inapropriado em que já soltou pum?",
        "Você já se arrependeu imediatamente após enviar uma mensagem? Qual?",
        "Você já vomitou em público e teve que engolir?",
        "Por que você terminou com seu último namorado ou namorada?",
        "Qual a foto mais constrangedora que tem no seu telefone?",
        "Se acha bonito(a)?",
        "Dá uma olhada dentro vaso sanitário antes de dar descarga?",
        "O que você não consegue viver sem?",
        "Quando foi a última vez que não conseguiu chegar a tempo ao banheiro?",
      ]

      const challenge = [
        "Mande uma mensagem ousada para algum contato do seu celular 'acidentalmente'",
        "Ligue para um amigo e diga que está grávida ou que vai ser pai.",
        "Faça uma apresentação de dança do ventre.",
        "Cheire as axilas da pessoa à sua direita.",
        "Coma uma colher cheia de pimenta ou molho picante.",
        "Coloque um cubo de gelo nas suas calças.",
        "Mostre como você flerta trocando olhares com alguém da roda.",
        "Passe hidratante em suas mãos de forma sensual.",
        "Cante o seu funk pesadão favorito.",
        "Fique por 5 rodadas em uma posição escolhida pelo grupo.",
        "Coloque um cubo de gelo dentro de um xícara ou copo pequeno e tente pegar com a língua.",
        "Beba 1 litro de água o mais rápido que puder.",
        "Curta os 5 posts mais antigos da primeira pessoa que aparece em seu feed do Instagram.",
        "Abra o TikTok e faça a primeira dancinha que surgir no feed.",
        "Diga um defeito de cada um dos participantes do jogo.",
        "Faça uma massagem no pé de uma das pessoas da roda.",
        "Imite todos os gestos da pessoa ao seu lado por 5 minutos.",
        "Role a tela da lista de telefone do seu celular até alguém mandar parar., Você terá que decidir se ligará para a pessoa ou excluirá o número.",
        "Ligue para um amigo(a) que não está fazendo aniversário para dar os parabéns.",
        "Deixe uma pessoa da roda retocar a sua maquiagem (ser estiver sem, permita que alguém o(a) maquie).",
        "Conte o enredo do seu filme ou série preferido com a língua para fora.",
        "Tire suas meias com a boca.",
        "Troque de roupa com uma pessoa da roda.",
        "Chupe o seu dedão do pé.",
        "Passe maionese no cabelo.",
      ]

      if (message.body == "!verdade" ) {
        const resultado = Math.floor(Math.random() * ask.length);
        await client.sendText(message.from, `A pergunta é:\n *${ ask[resultado]}*` )
      }

      if (message.body == "!desafio") {
        const resultado = Math.floor(Math.random() * challenge.length);
        await client.sendText(message.from, `O desafio é:\n *${ challenge[resultado]}*` )
      }
      
    });
  };
  