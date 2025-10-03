"use server";
import { revalidatePath } from "next/cache"; // Para invalidar cache se precisar
// Ação que lida com exclusão do livro.
// Em produção, integre com seu banco (ex: Prisma: await db.book.delete({ where: { id } });)
export async function deleteBook(id: string) {
  try {
    // Exemplo real com Prisma:
    // await db.book.delete({ where: { id } });
    // revalidatePath("/"); // Atualiza a página no servidor se necessário
    return { success: true };
  } catch (error) {
    console.error("Erro ao excluir livro:", error);
    return { success: false, error: "Erro ao excluir livro" };
  }
}
