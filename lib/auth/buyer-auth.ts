import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';
import { supabase as clientSupabase } from '@/lib/supabase/client';

export async function getBuyerProfile() {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get('sb-access-token')?.value;
  const refreshToken = cookieStore.get('sb-refresh-token')?.value;

  if (!accessToken) {
    return null;
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        persistSession: false,
      },
    }
  );

  await supabase.auth.setSession({
    access_token: accessToken,
    refresh_token: refreshToken || '',
  });

  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    return null;
  }

  const { data: buyer, error: buyerError } = await supabase
    .from('buyers')
    .select('*')
    .eq('auth_user_id', user.id)
    .maybeSingle();

  if (buyerError || !buyer) {
    return null;
  }

  return { user, buyer };
}

export async function signInWithMagicLink(email: string) {
  const { error } = await clientSupabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/inkoper/dashboard`,
    },
  });

  return { error };
}

export async function signOut() {
  const { error } = await clientSupabase.auth.signOut();
  return { error };
}
