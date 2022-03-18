import axios from "axios";
import onlyNumber from "../utils/onlyNumber";


export const getCnpj = (client) => {
  client.onMessage(async (message) => {
    if (message.type === "chat") {
      if (message.body.toLowerCase().includes("!cnpj")) {
        // Faz parte do Menu, envia o link do grupo caso a mensagem digitada seja "!cnpj"
        try {
          const API_URL = "https://brasilapi.com.br/api/cnpj/v1/";
          const CNPJ = onlyNumber(message.body.substring(6));
          const FULL_API_URL = `${API_URL}${CNPJ}`;

          axios
            .get(FULL_API_URL)
            .then(async (response) => {
              const razao_social = response.data.razao_social;
              const nome_fantasia = response.data.nome_fantasia;
              const descricao_situacao_cadastral =
                response.data.descricao_situacao_cadastral;
              const descMatFilial = response.data.descricao_matriz_filial;
              const data_situacao_cadastral =
                response.data.data_situacao_cadastral;
              const data_inicio_atividade = response.data.data_inicio_atividade;
              const cnae_fiscal = response.data.cnae_fiscal;
              const cnae_fiscal_descricao = response.data.cnae_fiscal_descricao;
              const capital_social = response.data.capital_social;
              const descricao_tipo_logradouro =
                response.data.descricao_tipo_logradouro;
              const logradouro = response.data.logradouro;
              const numero = response.data.numero;
              const municipio = response.data.municipio;
              const uf = response.data.uf;
              const cep = response.data.cep;
              const ddd_telefone_1 = response.data.ddd_telefone_1;
              const ddd_telefone_2 = response.data.ddd_telefone_2;
              const opcao_pelo_simples = response.data.opcao_pelo_simples;
              const data_opcao_pelo_simples =
                response.data.data_opcao_pelo_simples;
              const opcao_pelo_mei = response.data.opcao_pelo_mei;
              const situacao_especial = response.data.situacao_especial;
              const data_situacao_especial =
                response.data.data_situacao_especial;

              // Construindo a frase para ser enviado
              const textDisplay =
                `*${razao_social}* \n` +
                `Fantasia: ${nome_fantasia}\n` +
                `Situação: ${descricao_situacao_cadastral}\n` +
                `Descrição: ${descMatFilial}\n` +
                `Data Cadastral: ${data_situacao_cadastral}\n` +
                `Data Inicio Atividade: ${data_inicio_atividade}\n` +
                `CNAE Fiscal: ${cnae_fiscal}\n` +
                `CNAE Fiscal Descrição: ${cnae_fiscal_descricao}\n` +
                `Capital Social: ${capital_social}\n` +
                `Tipo Logradouro: ${descricao_tipo_logradouro}\n` +
                `Logradouro: ${logradouro}\n` +
                `Número: ${numero}\n` +
                `Município: ${municipio}\n` +
                `UF: ${uf}\n` +
                `Cep: ${cep} \n` +
                `Telefone 1: ${ddd_telefone_1}\n` +
                `Telefone 2: ${ddd_telefone_2}\n` +
                `Opção Simples: ${opcao_pelo_simples === false ? "Não" : "Sim"
                }\n` +
                `Data Opção Simples: ${data_opcao_pelo_simples === null
                  ? ""
                  : data_opcao_pelo_simples
                }\n` +
                `Opção MEI: ${opcao_pelo_mei === false ? "Não" : "Sim"}\n` +
                `Situação Especial: ${situacao_especial}\n` +
                `Data Situação Especial: ${data_situacao_especial === null ? "" : data_situacao_especial
                }\n`;
              await client.sendText(message.from, `Pronto! @${message.sender.pushname}\nresultado da busca por CNpJ:\n${textDisplay}`)

            })
            .catch(async (error) => {
              await client.sendText(
                message.from,
                `⚠ CNPJ não encontrado! ⚠\nPor Favor verifique a ortografia (Não utilize pontos, traços e barra)`
              );

            });
        } catch (error) {
          console.log(error);
        }
      }
    }
  });
};
