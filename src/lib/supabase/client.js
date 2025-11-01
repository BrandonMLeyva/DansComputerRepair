import {createClient} from "@supabase/supabase-js";

export const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE__URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);