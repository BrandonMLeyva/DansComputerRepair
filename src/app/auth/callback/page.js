// src/app/auth/callback/page.js
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // JS version: no type annotation here
  const [status, setStatus] = useState('loading'); // 'loading' | 'success' | 'error'
  const [message, setMessage] = useState('Verifying your email… please wait.');

  useEffect(() => {
    const run = async () => {
      const code = searchParams.get('code');

      if (!code) {
        setStatus('error');
        setMessage('Missing verification code. Please use the link from your email.');
        return;
      }

      const supabase = createSupabaseBrowserClient();
      const { error } = await supabase.auth.exchangeCodeForSession(code);

      if (error) {
        setStatus('error');
        setMessage('This verification link is invalid or has expired. Please try again.');
        return;
      }

      setStatus('success');
      setMessage('Email verified! Redirecting to your dashboard…');
      setTimeout(() => router.replace('/dashboard'), 800);
    };

    run();
  }, [router, searchParams]);

  return (
    <div className="min-h-screen grid place-items-center bg-white text-black">
      <div className="w-[92%] max-w-md rounded-md border border-neutral-300 bg-white px-6 py-5">
        <div className="flex items-center gap-3">
          {status === 'loading' && (
            <div className="w-5 h-5 rounded-full border-2 border-neutral-300 border-t-neutral-700 animate-spin" />
          )}
          {status === 'success' && <div className="w-5 h-5 rounded-full bg-green-600" />}
          {status === 'error' && <div className="w-5 h-5 rounded-full bg-red-600" />}
          <h1 className="text-lg font-semibold">
            {status === 'loading' ? 'Verifying…' : status === 'success' ? 'Verified' : 'Verification issue'}
          </h1>
        </div>

        <p
          className={`mt-3 text-sm ${
            status === 'error' ? 'text-red-700' : status === 'success' ? 'text-green-700' : 'text-neutral-700'
          }`}
        >
          {message}
        </p>

        {status === 'error' && (
          <div className="mt-5 flex flex-col sm:flex-row gap-3">
            <a
              href="/admin-log-in"
              className="inline-flex justify-center rounded-md bg-neutral-900 px-4 py-2 text-white hover:bg-neutral-800"
            >
              Go to Sign in
            </a>
            <a
              href="/create-admin-account"
              className="inline-flex justify-center rounded-md border border-neutral-300 px-4 py-2 hover:bg-neutral-50"
            >
              Create account
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
