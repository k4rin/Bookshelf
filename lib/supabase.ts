// Exemplo de lib/supabase.ts (Ajuste a chave que você está usando: ANOM ou SERVICE_ROLE)
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// Se estiver no servidor, use a SERVICE_ROLE_KEY
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    // Lança um erro claro no servidor se a chave estiver faltando
    throw new Error("Missing Supabase URL or Key environment variables.");
}

export const supabase = createClient(supabaseUrl, supabaseKey);