import Link from 'next/link'
import { LegalPage } from '@/components/legal-page'
import { COMPANY, CONTACT_EMAIL } from '@/lib/config'

export const metadata = { title: 'Termos de Uso — Normato' }

export default function TermosPage() {
  return <LegalPage title="Termos de Uso" updated="21 de outubro de 2026">
    <p>Estes Termos regulam o uso do Normato, serviço on-line de calculadoras para dimensionamento e planejamento de eventos, oferecido por {COMPANY.nome}{COMPANY.cnpj ? `, CNPJ ${COMPANY.cnpj}` : ''}. Ao criar uma conta ou usar o serviço, você declara que leu e concorda com estes Termos e com a <Link href="/privacidade">Política de Privacidade</Link>.</p>

    <h2>1. O que o Normato faz — e o que não faz</h2>
    <p>O Normato gera estimativas para planejamento a partir dos dados que você informa, com memória de cálculo e referências a normas e leis. Os resultados:</p>
    <ul>
      <li>não substituem projeto técnico, laudo, vistoria nem a Anotação/Registro de Responsabilidade Técnica de profissional habilitado;</li>
      <li>não garantem aprovação de alvarás ou licenças pelo Corpo de Bombeiros, prefeitura, vigilância sanitária ou qualquer outro órgão;</li>
      <li>podem não refletir exigências estaduais ou municipais mais rigorosas, nem alterações recentes de normas;</li>
      <li>dependem da exatidão dos dados informados por você.</li>
    </ul>
    <p>Parte dos resultados se baseia em referências de mercado, sem número fixado em norma; nesses casos o resultado é identificado como estimativa. A decisão final sobre o dimensionamento do evento e a contratação de profissionais é sempre do organizador.</p>

    <h2>2. Conta</h2>
    <p>Você precisa ter 18 anos ou mais e informar dados verdadeiros. É responsável por manter sua senha em sigilo e por tudo o que for feito na sua conta. Podemos suspender contas usadas para fraude, abuso do serviço ou violação destes Termos.</p>

    <h2>3. Créditos</h2>
    <ul>
      <li>Cada cálculo de uma calculadora Essencial consome 1 crédito, inclusive recálculos.</li>
      <li>Toda conta nova recebe 1 crédito gratuito. Créditos comprados não expiram e não podem ser transferidos ou convertidos em dinheiro.</li>
      <li>O crédito só é descontado quando o resultado é gerado. Se ocorrer erro antes disso, nada é cobrado.</li>
    </ul>

    <h2>4. Planos Solo e Pro</h2>
    <ul>
      <li>Os planos são mensais, pagos com cartão de crédito e renovados automaticamente a cada mês até o cancelamento.</li>
      <li>Incluem cálculos ilimitados e as calculadoras Estratégicas. O Solo permite 1 evento ativo no painel; o Pro, eventos ilimitados.</li>
      <li>Você pode cancelar a qualquer momento em Minha conta. O cancelamento impede novas cobranças, e o acesso continua até o fim do período já pago.</li>
      <li>Se a renovação não for paga, o acesso aos recursos do plano é encerrado após o vencimento.</li>
    </ul>

    <h2>5. Pagamentos, arrependimento e reembolso</h2>
    <p>Os pagamentos são processados pelo Mercado Pago ou pelo Pagar.me (Stone). Não armazenamos dados de cartão. Nas compras feitas pela internet, você pode desistir em até 7 dias, conforme o art. 49 do Código de Defesa do Consumidor: devolvemos o valor de créditos ainda não usados e, no caso de plano, o valor da primeira mensalidade. Para pedir, escreva para <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</p>

    <h2>6. Preços e mudanças no serviço</h2>
    <p>Os preços estão na página de <Link href="/precos">Preços</Link>. Mudanças de preço de planos valem a partir da renovação seguinte e serão avisadas por e-mail com antecedência. Podemos incluir, alterar ou retirar calculadoras e funcionalidades, preservando os créditos já comprados.</p>

    <h2>7. Uso permitido</h2>
    <p>É proibido copiar ou revender o conteúdo e as fórmulas do serviço em massa, acessá-lo por meios automatizados sem autorização, tentar burlar a cobrança de créditos ou comprometer a segurança da plataforma.</p>

    <h2>8. Propriedade intelectual</h2>
    <p>A marca Normato, o software, os textos e a organização das regras pertencem a {COMPANY.nome}. Os resultados gerados para o seu evento podem ser usados livremente por você, inclusive em documentos para órgãos públicos, desde que mantido o aviso de que são estimativas.</p>

    <h2>9. Responsabilidade</h2>
    <p>Nos limites da lei, não respondemos por decisões tomadas exclusivamente com base nos resultados, por exigências feitas por órgãos públicos, nem por danos decorrentes de dados incorretos informados pelo usuário. Isso não afasta os direitos garantidos pelo Código de Defesa do Consumidor.</p>

    <h2>10. Alterações destes Termos</h2>
    <p>Podemos atualizar estes Termos. Mudanças relevantes serão avisadas por e-mail ou no próprio serviço. O uso após o aviso significa concordância com a nova versão.</p>

    <h2>11. Contato e foro</h2>
    <p>Dúvidas: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. Fica eleito o foro do domicílio do consumidor para resolver questões relacionadas a estes Termos.</p>
  </LegalPage>
}
