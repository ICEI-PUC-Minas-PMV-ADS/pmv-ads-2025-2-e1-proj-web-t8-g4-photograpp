# Especificação do Projeto

## Perfis de Usuários

[Enumere e faça o detalhamento dos perfis de usuários. Utilize o modelo de tabela abaixo para sintetizá-los.]

<table>
<tbody>
<tr align=center>
<th colspan="2">Perfil Nome </th>
</tr>
<tr>
<td width="150px"><b>Descrição</b></td>
<td width="600px">...</td>
</tr>
<tr>
<td><b>Necessidades</b></td>
<td>...</td>
</tr>
</tbody>
</table>


## Histórias de Usuários

[Apresente aqui as histórias de usuários que são relevantes para o projeto da solução.]

> **Link Útil**:
> - [Como escrever boas histórias de usuário](https://medium.com/vertice/como-escrever-boas-users-stories-hist%C3%B3rias-de-usu%C3%A1rios-b29c75043fac)


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

[Com base nas Histórias de Usuários, enumere os requisitos da solução. Lembre-se que cada requisito deve corresponder a uma, e somente uma, característica alvo da solução. Além disso, certifique-se de que todos os aspectos capturados nas Histórias de Usuário foram cobertos.]

### Requisitos Funcionais

[Utilize o modelo de tabela abaixo para apresentar os requisitos funcionais]

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

[Utilize o modelo de tabela abaixo para apresentar os requisitos não-funcionais]

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

