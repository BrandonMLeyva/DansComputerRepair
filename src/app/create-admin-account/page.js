'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { signUp } from '@/app/(auth)/actions';

function validatePassword(pw) {
  if (!pw || pw.length < 10) return 'Password must be at least 10 characters.';
  return null;
}

export default function CreateAdminAccountPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState('');
  const [serverSuccess, setServerSuccess] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isPending, startTransition] = useTransition();

  function onSubmit(e) {
    e.preventDefault();
    setServerError('');
    setServerSuccess('');

    const form = e.currentTarget;
    const formData = new FormData(form);

    const pwErr = validatePassword(formData.get('password'));
    setPasswordError(pwErr || '');
    if (pwErr) return;

    startTransition(async () => {
      const res = await signUp(formData);
      if (!res?.ok) {
        setServerError('');
        requestAnimationFrame(() => {
          setServerError(res?.error || 'Something went wrong.');
        });
        return;
      }

      setServerSuccess('');
      requestAnimationFrame(() => {
        setServerSuccess(res.message || 'Account created.');
      });

      if (!res.needsConfirmation) {
        setTimeout(() => router.push('/dashboard'), 700);
      } else {
        form.reset();
      }
    });
  }

  return (
    <main className="min-h-screen bg-white text-black">
      <section className="mx-auto max-w-3xl p-6">
        <h1 className="text-3xl font-semibold mb-6">Create Admin account</h1>

        {/* ✅ Success Banner (Tailwind fade-in) */}
        {serverSuccess && (
          <div
            role="status"
            aria-live="polite"
            className="mb-4 rounded-md border border-green-300 bg-green-50 px-4 py-3 text-sm text-green-800 motion-safe:animate-fadeIn"
          >
            {serverSuccess}
          </div>
        )}

        {/* 🔴 Error Banner (Tailwind shake) */}
        {serverError && (
          <div
            role="alert"
            aria-live="assertive"
            className="mb-4 rounded-md border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800 motion-safe:animate-shake"
          >
            {serverError}
          </div>
        )}

        <div className="border border-neutral-300 rounded-md bg-white">
          <form className="p-6 md:p-8" onSubmit={onSubmit} noValidate>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm mb-1">First name</label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  className="w-full border border-black rounded-sm px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Last name</label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  className="w-full border border-black rounded-sm px-3 py-2"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm mb-1">Email address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  required
                  className="w-full border border-black rounded-sm px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Phone number</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone number"
                  className="w-full border border-black rounded-sm px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Minimum 10 characters"
                  required
                  onBlur={(e) => setPasswordError(validatePassword(e.target.value) || '')}
                  className={`w-full rounded-sm px-3 py-2 border ${
                    passwordError ? 'border-red-500 focus:outline-red-600' : 'border-black'
                  }`}
                  aria-invalid={!!passwordError}
                  aria-describedby={passwordError ? 'password-error' : undefined}
                />
                {passwordError && (
                  <p id="password-error" className="mt-1 text-sm text-red-600">
                    {passwordError}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm mb-1">Confirm password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Minimum 10 characters"
                  required
                  className="w-full border border-black rounded-sm px-3 py-2"
                />
              </div>
            </div>

            <div className="mt-8">
              <button
                type="submit"
                disabled={isPending}
                className="w-full bg-green-600 text-white py-2 rounded-sm hover:bg-green-700 disabled:opacity-60"
              >
                {isPending ? 'Creating account…' : 'Sign up'}
              </button>
            </div>
          </form>

          <div className="border-t border-neutral-300 p-6 md:p-8">
            <div className="flex justify-center items-center gap-2">
              <span className="text-sm text-neutral-600">Or</span>
              <a
                href="/admin-log-in"
                className="bg-slate-600 text-white px-4 py-2 rounded-sm hover:bg-slate-700"
              >
                Sign in
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
