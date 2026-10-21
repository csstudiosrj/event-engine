// Tipos compartilhados para o banco de regras normativas do Normato

export type Veredito =
  | "confirmado"
  | "duvidoso"
  | "incorreto"
  | "nao_verificavel";

export type TipoFonte =
  | "lei_federal"
  | "lei_estadual"
  | "lei_municipal"
  | "decreto_federal"
  | "decreto_estadual"
  | "decreto_municipal"
  | "resolucao_anvisa"
  | "resolucao_conama"
  | "resolucao_cfm"
  | "norma_abnt"
  | "norma_regulamentadora"
  | "instrucao_tecnica"
  | "portaria"
  | "manual"
  | "estudo"; // para regras contábeis/operacionais sem base normativa

export interface Regra {
  id: string;
  /** Texto descritivo da exigência normativa */
  descricao: string;
  /** Fonte principal: nome da lei/norma */
  fonte: string;
  /** Tipo de fonte */
  tipo_fonte: TipoFonte;
  /** Dispositivo específico (art., item, § etc.) */
  dispositivo?: string;
  /** URL oficial de verificação */
  url_oficial?: string;
  /** UFs onde se aplica; undefined = federal (todos) */
  ufs?: string[];
  /** Resultado da auditoria DeepSeek */
  veredito: Veredito;
  /** Observação ou correção aplicada */
  nota_auditoria?: string;
  /** Se é uma estimativa operacional, não exigência legal */
  estimativa_operacional?: boolean;
}

export interface Calculadora {
  slug: string;
  titulo: string;
  descricao: string;
  regras: Regra[];
}
