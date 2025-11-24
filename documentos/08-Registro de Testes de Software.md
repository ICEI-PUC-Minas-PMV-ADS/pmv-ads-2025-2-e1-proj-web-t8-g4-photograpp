# Registro de Testes de Software

Relatório com as evidências dos testes de software realizados na aplicação pela equipe, baseado no plano de testes pré-definido.

Os resultados dos testes funcionais realizados na aplicação são descritos a seguir. 


Obs: Todos os testes passaram. Os vídeos de execução dos testes se encontram no link:
https://drive.google.com/drive/folders/1CvbOU9Mq8w3N-AF7cix8ULLyajmVNOsj?usp=drive_link

Abaixo a cópia do plano de testes com sucesso:

# Plano de Testes de Software

### Plano de Testes de Software

Os testes funcionais a serem realizados na aplicação são descritos a seguir.

> Observação: Devido ao tamanho dos vídeos, eles foram enviados para o Google Drive em vez do GitHub.
> Acesse a pasta respectiva de cada funcionalidade para ver a execução dos testes.
> Link com todos os vídeos dos casos de testes: https://drive.google.com/drive/folders/1CvbOU9Mq8w3N-AF7cix8ULLyajmVNOsj?usp=drive_link

> Acesse o site publicado em: https://photograpp.vercel.app/


Foram desenvolvidas as funcionalidades:
Cadastro (Desenvolvido por Ariana),
Dashboard (Desenvolvido por Yago),
Projetos (Desenvolvido por Dangeles),
Pipeline (Desenvolvido por Dangeles),
Clientes (Desenvolvido por Yuri),
Agenda (Desenvolvido por Yago),
Perfil Público (Desenvolvido por Gustavo),
Galeria (Desenvolvido por Gustavo),
Serviços (Desesenvolvido por Yuri),
Financeiro (Desenvolvido por Ariana).

Cada membro do grupo criou os testes e testou 2 funcionalidades de outros membros (ver tabelas):

### Funcionalidade Cadastro

<table>
  <thead>
    <tr>
      <th>Caso de teste</th>
      <th>Requisitos associados</th>
      <th>Objetivo do teste</th>
      <th>Passos</th>
      <th>Critérios de êxito</th>
      <th>Responsável</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>CT-01: Acessar a página Cadastro e verificar campos disponíveis</td>
      <td>
        <ul>
          <li>RF-02: O sistema deve permitir o cadastro de fotógrafos com informações pessoais e serviços.</li>
        </ul>
      </td>
      <td>Verificar se alguém fora do sistema consegue fazer o cadastro ao acessar a rota <code>/cadastro</code>.</td>
      <td>
        1. Abrir o navegador (Chrome, Firefox, Edge ou Safari).<br/>
        2. Informar o endereço do sistema.<br/>
        3. Garantir que não há usuário logado (se estiver logado, sair).<br/>
        4. Clicar em “Cadastro” ou acessar diretamente a rota <code>/cadastro</code>.<br/>
        5. Verificar se a página de cadastro é carregada.<br/>
        6. Conferir se são exibidos os campos necessários para cadastro (dados pessoais, tipo de pessoa, e-mail, senha etc.).
      </td>
      <td>
        <ul>
          <li>A rota <code>/cadastro</code> pode ser acessada mesmo por quem não está autenticado.</li>
          <li>Os campos de cadastro são exibidos corretamente e estão habilitados.</li>
          <li>Não há erro de permissão ou redirecionamento indevido para login.</li>
        </ul>
      </td>
      <td>Yago</td>
    </tr>
    <tr>
      <td>CT-02: Criação do Cadastro de Pessoa Física</td>
      <td>
        <ul>
          <li>RF-02: O sistema deve permitir o cadastro de fotógrafos com informações pessoais e serviços.</li>
        </ul>
      </td>
      <td>Verificar se o futuro usuário de pessoa física consegue fazer seu cadastro.</td>
      <td>
        1. Acessar a rota <code>/cadastro</code> como usuário não autenticado.<br/>
        2. Selecionar a opção “Pessoa Física”.<br/>
        3. Preencher os campos obrigatórios para pessoa física (nome completo, CPF, e-mail, telefone, senha, confirmação de senha).<br/>
        4. Aceitar os termos de uso, se aplicável.<br/>
        5. Clicar em “Cadastrar” ou “Criar conta”.<br/>
        6. Verificar se é exibida mensagem de sucesso após o envio.
      </td>
      <td>
        <ul>
          <li>O cadastro de pessoa física é concluído sem erros de validação quando os dados obrigatórios estão corretos.</li>
          <li>É criado um novo registro de usuário pessoa física na base.</li>
          <li>Uma mensagem de confirmação de cadastro é exibida.</li>
          <li>Conforme o fluxo, o sistema pode redirecionar para login ou autenticar o usuário.</li>
        </ul>
      </td>
      <td>Yago</td>
    </tr>
    <tr>
      <td>CT-03: Criação de Cadastro de Pessoa Jurídica</td>
      <td>
        <ul>
          <li>RF-02: O sistema deve permitir o cadastro de fotógrafos com informações pessoais e serviços.</li>
        </ul>
      </td>
      <td>Verificar se o futuro usuário de pessoa jurídica consegue fazer seu cadastro.</td>
      <td>
        1. Acessar a rota <code>/cadastro</code> como usuário não autenticado.<br/>
        2. Selecionar a opção “Pessoa Jurídica”.<br/>
        3. Preencher os campos obrigatórios para pessoa jurídica (razão social, CNPJ, nome do responsável, e-mail, telefone, senha, confirmação de senha).<br/>
        4. Aceitar os termos de uso, se aplicável.<br/>
        5. Clicar em “Cadastrar” ou “Criar conta”.<br/>
        6. Verificar se é exibida mensagem de sucesso.
      </td>
      <td>
        <ul>
          <li>O cadastro de pessoa jurídica é concluído com sucesso quando os dados obrigatórios são preenchidos corretamente.</li>
          <li>Um novo registro de usuário pessoa jurídica é criado.</li>
          <li>Mensagem de confirmação de cadastro é exibida.</li>
          <li>Não aparecem erros inesperados ou falhas de validação indevidas.</li>
        </ul>
      </td>
      <td>Yago</td>
    </tr>
    <tr>
      <td>CT-04: Validação do login do usuário novo</td>
      <td>
        <ul>
          <li>RF-02: O sistema deve permitir o cadastro de fotógrafos com informações pessoais e serviços.</li>
        </ul>
      </td>
      <td>Verificar se qualquer um dos casos de cadastro consegue acessar normalmente o sistema.</td>
      <td>
        1. Garantir que exista ao menos um usuário recém-criado (pessoa física ou jurídica).<br/>
        2. Acessar a página de login do sistema.<br/>
        3. Informar o e-mail e a senha do usuário recém-cadastrado.<br/>
        4. Clicar em “Entrar” ou “Login”.<br/>
        5. Verificar se o login é efetuado com sucesso.<br/>
        6. Checar se o usuário é redirecionado para a página inicial adequada (dashboard, perfil ou home).
      </td>
      <td>
        <ul>
          <li>O sistema autentica corretamente o usuário recém-cadastrado quando e-mail e senha estão corretos.</li>
          <li>Não são exibidas mensagens de credenciais inválidas indevidamente.</li>
          <li>O usuário consegue acessar normalmente as rotas restritas a autenticados, como <code>/perfil</code>.</li>
        </ul>
      </td>
      <td>Yago</td>
    </tr>
  </tbody>
</table>

link para os casos de teste da funcionalidade Cadastro: [Google Drive](https://drive.google.com/drive/folders/1CvbOU9Mq8w3N-AF7cix8ULLyajmVNOsj?usp=drive_link).

### Funcionalidade Dashboard

<table>
  <thead>
    <tr>
      <th>Caso de teste</th>
      <th>Requisitos associados</th>
      <th>Objetivo do teste</th>
      <th>Passos</th>
      <th>Critérios de êxito</th>
      <th>Responsável</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>CT-01: Acessar a Dashboard e visualizar os blocos principais</td>
      <td>
        <ul>
          <li>RF-05: O sistema deve disponibilizar um pipeline Kanban para acompanhamento dos trabalhos (Dashboard como visão geral).</li>
          <li>RF-10: O sistema deve gerar relatórios de agenda e faturamento por período (informações-resumo na Dashboard).</li>
        </ul>
      </td>
      <td>Verificar se o usuário autenticado consegue acessar a rota <code>/dashboard</code> e visualizar os principais blocos da tela.</td>
      <td>
        1. Acessar o sistema no navegador e realizar login.<br/>
        2. Verificar se o login é realizado com sucesso e o usuário é redirecionado para sua “Dashboard”.
      </td>
      <td>
        <ul>
          <li>O título “Dashboard” é exibido no topo, juntamente com o breadcrumb.</li>
          <li>É exibida a seção “Agenda” com a faixa de dias da semana.</li>
          <li>São exibidos três cards na área principal à esquerda: “Financeiro”, “Últimas mensagens” e “Últimas solicitações”.</li>
          <li>É exibida, à direita, a seção “Tarefas”.</li>
        </ul>
      </td>
      <td>Ariana</td>
    </tr>
    <tr>
      <td>CT-02: Navegar entre semanas na seção de Agenda</td>
      <td>
        <ul>
          <li>RF-03: O sistema deve permitir o agendamento de sessões fotográficas (visão semanal).</li>
          <li>RF-10: Relatórios por período.</li>
        </ul>
      </td>
      <td>Verificar se os controles de navegação da semana (setas) alteram corretamente o intervalo de datas exibido.</td>
      <td>
        1. Acessar a “Dashboard”.<br/>
        2. Na seção “Agenda”, observar o texto do intervalo de datas (ex.: “01/09 a 07/09”).<br/>
        3. Clicar na seta esquerda.<br/>
        4. Observar novamente o intervalo de datas.<br/>
        5. Clicar na seta direita duas vezes para avançar duas semanas.
      </td>
      <td>
        <ul>
          <li>Ao clicar na seta esquerda, o intervalo de datas recua exatamente 7 dias (uma semana anterior).</li>
          <li>Ao clicar na seta direita, o intervalo de datas avança 7 dias a cada clique.</li>
          <li>Os rótulos dos dias da semana (DOMINGO a SÁBADO) permanecem fixos na grade.</li>
        </ul>
      </td>
      <td>Ariana</td>
    </tr>
    <tr>
      <td>CT-03: Visualizar informações financeiras de resumo</td>
      <td>
        <ul>
          <li>RF-10: O sistema deve gerar relatórios de agenda e faturamento por período.</li>
          <li>RF-12: O sistema deve permitir um controle de caixa básico.</li>
        </ul>
      </td>
      <td>Verificar se o card “Financeiro” exibe os valores-resumo definidos.</td>
      <td>
        1. Acessar a “Dashboard”.<br/>
        2. Localizar o card “Financeiro” na coluna esquerda, abaixo da seção “Agenda”.<br/>
        3. No menu, navegar até a página Financeiro e verificar se os valores da Dashboard correspondem aos valores exibidos no controle financeiro.
      </td>
      <td>
        <ul>
          <li>O card “Financeiro” exibe os valores acumulados do caixa do fotógrafo.</li>
          <li>Os valores exibidos são os mesmos da página Financeiro.</li>
        </ul>
      </td>
      <td>Ariana</td>
    </tr>
    <tr>
      <td>CT-04: Alterar status da última solicitação</td>
      <td>
        <ul>
          <li>RF-05: Acompanhamento de trabalhos e solicitações.</li>
          <li>RF-10: Relatórios por período (estado das solicitações).</li>
        </ul>
      </td>
      <td>Verificar se o seletor de status em “Últimas solicitações” permite trocar o estágio de uma solicitação.</td>
      <td>
        1. Acessar a “Dashboard”.<br/>
        2. Localizar o card “Últimas solicitações”.<br/>
        3. Dentro do card, no campo “Status”, abrir o dropdown de status.<br/>
        4. Selecionar um status diferente do que era exibido até então.
      </td>
      <td>
        <ul>
          <li>O dropdown lista as opções definidas (ex.: A fazer, Em andamento, Concluído, Atrasado).</li>
          <li>Ao selecionar outra opção, o valor exibido no campo é atualizado para o novo status.</li>
        </ul>
      </td>
      <td>Ariana</td>
    </tr>
    <tr>
      <td>CT-05: Alterar status das tarefas na coluna "Tarefas"</td>
      <td>
        <ul>
          <li>RF-05: Pipeline Kanban / acompanhamento das tarefas da prestação de serviço.</li>
        </ul>
      </td>
      <td>Verificar se os selects de status da seção “Tarefas” permitem alterar o estágio da tarefa.</td>
      <td>
        1. Acessar a “Dashboard”.<br/>
        2. Localizar a coluna à direita com o título “Tarefas”.<br/>
        3. No card de tarefa, abrir o dropdown de status e escolher outro valor (ex.: “Concluído”).
      </td>
      <td>
        <ul>
          <li>No card, o dropdown mostra as opções definidas para o status das tarefas (A fazer, Em andamento, Concluído, Atrasado) e atualiza o valor selecionado normalmente.</li>
          <li>É possível mudar o status da tarefa ao selecionar um dos itens do dropdown.</li>
        </ul>
      </td>
      <td>Ariana</td>
    </tr>
    <tr>
      <td>CT-06: Verificar estrutura visual “Últimas mensagens” e “Últimas solicitações”</td>
      <td>
        <ul>
          <li>RF-08: O sistema deve enviar notificações automáticas de prazos e lembretes (dashboard como ponto de visualização futura).</li>
        </ul>
      </td>
      <td>Verificar se os cards “Últimas mensagens” e “Últimas solicitações” são exibidos com seus controles de navegação.</td>
      <td>
        1. Acessar a “Dashboard”.<br/>
        2. Localizar os cards “Últimas mensagens” e “Últimas solicitações”.<br/>
        3. Observar a existência das setas de navegação (“Anterior” e “Próximo”).<br/>
        4. Clicar em cada uma das setas em ambos os cards.
      </td>
      <td>
        <ul>
          <li>Ambos os cards são exibidos com o título correto e com as setas de navegação (ícones de chevrons).</li>
          <li>Quando há mais de uma informação disponível, as setas de navegação realizam a troca das informações a cada clique em “Anterior” ou “Próximo”.</li>
        </ul>
      </td>
      <td>Ariana</td>
    </tr>
  </tbody>
</table>

link para os casos de teste da funcionalidade Dashboard: [Google Drive](https://drive.google.com/drive/folders/1CvbOU9Mq8w3N-AF7cix8ULLyajmVNOsj?usp=drive_link).

### Funcionalidade Projetos

<table>
  <thead>
    <tr>
      <th>Caso de teste</th>
      <th>Requisitos associados</th>
      <th>Objetivo do teste</th>
      <th>Passos</th>
      <th>Critérios de êxito</th>
      <th>Responsável</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>CT-01: Acessar a lista de projetos na página "Projetos"</td>
      <td>
        <ul>
          <li>RF-03: O sistema deve permitir o agendamento de sessões fotográficas (cada projeto tem uma data de sessão).</li>
          <li>RF-05: O sistema deve disponibilizar um pipeline para acompanhamento dos trabalhos (status dos projetos).</li>
        </ul>
      </td>
      <td>Verificar se os projetos salvos no armazenamento (localStorage/backend) são carregados e exibidos corretamente na listagem.</td>
      <td>
        1. Configurar o ambiente de teste com pelo menos 1 projeto salvo (via <code>defaultProjects</code> ou localStorage).<br/>
        2. Acessar o sistema no navegador e realizar login.<br/>
        3. No menu principal, clicar em “Projetos”.
      </td>
      <td>
        <ul>
          <li>Ao clicar no menu Projetos, a lista de projetos é exibida em formato de cards.</li>
          <li>Cada card mostra, no mínimo:
            <ul>
              <li>Título do projeto.</li>
              <li>Data da sessão.</li>
              <li>Pacote.</li>
              <li>Nome do cliente.</li>
              <li>Status atual (ex.: Lead, Em andamento, Concluído, etc.).</li>
            </ul>
          </li>
        </ul>
      </td>
      <td>Ariana</td>
    </tr>
    <tr>
      <td>CT-02: Cadastrar um novo projeto pelo modal "Novo Projeto"</td>
      <td>
        <ul>
          <li>RF-03: O sistema deve permitir o agendamento de sessões fotográficas.</li>
          <li>RF-05: O sistema deve disponibilizar um pipeline para acompanhamento dos trabalhos (status inicial do projeto).</li>
        </ul>
      </td>
      <td>Verificar se é possível cadastrar um novo projeto através do modal e se ele passa a aparecer na listagem.</td>
      <td>
        1. Acessar a página “Projetos” após login.<br/>
        2. Clicar no botão “Novo projeto”.<br/>
        3. No modal “Novo Projeto”, preencher:
        <ul>
          <li>Título do Projeto</li>
          <li>Data da Sessão</li>
          <li>Pacote</li>
          <li>Cliente</li>
          <li>Status</li>
        </ul>
        4. Clicar em “Salvar Projeto”.
      </td>
      <td>
        <ul>
          <li>Se algum dos campos obrigatórios (título, dataSessao, pacote, cliente) não for preenchido, o sistema exibe o alerta “Todos os campos são obrigatórios” e não salva.</li>
          <li>Com todos os campos obrigatórios preenchidos, o modal é fechado sem erros.</li>
          <li>Um novo card de projeto com o título “Ensaio Gestante Ana” aparece na listagem.</li>
          <li>Os dados exibidos no card (data, pacote, cliente, status) correspondem às informações preenchidas no formulário.</li>
        </ul>
      </td>
      <td>Ariana</td>
    </tr>
    <tr>
      <td>CT-03: Buscar projetos pelo campo de pesquisa</td>
      <td>
        <ul>
          <li>RF-01: Cadastro de clientes com histórico de contratos (nome do cliente usado na busca).</li>
          <li>RF-05: Acompanhamento de trabalhos (localizar projetos no pipeline).</li>
        </ul>
      </td>
      <td>Verificar se o campo de busca filtra a lista de projetos pelo título do projeto ou pelo nome do cliente.</td>
      <td>
        1. Garantir que existam pelo menos dois projetos cadastrados.<br/>
        2. Acessar a página “Projetos”.<br/>
        3. No campo de busca “Nome do projeto...”, digitar um termo para ser buscado.<br/>
        4. Observar se a lista de projetos exibida filtra somente os projetos que contenham aquele termo.
      </td>
      <td>
        <ul>
          <li>Ao digitar um termo, apenas os projetos contendo aquele termo são exibidos.</li>
          <li>Ao limpar o campo de busca, todos os projetos cadastrados voltam a ser exibidos.</li>
        </ul>
      </td>
      <td>Ariana</td>
    </tr>
    <tr>
      <td>CT-04: Alterar o status de um projeto pelo card</td>
      <td>
        <ul>
          <li>RF-05: O sistema deve disponibilizar um pipeline para acompanhamento dos trabalhos com possibilidade de designar prazos e responsáveis pelas tarefas.</li>
        </ul>
      </td>
      <td>Verificar se é possível alterar o status de um projeto através do seletor de status do card, e se essa alteração é persistida.</td>
      <td>
        1. Garantir que exista pelo menos um projeto listado com status inicial (por exemplo, “Lead”).<br/>
        2. Na listagem de projetos, localizar o card desejado.<br/>
        3. Clicar no botão de status (que mostra o status atual e o ícone de seta para baixo).<br/>
        4. No menu de opções de status, selecionar outro status (por exemplo, “Em andamento”).<br/>
        5. Recarregar a página de “Projetos”.
      </td>
      <td>
        <ul>
          <li>Ao clicar no botão de status, a lista de opções (STATUS_OPTIONS) é exibida.</li>
          <li>Ao selecionar um novo status, o texto do botão é atualizado para o status escolhido.</li>
          <li>Após recarregar a página, o card continua exibindo o status atualizado (alteração persistida em localStorage via <code>useLocalStorage</code>).</li>
        </ul>
      </td>
      <td>Ariana</td>
    </tr>
    <tr>
      <td>CT-05: Persistência dos projetos após recarregar a aplicação</td>
      <td>
        <ul>
          <li>RF-03: Agendamento de sessões fotográficas (não perder projetos cadastrados).</li>
          <li>RF-05: Pipeline de trabalhos.</li>
          <li>RNF-07: O tempo de resposta das páginas deve ser adequado ao carregar dados.</li>
        </ul>
      </td>
      <td>Verificar se os projetos criados/alterados permanecem disponíveis após fechar e reabrir o sistema, usando o armazenamento local (localStorage).</td>
      <td>
        1. Criar um novo projeto (CT-02) e alterar o status de um projeto existente (CT-05).<br/>
        2. Fechar a aba do navegador.<br/>
        3. Abrir novamente o navegador e acessar o sistema.<br/>
        4. Realizar login e entrar na página “Projetos”.
      </td>
      <td>
        <ul>
          <li>O projeto criado anteriormente continua aparecendo na listagem.</li>
          <li>O projeto que teve o status alterado continua exibindo o status atualizado.</li>
          <li>Não são exibidas mensagens de erro relacionadas ao carregamento de projetos.</li>
        </ul>
      </td>
      <td>Ariana</td>
    </tr>
  </tbody>
</table>

link para os casos de teste da funcionalidade Projetos: [Google Drive](https://drive.google.com/drive/folders/1CvbOU9Mq8w3N-AF7cix8ULLyajmVNOsj?usp=drive_link).

### Funcionalidade Pipeline

<table>
  <thead>
    <tr>
      <th>Caso de teste</th>
      <th>Requisitos associados</th>
      <th>Objetivo do teste</th>
      <th>Passos</th>
      <th>Critérios de êxito</th>
      <th>Responsável</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>CT-01: Acessar a página Pipeline e visualizar os projetos cadastrados</td>
      <td>
        <ul>
          <li>RF-03: O sistema deve permitir o agendamento de sessões fotográficas (cada projeto tem uma data de sessão).</li>
          <li>RF-05: O sistema deve disponibilizar um pipeline para acompanhamento dos trabalhos (status dos projetos).</li>
        </ul>
      </td>
      <td>Verificar se o usuário autenticado consegue acessar a rota <code>/pipeline</code> e visualizar os projetos.</td>
      <td>
        1. Acessar o navegador (Chrome, Firefox, Edge ou Safari).<br/>
        2. Informar o endereço do sistema.<br/>
        3. Realizar login com um usuário válido.<br/>
        4. No menu principal, clicar em “Pipeline”.
      </td>
      <td>
        <ul>
          <li>O usuário é redirecionado para a página “Pipeline” sem erros.</li>
          <li>O título “Pipeline de Produção” é exibido no topo da página.</li>
          <li>A tabela com os projetos é exibida, mostrando todas as sete colunas de estágio do projeto.</li>
        </ul>
      </td>
      <td>Yuri</td>
    </tr>
    <tr>
      <td>CT-02: Cadastrar um novo projeto utilizando o botão “Novo Projeto”</td>
      <td>
        <ul>
          <li>RF-03: O sistema deve permitir o agendamento de sessões fotográficas (cada projeto tem uma data de sessão).</li>
          <li>RF-05: O sistema deve disponibilizar um pipeline para acompanhamento dos trabalhos (status dos projetos).</li>
        </ul>
      </td>
      <td>Verificar se é possível cadastrar um novo projeto e observar se ele aparece na tabela.</td>
      <td>
        1. Acessar a página “Pipeline” após login.<br/>
        2. Clicar no botão “Novo Projeto”.<br/>
        3. Inserir na nova página as informações necessárias para a criação de um projeto.<br/>
        4. Clicar em “Salvar Projeto”.
      </td>
      <td>
        <ul>
          <li>O sistema valida os campos obrigatórios e não permite salvar se estiverem vazios.</li>
          <li>Ao salvar com dados válidos, o formulário é fechado ou o usuário é redirecionado de volta para a lista.</li>
          <li>O novo projeto aparece na tabela com os dados informados.</li>
        </ul>
      </td>
      <td>Yuri</td>
    </tr>
    <tr>
      <td>CT-03: Editar os dados de um projeto cadastrado</td>
      <td>
        <ul>
          <li>RF-03: O sistema deve permitir o agendamento de sessões fotográficas (cada projeto tem uma data de sessão).</li>
          <li>RF-05: O sistema deve disponibilizar um pipeline para acompanhamento dos trabalhos (status dos projetos).</li>
        </ul>
      </td>
      <td>Verificar se é possível alterar os dados de um projeto cadastrado.</td>
      <td>
        1. Garantir que exista pelo menos um projeto cadastrado.<br/>
        2. Na tabela de projetos, clicar em um projeto que deseja alterar.<br/>
        3. No formulário de edição, alterar alguns dados já cadastrados.<br/>
        4. Clicar em “Salvar”.
      </td>
      <td>
        <ul>
          <li>Todas as novas informações alteradas no projeto foram salvas com sucesso.</li>
        </ul>
      </td>
      <td>Yuri</td>
    </tr>
    <tr>
      <td>CT-04: Excluir dados cadastrados na tabela</td>
      <td>
        <ul>
          <li>RF-03: O sistema deve permitir o agendamento de sessões fotográficas (cada projeto tem uma data de sessão).</li>
          <li>RF-05: O sistema deve disponibilizar um pipeline para acompanhamento dos trabalhos (status dos projetos).</li>
        </ul>
      </td>
      <td>Verificar se foi possível excluir os dados cadastrados na tabela.</td>
      <td>
        1. Garantir que exista pelo menos um projeto cadastrado.<br/>
        2. Na tabela de projetos, clicar em um projeto que deseja excluir.<br/>
        3. No formulário de edição, percorrer a página até o final.<br/>
        4. Clicar em “Excluir”.
      </td>
      <td>
        <ul>
          <li>Verificar se o projeto escolhido foi excluído e não consta mais na tabela de projetos cadastrados.</li>
        </ul>
      </td>
      <td>Yuri</td>
    </tr>
    <tr>
      <td>CT-05: Buscar projetos pelo campo de pesquisa</td>
      <td>
        <ul>
          <li>RF-03: O sistema deve permitir o agendamento de sessões fotográficas (cada projeto tem uma data de sessão).</li>
          <li>RF-05: O sistema deve disponibilizar um pipeline para acompanhamento dos trabalhos (status dos projetos).</li>
        </ul>
      </td>
      <td>Verificar se o campo de busca filtra a lista de projetos com base no termo digitado.</td>
      <td>
        1. Garantir que exista pelo menos um projeto cadastrado.<br/>
        2. Na caixa de busca, digitar o título de algum projeto ou cliente.<br/>
        3. Observar se o termo digitado aparece na tabela.<br/>
        4. Apagar o texto digitado.
      </td>
      <td>
        <ul>
          <li>Após digitar um termo que exista em algum projeto, a tabela passa a exibir projetos cujo título ou cliente contenha o termo digitado.</li>
          <li>Ao excluir o termo digitado, a tabela passa a exibir todos os projetos cadastrados.</li>
        </ul>
      </td>
      <td>Yuri</td>
    </tr>
  </tbody>
</table>

link para os casos de teste da funcionalidade Pipeline: [Google Drive](https://drive.google.com/drive/folders/1CvbOU9Mq8w3N-AF7cix8ULLyajmVNOsj?usp=drive_link).

### Funcionalidade Clientes

<table>
 <tr>
  <th>Caso de teste</th>
  <th>Requisitos associados</th>
  <th>Objetivo do teste</th>
  <th>Passos</th>
  <th>Critérios de êxito</th>
  <th>Responsável</th>
 </tr>

 <tr>
  <td>CT-01: Carregar e listar clientes cadastrados</td>
  <td>
   <ul>
    <li>RF-01: O sistema deve permitir cadastro e edição de clientes com histórico de contratos.</li>
    <li>RNF-01: Compatibilidade com navegadores.</li>
   </ul>
  </td>
  <td>Verificar se os clientes salvos no armazenamento local são carregados e exibidos corretamente na tabela.</td>
  <td>
   <ol>
    <li>Acessar o sistema no navegador e realizar login.</li>
    <li>No menu principal, clicar em "Clientes".</li>
   </ol>
  </td>
  <td>
   <ul>
    <li>Enquanto os dados são carregados, é exibida a mensagem "Carregando clientes...".</li>
    <li>Após a inicialização, a tabela de clientes é exibida com as colunas: ID, Cliente, E-mail, Contato e Ações.</li>
    <li>Cada linha da tabela mostra os dados de um cliente cadastrado.</li>
   </ul>
  </td>
  <td>Gustavo</td>
 </tr>

 <tr>
  <td>CT-02: Cadastrar um novo cliente</td>
  <td>
   <ul>
    <li>RF-01: O sistema deve permitir cadastro e edição de clientes com histórico de contratos.</li>
   </ul>
  </td>
  <td>Verificar se é possível cadastrar um novo cliente através do modal e se ele aparece na listagem.</td>
  <td>
   <ol>
    <li>Acessar a página "Clientes" após login.</li>
    <li>Clicar no botão "Novo cliente".</li>
    <li>No modal, preencher:
      <ul>
        <li><strong>Nome</strong>: "Maria Silva".</li>
        <li><strong>E-mail</strong>: "maria.silva@email.com".</li>
        <li><strong>Contato</strong>: "(11) 98765-4321".</li>
      </ul>
    </li>
    <li>Clicar em "Salvar" ou "Adicionar".</li>
   </ol>
  </td>
  <td>
   <ul>
    <li>Se algum campo obrigatório não for preenchido, o sistema não permite salvar.</li>
    <li>Com todos os campos preenchidos, o modal é fechado sem erros.</li>
    <li>Uma nova linha com o cliente "Maria Silva" aparece na tabela.</li>
    <li>Os dados exibidos (nome, e-mail, contato) correspondem às informações preenchidas.</li>
   </ul>
  </td>
  <td>Gustavo</td>
 </tr>

 <tr>
  <td>CT-03: Editar um cliente existente</td>
  <td>
   <ul>
    <li>RF-01: O sistema deve permitir cadastro e edição de clientes com histórico de contratos.</li>
   </ul>
  </td>
  <td>Verificar se é possível alterar os dados de um cliente já cadastrado.</td>
  <td>
   <ol>
    <li>Garantir que exista pelo menos um cliente cadastrado.</li>
    <li>Na tabela de clientes, clicar no ícone de "Editar" (lápis) do cliente desejado.</li>
    <li>No modal de edição, alterar o nome para "Maria Silva Santos".</li>
    <li>Alterar o e-mail para "maria.santos@email.com".</li>
    <li>Clicar em "Salvar".</li>
   </ol>
  </td>
  <td>
   <ul>
    <li>Os novos valores são validados e salvos com sucesso.</li>
    <li>Após salvar, a tabela é atualizada exibindo o nome "Maria Silva Santos" e o novo e-mail.</li>
    <li>Não permanecem dados antigos na interface para este cliente.</li>
   </ul>
  </td>
  <td>Gustavo</td>
 </tr>

 <tr>
  <td>CT-04: Visualizar detalhes de um cliente</td>
  <td>
   <ul>
    <li>RF-01: O sistema deve permitir cadastro e edição de clientes com histórico de contratos.</li>
   </ul>
  </td>
  <td>Verificar se é possível visualizar os dados completos de um cliente em modo somente leitura.</td>
  <td>
   <ol>
    <li>Na tabela de clientes, clicar no ícone de "Visualizar" (olho) de um cliente.</li>
    <li>Observar o modal aberto.</li>
   </ol>
  </td>
  <td>
   <ul>
    <li>O modal é aberto exibindo todos os dados do cliente (nome, e-mail, contato).</li>
    <li>Os campos estão em modo somente leitura (não editáveis).</li>
    <li>Existe um botão para fechar o modal.</li>
   </ul>
  </td>
  <td>Gustavo</td>
 </tr>

 <tr>
  <td>CT-05: Excluir um cliente</td>
  <td>
   <ul>
    <li>RF-01: O sistema deve permitir cadastro e edição de clientes com histórico de contratos.</li>
   </ul>
  </td>
  <td>Verificar se é possível remover um cliente da listagem.</td>
  <td>
   <ol>
    <li>Garantir que exista pelo menos um cliente cadastrado.</li>
    <li>Na tabela de clientes, clicar no ícone de "Excluir" (lixeira) do cliente desejado.</li>
    <li>Confirmar a exclusão na janela de confirmação que aparece.</li>
   </ol>
  </td>
  <td>
   <ul>
    <li>Após a confirmação, o cliente selecionado deixa de aparecer na tabela.</li>
    <li>Se a página for recarregada, o cliente continua ausente (exclusão persistida no localStorage).</li>
   </ul>
  </td>
  <td>Gustavo</td>
 </tr>

 <tr>
  <td>CT-06: Buscar clientes pelo campo de pesquisa</td>
  <td>
   <ul>
    <li>RF-01: O sistema deve permitir cadastro e edição de clientes com histórico de contratos.</li>
   </ul>
  </td>
  <td>Verificar se o campo de busca filtra a lista de clientes pelo nome, e-mail ou contato.</td>
  <td>
   <ol>
    <li>Garantir que existam pelo menos dois clientes cadastrados, por exemplo:
      <ul>
        <li>Cliente 1: "João Silva", "joao@email.com", "(11) 91111-1111".</li>
        <li>Cliente 2: "Maria Santos", "maria@email.com", "(11) 92222-2222".</li>
      </ul>
    </li>
    <li>No campo de busca "Digite o termo...", digitar "maria".</li>
    <li>Observar a tabela de clientes.</li>
    <li>Apagar o texto e digitar "91111".</li>
   </ol>
  </td>
  <td>
   <ul>
    <li>Ao digitar "maria", apenas clientes cujo nome, e-mail ou contato contenham "maria" são exibidos.</li>
    <li>Ao digitar "91111", apenas clientes cujo contato contenha "91111" são exibidos.</li>
    <li>Ao limpar o campo de busca, todos os clientes cadastrados voltam a ser exibidos.</li>
   </ul>
  </td>
  <td>Gustavo</td>
 </tr>

 <tr>
  <td>CT-07: Persistência dos clientes após recarregar a aplicação</td>
  <td>
   <ul>
    <li>RF-01: O sistema deve permitir cadastro e edição de clientes com histórico de contratos.</li>
   </ul>
  </td>
  <td>Verificar se os clientes criados/alterados permanecem disponíveis após fechar e reabrir o sistema.</td>
  <td>
   <ol>
    <li>Criar um novo cliente (CT-02) e editar um cliente existente (CT-03).</li>
    <li>Fechar a aba do navegador.</li>
    <li>Abrir novamente o navegador e acessar o sistema.</li>
    <li>Realizar login e entrar na página "Clientes".</li>
   </ol>
  </td>
  <td>
   <ul>
    <li>O cliente criado anteriormente continua aparecendo na tabela.</li>
    <li>O cliente que teve os dados alterados continua exibindo as informações atualizadas.</li>
    <li>Não são exibidas mensagens de erro relacionadas ao carregamento de clientes.</li>
   </ul>
  </td>
  <td>Gustavo</td>
 </tr>

</table>

link para os casos de teste da funcionalidade Clientes: [Google Drive]([https://drive.google.com/drive/folders/1CvbOU9Mq8w3N-AF7cix8ULLyajmVNOsj?usp=drive_link](https://drive.google.com/drive/folders/1CvbOU9Mq8w3N-AF7cix8ULLyajmVNOsj?usp=drive_link/drive/folders/1CvbOU9Mq8w3N-AF7cix8ULLyajmVNOsj?usp=drive_link)).

### Funcionalidade Agenda

<table>
  <thead>
    <tr>
      <th>Caso de teste</th>
      <th>Requisitos associados</th>
      <th>Objetivo do teste</th>
      <th>Passos</th>
      <th>Critérios de êxito</th>
      <th>Responsável</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>CT-01: Acessar a página Agenda e visualizar o calendário</td>
      <td>
        <ul>
          <li>RF-03: O sistema deve permitir o agendamento de sessões fotográficas.</li>
          <li>RNF-01: Compatibilidade com navegadores.</li>
        </ul>
      </td>
      <td>Verificar se o usuário autenticado consegue acessar a rota <code>/agenda</code> e visualizar o calendário mensal.</td>
      <td>
        1. Acessar o navegador (Chrome, Firefox, Edge ou Safari).<br/>
        2. Informar o endereço do sistema.<br/>
        3. Realizar login com um usuário válido.<br/>
        4. No menu principal, clicar em “Agenda”.
      </td>
      <td>
        <ul>
          <li>O usuário é redirecionado para a página “Agenda” sem erros.</li>
          <li>O título “Agenda” é exibido no topo da página.</li>
          <li>O calendário mensal é exibido com o nome do mês e ano correntes.</li>
          <li>Os dias da semana aparecem no cabeçalho (DOM, SEG, TER, QUA, QUI, SEX, SAB).</li>
        </ul>
      </td>
      <td>Dangeles Lima</td>
    </tr>
    <tr>
      <td>CT-02: Criar novo compromisso na Agenda</td>
      <td>
        <ul>
          <li>RF-03: O sistema deve permitir o agendamento de sessões fotográficas.</li>
        </ul>
      </td>
      <td>Verificar se é possível criar um novo compromisso na agenda e associá-lo a uma data.</td>
      <td>
        1. Na página Agenda, clicar no botão “Novo compromisso”.<br/>
        2. Preencher o campo “Título” com “Ensaio Cliente X”.<br/>
        3. Preencher “Descrição” (opcional).<br/>
        4. Selecionar uma data válida no campo “Data”.<br/>
        5. Selecionar um tipo (por exemplo, “Evento”).<br/>
        6. Clicar em “Salvar”.
      </td>
      <td>
        <ul>
          <li>O modal é fechado sem mensagens de erro.</li>
          <li>Na célula da data escolhida, aparece uma badge com o título do compromisso.</li>
        </ul>
      </td>
      <td>Dangeles Lima</td>
    </tr>
    <tr>
      <td>CT-03: Editar e excluir compromisso existente</td>
      <td>
        <ul>
          <li>RF-03: O sistema deve permitir o agendamento de sessões fotográficas.</li>
        </ul>
      </td>
      <td>Verificar se é possível alterar e remover um compromisso já cadastrado na agenda.</td>
      <td>
        1. Criar previamente um compromisso usando o CT-02 ou usar um já existente.<br/>
        2. Clicar na badge do compromisso na célula da data correspondente.<br/>
        3. No modal “Compromisso”, alterar o “Título”.<br/>
        4. Clicar em “Salvar” e verificar se o novo título aparece na badge.<br/>
        5. Abrir novamente o mesmo compromisso.<br/>
        6. Clicar em “Excluir”.
      </td>
      <td>
        <ul>
          <li>Após salvar, a badge passa a exibir o título atualizado.</li>
          <li>Após excluir, a badge some da célula dessa data.</li>
        </ul>
      </td>
      <td>Dangeles Lima</td>
    </tr>
    <tr>
      <td>CT-04: Persistência dos compromissos (armazenamento local)</td>
      <td>
        <ul>
          <li>RF-03: O sistema deve permitir o agendamento de sessões fotográficas.</li>
        </ul>
      </td>
      <td>Verificar se os compromissos cadastrados permanecem após fechar e reabrir a aplicação (uso de localStorage).</td>
      <td>
        1. Na página Agenda, criar um ou mais compromissos em datas distintas.<br/>
        2. Fechar a aba do navegador.<br/>
        3. Abrir novamente o navegador e acessar o sistema.<br/>
        4. Realizar login e abrir a página Agenda.
      </td>
      <td>
        <ul>
          <li>Os compromissos criados anteriormente são exibidos nas datas corretas do calendário.</li>
          <li>Não há erros aparentes de carregamento ao abrir a página.</li>
        </ul>
      </td>
      <td>Dangeles Lima</td>
    </tr>
    <tr>
      <td>CT-05: Buscar compromissos pelo campo de pesquisa</td>
      <td>
        <ul>
          <li>RF-03: O sistema deve permitir o agendamento de sessões fotográficas.</li>
        </ul>
      </td>
      <td>Verificar se o campo de pesquisa localiza compromissos pelo título e permite acessá-los rapidamente.</td>
      <td>
        1. Na página Agenda, garantir que exista ao menos um compromisso com título “Ensaio Ana Paula”.<br/>
        2. No campo “Digite o termo...”, digitar “Ana”.<br/>
        3. Observar a área de resultados (chips) exibida abaixo da barra de busca.<br/>
        4. Clicar no chip correspondente ao compromisso “Ensaio Ana Paula”.
      </td>
      <td>
        <ul>
          <li>Ao digitar “Ana”, é exibido um chip com o título correspondente.</li>
          <li>Ao clicar no chip, o modal “Compromisso” abre exibindo os dados desse compromisso.</li>
        </ul>
      </td>
      <td>Dangeles Lima</td>
    </tr>
  </tbody>
</table>

link para os casos de teste da funcionalidade Agenda: [Google Drive](https://drive.google.com/drive/folders/1CvbOU9Mq8w3N-AF7cix8ULLyajmVNOsj?usp=drive_link).

### Funcionalidade Perfil Público

<table>
  <thead>
    <tr>
      <th>Caso de teste</th>
      <th>Requisitos associados</th>
      <th>Objetivo do teste</th>
      <th>Passos</th>
      <th>Critérios de êxito</th>
      <th>Responsável</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>CT-01: Acessar a página Perfil Público e verificar campos disponíveis</td>
      <td>
        <ul>
          <li>RF-02: O sistema deve permitir o cadastro de fotógrafos com informações pessoais e serviços.</li>
        </ul>
      </td>
      <td>Verificar se o usuário autenticado consegue acessar a rota <code>/perfil</code> e visualizar os dados de perfil.</td>
      <td>
        1. Acessar o navegador (Chrome, Firefox, Edge ou Safari).<br/>
        2. Informar o endereço do sistema.<br/>
        3. Realizar login com um usuário válido.<br/>
        4. No menu principal, clicar em “Perfil”.<br/>
        5. Verificar se a página de perfil é carregada com os dados cadastrados do fotógrafo.
      </td>
      <td>
        <ul>
          <li>A rota <code>/perfil</code> é acessada com sucesso após o login.</li>
          <li>Os dados de perfil do usuário autenticado são exibidos corretamente (nome, contato, descrição/resumo, serviços, foto etc.).</li>
          <li>Não são exibidas mensagens de erro ou páginas em branco.</li>
        </ul>
      </td>
      <td>Yago</td>
    </tr>
    <tr>
      <td>CT-02: Editar os dados da página Perfil Público</td>
      <td>
        <ul>
          <li>RF-02: O sistema deve permitir o cadastro de fotógrafos com informações pessoais e serviços.</li>
        </ul>
      </td>
      <td>Verificar se o usuário consegue atualizar os dados existentes no perfil.</td>
      <td>
        1. Acessar o sistema e realizar login com um usuário válido.<br/>
        2. No menu principal, clicar em “Perfil”.<br/>
        3. Localizar os campos de dados pessoais (nome, telefone, redes sociais, biografia, cidade etc.).<br/>
        4. Alterar um ou mais campos com novos valores válidos.<br/>
        5. Clicar no botão “Salvar” ou “Atualizar perfil”.<br/>
        6. Verificar se é exibida mensagem de sucesso.<br/>
        7. Recarregar a página ou acessar novamente <code>/perfil</code> para confirmar as alterações.
      </td>
      <td>
        <ul>
          <li>As alterações realizadas nos campos de perfil são salvas sem erros.</li>
          <li>Mensagem de confirmação de sucesso é apresentada.</li>
          <li>Ao recarregar a página, os dados exibidos correspondem aos valores atualizados.</li>
        </ul>
      </td>
      <td>Yago</td>
    </tr>
    <tr>
      <td>CT-03: Adição de novas imagens de galeria</td>
      <td>
        <ul>
          <li>RF-02: O sistema deve permitir o cadastro de fotógrafos com informações pessoais e serviços.</li>
        </ul>
      </td>
      <td>Verificar se o usuário consegue fazer a adição de novas imagens na galeria.</td>
      <td>
        1. Acessar o sistema e realizar login com um usuário válido.<br/>
        2. Ir ao menu “Perfil” e à seção de galeria de imagens.<br/>
        3. Clicar no botão “Adicionar imagem” ou equivalente.<br/>
        4. Selecionar uma ou mais imagens válidas no dispositivo (formatos permitidos, como JPG/PNG).<br/>
        5. Confirmar o envio clicando em “Salvar” ou “Concluir”.<br/>
        6. Verificar se as novas imagens aparecem na galeria do perfil.
      </td>
      <td>
        <ul>
          <li>As imagens são enviadas sem erro.</li>
          <li>As novas imagens aparecem na galeria imediatamente após o envio.</li>
          <li>As imagens permanecem visíveis ao recarregar a página de perfil.</li>
        </ul>
      </td>
      <td>Yago</td>
    </tr>
    <tr>
      <td>CT-04: Edição e criação de serviços na página</td>
      <td>
        <ul>
          <li>RF-02: O sistema deve permitir o cadastro de fotógrafos com informações pessoais e serviços.</li>
        </ul>
      </td>
      <td>Verificar se o usuário consegue criar e editar os seus serviços.</td>
      <td>
        1. Acessar o sistema e realizar login com um usuário válido.<br/>
        2. No menu “Perfil”, ir à seção de serviços.<br/>
        3. Para criar um serviço: clicar em “Adicionar serviço”, preencher campos obrigatórios (nome do serviço, descrição, preço, duração etc.) e clicar em “Salvar”.<br/>
        4. Para editar um serviço: selecionar um serviço já cadastrado, clicar em “Editar”, alterar os campos desejados e salvar.<br/>
        5. Verificar se o serviço criado aparece na lista e se o serviço editado é exibido com as informações atualizadas.
      </td>
      <td>
        <ul>
          <li>Novos serviços são criados com sucesso e aparecem na lista.</li>
          <li>Serviços existentes podem ser editados e as alterações são refletidas após salvar.</li>
          <li>Não são exibidas mensagens de erro inesperadas durante criação ou edição.</li>
        </ul>
      </td>
      <td>Yago</td>
    </tr>
    <tr>
      <td>CT-05: Persistência dos dados do perfil público (Local Storage)</td>
      <td>
        <ul>
          <li>RF-02: O sistema deve permitir o cadastro de fotógrafos com informações pessoais e serviços.</li>
        </ul>
      </td>
      <td>Verificar se os dados atualizados permanecem após fechar e reabrir a aplicação (uso de localStorage).</td>
      <td>
        1. Acessar o sistema e realizar login com um usuário válido.<br/>
        2. Ir até “Perfil”.<br/>
        3. Alterar alguns dados do perfil (descrição, redes sociais, serviços, galeria etc.).<br/>
        4. Clicar em “Salvar” ou “Atualizar perfil”.<br/>
        5. Confirmar que os novos dados aparecem na tela após o salvamento.<br/>
        6. Fechar a aba ou o navegador.<br/>
        7. Reabrir o navegador e acessar novamente o sistema.<br/>
        8. Realizar login com o mesmo usuário.<br/>
        9. Acessar a rota <code>/perfil</code>.
      </td>
      <td>
        <ul>
          <li>Após fechar e reabrir o navegador, os dados do perfil permanecem atualizados para o mesmo usuário.</li>
          <li>Não ocorre perda de informações alteradas.</li>
          <li>O comportamento confirma que o mecanismo de persistência (localStorage ou equivalente) está funcionando corretamente.</li>
        </ul>
      </td>
      <td>Yago</td>
    </tr>
  </tbody>
</table>

link para os casos de teste da funcionalidade Perfil Público: [Google Drive](https://drive.google.com/drive/folders/1CvbOU9Mq8w3N-AF7cix8ULLyajmVNOsj?usp=drive_link).

### Funcionalidade Portfólio / Galeria

<table>
  <thead>
    <tr>
      <th>Caso de teste</th>
      <th>Requisitos associados</th>
      <th>Objetivo do teste</th>
      <th>Passos</th>
      <th>Critérios de êxito</th>
      <th>Responsável</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>CT-01: Verificar se é possível enviar fotos para a galeria</td>
      <td>
        <ul>
          <li>RF-11: O sistema deve disponibilizar uma página online de divulgação do fotógrafo e seus serviços.</li>
        </ul>
      </td>
      <td>Verificar se é possível enviar fotos e compor uma nova galeria no portfólio.</td>
      <td>
        1. Acessar a página “Perfil” após login.<br/>
        2. Clicar no botão “Nova Galeria”.<br/>
        3. Inserir na nova página as informações necessárias para a criação de um projeto.<br/>
        4. Inserir uma imagem na galeria ao clicar no botão “Enviar fotos”.<br/>
        5. Clicar em “Salvar”.
      </td>
      <td>
        <ul>
          <li>Após completar o processo de criação de uma nova galeria, verificar se as imagens selecionadas aparecem como uma nova galeria no portfólio.</li>
        </ul>
      </td>
      <td>Yuri</td>
    </tr>
    <tr>
      <td>CT-02: Verificar o funcionamento da galeria</td>
      <td>
        <ul>
          <li>RF-11: O sistema deve disponibilizar uma página online de divulgação do fotógrafo e seus serviços.</li>
        </ul>
      </td>
      <td>Verificar se é possível visualizar as imagens que compõem a nova galeria.</td>
      <td>
        1. Garantir que exista pelo menos uma galeria cadastrada no portfólio.<br/>
        2. Na tabela de portfólio, clicar em uma galeria que deseja visualizar.<br/>
        3. Com o modal da galeria aberto, utilizar as setas para navegar entre as fotos existentes na galeria.<br/>
        4. Clicar em “x”.
      </td>
      <td>
        <ul>
          <li>As fotos enviadas devem compor uma nova galeria, sendo possível a sua visualização por completo.</li>
        </ul>
      </td>
      <td>Yuri</td>
    </tr>
  </tbody>
</table>

link para os casos de teste da funcionalidade Portfólio / Galeria: [Google Drive](https://drive.google.com/drive/folders/1CvbOU9Mq8w3N-AF7cix8ULLyajmVNOsj?usp=drive_link).

### Funcionalidade Serviços

> Obs: acrescentar um RF envolvendo o cadastro de serviços por parte do fotógrafo.

<table>
  <thead>
    <tr>
      <th>Caso de teste</th>
      <th>Requisitos associados</th>
      <th>Objetivo do teste</th>
      <th>Passos</th>
      <th>Critérios de êxito</th>
      <th>Responsável</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>CT-01: Acessar a página Serviços e listar serviços cadastrados</td>
      <td>
        <ul>
          <li>RF-11: O sistema deve disponibilizar uma página online de divulgação do fotógrafo e seus serviços.</li>
          <li>RNF-01: O sistema deve ser compatível com os principais navegadores.</li>
        </ul>
      </td>
      <td>Verificar se o usuário autenticado consegue acessar a rota <code>/servicos</code> e visualizar a lista de serviços cadastrados vindos do localStorage.</td>
      <td>
        1. Acessar o navegador (Chrome, Firefox, Edge ou Safari).<br/>
        2. Informar o endereço do sistema.<br/>
        3. Realizar login com um usuário válido.<br/>
        4. No menu principal, clicar em “Serviços”.
      </td>
      <td>
        <ul>
          <li>O usuário é redirecionado para a página “Serviços” sem erros.</li>
          <li>O título “Serviços” é exibido no topo junto com o breadcrumb.</li>
          <li>É exibida uma lista de serviços cadastrados (pelo menos 1 registro existente no banco ou mock de teste).</li>
          <li>Cada serviço apresenta, no mínimo, nome/título, preço e descrição ou quantidade de fotos.</li>
        </ul>
      </td>
      <td>Dangeles Lima</td>
    </tr>
    <tr>
      <td>CT-02: Cadastrar um novo serviço pelo botão “Novo serviço”</td>
      <td>
        <ul>
          <li>RF-11: O sistema deve disponibilizar uma página online de divulgação do fotógrafo e seus serviços.</li>
        </ul>
      </td>
      <td>Verificar se é possível cadastrar um novo serviço e fazê-lo aparecer na listagem de serviços.</td>
      <td>
        1. Acessar a página “Serviços” após login.<br/>
        2. Clicar no botão “Novo serviço”.<br/>
        3. No formulário de cadastro (modal ou nova página), preencher:<br/>
        &nbsp;&nbsp;• Nome do serviço.<br/>
        &nbsp;&nbsp;• Preço.<br/>
        &nbsp;&nbsp;• Número de fotos incluídas (ou outra métrica relevante).<br/>
        &nbsp;&nbsp;• Descrição breve do pacote, se existir esse campo.<br/>
        4. Clicar em “Salvar” ou “Cadastrar”.
      </td>
      <td>
        <ul>
          <li>O sistema valida os campos obrigatórios e não permite salvar se estiverem vazios.</li>
          <li>Com todos os campos preenchidos, o modal é fechado sem erros.</li>
          <li>O novo serviço aparece na listagem de serviços, com os dados informados.</li>
        </ul>
      </td>
      <td>Dangeles Lima</td>
    </tr>
    <tr>
      <td>CT-03: Editar um serviço existente</td>
      <td>
        <ul>
          <li>RF-11: O sistema deve disponibilizar uma página online de divulgação do fotógrafo e seus serviços.</li>
        </ul>
      </td>
      <td>Verificar se é possível alterar os dados de um serviço já cadastrado.</td>
      <td>
        1. Garantir que exista pelo menos um serviço cadastrado (pode ser o criado no CT-02).<br/>
        2. Na listagem de serviços, clicar em “Editar” (ícone ou botão correspondente ao serviço desejado).<br/>
        3. No formulário de edição, alterar, por exemplo:<br/>
        &nbsp;&nbsp;• Nome do serviço.<br/>
        &nbsp;&nbsp;• Preço para “R$ 2900,00”.<br/>
        4. Clicar em “Salvar”.
      </td>
      <td>
        <ul>
          <li>Os novos valores são validados e salvos com sucesso.</li>
          <li>Após salvar, a listagem é atualizada exibindo o nome “Ensaio casal externo - Premium” e o novo preço “R$ 2900,00”.</li>
          <li>Não permanecem dados antigos na interface para este serviço.</li>
        </ul>
      </td>
      <td>Dangeles Lima</td>
    </tr>
    <tr>
      <td>CT-04: Excluir um serviço</td>
      <td>
        <ul>
          <li>RF-11: O sistema deve disponibilizar uma página online de divulgação do fotógrafo e seus serviços.</li>
        </ul>
      </td>
      <td>Verificar se é possível remover um serviço da listagem.</td>
      <td>
        1. Garantir que exista pelo menos um serviço cadastrado (por exemplo, “Ensaio casal externo - Premium”).<br/>
        2. Na listagem de serviços, clicar no botão ou ícone de “Excluir” referente a esse serviço.<br/>
        3. Confirmar a exclusão, caso seja exibida uma janela de confirmação.
      </td>
      <td>
        <ul>
          <li>Após a confirmação, o serviço selecionado deixa de aparecer na listagem.</li>
          <li>Se a página for recarregada, o serviço continua ausente (exclusão persistida no localStorage).</li>
        </ul>
      </td>
      <td>Dangeles Lima</td>
    </tr>
    <tr>
      <td>CT-05: Buscar serviços pelo campo de pesquisa</td>
      <td>
        <ul>
          <li>RF-11: O sistema deve disponibilizar uma página online de divulgação do fotógrafo e seus serviços.</li>
        </ul>
      </td>
      <td>Verificar se o campo de busca filtra a lista de serviços com base no termo digitado.</td>
      <td>
        1. Garantir que existam pelo menos dois serviços cadastrados, por exemplo:<br/>
        &nbsp;&nbsp;• “Fotografia de produto”.<br/>
        &nbsp;&nbsp;• “Ensaio casal externo”.<br/>
        2. Acessar a página “Serviços”.<br/>
        3. Na caixa de busca “Digite o termo...”, digitar “produto”.<br/>
        4. Observar a listagem de serviços.<br/>
        5. Apagar o texto “produto” e digitar “ensaio”.
      </td>
      <td>
        <ul>
          <li>Ao digitar “produto”, a listagem passa a exibir apenas serviços cujo nome ou descrição contenha “produto”.</li>
          <li>Ao digitar “ensaio”, a listagem passa a exibir apenas serviços cujo nome ou descrição contenha “ensaio”.</li>
          <li>Ao limpar o campo de busca, a listagem volta a exibir todos os serviços cadastrados.</li>
        </ul>
      </td>
      <td>Dangeles Lima</td>
    </tr>
  </tbody>
</table>

link para os casos de teste da funcionalidade Serviços: [Google Drive](https://drive.google.com/drive/folders/1CvbOU9Mq8w3N-AF7cix8ULLyajmVNOsj?usp=drive_link).

### Funcionalidade Financeiro

<table>
 <tr>
  <th>Caso de teste</th>
  <th>Requisitos associados</th>
  <th>Objetivo do teste</th>
  <th>Passos</th>
  <th>Critérios de êxito</th>
  <th>Responsável</th>
 </tr>

 <tr>
  <td>CT-01: Carregar e visualizar resumo financeiro</td>
  <td>
   <ul>
    <li>RF-10: O sistema deve gerar relatórios de agenda e faturamento por período.</li>
    <li>RF-12: O sistema deve permitir um controle de caixa básico.</li>
   </ul>
  </td>
  <td>Verificar se os cards de resumo financeiro (Total em caixa, Total de entradas, Total de saídas) são exibidos corretamente.</td>
  <td>
   <ol>
    <li>Acessar o sistema no navegador e realizar login.</li>
    <li>No menu principal, clicar em "Financeiro".</li>
   </ol>
  </td>
  <td>
   <ul>
    <li>São exibidos três cards de resumo no topo da página:
      <ul>
        <li>"Total em caixa" (diferença entre entradas e saídas).</li>
        <li>"Total de entradas" (soma de todas as receitas).</li>
        <li>"Total de saídas" (soma de todas as despesas).</li>
      </ul>
    </li>
    <li>Os valores são exibidos no formato monetário brasileiro (R$ X.XXX,XX).</li>
   </ul>
  </td>
  <td>Gustavo</td>
 </tr>

 <tr>
  <td>CT-02: Cadastrar uma nova entrada (receita)</td>
  <td>
   <ul>
    <li>RF-12: O sistema deve permitir um controle de caixa básico.</li>
   </ul>
  </td>
  <td>Verificar se é possível cadastrar uma nova entrada financeira e se ela aparece na tabela do mês correspondente.</td>
  <td>
   <ol>
    <li>Acessar a página "Financeiro" após login.</li>
    <li>Clicar no botão "Novo registro".</li>
    <li>No modal, preencher:
      <ul>
        <li><strong>Data</strong>: selecionar uma data do mês atual.</li>
        <li><strong>Descrição</strong>: "Pagamento ensaio Ana Paula".</li>
        <li><strong>Valor</strong>: "2500.00".</li>
        <li><strong>Tipo</strong>: "Entrada".</li>
      </ul>
    </li>
    <li>Clicar em "Adicionar".</li>
   </ol>
  </td>
  <td>
   <ul>
    <li>Se algum campo obrigatório não for preenchido, o sistema não permite salvar.</li>
    <li>Com todos os campos preenchidos, o modal é fechado sem erros.</li>
    <li>Uma nova linha com a entrada "Pagamento ensaio Ana Paula" aparece na tabela do mês correspondente.</li>
    <li>A coluna "Entrada" exibe "R$ 2.500,00" e a coluna "Saída" exibe "R$ 0,00".</li>
    <li>O valor do "Total" (saldo acumulado) é atualizado corretamente.</li>
   </ul>
  </td>
  <td>Gustavo</td>
 </tr>

 <tr>
  <td>CT-03: Cadastrar uma nova saída (despesa)</td>
  <td>
   <ul>
    <li>RF-12: O sistema deve permitir um controle de caixa básico.</li>
   </ul>
  </td>
  <td>Verificar se é possível cadastrar uma nova saída financeira e se ela aparece na tabela do mês correspondente.</td>
  <td>
   <ol>
    <li>Acessar a página "Financeiro".</li>
    <li>Clicar no botão "Novo registro".</li>
    <li>No modal, preencher:
      <ul>
        <li><strong>Data</strong>: selecionar uma data do mês atual.</li>
        <li><strong>Descrição</strong>: "Conta de luz".</li>
        <li><strong>Valor</strong>: "350.00".</li>
        <li><strong>Tipo</strong>: "Saída".</li>
      </ul>
    </li>
    <li>Clicar em "Adicionar".</li>
   </ol>
  </td>
  <td>
   <ul>
    <li>O modal é fechado sem erros após salvar.</li>
    <li>Uma nova linha com a saída "Conta de luz" aparece na tabela do mês correspondente.</li>
    <li>A coluna "Entrada" exibe "R$ 0,00" e a coluna "Saída" exibe "R$ 350,00".</li>
    <li>O valor do "Total" (saldo acumulado) é atualizado corretamente (diminuindo o valor da saída).</li>
   </ul>
  </td>
  <td>Gustavo</td>
 </tr>

 <tr>
  <td>CT-04: Editar um registro financeiro existente</td>
  <td>
   <ul>
    <li>RF-12: O sistema deve permitir um controle de caixa básico.</li>
   </ul>
  </td>
  <td>Verificar se é possível alterar os dados de um registro financeiro já cadastrado.</td>
  <td>
   <ol>
    <li>Garantir que exista pelo menos um registro financeiro cadastrado.</li>
    <li>Na tabela de registros, clicar no ícone de "Editar" (lápis) do registro desejado.</li>
    <li>No modal de edição, alterar a descrição para "Conta de luz - Estúdio".</li>
    <li>Alterar o valor para "400.00".</li>
    <li>Clicar em "Adicionar" ou "Salvar".</li>
   </ol>
  </td>
  <td>
   <ul>
    <li>Os novos valores são validados e salvos com sucesso.</li>
    <li>Após salvar, a tabela é atualizada exibindo a descrição "Conta de luz - Estúdio" e o valor "R$ 400,00".</li>
    <li>O saldo acumulado ("Total") é recalculado corretamente.</li>
   </ul>
  </td>
  <td>Gustavo</td>
 </tr>

 <tr>
  <td>CT-05: Excluir um registro financeiro</td>
  <td>
   <ul>
    <li>RF-12: O sistema deve permitir um controle de caixa básico.</li>
   </ul>
  </td>
  <td>Verificar se é possível remover um registro financeiro da listagem.</td>
  <td>
   <ol>
    <li>Garantir que exista pelo menos um registro financeiro cadastrado.</li>
    <li>Na tabela de registros, clicar no ícone de "Excluir" (lixeira) do registro desejado.</li>
   </ol>
  </td>
  <td>
   <ul>
    <li>O registro selecionado deixa de aparecer na tabela imediatamente.</li>
    <li>O saldo acumulado ("Total") é recalculado sem o valor do registro excluído.</li>
    <li>Se a página for recarregada, o registro continua ausente (exclusão persistida no localStorage).</li>
   </ul>
  </td>
  <td>Gustavo</td>
 </tr>

 <tr>
  <td>CT-06: Navegar entre meses na tabela financeira</td>
  <td>
   <ul>
    <li>RF-10: O sistema deve gerar relatórios de agenda e faturamento por período.</li>
   </ul>
  </td>
  <td>Verificar se os controles de navegação de mês (setas) alteram corretamente o período exibido na tabela.</td>
  <td>
   <ol>
    <li>Acessar a página "Financeiro".</li>
    <li>Observar o rótulo do mês atual (ex.: "março de 2025").</li>
    <li>Clicar na seta esquerda (mês anterior).</li>
    <li>Observar novamente o rótulo do mês.</li>
    <li>Clicar na seta direita (próximo mês) duas vezes.</li>
   </ol>
  </td>
  <td>
   <ul>
    <li>Ao clicar na seta esquerda, o rótulo do mês recua para o mês anterior (ex.: de "março de 2025" para "fevereiro de 2025").</li>
    <li>Ao clicar na seta direita, o rótulo do mês avança para o próximo mês.</li>
    <li>A tabela exibe apenas os registros financeiros do mês selecionado.</li>
    <li>A linha "Saldo do mês anterior" é atualizada corretamente com base nos registros dos meses anteriores.</li>
   </ul>
  </td>
  <td>Gustavo</td>
 </tr>

 <tr>
  <td>CT-07: Verificar cálculo do saldo acumulado</td>
  <td>
   <ul>
    <li>RF-12: O sistema deve permitir um controle de caixa básico.</li>
   </ul>
  </td>
  <td>Verificar se o saldo acumulado (coluna "Total") é calculado corretamente a cada registro.</td>
  <td>
   <ol>
    <li>Cadastrar uma entrada de R$ 1.000,00 no dia 01/03/2025.</li>
    <li>Cadastrar uma saída de R$ 300,00 no dia 05/03/2025.</li>
    <li>Cadastrar outra entrada de R$ 500,00 no dia 10/03/2025.</li>
    <li>Observar a coluna "Total" de cada linha.</li>
   </ol>
  </td>
  <td>
   <ul>
    <li>Na linha do dia 01/03, o "Total" exibe R$ 1.000,00 (saldo anterior + entrada).</li>
    <li>Na linha do dia 05/03, o "Total" exibe R$ 700,00 (1.000 - 300).</li>
    <li>Na linha do dia 10/03, o "Total" exibe R$ 1.200,00 (700 + 500).</li>
    <li>O cálculo é feito de forma acumulativa, linha a linha, respeitando a ordem cronológica.</li>
   </ul>
  </td>
  <td>Gustavo</td>
 </tr>

 <tr>
  <td>CT-08: Persistência dos registros financeiros após recarregar a aplicação</td>
  <td>
   <ul>
    <li>RF-12: O sistema deve permitir um controle de caixa básico.</li>
   </ul>
  </td>
  <td>Verificar se os registros financeiros criados/alterados permanecem disponíveis após fechar e reabrir o sistema.</td>
  <td>
   <ol>
    <li>Criar uma entrada e uma saída (CT-02 e CT-03).</li>
    <li>Fechar a aba do navegador.</li>
    <li>Abrir novamente o navegador e acessar o sistema.</li>
    <li>Realizar login e entrar na página "Financeiro".</li>
   </ol>
  </td>
  <td>
   <ul>
    <li>Os registros criados anteriormente continuam aparecendo na tabela do mês correspondente.</li>
    <li>Os valores dos cards de resumo (Total em caixa, Total de entradas, Total de saídas) refletem os registros salvos.</li>
    <li>Não são exibidas mensagens de erro relacionadas ao carregamento de registros.</li>
   </ul>
  </td>
  <td>Gustavo</td>
 </tr>

</table>

link para os casos de teste da funcionalidade Financeiro: [Google Drive](https://drive.google.com/drive/folders/1CvbOU9Mq8w3N-AF7cix8ULLyajmVNOsj?usp=drive_link).

> **Links Úteis**:
> - [IBM - Criação e Geração de Planos de Teste](https://www.ibm.com/developerworks/br/local/rational/criacao_geracao_planos_testes_software/index.html)
> -  [Teste de Software: Conceitos e tipos de testes](https://blog.onedaytesting.com.br/teste-de-software/)
> - [Criação e Geração de Planos de Teste de Software](https://www.ibm.com/developerworks/br/local/rational/criacao_geracao_planos_testes_software/index.html)
> - [Ferramentas de Test para Java Script](https://geekflare.com/javascript-unit-testing/)
> - [UX Tools](https://uxdesign.cc/ux-user-research-and-user-testing-tools-2d339d379dc7)
