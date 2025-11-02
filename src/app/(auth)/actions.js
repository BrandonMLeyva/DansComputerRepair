'use server';

import { createSupabaseServerClient } from '@/lib/supabase/server';

// Optional: small helper so the client can render a friendly message
function normalizeAuthError(error) {
  if (!error) return null;
  const msg = String(error.message || error).toLowerCase();

  if (msg.includes('registered') || msg.includes('duplicate')) {
    return 'An account with this email already exists.';
  }
  if (msg.includes('password')) {
    return 'Your password does not meet the requirements.';
  }
  return 'Sign up failed. Please try again.';
}

export async function signUp(formData) {
  const supabase = await createSupabaseServerClient();

  const firstName = formData.get('firstName')?.trim();
  const lastName = formData.get('lastName')?.trim();
  const email = formData.get('email')?.trim();
  const phone = formData.get('phone')?.trim();
  const password = formData.get('password')?.trim();
  const confirmPassword = formData.get('confirmPassword')?.trim();

  // Basic validation
  if (!email || !password) {
    return { ok: false, error: 'Email and password are required.' };
  }
  if (password !== confirmPassword) {
    return { ok: false, error: 'Passwords do not match.' };
  }
  if (password.length < 10) {
    return { ok: false, error: 'Password must be at least 10 characters.' };
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { firstName, lastName, phone, role: 'admin' },
      emailRedirectTo:
        process.env.NEXT_PUBLIC_SITE_URL
          ? `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`
          : 'http://localhost:3000/auth/callback',
    },
  });

  if (error) {
    return { ok: false, error: normalizeAuthError(error) };
  }

  // If email confirmation is ON, there is no session yet.
  const needsConfirmation = !data.session;
  return {
    ok: true,
    needsConfirmation,
    message: needsConfirmation
      ? 'Account created! Check your email to confirm your address.'
      : 'Account created and you are signed in.',
  };
}
