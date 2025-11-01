"use client";
import { use, useState } from "react";
import { Eye, EyeOff } from "lucide-react"; // 2 icons for password state
import { supabase } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false);  // hide password by default
  const [email, setEmail] = useState(""); // used by supabase
  const [password, setPassword] = useState(""); // used by supabase
  const [loading, setLoading] = useState(false);  // used by supabase
  const [error, setError] = useState("");  // used by supabase

async function handleSubmit(e) {
  e.preventDefault();
  setError("");
  setLoading(true);

  const email = email.trim();

  const {data, error} = await supabase.auth.signInWithPassword({email, password,})
  setLoading(false);

  if (error) {
    console.error(error);
    setError(error.message);
  } else {
    console.log("Logged in with user: ", data.user);
    alert("Successful login.");
    // Do we handle a redirect here?
  }

}

  return (
    <main className="min-h-screen bg-white text-black">
      <section className="mx-auto max-w-3xl p-6">
        <h1 className="text-3xl font-semibold mb-6">Admin Log in</h1>

        {/* Card Area */}
        <div className="border border-neutral-300 rounded-md bg-white">
          <form className="p-6 md:p-8 space-y-4">
            {/* Email / Phone */}
            <div>
              <label className="block text-sm mb-1">Email address / Phone</label>
              <input
                type="text"
                name="emailPhone"
                placeholder="Enter email address or phone number"
                className="w-full border border-black rounded-sm px-3 py-2"
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
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-neutral-500 hover:text-black"
                >
                  {showPassword ? (
                    <EyeOff size={18} strokeWidth={1.5} />
                  ) : (
                    <Eye size={18} strokeWidth={1.5} />
                  )}
                </button>
              </div>
            </div>

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

            {/* Verify code (half width, aligned left) */}
            <div>
              <input
                type="text"
                name="verifyCode"
                placeholder="Enter verify code"
                className="w-1/2 border border-black rounded-sm px-3 py-2"
              />
            </div>

            {/* Sign in button. */}
            <button
              type="submit"
              className="w-full bg-[#8fbd7e] hover:bg-[#8fbd7e] text-white font-medium py-2 rounded-sm mt-2"
            >
              Sign in
            </button>
          </form>

          {/* Divider and Sign up */}
          <div className="border-t border-neutral-300 p-6 flex justify-end items-center gap-2">
            <span className="text-sm text-neutral-600">Or</span>
            <button
              type="button"
              className="bg-[#7e9dbd] hover:bg-[#7e9dbd] text-white font-medium px-4 py-2 rounded-sm"
            >
              Sign up
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}