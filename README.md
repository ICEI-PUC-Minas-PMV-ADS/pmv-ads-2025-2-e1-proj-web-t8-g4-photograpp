# Photograph - Sistema para Fotógrafos

`Análise e Desenvolvimento de Sistemas - PUC Minas`

`Desenvolvimento de aplicação web front-end`

`2º semestre/2025`

O projeto consiste no desenvolvimento de um sistema web integrado para fotógrafos, que centraliza todo o fluxo de trabalho em um único ambiente — incluindo agendamentos, CRM, contratos, tarefas, pipeline de produção e controle financeiro básico — com o objetivo de reduzir a fragmentação de ferramentas, evitar conflitos de agenda, otimizar a comunicação com clientes e aumentar a eficiência na gestão do negócio. Além de facilitar a rotina administrativa do fotógrafo, a plataforma também oferece aos clientes um espaço dedicado para acompanhar contratos, prazos e selecionar imagens, promovendo mais organização, agilidade e liberdade criativa para o profissional.

## Integrantes

- Yago Rodrigues de Moraes
- Yuri Jardim Silva
- Gustavo Santiago Barbosa
- D'Angeles Lé Pereira de Lima
- Ariana da Cunha Ferreira Paz de Lima

## Orientador

- Luiz Alberto Ferreira Gomes

# Documentação

<ol>
<li><a href="documentos/01-Documentação de Contexto.md"> Documentação de Contexto</a></li>
<li><a href="documentos/02-Especificação do Projeto.md"> Especificação do Projeto</a></li>
<li><a href="documentos/03-Metodologia.md"> Metodologia</a></li>
<li><a href="documentos/04-Projeto de Interface.md"> Projeto de Interface</a></li>
<li><a href="documentos/05-Template padrão da Aplicação.md"> Template padrão da Aplicação</a></li>
<li><a href="documentos/06-Programação de Funcionalidades.md"> Programação de Funcionalidades</a></li>
<li><a href="documentos/07-Plano de Testes de Software.md"> Plano de Testes de Software</a></li>
<li><a href="documentos/08-Registro de Testes de Software.md"> Registro de Testes de Software</a></li>
<li><a href="documentos/09-Referências.md"> Referências Bibliográficas</a></li>
</ol>

# Hospedagem

- O link da hospedagem estará disponível assim que o Github Pages for configurado.

# Código-Fonte

- <a href="codigo-fonte/README.md">Código Fonte</a>


# Apresentação

- <a href="apresentacao/README.md">Apresentação do Projeto</a>


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