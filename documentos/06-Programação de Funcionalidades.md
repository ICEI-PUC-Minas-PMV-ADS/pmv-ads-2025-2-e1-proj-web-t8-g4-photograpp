# Programação de Funcionalidades - PhotogrApp

Este documento apresenta a implementação das funcionalidades da aplicação PhotogrApp, desenvolvida para gerenciamento de serviços fotográficos. Cada funcionalidade foi codificada seguindo os requisitos especificados e utilizando React com Vite como tecnologia base.
Na primeira etapa de desenvolvimento, o foco foi em UI (HTML e CSS) e em pelo menos uma funcionalidade por integrante do grupo.

## Metodologia de Desenvolvimento

- **Framework**: React com Vite
- **Controle de Versão**: GitHub Flow para branches de entrega
- **Estrutura**: Componentização modular com hooks customizados
- **Armazenamento**: LocalStorage para persistência de dados
- **Autenticação**: Sistema de autenticação implementado com Context API

## Estrutura de Arquivos

```
src/
├── components/          # Componentes compartilhados
├── contexts/           # Contextos React (AuthContext)
├── hooks/              # Hooks customizados (useLocalStorage)
├── pages/              # Páginas da aplicação
│   ├── Home/
│   ├── Login/
│   ├── Register/
│   ├── Dashboard/
│   ├── Projects/
│   ├── Pipeline/
│   ├── Customers/
│   ├── Calendar/
│   ├── Profile/
│   └── Services/
├── routes/             # Rotas protegidas
├── utils/              # Utilitários e mocks
└── assets/             # Imagens e recursos estáticos
```

---

## Funcionalidades Implementadas

URL para acompanhar o sistema em andamento:
https://photograpp.vercel.app

### Página Inicial (Home)

#### Requisito atendido
**RF-11**: O sistema deve disponibilizar uma página online de divulgação do fotógrafo e seus serviços

#### Instruções de acesso
Acesse a URL raiz da aplicação para visualizar a página inicial.


#### Responsável
**Ariana**

---

### Sistema de Autenticação (Login e Registro)

#### Requisito atendido
**RF-02**: O sistema deve permitir o cadastro de fotógrafos com informações pessoais e serviços

#### Instruções de acesso
Acesse `/login` para autenticação ou `/register` para criar nova conta.

#### Responsável
**Ariana**

---

### Dashboard Principal

#### Requisito atendido
**RF-10**: O sistema deve gerar relatórios de agenda e faturamento por período

#### Instruções de acesso
Após login, será redirecionado automaticamente para `/dashboard`.

#### Responsável
**Yago**

---


### Gerenciamento de Projetos e Pipeline de Produção

#### Requisito atendido
**RF-05**: O sistema deve disponibilizar um pipeline Kanban para acompanhamento dos trabalhos com possibilidade de designar prazos e responsáveis pelas tarefas

#### Instruções de acesso
Acesse `/projects` para visualizar e gerenciar projetos.
Acesse `/pipeline` para visualizar o quadro Kanban dos projetos.

#### Responsável
**D'Angeles**

---

### Gerenciamento de Clientes

#### Requisito atendido
**RF-01**: O sistema deve permitir cadastro e edição de clientes com histórico de contratos

#### Instruções de acesso
Acesse `/customers` para gerenciar informações dos clientes.

#### Responsável
**Yuri**

---

### Agenda de Eventos

#### Requisito atendido
**RF-03**: O sistema deve permitir o agendamento de sessões fotográficas, verificando conflitos

#### Instruções de acesso
Acesse `/calendar` para visualizar e agendar eventos.

#### Responsável
**Yago**

---

### Perfil Público

#### Requisito atendido
**RF-11**: O sistema deve disponibilizar uma página online de divulgação do fotógrafo e seus serviços

#### Instruções de acesso
Acesse `/profile` para visualizar a página pública do fotógrafo.

#### Responsável
**Gustavo**

---

### Catálogo de Serviços

#### Requisito atendido
| RF-02 |  O sistema deve permitir o cadastro de serviços.

#### Instruções de acesso
Acesse `/services` para visualizar os pacotes disponíveis.

#### Responsável
**Yuri**

---

## Funcionalidades Futuras

As seguintes funcionalidades serão implementadas nas próximas etapas do projeto:

- **Controle Financeiro** (RF-12): Gestão de caixa básico
- **Galeria de Fotos** (RF-07): Sistema para seleção de fotos pelo cliente
- **Geração de Contratos PDF** (RF-04): Documentos digitais
- **Sistema de Tarefas** (RF-06): Checklists detalhados
- **Relatórios Avançados** (RF-10): Analytics e métricas

---

## Como Executar o Projeto

### Pré-requisitos

Antes de executar o projeto, certifique-se de ter o Node.js instalado em sua máquina.

#### Instalação do Node.js

1. **macOS**: 
   - Usando Homebrew: `brew install node`
   - Ou baixe o instalador em: [https://nodejs.org/](https://nodejs.org/)

2. **Windows/Linux**: 
   - Baixe o instalador em: [https://nodejs.org/](https://nodejs.org/)
   - Recomenda-se a versão LTS (Long Term Support)

3. **Verificar instalação**:
   ```bash
   node --version
   npm --version
   ```

### Passos para Executar

1. **Clone o repositório** (se ainda não tiver feito):
   ```bash
   git clone https://github.com/seu-usuario/photograpp.git
   ```

2. **Navegue até a pasta do código-fonte**:
   ```bash
   cd photograpp/codigo-fonte
   ```

3. **Instale as dependências**:
   ```bash
   npm install
   ```

4. **Execute o projeto em modo de desenvolvimento**:
   ```bash
   npm run dev
   ```

5. **Acesse a aplicação**:
   - Abra seu navegador e acesse: `http://localhost:5173`
   - O Vite exibirá a URL exata no terminal após iniciar

---

## Links Úteis

- [Trabalhando com HTML5 Local Storage e JSON](https://www.devmedia.com.br/trabalhando-com-html5-local-storage-e-json/29045)
- [JSON Tutorial](https://www.w3resource.com/JSON)
- [JSON - Introduction (W3Schools)](https://www.w3schools.com/js/js_json_intro.asp)
- [JSON Tutorial (TutorialsPoint)](https://www.tutorialspoint.com/json/index.htm)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
