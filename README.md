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
