# Especificação do Projeto

## Perfis de Usuários

<table>
<tbody>
<tr align=center>
<th colspan="2">Perfil - Fotógrafo </th>
</tr>
<tr>
<td width="150px"><b>Descrição</b></td>
<td width="600px">Profissional que precisa gerenciar agenda, contratos, tarefas, clientes e entregas.</td>
</tr>
<tr>
<td><b>Necessidades</b></td>
<td>Organizar contratos, receber alertas de conflito, centralizar contatos, destacar serviços em página online.</td>
</tr>
</tbody>
</table>

<table>
<tbody>
<tr align=center>
<th colspan="2">Perfil - Cliente </th>
</tr>
<tr>
<td width="150px"><b>Descrição</b></td>
<td width="600px">Pessoa física/jurídica que contrata os serviços fotográficos.</td>
</tr>
<tr>
<td><b>Necessidades</b></td>
<td>Visualizar prazos, acessar contrato, escolher fotos, acompanhar status do serviço, contratar pacotes.</td>
</tr>
</tbody>
</table>


## Histórias de Usuários

### Historia 1
Cláudio Augusto - FOTÓGRAFO INDEPENDENTE
Dores: Perde muito tempo com tarefas administrativas.
Dificuldade em manter controle dos contratos e cadastros dos clientes.
Ansiedade em relação a atrasos na entrega de fotos.
Dificuldade de apresentar seus serviços para clientes

NECESSIDADES: Centralizar agendamentos e tarefas em um só lugar.
Organizar clientes, contratos e pagamentos sem depender de planilhas dispersas.
Acompanhar prazos para não comprometer entregas.
Ter uma página pública para divulgar seu trabalho.

OBJETIVO AO USAR A APLICAÇÃO WEB:
Ganhar tempo para focar na fotografia, mantendo a gestão simples e organizada.
--------------------
### Historia 2
Clarissa Delfim - DONA DE UM PEQUENO ESTÚDIO DE FOTOGRAFIAS
DORES: 
- Dificuldade em acompanhar o fluxo de serviços do estúdio.
- Frequentemente se depara com agendas conflitantes
- Precisa saber com mais clareza quais fotos o cliente escolheu para editar
- Precisa de controle financeiro

NECESSIDADES:
- Gerenciar tarefas de forma clara.
- Controlar a agenda do estúdio e evitar choques de horários.
- Saber a preferência do cliente
- Ter uma visão financeira consolidada (entradas, saídas, pacotes vendidos).

OBJETIVO AO USAR A APLICAÇÃO WEB:
Estruturar o estúdio como um pequeno negócio, com maior controle e eficiência.
--------------------
### Historia 3
Ana Paula - CLIENTE QUE CONTRATOU UM ENSAIO
DORES:
- Insegurança sobre quando receberá as fotos.
- Dificuldade em se comunicar com o fotógrafo sobre detalhes.
- Falta de transparência em tarefas, pagamentos e pacotes.
- Dificuldade de comunicar quais fotos gostou

NECESSIDADES:
- Acompanhar o status do ensaio contratado.
- Ter clareza sobre os termos do contrato e prazos de entrega das fotos.
- Ter clareza de suas tarefas como cliente.
- Visualizar as fotos feitas e escolher quais comprará.

OBJETIVO AO USAR A APLICAÇÃO WEB:
Ter confiança e praticidade na relação com o fotógrafo, com informações acessíveis em tempo real.
--------------------

|EU COMO... `QUEM`   | QUERO/PRECISO ... `O QUE` |PARA ... `PORQUE`                 |
|--------------------|---------------------------|----------------------------------|
| Fotógrafo          | quero cadastrar meus clientes | para manter histórico de contatos e contratos, para facilitar recontratações e comunicações |
| Fotógrafo          | quero agendar sessões com verificação de conflito de horários | para evitar dupla reserva |
| Fotógrafo          | quero gerar e armazenar contratos por cliente | para formalizar acordos e prazos |
| Fotógrafo          | preciso organizar e acompanhar todas as etapas da minha prestação de serviço | para garantir entregas com excelência e dentro dos prazos estabelecidos |
| Fotógrafo          | preciso que meu cliente esteja ciente das datas agendadas, prazos acordados, bem como das tarefas que o cliente precisa realizar | para que eu consiga entregar meu trabalho no prazo e com excelência |
| Fotógrafo          | preciso saber quais fotos meu cliente gostou, quais fotos extras ele deseja comprar e quais descartou | para otimizar meu trabalho e editar apenas o que será pago |
| Fotógrafo          | preciso de uma página online para divulgar meu trabalho, apresentar meus pacotes e permitir que o cliente solicite meus serviços de forma simples | para agilizar a contratação e receber todas as informações necessárias para elaborar orçamentos e contratos |
| Fotógrafo          | preciso de um controle financeiro básico preciso de um controle financeiro básico que registre entradas e saídas | para garantir a saúde do meu negócio e ter clareza sobre minhas finanças |
| Cliente            | preciso acompanhar o serviço contratado, verificando tarefas que devo realizar, datas acordadas, termos do contrato e prazos de entrega | para ter clareza e segurança sobre o serviço |
| Cliente            | quero informar ao fotógrafo quais fotos gostei, quais desejo editar e quais descartar | para receber apenas as fotos selecionadas conforme minha escolha |

## Requisitos do Projeto

### Requisitos Funcionais

|ID    | Descrição                | Prioridade |
|-------|---------------------------------|----|
| RF-01 |  O sistema deve permitir cadastro e edição de clientes com histórico de contratos. | Alta  | 
| RF-02 |  O sistema deve permitir o cadastro de fotógrafos com informações pessoais e serviços. | Alta  |
| RF-03 |  O sistema deve permitir o agendamento de sessões fotográficas, verificando conflitos. | Alta  |
| RF-04 |  O sistema deve gerar contratos digitais (PDF) vinculados a clientes e serviços. | Alta  |
| RF-05 |  O sistema deve disponibilizar um pipeline Kanban para acompanhamento dos trabalhos com possibilidade de designar prazos e responsáveis pelas tarefas. | Alta  |
| RF-06 |  O sistema deve permitir criação de tarefas/checklists vinculados ao evento. | Média |
| RF-07 |  O sistema deve ter uma galeria online para seleção de fotos pelo cliente. | Alta  |
| RF-08 |  O sistema deve enviar notificações automáticas de prazos e lembretes. | Média |
| RF-09 |  O sistema deve permitir que o cliente acesse uma página personalizada do serviço contratado. | Alta  |
| RF-10 |  O sistema deve gerar relatórios de agenda e faturamento por período | Média |
| RF-11 |  O sistema deve disponibilizar uma página online de divulgação do fotógrafo e seus serviços | Baixa |
| RF-12 |  O sistema deve permitir um controle de caixa básico | Média |

**Prioridade: Alta / Média / Baixa. 

### Requisitos não Funcionais

|ID      | Descrição               |Prioridade |
|--------|-------------------------|----|
| RNF-01 |  O sistema deve ser compatível com os principais navegadores (Chrome, Edge, Firefox, Safari) | Alta  | 
| RNF-02 |  O sistema deve ser responsivo, garantindo adaptação a diferentes tamanhos de tela e dispositivos móveis | Alta  | 
| RNF-03 |  O sistema deve garantir acessibilidade (WCAG 2.1) | Média | 
| RNF-04 |  O sistema deve ter tempo de upload de fotos inferior a 5s por imagem (em média 5MB). | Alta  | 
| RNF-05 |  O sistema deve permitir download rápido de galerias (até 2s por foto). | Alta  | 
| RNF-06 |  O sistema deve suportar formatos JPEG, PNG e RAW*** | Alta  | 
| RNF-07 |  O tempo de resposta das páginas deve ser menor que 2 segundos em média. | Alta  | 

**Prioridade: Alta / Média / Baixa. 

