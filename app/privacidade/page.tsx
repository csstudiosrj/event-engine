import Link from 'next/link'
import { LegalPage } from '@/components/legal-page'
import { COMPANY, CONTACT_EMAIL } from '@/lib/config'

export const metadata = { title: 'Política de Privacidade — Normato' }

export default function PrivacidadePage() {
  return <LegalPage title="Política de Privacidade" updated="21 de outubro de 2026">
    <p>Esta Política explica como o Normato trata dados pessoais, conforme a Lei Geral de Proteção de Dados (Lei 13.709/2018 — LGPD). O controlador dos dados é {COMPANY.nome}{COMPANY.cnpj ? `, CNPJ ${COMPANY.cnpj}` : ''}. Contato para assuntos de privacidade e encarregado de dados: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</p>

    <h2>1. Quais dados coletamos</h2>
    <ul>
      <li><strong>Cadastro:</strong> nome, e-mail, senha (guardada de forma criptografada pelo provedor de autenticação) e data de aceite destes termos.</li>
      <li><strong>Uso do serviço:</strong> eventos que você cadastra (nome, cidade, data, público etc.), parâmetros informados nas calculadoras e resultados gerados.</li>
      <li><strong>Pagamentos:</strong> produto comprado, valor, data e situação do pagamento. Os dados de cartão e de Pix são informados diretamente ao Mercado Pago ou ao Pagar.me e não passam pelos nossos servidores.</li>
      <li><strong>Dados técnicos:</strong> cookies de sessão necessários para manter você conectado e registros técnicos de acesso (endereço IP, data e hora), mantidos pelo prazo exigido no Marco Civil da Internet.</li>
    </ul>

    <h2>2. Para que usamos e com qual base legal</h2>
    <ul>
      <li>Criar e manter sua conta, executar os cálculos, guardar o histórico e processar compras — execução de contrato (art. 7º, V).</li>
      <li>Emitir comprovantes e cumprir obrigações fiscais e legais — cumprimento de obrigação legal (art. 7º, II).</li>
      <li>Prevenir fraudes e abuso, e melhorar o serviço com estatísticas agregadas — legítimo interesse (art. 7º, IX).</li>
      <li>Enviar e-mails de serviço (confirmação de conta, recuperação de senha, avisos sobre a assinatura). Só enviaremos comunicações de marketing com o seu consentimento, que pode ser retirado a qualquer momento.</li>
    </ul>

    <h2>3. Com quem compartilhamos</h2>
    <p>Não vendemos dados pessoais. Compartilhamos apenas com fornecedores necessários para o serviço funcionar, que tratam os dados em nosso nome:</p>
    <ul>
      <li><strong>Supabase</strong> — banco de dados e autenticação;</li>
      <li><strong>Vercel</strong> — hospedagem do site;</li>
      <li><strong>Mercado Pago</strong> e <strong>Pagar.me (Stone)</strong> — processamento de pagamentos.</li>
    </ul>
    <p>Alguns desses fornecedores podem armazenar dados fora do Brasil, com cláusulas contratuais e medidas de segurança compatíveis com a LGPD (art. 33). Também podemos compartilhar dados quando exigido por lei ou ordem judicial.</p>

    <h2>4. Por quanto tempo guardamos</h2>
    <p>Enquanto sua conta estiver ativa. Se você pedir a exclusão, apagamos ou anonimizamos os dados em até 30 dias, exceto o que precisamos manter por obrigação legal (por exemplo, registros de pagamento pelo prazo fiscal e registros de acesso pelo prazo do Marco Civil da Internet).</p>

    <h2>5. Seus direitos</h2>
    <p>Você pode, a qualquer momento, pedir: confirmação de que tratamos seus dados, acesso, correção, portabilidade, anonimização ou exclusão, informação sobre compartilhamento e revogação de consentimento (art. 18 da LGPD). Escreva para <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>; respondemos em até 15 dias. Você também pode reclamar à Autoridade Nacional de Proteção de Dados (ANPD).</p>

    <h2>6. Segurança</h2>
    <p>Usamos conexão criptografada (HTTPS), controle de acesso por usuário no banco de dados e senhas guardadas com criptografia. Nenhum sistema é totalmente imune a falhas; se ocorrer um incidente de segurança relevante, avisaremos você e a ANPD conforme a lei.</p>

    <h2>7. Dados de terceiros nos seus eventos</h2>
    <p>As calculadoras não pedem dados pessoais do público do seu evento. Se você incluir esse tipo de informação em campos de texto, você é o controlador desses dados e responde pelo seu tratamento.</p>

    <h2>8. Alterações</h2>
    <p>Podemos atualizar esta Política. Mudanças relevantes serão avisadas por e-mail ou no serviço. Veja também os <Link href="/termos">Termos de Uso</Link>.</p>
  </LegalPage>
}
