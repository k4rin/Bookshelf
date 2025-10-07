# 📚 BookShelf

BookShelf é uma aplicação web para organização de bibliotecas pessoais. Com ela, você pode cadastrar, visualizar, editar e acompanhar o progresso de leitura dos seus livros de forma simples e intuitiva.

---

## 🚀 Tecnologias Utilizadas

- [Next.js](https://nextjs.org/) – Framework React para renderização híbrida
- [TypeScript](https://www.typescriptlang.org/) – Tipagem estática para maior segurança
- [Node.js](https://nodejs.org/) – Backend para gerenciamento da API
- [Prisma](https://www.prisma.io/) – ORM para integração com banco de dados
- [PostgreSQL](https://www.postgresql.org/) – Banco de dados relacional
- [Tailwind CSS](https://tailwindcss.com/) – Estilização rápida e responsiva
- [ShadCN/UI](https://ui.shadcn.com/) – Componentes acessíveis e modernos

---

## 📦 Funcionalidades

- 📖 Cadastro completo de livros com capa, autor, gênero e avaliação
- 🔍 Busca por título ou autor e filtros por gênero
- 📊 Dashboard com estatísticas de leitura
- ✏️ Edição e exclusão de livros com confirmação
- 📚 Visualização detalhada de cada livro

---

## 🧑‍💻 Como rodar o projeto localmente

```bash
# Instale as dependências
npm install

# Configure o banco de dados no arquivo .env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/bookshelf"

# Execute as migrations
npx prisma migrate dev

# Inicie o servidor de desenvolvimento
npm run dev
