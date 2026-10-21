import type { Calculadora } from "./types";
import { URL } from "./fontes";

export const bebidas: Calculadora = {
  slug: "bebidas",
  titulo: "Bebidas",
  descricao: "Regras para venda e consumo de bebidas em eventos",
  regras: [
    {
      id: "eca-art81-243",
      descricao: "É proibido vender, fornecer ou servir bebida alcoólica, ainda que gratuitamente, a criança ou adolescente (menores de 18 anos). A conduta é crime, com pena de detenção de 2 a 4 anos e multa.",
      fonte: "Lei 8.069/1990 (ECA)",
      tipo_fonte: "lei_federal",
      dispositivo: "Arts. 81, II, e 243",
      url_oficial: URL.eca,
      veredito: "confirmado",
    },
    {
      id: "rdc656-eventos-massa",
      descricao:
        "Eventos com mais de 1.000 pessoas por dia com manipulação ou venda de alimentos e bebidas: o formulário de avaliação prévia vai à vigilância sanitária local até 30 dias antes; organizador e contratados respondem solidariamente por danos à saúde; a autoridade pode exigir profissional habilitado para supervisão; o gelo deve ser fabricado com água potável.",
      fonte: "RDC ANVISA 656/2022",
      tipo_fonte: "resolucao_anvisa",
      dispositivo: "Arts. 2º, 8º, 10 e 12; Anexo I",
      url_oficial: URL.rdc656,
      veredito: "confirmado",
    },
    {
      id: "esportes-alcool",
      descricao: "Eventos esportivos: a venda de bebidas alcoólicas em estádios é regulada por leis estaduais e municipais, que variam entre proibição e liberação com restrições.",
      fonte: "Legislação estadual e municipal",
      tipo_fonte: "lei_estadual",
      veredito: "nao_verificavel",
      nota_auditoria: "Corrigido: a Lei 14.597/2023 (Lei Geral do Esporte) não trata de bebidas alcoólicas; a regra anterior atribuía a ela uma proibição inexistente.",
    },
  ],
};

export default bebidas;
