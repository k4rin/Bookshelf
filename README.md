
# BookShelf - Gerenciador de Biblioteca Pessoal

## Descrição

**BookShelf** é uma aplicação web moderna e completa para gerenciamento de biblioteca pessoal. Desenvolvida com as mais recentes tecnologias do ecossistema Next.js e React, a plataforma permite aos usuários catalogar, organizar, acompanhar o progresso de leitura e gerenciar seus livros de forma intuitiva e eficiente.

O projeto foi construído sobre uma arquitetura robusta utilizando o App Router do Next.js 15, Server Components e Server Actions para performance otimizada. O acesso aos dados é gerenciado pelo Prisma ORM com um banco de dados SQLite, garantindo integridade e segurança dos tipos. A interface, responsiva e acessível, foi criada com Tailwind CSS e shadcn/ui, oferecendo uma experiência de usuário limpa e agradável, com suporte a temas claro e escuro.

## Funcionalidades Principais

### Gerenciamento de Livros (CRUD Completo)

  - **Dashboard Principal:** Visualize estatísticas rápidas da sua biblioteca (total de livros, lendo, finalizados, total de páginas lidas).
  - **Biblioteca Visual:** Navegue por todos os seus livros em um layout de cards moderno e responsivo.
  - **Busca e Filtros:** Encontre livros rapidamente com a busca por título/autor ou filtre por gênero literário.
  - **Adicionar Livro:** Formulário completo e intuitivo com validação em tempo real, campos obrigatórios e opcionais, preview da imagem de capa e barra de progresso.
  - **Visualizar Detalhes:** Página dedicada para cada livro com todas as informações, incluindo sinopse, status de leitura e notas pessoais.
  - **Editar e Excluir:** Atualize informações de qualquer livro ou remova-o com segurança através de um diálogo de confirmação.

### Experiência do Usuário (UX)

  - **Sistema de Temas:** Escolha entre os modos **Claro**, **Escuro** ou **Sistema**. A sua preferência é salva localmente.
  - **Design Responsivo:** Experiência de uso perfeita em desktops, tablets e smartphones.
  - **Feedback Visual:** Receba notificações (toasts) para ações importantes, veja estados de carregamento (loading states) e use diálogos de confirmação para ações destrutivas.
  - **Acessibilidade:** Navegação completa via teclado, uso de componentes semânticos e contraste de cores adequado.

### Arquitetura e Tecnologia

  - **Server-Side Rendering (SSR):** Páginas carregam rapidamente com dados buscados diretamente do servidor usando Server Components.
  - **Mutações Otimistas:** Operações de criar, atualizar e deletar são realizadas com Server Actions, proporcionando revalidação de dados automática e uma UX fluida.
  - **API Robusta:** Endpoints RESTful (`/api/books`, `/api/categories`) construídos com API Routes para integração e consulta de dados.
  - **Banco de Dados Type-Safe:** O Prisma ORM garante que todas as operações com o banco de dados SQLite sejam seguras e com tipos definidos, prevenindo erros em tempo de execução.
  - **Gerenciamento de Estado na URL:** Filtros e buscas são refletidos na URL, permitindo compartilhar e salvar o estado da página.

## Tecnologias Utilizadas

  - **Frontend:** Next.js 15 (App Router), React 19, TypeScript
  - **Estilização:** Tailwind CSS, shadcn/ui
  - **Banco de Dados:** SQLite
  - **ORM:** Prisma
  - **Ferramentas:** ESLint, Prettier

## Guia de Instalação e Uso

Siga os passos abaixo para configurar e executar o projeto em seu ambiente local.

### Pré-requisitos

  - **Node.js:** v18.17 ou superior
  - **npm**, **yarn** ou **pnpm** (este guia usará `npm`)

### 1\. Clonando o Repositório

```bash
git clone https://github.com/henrique/Bookshelf.git
cd Bookshelf
```

### 2\. Instalando as Dependências

Instale todas as dependências do projeto, incluindo o Prisma Client.

```bash
npm install
```

### 3\. Configurando o Ambiente

Crie uma cópia do arquivo de exemplo de variáveis de ambiente.

```bash
cp .env.example .env
```

O arquivo `.env` já virá configurado para usar um banco de dados SQLite local na pasta `prisma`.

```env
# .env
# URL do banco de dados. Aponta para o arquivo dev.db na pasta prisma.
DATABASE_URL="file:./dev.db"
```

### 4\. Configurando o Banco de Dados

Execute as migrações do Prisma para criar as tabelas no seu banco de dados SQLite. Este comando também irá gerar o Prisma Client com base no seu schema.

```bash
npx prisma migrate dev --name init
```

*Opcional: Para popular o banco com dados iniciais, você pode criar e executar um script de seed.*

```bash
# Adicione um script de seed no seu package.json e crie o arquivo prisma/seed.ts
npx prisma db seed
```

### 5\. Executando o Projeto

Agora você pode iniciar o servidor de desenvolvimento.

```bash
npm run dev
```

A aplicação estará disponível em [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000).

### Scripts Disponíveis no `package.json`

  - `npm run dev`: Inicia o servidor de desenvolvimento.
  - `npm run build`: Compila a aplicação para produção.
  - `npm run start`: Inicia um servidor de produção.
  - `npm run lint`: Executa o linter para verificar erros de código.
  - `npx prisma studio`: Abre uma interface visual para gerenciar seu banco de dados.
  - `npx prisma generate`: Gera manualmente o Prisma Client.

=======
# 📚 BookShelf

O BookShelf é uma aplicação web moderna e intuitiva para organizar a sua biblioteca pessoal. Com ele, você pode facilmente cadastrar, visualizar, editar e acompanhar o progresso de leitura dos seus livros.

![Badge](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
![Badge](https://img.shields.io/badge/Next.js-15.5.4-blue)
![Badge](https://img.shields.io/badge/React-19.1.1-blue)
![Badge](https://img.shields.io/badge/TypeScript-5-blue)
![Badge](https://img.shields.io/badge/Tailwind%20CSS-4.1.14-blue)

---

## 🚀 Tecnologias Utilizadas

Este projeto foi construído com as seguintes tecnologias:

-   **[Next.js](https://nextjs.org/)**: Framework React para renderização híbrida e otimizada.
-   **[TypeScript](https://www.typescriptlang.org/)**: Superset do JavaScript que adiciona tipagem estática, garantindo maior segurança e manutenibilidade ao código.
-   **[React](https://react.dev/)**: Biblioteca para construir interfaces de usuário.
-   **[Tailwind CSS](https://tailwindcss.com/)**: Framework de estilização "utility-first" para criar designs modernos e responsivos de forma rápida.
-   **[Prisma](https://www.prisma.io/)**: ORM para integração com o banco de dados.
-   **[PostgreSQL](https://www.postgresql.org/)**: Banco de dados relacional.
-   **[ShadCN/UI](https://ui.shadcn.com/)**: Coleção de componentes de UI acessíveis e modernos.

---

## 📦 Funcionalidades

-   📖 **Cadastro Completo de Livros**: Adicione livros com informações como capa, autor, gênero e avaliação.
-   ✏️ **Edição e Exclusão**: Gerencie sua coleção com opções de edição e exclusão de livros, incluindo uma confirmação para evitar remoções acidentais.
-   🔍 **Busca e Filtros**: Encontre livros rapidamente com a busca por título ou autor e utilize filtros por gênero.
-   📊 **Dashboard de Estatísticas**: Visualize estatísticas sobre seus hábitos de leitura.
-   📚 **Visualização Detalhada**: Acesse uma página com todos os detalhes de cada livro.

---

## 🧑‍💻 Como Rodar o Projeto Localmente

Siga os passos abaixo para executar o projeto em seu ambiente de desenvolvimento:

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/k4rin/bookshelf.git](https://github.com/k4rin/bookshelf.git)
    cd bookshelf
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configure o banco de dados:**
    -   Crie um arquivo `.env` na raiz do projeto.
    -   Adicione a sua string de conexão do PostgreSQL:
        ```
        DATABASE_URL="postgresql://USUARIO:SENHA@localhost:5432/bookshelf"
        ```

4.  **Execute as migrations do Prisma:**
    ```bash
    npx prisma migrate dev
    ```

5.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

Após esses passos, a aplicação estará disponível em `http://localhost:3000`.

