"use client";
import { use, useState } from "react";
import { Eye, EyeOff } from "lucide-react"; // 2 icons for password state
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false);  // hide password by default
  const [email, setEmail] = useState(""); // used by supabase
  const [password, setPassword] = useState(""); // used by supabase
  const [loading, setLoading] = useState(false);  // used by supabase
  const [error, setError] = useState("");  // used by supabase

  // MFA with TOTP (Time-based One Time Password)
  const [mfaOpen, setMfaOpen] = useState(false);
  const [mfaCode, setMfaCode] = useState("");
  const [mfaError, setMfaError] = useState("");
  const [mfaFactorId, setMfaFactorId] = useState(null);
  const router = useRouter();

async function handleSubmit(e) {
  e.preventDefault();
  setError("");
  setLoading(true);

  const emailTrimmed = email.trim();

  try {
    // The regular login
    const { error: authError} = await supabase.auth.signInWithPassword({email: emailTrimmed, password,});
    if (authError) {
    setError(authError.message);
    return;
    }

    // Checks the AAL
    const { data: aalData, error: aalError} = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
    if (aalError) {
    setError (aalError.message);
    return;
    }

    // If already AAL2 verified, then routes you to /admin
    if (aalData?.currentLevel === "aal2") {
      router.replace("/dashboard");
      return;
    }

    // If not AAl2 verified, then check TOTP factors
    const {data: factors, error: listErr} = await supabase.auth.mfa.listFactors();
    if (listErr) {
      setError(listErr.message);
      return; 
    }

    // Checks if the user has a MFA setup.
    const TOTP = factors.totp || [];
    const verifiedTOTP = TOTP.find(f => f.status === "verified");
    // If no MFA, then it prompts this error message.
    if (!verifiedTOTP)   {
      // Either send them to sign up page for MFA, or prompt them on the spot.
      setError("User currently does not have a MFA setup. Redirecting user to setup MFA...")

      setTimeout(() => {
            router.replace("/init-mfa");
        }, 3000);

      return;
    } 

    // Create a challenge and open MFA popup. I believe this part is related to using existing factors.
    const {error: chalErr} = await supabase.auth.mfa.challenge({factorId: verifiedTOTP.id,});
    if (chalErr) {
      setError(chalErr.message);
      return;
    }

    // Setup was successful, will prompt user for their code.
    setMfaFactorId(verifiedTOTP.id);
    setMfaCode("");
    setMfaError("");
    setMfaOpen(true);
  } catch (e) {
      console.error(e);
      setError("Network error. Reload and try again.");
  } finally {
      setLoading(false);
  }
}  

async function submitMFA(e) {
  e.preventDefault();
  setMfaError("");
  if (!mfaFactorId) {
    setMfaError("No TOTP factor.");
    return;
}

    // Verify the 6-digit MFA code
    const {error: verifyErr} = await supabase.auth.mfa.challengeAndVerify({factorId: mfaFactorId, code: mfaCode.trim(),});
    if (verifyErr) {
      setMfaError(verifyErr.message || "Invalid code");
      return;
    }

    // User login with MFA was successful
    setMfaOpen(false);
    setMfaCode("");
    // Basic code, replace with real redirect.
    router.replace("/dashboard");
  }

  return (
    <main className="min-h-screen bg-white text-black">
      <section className="mx-auto max-w-3xl p-6">
        <h1 className="text-3xl font-semibold mb-6">Admin Log in</h1>

        {/* Card Area */}
        <div className="border border-neutral-300 rounded-md bg-white">
          <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-4">
            {/* Email Only */}
            <div>
              <label className="block text-sm mb-1">Email address</label>
              <input
                type="email"
                name="email"
                placeholder="Enter email address "
                className="w-full border border-black rounded-sm px-3 py-2"
                value = {email}
                onChange= {(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password + Eye toggle */}
            <div>
              <label className="block text-sm mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="w-full border border-black rounded-sm px-3 py-2 pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-neutral-500 hover:text-black cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff size={18} strokeWidth={1.5} />
                  ) : (
                    <Eye size={18} strokeWidth={1.5} />
                  )}
                </button>
              </div>
            </div>

            {error && <div className="text-red-600 text-sm">{error}</div>}

            {/* Remember me + Forgot password */}
            <div className="flex items-center justify-between text-sm mb-8">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-black" />
                Remember me
              </label>
              <a href="#" className="text-blue-600 hover:underline">
                Forgot password?
              </a>
            </div>

            {/* Sign in button. */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#8fbd7e] hover:bg-[#6dab5c] text-white font-medium py-2 rounded-sm mt-2 cursor-pointer"
            >
              {loading ? "Loading..." : "Sign In"}
            </button>
          </form>

          {/* Divider and Sign up */}
          <div className="border-t border-neutral-300 p-6 flex justify-end items-center gap-2">
            <span className="text-sm text-neutral-600">Or</span>
            <button
              type="button"
              className="bg-[#7e9dbd] hover:bg-[#5d7b99] text-white font-medium px-4 py-2 rounded-sm cursor-pointer"
            >
              Sign up
            </button>
          </div>
        </div>
      </section>

      {/* MFA Popup */}
      {mfaOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="w-full max-w-sm bg-white rounded-md p-6 space-y-4 shadow-xl">
            <h2 className="text-lg font-semibold">Two-factor Verification</h2>
            <p className="text-sm text-neutral-600">
              Enter the 6-digit code from your authenticator app.
            </p>

            <form onSubmit={submitMFA} className="space-y-3">
              <input
                inputMode="numeric"
                pattern="[0-9]{6}"
                maxLength={6}
                className="w-full border border-black rounded-sm px-3 py-2"
                placeholder="123456"
                value={mfaCode}
                onChange={(e) => setMfaCode(e.target.value)}
                autoFocus
                required
              />
              {mfaError && <div className="text-red-600 text-sm">{mfaError}</div>}

              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  className="px-3 py-2 border rounded-sm cursor-pointer"
                  onClick={async () => {
                    setMfaOpen(false);
                    setMfaCode("");
                    await supabase.auth.signOut();
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className="px-3 py-2 bg-black text-white rounded-sm cursor-pointer">
                  Verify
                </button>
              </div>
            </form>
          </div>
        </div>)}
    </main>
  );
}